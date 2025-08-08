// src/hooks/index.ts
// Layout hooks
export { useMobileNavigation } from './layout/useNavigation';
export { useLanguageToggle } from './layout/useLanguageToggle';
export { useFooterData } from './layout/useFooterData';
export { useLayoutState } from './layout/useLayoutState';

// Auth hooks
export { useUserAuth } from './auth/useUserAuth';

// API hooks
export { useApiStatus } from './api/useApiStatus';
export { useErrorHandler } from './api/useErrorHandler';
export type { ErrorState } from './api/useErrorHandler';

// Members hooks
export { useMembers } from './members/useMembers';
export { useMemberFilters } from './members/useMemberFilters';

// Publications hooks
export { usePublications } from './publications/usePublications';
export type { UsePublicationsReturn } from './publications/usePublications';

// Projects hooks
export { useProjects } from './projects/useProjects';

// Awards hooks
export { useAwards } from './awards/useAwards';
export { useFilteredAwards } from './awards/useFilteredAwards';

// Events hooks
export { useEvents } from './events/useEvents';
export { useEventsFilters } from './events/useEventsFilters';
export { useEventsStatistics } from './events/useEventsStatistics';
export { useEventForm } from './events/useEventForm';

// Teaching/Courses hooks
export { useCourses } from './teaching/useCourses';

// Vacancies hooks
export { useVacancies } from './vacancies/useVacancies';

// Research hooks
export { useResearch } from './useResearch';
