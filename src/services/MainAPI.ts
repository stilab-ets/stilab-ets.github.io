import { BaseAPI, type ApiResponse, type PaginatedResponse } from './BaseAPI';
import { Member } from './user.types';

// Publication interface matching SwaggerDoc
export interface Publication {
  id: string; // UUID
  entrytype: string;
  citekey: string;
  title: string;
  author: string;
  journal: string | null;
  booktitle: string | null;
  publisher: string | null;
  year: number;
  volume: string | null;
  number: string | null;
  pages: string | null;
  url: string | null;
  is_approved: boolean;
  bibtex: string;
}

// Award interface matching SwaggerDoc
export interface Award {
  id: string; // UUID
  title: string;
  description?: string | null;
  award_type?: string | null;
  date_received: string; // date
  amount?: number | null;
  url?: string | null;
  year?: number | null;
}

// Course interface matching SwaggerDoc
export interface Course {
  id: string; // UUID
  teacher?: Member;
  title: string;
  code: string;
  level?: string | null;
  semester?: string | null;
  description?: string | null;
}

// Event interface matching SwaggerDoc and EventCard expectations
export interface Event {
  currentRegistrations: number | null | undefined;
  registrationUrl: string | null | undefined;
  id: string; // UUID
  title: string;
  domain: string; // readOnly from API
  description?: string | null;
  date?: string | null; // date
  participants: string; // readOnly
  location?: string | null;
  time?: string | null;
  speaker?: Member;
  // Additional fields expected by EventCard
  type: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting' | 'colloquium' | 'masterclass';
  registration_url?: string | null;
  tags: string[];
  is_upcoming: boolean;
  capacity?: number | null;
  current_registrations?: number | null;
}

// Research interface matching SwaggerDoc  
export interface Research {
  id: string; // UUID
  title: string;
  start_date: string; // date
  end_date?: string | null; // date
  description: string;
  project_url?: string | null;
  github_url?: string | null;
  participants: Participant[];
}

export interface Participant {
  id: string; // UUID
}

// Project interface (custom for MSc projects)
export interface Project {
  id: string;
  title: string;
  abstract: string;
  domain: string;
  description: string;
  cosupervisor: string;
  type: string;
  objectives: string;
  startDate: string | Date;
  endDate: string | Date;
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
  project_id: string;
  full_name: string;
  email: string;
  study_level: string;
  motivation: string;
}

// Vacancy interface (custom)
export interface Vacancy {
  id: string;
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
  async getPublications(): Promise<ApiResponse<Publication[]>> {
    return this.get<Publication[]>('/api/publications');
  }

  async getPublication(id: string): Promise<ApiResponse<Publication>> {
    return this.get<Publication>(`/api/publications/${id}/`);
  }

  async createPublication(data: Partial<Publication>): Promise<ApiResponse<Publication>> {
    return this.post<Publication>('/api/publications', data);
  }

  async updatePublication(id: string, data: Partial<Publication>): Promise<ApiResponse<Publication>> {
    return this.put<Publication>(`/api/publications/${id}/`, data);
  }

  async deletePublication(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/publications/${id}/`);
  }

  // Members
  async getMembers(): Promise<ApiResponse<Member[]>> {
    return this.get<Member[]>('/api/members');
  }

  async getMember(id: string): Promise<ApiResponse<Member>> {
    return this.get<Member>(`/api/members/${id}/`);
  }

  async createMember(data: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.post<Member>('/api/members', data);
  }

  async updateMember(id: string, data: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.put<Member>(`/api/members/${id}/`, data);
  }

  async deleteMember(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/members/${id}/`);
  }

  // Awards
  async getAwards(): Promise<ApiResponse<Award[]>> {
    return this.get<Award[]>('/api/awards');
  }

  async getAward(id: string): Promise<ApiResponse<Award>> {
    return this.get<Award>(`/api/awards/${id}/`);
  }

  async createAward(data: Partial<Award>): Promise<ApiResponse<Award>> {
    return this.post<Award>('/api/awards', data);
  }

  async updateAward(id: string, data: Partial<Award>): Promise<ApiResponse<Award>> {
    return this.put<Award>(`/api/awards/${id}/`, data);
  }

  async deleteAward(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/awards/${id}/`);
  }

  // Research
  async getResearch(): Promise<ApiResponse<Research[]>> {
    return this.get<Research[]>('/api/researches');
  }

  async getResearchProject(id: string): Promise<ApiResponse<Research>> {
    return this.get<Research>(`/api/researches/${id}/`);
  }

  async createResearch(data: Partial<Research>): Promise<ApiResponse<Research>> {
    return this.post<Research>('/api/researches', data);
  }

  async updateResearch(id: string, data: Partial<Research>): Promise<ApiResponse<Research>> {
    return this.put<Research>(`/api/researches/${id}/`, data);
  }

  async deleteResearch(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/researches/${id}/`);
  }

  // Courses
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.get<Course[]>('/api/courses');
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    return this.get<Course>(`/api/courses/${id}/`);
  }

  async createCourse(data: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.post<Course>('/api/courses', data);
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.put<Course>(`/api/courses/${id}/`, data);
  }

  async deleteCourse(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/courses/${id}/`);
  }

  // Events
  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.get<Event[]>('/api/events');
  }

  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.get<Event>(`/api/events/${id}/`);
  }

  async createEvent(data: Partial<Event>): Promise<ApiResponse<Event>> {
    return this.post<Event>('/api/events', data);
  }

  async updateEvent(id: string, data: Partial<Event>): Promise<ApiResponse<Event>> {
    return this.put<Event>(`/api/events/${id}/`, data);
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/events/${id}/`);
  }

  // Projects (custom endpoints)
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.get<Project[]>('/api/projects');
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.get<Project>(`/api/projects/${id}/`);
  }

  async createProject(data: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.post<Project>('/api/projects', data);
  }

  async updateProject(id: string, data: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.put<Project>(`/api/projects/${id}/`, data);
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/projects/${id}/`);
  }

  async submitProjectInterest(data: ProjectInterest): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/project-interest/', data);
  }

  // Vacancies (custom endpoints)
  async getVacancies(): Promise<ApiResponse<Vacancy[]>> {
    return this.get<Vacancy[]>('/api/vacancies');
  }

  async getVacancy(id: string): Promise<ApiResponse<Vacancy>> {
    return this.get<Vacancy>(`/api/vacancies/${id}/`);
  }

  async createVacancy(data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.post<Vacancy>('/api/vacancies', data);
  }

  async updateVacancy(id: string, data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.put<Vacancy>(`/api/vacancies/${id}/`, data);
  }

  async deleteVacancy(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/vacancies/${id}/`);
  }

  // Admin command - Run get publications
  async runGetPublicationsCommand(): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/run-getpublications-command/');
  }
}

export { ApiResponse, PaginatedResponse };