import { BaseAPI, type ApiResponse } from './BaseAPI';

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

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  user: User;
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
      '/api/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );

    if (response.data) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthTokens>> {
    const response = await this.makeRequest<AuthTokens>(
      '/api/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    if (response.data) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }

    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {   
    return this.get<User>('/api/profile');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}