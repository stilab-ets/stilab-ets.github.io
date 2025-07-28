export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export abstract class BaseAPI {
  protected baseURL: string;
  protected defaultHeaders: Record<string, string>;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  protected getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  protected getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  protected setAuthTokens(tokens: AuthTokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  protected clearAuthTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  protected getHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    
    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  protected async refreshAuthToken(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new ApiError('No refresh token available', 401);
    }

    const response = await fetch(`${this.baseURL}/auth/refresh/`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      this.clearAuthTokens();
      throw new ApiError('Token refresh failed', response.status);
    }

    const tokens: AuthTokens = await response.json();
    this.setAuthTokens(tokens);
    return tokens;
  }

  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOnAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      let response = await fetch(url, requestOptions);

      if (response.status === 401 && retryOnAuth) {
        try {
          await this.refreshAuthToken();
          requestOptions.headers = {
            ...this.getHeaders(),
            ...options.headers,
          };
          response = await fetch(url, requestOptions);
        } catch (refreshError) {
          this.clearAuthTokens();
          throw new ApiError('Authentication failed', 401);
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Request failed',
          response.status,
          errorData
        );
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        message: data.message,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error', 0, error);
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  protected async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}