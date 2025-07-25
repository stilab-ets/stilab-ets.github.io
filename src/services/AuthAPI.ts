import { BaseAPI, type ApiResponse, type AuthTokens } from './BaseAPI';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface User {
  role: string;
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
}

export class AuthAPI extends BaseAPI {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthTokens>> {
    const response = await this.makeRequest<AuthTokens>(
      '/auth/login/',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      },
      false // Don't retry on auth failure for login
    );

    if (response.data) {
      this.setAuthTokens(response.data);
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthTokens>> {
    const response = await this.makeRequest<AuthTokens>(
      '/auth/register/',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      },
      false
    );

    if (response.data) {
      this.setAuthTokens(response.data);
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await this.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.warn('Logout request failed, clearing tokens anyway');
    } finally {
      this.clearAuthTokens();
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get<User>('/api/profile/');
  }

  async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    const tokens = await this.refreshAuthToken();
    return {
      data: tokens,
      status: 200,
      message: 'Token refreshed successfully',
    };
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  async verifyToken(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      await this.getCurrentUser();
      return true;
    } catch {
      this.clearAuthTokens();
      return false;
    }
  }
}