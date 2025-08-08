export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
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
    this.baseURL =
      baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  protected getAuthToken(): string | null {
    return localStorage.getItem('access_token');
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

      // Add CSRF token for Django
      const csrfToken = this.getCSRFToken();
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      }
    }

    return headers;
  }

  protected getCSRFToken(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        return value;
      }
    }
    return null;
  }

  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, requestOptions);

      if (response.status === 401 && includeAuth) {
        this.clearAuthTokens();
        throw new ApiError('Authentication failed', 401);
      }

      if (!response.ok) {
        let errorData: any = {};
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            errorData = await response.json();
          } catch (jsonError) {
            console.log(
              '[API] Failed to parse error response as JSON:',
              jsonError
            );
          }
        }

        throw new ApiError(
          errorData.message ||
            errorData.detail ||
            `Request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      let data: any;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          data = null;
        }
      } else {
        data = null;
      }

      // Handle empty or null responses gracefully
      if (data === null || data === undefined) {
        data = options.method === 'GET' || !options.method ? [] : {};
      }

      return {
        data,
        status: response.status,
        message: data?.message,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError('Network error', 0, error);
    }
  }

  protected async get<T>(
    endpoint: string,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' }, includeAuth);
  }

  protected async post<T>(
    endpoint: string,
    data?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  protected async put<T>(
    endpoint: string,
    data?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  protected async patch<T>(
    endpoint: string,
    data?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  protected async delete<T>(
    endpoint: string,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' }, includeAuth);
  }
}
