import { BaseAPI, type ApiResponse } from './BaseAPI';
import { jwtDecode } from 'jwt-decode';
import { MemberUser } from './user.types';

interface JwtPayload {
  exp: number;
  user_id: number;
  username: string;
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
    is_staff?: boolean;
    is_active?: boolean;
  };
}

export class AuthAPI extends BaseAPI {
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await this.post<LoginResponse>(
      '/api/login',
      credentials,
      false // Don't include auth header for login
    );

    if (response.data) {
      // Store tokens
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      // Store basic user info including staff status
      const userInfo = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        is_staff: response.data.user.is_staff || false,
        is_active: response.data.user.is_active || true,
      };

      localStorage.setItem('basic_user_info', JSON.stringify(userInfo));
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

      const userInfo = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        is_staff: response.data.user.is_staff || false,
        is_active: response.data.user.is_active || true,
      };

      localStorage.setItem('basic_user_info', JSON.stringify(userInfo));
    }

    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('basic_user_info');
  }

  async getCurrentProfile(): Promise<ApiResponse<MemberUser>> {
    const token = this.getAuthToken();

    if (!token || !this.isTokenValid(token)) {
      throw new Error('No valid authentication token');
    }

    try {
      const response = await this.get<MemberUser>('/api/profile');
      return response;
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const isValid = !!token && this.isTokenValid(token);
    return isValid;
  }

  isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isValid = decoded.exp * 1000 > Date.now();
      return isValid;
    } catch (error) {
      return false;
    }
  }

  getTokenPayload(): JwtPayload | null {
    const token = this.getAuthToken();
    if (!token || !this.isTokenValid(token)) {
      return null;
    }

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  getStoredUserInfo(): any | null {
    try {
      const stored = localStorage.getItem('basic_user_info');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
