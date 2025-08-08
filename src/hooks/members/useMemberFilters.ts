import { ref, type Ref } from 'vue';
import type { Member } from '@/services/MainAPI';

interface UseMemberFiltersReturn {
  searchQuery: Ref<string>;
  selectedDomain: Ref<string>;
  selectedStatus: Ref<string>;
  clearFilters: () => void;
  getFilteredMembers: (members: Member[]) => Member[];
  getPhdStudents: (filteredMembers: Member[]) => Member[];
  getMscStudents: (filteredMembers: Member[]) => Member[];
  getProfessors: (filteredMembers: Member[]) => Member[];
}

export function useMemberFilters(): UseMemberFiltersReturn {
  const searchQuery = ref('');
  const selectedDomain = ref('');
  const selectedStatus = ref('');

  const clearFilters = (): void => {
    searchQuery.value = '';
    selectedDomain.value = '';
    selectedStatus.value = '';
  };

  const getFilteredMembers = (members: Member[]): Member[] => {
    return members.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`;
      const matchesSearch =
        !searchQuery.value ||
        fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (member.research_domain &&
          member.research_domain
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())) ||
        (member.role &&
          member.role.toLowerCase().includes(searchQuery.value.toLowerCase()));

      const matchesDomain =
        !selectedDomain.value ||
        member.research_domain === selectedDomain.value;

      const matchesStatus =
        !selectedStatus.value ||
        (selectedStatus.value === 'active' && member.status === 'active') ||
        (selectedStatus.value === 'inactive' && member.status !== 'active');

      return matchesSearch && matchesDomain && matchesStatus;
    });
  };

  const getPhdStudents = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter((member) => member.role === 'PHD');
  };

  const getMscStudents = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter((member) => member.role === 'MSC');
  };

  const getProfessors = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter(
      (member) => member.role === 'PRO' || !member.role // Professors might not have a role set
    );
  };

  return {
    searchQuery,
    selectedDomain,
    selectedStatus,
    clearFilters,
    getFilteredMembers,
    getPhdStudents,
    getMscStudents,
    getProfessors,
  };
}
