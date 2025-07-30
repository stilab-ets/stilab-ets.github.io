export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  last_login?: string;
  date_joined: string;
  groups: number[];
  user_permissions: number[];
  memberRole?: string;
  memberInfo?: { role?: string };
}

export interface Member {
  id: string; // UUID
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
