import { ref, computed, type Ref } from 'vue';
import { mainAPI } from '@/services/ApiFactory';
import type { Research, ApiResponse } from '@/services/MainAPI';

interface UseResearchReturn {
  research: Ref<Research[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  fetchResearch: () => Promise<void>;
  getResearchById: (id: string) => Research | undefined;
  createResearch: (data: Partial<Research>) => Promise<boolean>;
  updateResearch: (id: string, data: Partial<Research>) => Promise<boolean>;
  deleteResearch: (id: string) => Promise<boolean>;
  activeProjects: Ref<Research[]>;
  completedProjects: Ref<Research[]>;
  featuredProjects: Ref<Research[]>;
}

export function useResearch(): UseResearchReturn {
  const research = ref<Research[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchResearch = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ApiResponse<Research[]> = await mainAPI.getResearch();
      // API returns array directly, not paginated
      research.value = response.data || [];
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch research data';
      console.error('Error fetching research:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const getResearchById = (id: string): Research | undefined => {
    return research.value.find((r) => r.id === id);
  };

  const createResearch = async (data: Partial<Research>): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await mainAPI.createResearch(data);
      research.value.push(response.data);
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to create research';
      console.error('Error creating research:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const updateResearch = async (
    id: string,
    data: Partial<Research>
  ): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await mainAPI.updateResearch(id, data);
      const index = research.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        research.value[index] = response.data;
      }
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to update research';
      console.error('Error updating research:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteResearch = async (id: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      await mainAPI.deleteResearch(id);
      research.value = research.value.filter((r) => r.id !== id);
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete research';
      console.error('Error deleting research:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Computed properties
  const activeProjects = computed(() => {
    return research.value.filter(
      (project) => !project.end_date || new Date(project.end_date) > new Date()
    );
  });

  const completedProjects = computed(() => {
    return research.value.filter(
      (project) => project.end_date && new Date(project.end_date) <= new Date()
    );
  });

  const featuredProjects = computed(() => {
    // Return the most recent active projects as featured
    return activeProjects.value.slice(0, 3);
  });

  return {
    research,
    isLoading,
    error,
    fetchResearch,
    getResearchById,
    createResearch,
    updateResearch,
    deleteResearch,
    activeProjects,
    completedProjects,
    featuredProjects,
  };
}
