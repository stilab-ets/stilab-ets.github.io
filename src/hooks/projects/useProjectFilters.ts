import { ref, computed } from 'vue';
import type { Project } from '@/services/MainAPI';

export function useProjectFilters(projects: Project[]) {
  const searchQuery = ref('');
  const selectedDomain = ref('');
  const selectedStatus = ref('');
  const selectedDifficulty = ref('');

  const availableDomains = computed(() => {
    return [...new Set(projects.map((project) => project.domain))].sort();
  });

  const filteredProjects = computed(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchQuery.value ||
        project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.abstract
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.supervisor
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesDomain =
        !selectedDomain.value || project.domain === selectedDomain.value;

      const matchesStatus =
        !selectedStatus.value || project.status === selectedStatus.value;

      const matchesDifficulty =
        !selectedDifficulty.value ||
        project.difficulty === selectedDifficulty.value;

      return (
        matchesSearch && matchesDomain && matchesStatus && matchesDifficulty
      );
    });
  });

  const updateFilter = (filterId: string, value: string) => {
    switch (filterId) {
      case 'domain':
        selectedDomain.value = value;
        break;
      case 'status':
        selectedStatus.value = value;
        break;
      case 'difficulty':
        selectedDifficulty.value = value;
        break;
    }
  };

  const clearFilters = () => {
    searchQuery.value = '';
    selectedDomain.value = '';
    selectedStatus.value = '';
    selectedDifficulty.value = '';
  };

  return {
    searchQuery,
    selectedDomain,
    selectedStatus,
    selectedDifficulty,
    availableDomains,
    filteredProjects,
    updateFilter,
    clearFilters,
  };
}
