import { BaseAPI, type ApiResponse } from './BaseAPI';
import { jwtDecode } from 'jwt-decode';
import { Member, User } from './user.types';

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

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  user: User;
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

    if (response.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
    localStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {   
    return this.get<User>('/api/profile');
  }

  async getCurrentMember(): Promise<ApiResponse<Member>> {
    return this.get<Member>('/api/profile');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token && this.isTokenValid(token);
  }


  isTokenValid(token: string): boolean {
  try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

}
