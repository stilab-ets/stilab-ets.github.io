import { AuthAPI } from './AuthAPI';
import { MainAPI } from './MainAPI';

export class ApiFactory {
  private static instance: ApiFactory;
  private authAPI: AuthAPI;
  private mainAPI: MainAPI;
  private baseURL: string;

  private constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    this.authAPI = new AuthAPI(this.baseURL);
    this.mainAPI = new MainAPI(this.baseURL);
  }

  public static getInstance(baseURL?: string): ApiFactory {
    if (!ApiFactory.instance) {
      ApiFactory.instance = new ApiFactory(baseURL);
    } else if (baseURL && ApiFactory.instance.baseURL !== baseURL) {
      // Recreate instance if baseURL changes
      ApiFactory.instance = new ApiFactory(baseURL);
    }
    return ApiFactory.instance;
  }

  public getAuthAPI(): AuthAPI {
    return this.authAPI;
  }

  public getMainAPI(): MainAPI {
    return this.mainAPI;
  }

  public updateBaseURL(newBaseURL: string): void {
    this.baseURL = newBaseURL;
    this.authAPI = new AuthAPI(newBaseURL);
    this.mainAPI = new MainAPI(newBaseURL);
  }

  // Convenience methods for common operations
  public async isAuthenticated(): Promise<boolean> {
    return this.authAPI.verifyToken();
  }

  public logout(): Promise<void> {
    return this.authAPI.logout();
  }
}

// Create and export default instance
const apiFactory = ApiFactory.getInstance();

export const authAPI = apiFactory.getAuthAPI();
export const mainAPI = apiFactory.getMainAPI();

export default apiFactory;