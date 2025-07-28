import { ref, type Ref } from 'vue';
import { authAPI } from '@/services/ApiFactory';
import type { User } from '@/services/AuthAPI';

interface AuthState {
  user: Ref<User | null>;
  isAuthenticated: Ref<boolean>;
  isLoading: Ref<boolean>;
}

class AuthMiddleware {
  private static instance: AuthMiddleware;
  public state: AuthState;

  private constructor() {
    this.state = {
      user: ref(null),
      isAuthenticated: ref(false),
      isLoading: ref(false),
    };
  }

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  async initialize(): Promise<void> {
    this.state.isLoading.value = true;
    
    try {
      if (authAPI.isAuthenticated()) {
        try {
          const response = await authAPI.getCurrentUser();
          
          this.state.user.value = response.data;
          this.state.isAuthenticated.value = true;
        } catch (error) {
          this.logout();
        }
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.logout();
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async login(credentials: { username_or_email: string; password: string }): Promise<boolean> {
    this.state.isLoading.value = true;
    
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data) {
        // Use the user data directly from login response
        if (response.data.user) {
          this.state.user.value = response.data.user;
          this.state.isAuthenticated.value = true;
          return true;
        } else {
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async logout(): Promise<void> {
    this.state.isLoading.value = true;
    
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.state.user.value = null;
      this.state.isAuthenticated.value = false;
      this.state.isLoading.value = false;
    }
  }

  requireAuth(): boolean {
    return this.state.isAuthenticated.value;
  }

  requireAdmin(): boolean {
    return this.state.isAuthenticated.value && 
           this.state.user.value?.is_staff === true;
  }

  getUser(): User | null {
    return this.state.user.value;
  }
}

export const authMiddleware = AuthMiddleware.getInstance();

// Composable for components
export function useAuthMiddleware() {
  return {
    ...authMiddleware.state,
    login: authMiddleware.login.bind(authMiddleware),
    logout: authMiddleware.logout.bind(authMiddleware),
    requireAuth: authMiddleware.requireAuth.bind(authMiddleware),
    requireAdmin: authMiddleware.requireAdmin.bind(authMiddleware),
    getUser: authMiddleware.getUser.bind(authMiddleware),
  };
}