import { ref, type Ref } from 'vue';
import { authAPI } from '@/services/ApiFactory';
import { MemberUser } from '@/services/user.types';

interface BasicUserInfo {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
}

interface AuthState {
  profile: Ref<MemberUser | null>;
  isAuthenticated: Ref<boolean>;
  isLoading: Ref<boolean>;
  basicUserInfo: Ref<BasicUserInfo | null>;
}

class AuthMiddleware {
  private static instance: AuthMiddleware;
  public state: AuthState;
  private profileCache: MemberUser | null = null;
  private profileCacheTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.state = {
      profile: ref(null),
      isAuthenticated: ref(false),
      isLoading: ref(false),
      basicUserInfo: ref(null),
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
      // Check if user is authenticated
      if (authAPI.isAuthenticated()) {
        this.state.isAuthenticated.value = true;
        
        // Restore basic user info from localStorage
        const storedUserInfo = localStorage.getItem('basic_user_info');
        if (storedUserInfo) {
          try {
            this.state.basicUserInfo.value = JSON.parse(storedUserInfo);
          } catch (error) {
            localStorage.removeItem('basic_user_info');
          }
        }

        // User is authenticated, so immediately fetch their full profile.
        await this.getCurrentProfile();

      } else {
        await this.clearAuth();
      }
    } catch (error) {
      await this.clearAuth();
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async login(credentials: { username_or_email: string; password: string }): Promise<boolean> {
    this.state.isLoading.value = true;
    
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data) {        
        this.state.isAuthenticated.value = true;
        this.state.basicUserInfo.value = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          is_staff: response.data.user.is_staff || false,
          is_active: response.data.user.is_active || true
        };
        
        // Clear any cached profile data
        this.clearProfileCache();
        try {
          await this.getCurrentProfile();
        } catch (profileError) {
          console.warn('[AUTH MIDDLEWARE] Profile fetch failed after login, continuing with basic info:', profileError);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
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
      console.error('[AUTH MIDDLEWARE] Logout error (continuing anyway):', error);
    } finally {
      await this.clearAuth();
      this.state.isLoading.value = false;
    }
  }

  async getCurrentProfile(): Promise<MemberUser | null> {
    if (!this.state.isAuthenticated.value) {
      return null;
    }

    // Check if token is still valid
    if (!authAPI.isAuthenticated()) {
      await this.clearAuth();
      return null;
    }

    // Check cache first
    const now = Date.now();
    if (this.profileCache && (now - this.profileCacheTime) < this.CACHE_DURATION) {
      this.state.profile.value = this.profileCache;
      return this.profileCache;
    }

    try {
      const response = await authAPI.getCurrentProfile();
      if (response.data) {
        this.profileCache = response.data;
        this.profileCacheTime = now;
        this.state.profile.value = response.data;
        return response.data;
      }
    } catch (error) {      
      // Only logout on auth errors (401, 403), not on 404 or other errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('401') || errorMessage.includes('403')) {
          await this.clearAuth();
        } else {
          console.log('[AUTH MIDDLEWARE] Profile endpoint unavailable - continuing with basic info');
        }
      }
    }

    return null;
  }

  async refreshProfile(): Promise<void> {
    this.clearProfileCache();
    await this.getCurrentProfile();
  }

  requireAuth(): boolean {
    return this.state.isAuthenticated.value;
  }

  async requireAdmin(): Promise<boolean> {
    if (!this.state.isAuthenticated.value) return false;
    
    // First check basic user info for staff status
    if (this.state.basicUserInfo.value?.is_staff) {
      return true;
    }
    
    // Fallback to profile check
    const profile = await this.getCurrentProfile();
    return profile?.user?.is_staff === true;
  }

  private async clearAuth(): Promise<void> {
    this.state.profile.value = null;
    this.state.isAuthenticated.value = false;
    this.state.basicUserInfo.value = null;
    this.clearProfileCache();
  }

  private clearProfileCache(): void {
    this.profileCache = null;
    this.profileCacheTime = 0;
    this.state.profile.value = null;
  }
}

export const authMiddleware = AuthMiddleware.getInstance();

export function useAuthMiddleware() {
  return {
    ...authMiddleware.state,
    login: authMiddleware.login.bind(authMiddleware),
    logout: authMiddleware.logout.bind(authMiddleware),
    getCurrentProfile: authMiddleware.getCurrentProfile.bind(authMiddleware),
    refreshProfile: authMiddleware.refreshProfile.bind(authMiddleware),
    requireAuth: authMiddleware.requireAuth.bind(authMiddleware),
    requireAdmin: authMiddleware.requireAdmin.bind(authMiddleware)
  };
}