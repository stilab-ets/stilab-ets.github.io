import { ref, type Ref } from 'vue';
import { authAPI } from '@/services/ApiFactory';
import { User } from '@/services/user.types';

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
      const accessToken = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');

      if (accessToken && authAPI.isTokenValid(accessToken) && userData) {
        this.state.user.value = JSON.parse(userData);
        this.state.isAuthenticated.value = true;
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Auth init failed:', error);
      this.logout();
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async login(credentials: { username_or_email: string; password: string }): Promise<boolean> {
    this.state.isLoading.value = true;
    
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data && response.data.user) {
        this.state.user.value = response.data.user;
        
        // Récupérer les infos Member pour obtenir le vrai rôle
        try {
          const memberResponse = await authAPI.getCurrentMember();
          if (memberResponse.data) {
            if (memberResponse.data.role !== null) {
              this.state.user.value.memberRole = memberResponse.data.role;
            }
          }
        } catch (error) {
          console.warn('Failed to fetch member info:', error);
        }
        
        this.state.isAuthenticated.value = true;
        return true;
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
