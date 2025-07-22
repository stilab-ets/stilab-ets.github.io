import { BaseAPI, type ApiResponse, type PaginatedResponse } from './BaseAPI';

export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
  abstract?: string;
  publication_type: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  bio?: string;
  research_interests?: string;
  profile_image?: string;
  linkedin_url?: string;
  personal_website?: string;
  google_scholar?: string;
  joined_date: string;
  is_active: boolean;
}

export interface Award {
  id: number;
  title: string;
  description?: string;
  recipient: string;
  date_received: string;
  organization?: string;
  amount?: number;
  award_type: string;
  created_at: string;
}

export interface Research {
  id: number;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  funding_amount?: number;
  funding_source?: string;
  team_members: string[];
  publications?: number[];
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  description?: string;
  credits: number;
  semester: string;
  year: number;
  instructor: string;
  prerequisites?: string;
  learning_objectives?: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  abstract: string;
  domain: string;
  status: 'available' | 'assigned' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  supervisor: string;
  co_supervisor?: string;
  requirements: string[];
  proposed_date: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectInterest {
  project_id: number;
  full_name: string;
  email: string;
  study_level: string;
  motivation: string;
}

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  type: 'phd' | 'postdoc' | 'researcher' | 'engineer' | 'intern';
  supervisor: string;
  duration?: string;
  salary?: string;
  deadline: string;
  start_date: string;
  requirements: string[];
  tags: string[];
  apply_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class MainAPI extends BaseAPI {
  // Publications
  async getPublications(): Promise<ApiResponse<PaginatedResponse<Publication>>> {
    return this.get<PaginatedResponse<Publication>>('/api/publications/');
  }

  async getPublication(id: number): Promise<ApiResponse<Publication>> {
    return this.get<Publication>(`/api/publications/${id}/`);
  }

  async createPublication(data: Partial<Publication>): Promise<ApiResponse<Publication>> {
    return this.post<Publication>('/api/publications/', data);
  }

  async updatePublication(id: number, data: Partial<Publication>): Promise<ApiResponse<Publication>> {
    return this.put<Publication>(`/api/publications/${id}/`, data);
  }

  async deletePublication(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/publications/${id}/`);
  }

  // Members
  async getMembers(): Promise<ApiResponse<PaginatedResponse<Member>>> {
    return this.get<PaginatedResponse<Member>>('/api/members/');
  }

  async getMember(id: number): Promise<ApiResponse<Member>> {
    return this.get<Member>(`/api/members/${id}/`);
  }

  async createMember(data: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.post<Member>('/api/members/', data);
  }

  async updateMember(id: number, data: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.put<Member>(`/api/members/${id}/`, data);
  }

  async deleteMember(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/members/${id}/`);
  }

  // Awards
  async getAwards(): Promise<ApiResponse<PaginatedResponse<Award>>> {
    return this.get<PaginatedResponse<Award>>('/api/awards/');
  }

  async getAward(id: number): Promise<ApiResponse<Award>> {
    return this.get<Award>(`/api/awards/${id}/`);
  }

  async createAward(data: Partial<Award>): Promise<ApiResponse<Award>> {
    return this.post<Award>('/api/awards/', data);
  }

  async updateAward(id: number, data: Partial<Award>): Promise<ApiResponse<Award>> {
    return this.put<Award>(`/api/awards/${id}/`, data);
  }

  async deleteAward(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/awards/${id}/`);
  }

  // Research
  async getResearch(): Promise<ApiResponse<PaginatedResponse<Research>>> {
    return this.get<PaginatedResponse<Research>>('/api/research/');
  }

  async getResearchProject(id: number): Promise<ApiResponse<Research>> {
    return this.get<Research>(`/api/research/${id}/`);
  }

  async createResearch(data: Partial<Research>): Promise<ApiResponse<Research>> {
    return this.post<Research>('/api/research/', data);
  }

  async updateResearch(id: number, data: Partial<Research>): Promise<ApiResponse<Research>> {
    return this.put<Research>(`/api/research/${id}/`, data);
  }

  async deleteResearch(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/research/${id}/`);
  }

  // Courses
  async getCourses(): Promise<ApiResponse<PaginatedResponse<Course>>> {
    return this.get<PaginatedResponse<Course>>('/api/courses/');
  }

  async getCourse(id: number): Promise<ApiResponse<Course>> {
    return this.get<Course>(`/api/courses/${id}/`);
  }

  async createCourse(data: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.post<Course>('/api/courses/', data);
  }

  async updateCourse(id: number, data: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.put<Course>(`/api/courses/${id}/`, data);
  }

  async deleteCourse(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/courses/${id}/`);
  }

  // Projects
  async getProjects(): Promise<ApiResponse<PaginatedResponse<Project>>> {
    return this.get<PaginatedResponse<Project>>('/api/projects/');
  }

  async getProject(id: number): Promise<ApiResponse<Project>> {
    return this.get<Project>(`/api/projects/${id}/`);
  }

  async createProject(data: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.post<Project>('/api/projects/', data);
  }

  async updateProject(id: number, data: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.put<Project>(`/api/projects/${id}/`, data);
  }

  async deleteProject(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/projects/${id}/`);
  }

  async submitProjectInterest(data: ProjectInterest): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/project-interest/', data);
  }

    // Vacancies
  async getVacancies(): Promise<ApiResponse<PaginatedResponse<Vacancy>>> {
    return this.get<PaginatedResponse<Vacancy>>('/api/vacancies/');
  }

  async getVacancy(id: number): Promise<ApiResponse<Vacancy>> {
    return this.get<Vacancy>(`/api/vacancies/${id}/`);
  }

  async createVacancy(data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.post<Vacancy>('/api/vacancies/', data);
  }

  async updateVacancy(id: number, data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.put<Vacancy>(`/api/vacancies/${id}/`, data);
  }

  async deleteVacancy(id: number): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/vacancies/${id}/`);
  }

  // Admin command - Run get publications
  async runGetPublicationsCommand(): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/run-getpublications-command/');
  }
}

export { ApiResponse, PaginatedResponse };
