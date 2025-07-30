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
    console.log('[AUTH MIDDLEWARE] Initializing...');
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
            console.log('[AUTH MIDDLEWARE] Restored basic user info:', this.state.basicUserInfo.value);
          } catch (error) {
            console.warn('[AUTH MIDDLEWARE] Failed to parse stored user info:', error);
            localStorage.removeItem('basic_user_info');
          }
        }

        console.log('[AUTH MIDDLEWARE] User authenticated, profile will be fetched on demand');
      } else {
        console.log('[AUTH MIDDLEWARE] No valid authentication found');
        await this.clearAuth();
      }
    } catch (error) {
      console.error('[AUTH MIDDLEWARE] Initialization failed:', error);
      await this.clearAuth();
    } finally {
      this.state.isLoading.value = false;
      console.log('[AUTH MIDDLEWARE] Initialization complete');
    }
  }

  async login(credentials: { username_or_email: string; password: string }): Promise<boolean> {
    console.log('[AUTH MIDDLEWARE] Attempting login...');
    this.state.isLoading.value = true;
    
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data) {
        console.log('[AUTH MIDDLEWARE] Login successful');
        
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
        
        console.log('[AUTH MIDDLEWARE] Basic user info set:', this.state.basicUserInfo.value);
        
        // Immediately fetch user profile to get complete role information
        console.log('[AUTH MIDDLEWARE] Fetching user profile after login...');
        try {
          await this.getCurrentProfile();
          console.log('[AUTH MIDDLEWARE] Profile fetched successfully after login');
        } catch (profileError) {
          console.warn('[AUTH MIDDLEWARE] Profile fetch failed after login, continuing with basic info:', profileError);
          // Don't fail the login if profile fetch fails - we have basic info
        }
        
        console.log('[AUTH MIDDLEWARE] Login complete');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[AUTH MIDDLEWARE] Login failed:', error);
      return false;
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async logout(): Promise<void> {
    console.log('[AUTH MIDDLEWARE] Logging out...');
    this.state.isLoading.value = true;
    
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('[AUTH MIDDLEWARE] Logout error (continuing anyway):', error);
    } finally {
      await this.clearAuth();
      this.state.isLoading.value = false;
      console.log('[AUTH MIDDLEWARE] Logout complete');
    }
  }

  async getCurrentProfile(): Promise<MemberUser | null> {
    if (!this.state.isAuthenticated.value) {
      console.log('[AUTH MIDDLEWARE] Not authenticated, cannot fetch profile');
      return null;
    }

    // Check if token is still valid
    if (!authAPI.isAuthenticated()) {
      console.log('[AUTH MIDDLEWARE] Token invalid, clearing auth');
      await this.clearAuth();
      return null;
    }

    // Check cache first
    const now = Date.now();
    if (this.profileCache && (now - this.profileCacheTime) < this.CACHE_DURATION) {
      console.log('[AUTH MIDDLEWARE] Using cached profile');
      this.state.profile.value = this.profileCache;
      return this.profileCache;
    }

    console.log('[AUTH MIDDLEWARE] Fetching profile from API...');
    try {
      const response = await authAPI.getCurrentProfile();
      if (response.data) {
        console.log('[AUTH MIDDLEWARE] Profile fetched successfully');
        this.profileCache = response.data;
        this.profileCacheTime = now;
        this.state.profile.value = response.data;
        return response.data;
      }
    } catch (error) {
      console.warn('[AUTH MIDDLEWARE] Profile fetch failed:', error);
      
      // Only logout on auth errors (401, 403), not on 404 or other errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('401') || errorMessage.includes('403')) {
          console.log('[AUTH MIDDLEWARE] Auth error detected, logging out');
          await this.clearAuth();
        } else {
          console.log('[AUTH MIDDLEWARE] Profile endpoint unavailable - continuing with basic info');
        }
      }
    }

    return null;
  }

  async refreshProfile(): Promise<void> {
    console.log('[AUTH MIDDLEWARE] Refreshing profile...');
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