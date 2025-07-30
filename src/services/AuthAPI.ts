import { BaseAPI, type ApiResponse } from './BaseAPI';
import { jwtDecode } from 'jwt-decode';
import { MemberUser } from './user.types';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export interface LoginCredentials {
  username_or_email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export class AuthAPI extends BaseAPI {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    console.log('[AUTH API] Attempting login request...');
    const response = await this.post<LoginResponse>(
      '/api/login',
      credentials,
      false // Don't include auth header for login
    );

    if (response.data) {
      console.log('[AUTH API] Login response received, storing tokens...');
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      console.log('[AUTH API] Tokens stored successfully');
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<LoginResponse>> {
    const response = await this.post<LoginResponse>(
      '/api/register',
      userData,
      false // Don't include auth header for register
    );

    if (response.data) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }

    return response;
  }

  async logout(): Promise<void> {
    console.log('[AUTH API] Clearing stored tokens...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('basic_user_info');
  }

  async getCurrentProfile(): Promise<ApiResponse<MemberUser>> {
    console.log('[AUTH API] Attempting to fetch profile...');
    const token = this.getAuthToken();
    console.log('[AUTH API] Using token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    try {
      // Try different possible profile endpoints
      const endpoints = ['/api/profile'];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`[AUTH API] Trying endpoint: ${endpoint}`);
          const response = await this.get<MemberUser>(endpoint);
          console.log(`[AUTH API] Profile fetched successfully from ${endpoint}:`, response.data);
          return response;
        } catch (error) {
          console.log(`[AUTH API] Endpoint ${endpoint} failed:`, error);
          // Continue to next endpoint
        }
      }
      
      // If all endpoints fail, throw the last error
      throw new Error('No valid profile endpoint found');
    } catch (error) {
      console.error('[AUTH API] All profile endpoints failed:', error);
      throw error;
    }
  }

  // Legacy method for backward compatibility
  async getCurrentUser(): Promise<ApiResponse<MemberUser>> {
    return this.getCurrentProfile();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token && this.isTokenValid(token);
  }

  isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isValid = decoded.exp * 1000 > Date.now();
      console.log('[AUTH API] Token validation result:', { 
        isValid, 
        expiresAt: new Date(decoded.exp * 1000).toISOString() 
      });
      return isValid;
    } catch (error) {
      console.log('[AUTH API] Token validation failed:', error);
      return false;
    }
  }
}