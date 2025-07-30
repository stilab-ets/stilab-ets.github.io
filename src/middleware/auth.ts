import { ref, type Ref } from 'vue';
import { authAPI } from '@/services/ApiFactory';
import { MemberUser } from '@/services/user.types';

interface AuthState {
  profile: Ref<MemberUser | null>;
  isAuthenticated: Ref<boolean>;
  isLoading: Ref<boolean>;
  basicUserInfo: Ref<{ id: number; username: string; email: string } | null>;
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
    console.log('[AUTH] Initializing auth middleware...');
    this.state.isLoading.value = true;

    try {
      const accessToken = localStorage.getItem('access_token');
      const storedUserInfo = localStorage.getItem('basic_user_info');

      console.log('[AUTH] Checking stored tokens:', { 
        hasToken: !!accessToken, 
        hasUserInfo: !!storedUserInfo 
      });

      if (accessToken && authAPI.isTokenValid(accessToken)) {
        this.state.isAuthenticated.value = true;
        
        // Restore basic user info if available
        if (storedUserInfo) {
          try {
            this.state.basicUserInfo.value = JSON.parse(storedUserInfo);
            console.log('[AUTH] Restored basic user info:', this.state.basicUserInfo.value);
          } catch (error) {
            console.warn('[AUTH] Failed to parse stored user info:', error);
            localStorage.removeItem('basic_user_info');
          }
        }

        console.log('[AUTH] User is authenticated, profile will be fetched when needed');
      } else {
        console.log('[AUTH] No valid token found, user not authenticated');
        await this.logout();
      }
    } catch (error) {
      console.error('[AUTH] Init failed:', error);
      await this.logout();
    } finally {
      this.state.isLoading.value = false;
      console.log('[AUTH] Initialization complete');
    }
  }

  async login(credentials: { username_or_email: string; password: string }): Promise<boolean> {
    console.log('[AUTH] Attempting login for:', credentials.username_or_email);
    this.state.isLoading.value = true;
    
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data) {
        console.log('[AUTH] Login successful, user data:', response.data.user);
        
        this.state.isAuthenticated.value = true;
        
        // Store basic user info from login response
        if (response.data.user) {
          this.state.basicUserInfo.value = response.data.user;
          localStorage.setItem('basic_user_info', JSON.stringify(response.data.user));
          console.log('[AUTH] Stored basic user info:', response.data.user);
        }
        
        // Clear any cached profile data
        this.profileCache = null;
        this.profileCacheTime = 0;
        this.state.profile.value = null;
        
        // Try to fetch full profile after login (non-blocking)
        console.log('[AUTH] Attempting to fetch user profile...');
        this.getCurrentProfile().catch(error => {
          console.warn('[AUTH] Profile fetch failed but continuing with basic user info:', error);
        });
        
        return true;
      }
      
      console.log('[AUTH] Login failed - no data in response');
      return false;
    } catch (error) {
      console.error('[AUTH] Login failed:', error);
      return false;
    } finally {
      this.state.isLoading.value = false;
    }
  }

  async logout(): Promise<void> {
    console.log('[AUTH] Logging out user...');
    this.state.isLoading.value = true;
    
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('[AUTH] Logout error (continuing anyway):', error);
    } finally {
      this.state.profile.value = null;
      this.state.isAuthenticated.value = false;
      this.state.isLoading.value = false;
      this.state.basicUserInfo.value = null;
      this.profileCache = null;
      this.profileCacheTime = 0;
      
      console.log('[AUTH] Logout complete');
    }
  }

  async getCurrentProfile(): Promise<MemberUser | null> {
    if (!this.state.isAuthenticated.value) {
      console.log('[AUTH] Not authenticated, cannot fetch profile');
      return null;
    }

    // Check if token is still valid before making request
    const token = localStorage.getItem('access_token');
    if (!token || !authAPI.isTokenValid(token)) {
      console.log('[AUTH] Token invalid, logging out');
      await this.logout();
      return null;
    }

    // Check cache first
    const now = Date.now();
    if (this.profileCache && (now - this.profileCacheTime) < this.CACHE_DURATION) {
      console.log('[AUTH] Using cached profile data');
      this.state.profile.value = this.profileCache;
      return this.profileCache;
    }

    console.log('[AUTH] Fetching profile from API...');
    try {
      const response = await authAPI.getCurrentProfile();
      if (response.data) {
        console.log('[AUTH] Profile fetched successfully:', response.data);
        this.profileCache = response.data;
        this.profileCacheTime = now;
        this.state.profile.value = response.data;
        return response.data;
      } else {
        console.log('[AUTH] Profile API returned empty data');
      }
    } catch (error) {
      console.warn('[AUTH] Failed to fetch profile:', error);
      
      // Don't logout on profile fetch failure - profile endpoint might not exist
      // Only logout on actual auth errors (401, 403)
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('401') || errorMessage.includes('403')) {
          console.log('[AUTH] Auth error detected, logging out');
          await this.logout();
        } else {
          console.log('[AUTH] Profile endpoint unavailable - continuing with basic user info');
          // Create a basic profile from stored user info if available
          if (this.state.basicUserInfo.value) {
            const basicProfile: MemberUser = {
              id: this.state.basicUserInfo.value.id,
              user: {
                id: this.state.basicUserInfo.value.id,
                username: this.state.basicUserInfo.value.username,
                email: this.state.basicUserInfo.value.email,
                last_login: null,
                is_superuser: false,
                is_staff: false,
                is_active: true,
                date_joined: new Date().toISOString(),
                groups: [],
                user_permissions: []
              },
              first_name: '',
              last_name: '',
              role: 'student', // Default role for users without profile
              email: this.state.basicUserInfo.value.email,
              status: 'active'
            };
            
            console.log('[AUTH] Created basic profile from user info:', basicProfile);
            this.profileCache = basicProfile;
            this.profileCacheTime = now;
            this.state.profile.value = basicProfile;
            return basicProfile;
          }
        }
      }
    }

    return null;
  }

  async refreshProfile(): Promise<void> {
    console.log('[AUTH] Refreshing profile data...');
    this.profileCache = null;
    this.profileCacheTime = 0;
    await this.getCurrentProfile();
  }

  requireAuth(): boolean {
    return this.state.isAuthenticated.value;
  }

  async requireAdmin(): Promise<boolean> {
    if (!this.state.isAuthenticated.value) return false;
    
    const profile = await this.getCurrentProfile();
    return profile?.user?.is_staff === true;
  }

  async getUserRole(): Promise<string | null> {
    if (!this.state.isAuthenticated.value) return null;
    
    const profile = await this.getCurrentProfile();
    return profile?.role || 'student'; // Default to student if no role
  }

  getProfile(): MemberUser | null {
    return this.state.profile.value;
  }

  getBasicUserInfo(): { id: number; username: string; email: string } | null {
    return this.state.basicUserInfo.value;
  }
}

export const authMiddleware = AuthMiddleware.getInstance();

// Composable for components
export function useAuthMiddleware() {
  return {
    ...authMiddleware.state,
    login: authMiddleware.login.bind(authMiddleware),
    logout: authMiddleware.logout.bind(authMiddleware),
    getCurrentProfile: authMiddleware.getCurrentProfile.bind(authMiddleware),
    refreshProfile: authMiddleware.refreshProfile.bind(authMiddleware),
    requireAuth: authMiddleware.requireAuth.bind(authMiddleware),
    requireAdmin: authMiddleware.requireAdmin.bind(authMiddleware),
    getUserRole: authMiddleware.getUserRole.bind(authMiddleware),
    getProfile: authMiddleware.getProfile.bind(authMiddleware),
  };
}