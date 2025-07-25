import { ref, computed, type Ref } from 'vue'
import type { Member } from '@/services/MainAPI'

interface UseMemberFiltersReturn {
  searchQuery: Ref<string>
  selectedDomain: Ref<string>
  selectedStatus: Ref<string>
  clearFilters: () => void
  getFilteredMembers: (members: Member[]) => Member[]
  getPhdStudents: (filteredMembers: Member[]) => Member[]
  getMscStudents: (filteredMembers: Member[]) => Member[]
  getProfessors: (filteredMembers: Member[]) => Member[]
}

export function useMemberFilters(): UseMemberFiltersReturn {
  const searchQuery = ref('')
  const selectedDomain = ref('')
  const selectedStatus = ref('')

  const clearFilters = (): void => {
    searchQuery.value = ''
    selectedDomain.value = ''
    selectedStatus.value = ''
  }

  const getFilteredMembers = (members: Member[]): Member[] => {
    return members.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`
      const matchesSearch =
        !searchQuery.value ||
        fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (member.research_interests &&
          member.research_interests.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (member.position &&
          member.position.toLowerCase().includes(searchQuery.value.toLowerCase()))

      const matchesDomain =
        !selectedDomain.value || member.research_interests === selectedDomain.value

      const matchesStatus =
        !selectedStatus.value || 
        (selectedStatus.value === 'active' && member.is_active) ||
        (selectedStatus.value === 'inactive' && !member.is_active)

      return matchesSearch && matchesDomain && matchesStatus
    })
  }

  const getPhdStudents = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter(
      (member) => member.position?.toLowerCase().includes('phd') || 
                  member.position?.toLowerCase().includes('doctoral')
    )
  }

  const getMscStudents = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter(
      (member) => member.position?.toLowerCase().includes('master') ||
                  member.position?.toLowerCase().includes('msc') ||
                  member.position?.toLowerCase().includes('m.sc')
    )
  }

  const getProfessors = (filteredMembers: Member[]): Member[] => {
    return filteredMembers.filter(
      (member) => member.position?.toLowerCase().includes('professor') ||
                  member.position?.toLowerCase().includes('prof') ||
                  member.position?.toLowerCase().includes('director') ||
                  member.position?.toLowerCase().includes('researcher')
    )
  }

  return {
    searchQuery,
    selectedDomain,
    selectedStatus,
    clearFilters,
    getFilteredMembers,
    getPhdStudents,
    getMscStudents,
    getProfessors
  }
}