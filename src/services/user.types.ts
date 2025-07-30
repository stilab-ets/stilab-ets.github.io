export interface User {
  id: number;
  username: string;
  email: string;
  last_login?: string | null;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  groups: number[];
  user_permissions: number[];
}

export interface MemberUser {
  id: number;
  user: User;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone?: string;
  biography?: string;
  research_domain?: string;
  image_url?: string;
  github_url?: string;
  linkedin_url?: string;
  personal_website?: string;
  status: string;
}

// Legacy Member interface for compatibility with existing code
export interface Member {
  id: string;
  user?: User;
  first_name: string;
  last_name: string;
  role?: 'PHD' | 'MSC' | 'PRO' | null;
  email?: string | null;
  phone?: string | null;
  biography?: string | null;
  research_domain?: string | null;
  image_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  personal_website?: string | null;
  status?: string | null;
}