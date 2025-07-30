import { ref, computed, type Ref } from 'vue';
import { authAPI, mainAPI } from '@/services/ApiFactory';
import type { ApiError } from '@/services/BaseAPI';

interface UseAPIState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<ApiError | null>;
}

interface UseAPIReturn<T> extends UseAPIState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  clearError: () => void;
}

export function useAPI<T = any>(): UseAPIReturn<T> {
  const data: Ref<T | null> = ref(null);
  const loading = ref(false);
  const error: Ref<ApiError | null> = ref(null);

  const execute = async (apiCall: () => Promise<any>): Promise<T | null> => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await apiCall();
      data.value = response.data;
      
      return response.data;
    } catch (err) {
      error.value = err as ApiError;
      console.error('API Error:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
    clearError,
  };
}

// Specific composables for different API endpoints
export function useAuth() {
  const loginState = useAPI();
  const registerState = useAPI();
  const userState = useAPI();

  const login = async (credentials: { username_or_email: string; password: string }) => {
    return loginState.execute(() => authAPI.login(credentials));
  };

  const register = async (userData: any) => {
    return registerState.execute(() => authAPI.register(userData));
  };

  const getCurrentUser = async () => {
    return userState.execute(() => authAPI.getCurrentUser());
  };

  const logout = async () => {
    await authAPI.logout();
    loginState.reset();
    registerState.reset();
    userState.reset();
  };

  const isAuthenticated = computed(() => authAPI.isAuthenticated());

  return {
    // States
    loginState,
    registerState,
    userState,
    
    // Actions
    login,
    register,
    getCurrentUser,
    logout,
    
    // Computed
    isAuthenticated,
  };
}

export function usePublications() {
  const publicationsState = useAPI();
  const publicationState = useAPI();
  const createState = useAPI();
  const updateState = useAPI();
  const deleteState = useAPI();

  const getPublications = async () => {
    return publicationsState.execute(() => mainAPI.getPublications());
  };

  const getPublication = async (id: string) => {
    return publicationState.execute(() => mainAPI.getPublication(id));
  };

  const createPublication = async (data: any) => {
    return createState.execute(() => mainAPI.createPublication(data));
  };

  const updatePublication = async (id: string, data: any) => {
    return updateState.execute(() => mainAPI.updatePublication(id, data));
  };

  const deletePublication = async (id: string) => {
    return deleteState.execute(() => mainAPI.deletePublication(id));
  };

  return {
    publicationsState,
    publicationState,
    createState,
    updateState,
    deleteState,
    getPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication,
  };
}

export function useMembers() {
  const membersState = useAPI();
  const memberState = useAPI();
  const createState = useAPI();
  const updateState = useAPI();
  const deleteState = useAPI();

  const getMembers = async () => {
    return membersState.execute(() => mainAPI.getMembers());
  };

  const getMember = async (id: string) => {
    return memberState.execute(() => mainAPI.getMember(id));
  };

  const createMember = async (data: any) => {
    return createState.execute(() => mainAPI.createMember(data));
  };

  const updateMember = async (id: string, data: any) => {
    return updateState.execute(() => mainAPI.updateMember(id, data));
  };

  const deleteMember = async (id: string) => {
    return deleteState.execute(() => mainAPI.deleteMember(id));
  };

  return {
    membersState,
    memberState,
    createState,
    updateState,
    deleteState,
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
  };
}

export function useAwards() {
  const awardsState = useAPI();
  const awardState = useAPI();
  const createState = useAPI();
  const updateState = useAPI();
  const deleteState = useAPI();

  const getAwards = async () => {
    return awardsState.execute(() => mainAPI.getAwards());
  };

  const getAward = async (id: string) => {
    return awardState.execute(() => mainAPI.getAward(id));
  };

  const createAward = async (data: any) => {
    return createState.execute(() => mainAPI.createAward(data));
  };

  const updateAward = async (id: string, data: any) => {
    return updateState.execute(() => mainAPI.updateAward(id, data));
  };

  const deleteAward = async (id: string) => {
    return deleteState.execute(() => mainAPI.deleteAward(id));
  };

  return {
    awardsState,
    awardState,
    createState,
    updateState,
    deleteState,
    getAwards,
    getAward,
    createAward,
    updateAward,
    deleteAward,
  };
}

export function useResearch() {
  const researchState = useAPI();
  const projectState = useAPI();
  const createState = useAPI();
  const updateState = useAPI();
  const deleteState = useAPI();

  const getResearch = async () => {
    return researchState.execute(() => mainAPI.getResearch());
  };

  const getResearchProject = async (id: string) => {
    return projectState.execute(() => mainAPI.getResearchProject(id));
  };

  const createResearch = async (data: any) => {
    return createState.execute(() => mainAPI.createResearch(data));
  };

  const updateResearch = async (id: string, data: any) => {
    return updateState.execute(() => mainAPI.updateResearch(id, data));
  };

  const deleteResearch = async (id: string) => {
    return deleteState.execute(() => mainAPI.deleteResearch(id));
  };

  return {
    researchState,
    projectState,
    createState,
    updateState,
    deleteState,
    getResearch,
    getResearchProject,
    createResearch,
    updateResearch,
    deleteResearch,
  };
}

export function useCourses() {
  const coursesState = useAPI();
  const courseState = useAPI();
  const createState = useAPI();
  const updateState = useAPI();
  const deleteState = useAPI();

  const getCourses = async () => {
    return coursesState.execute(() => mainAPI.getCourses());
  };

  const getCourse = async (id: string) => {
    return courseState.execute(() => mainAPI.getCourse(id));
  };

  const createCourse = async (data: any) => {
    return createState.execute(() => mainAPI.createCourse(data));
  };

  const updateCourse = async (id: string, data: any) => {
    return updateState.execute(() => mainAPI.updateCourse(id, data));
  };

  const deleteCourse = async (id: string) => {
    return deleteState.execute(() => mainAPI.deleteCourse(id));
  };

  return {
    coursesState,
    courseState,
    createState,
    updateState,
    deleteState,
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
