import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Member } from '@/services/MainAPI'

interface UseMembersReturn {
  members: Ref<Member[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchMembers: () => Promise<void>
  createMember: (data: Partial<Member>) => Promise<boolean>
  updateMember: (id: number, data: Partial<Member>) => Promise<boolean>
  deleteMember: (id: number) => Promise<boolean>
  uniqueResearchDomains: Ref<string[]>
  filteredMembers: (searchQuery: string, selectedDomain: string, selectedStatus: string) => Member[]
}

export function useMembers(): UseMembersReturn {
  const members = ref<Member[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const uniqueResearchDomains = computed(() => {
    const domainSet = new Set<string>()
    for (const member of members.value) {
      if (member.research_interests) {
        domainSet.add(member.research_interests)
      }
    }
    return Array.from(domainSet).sort()
  })

  const fetchMembers = async (): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getMembers()
      members.value = response.data.results || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch members'
      console.error('Error fetching members:', err)
    } finally {
      loading.value = false
    }
  }

  const createMember = async (data: Partial<Member>): Promise<boolean> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createMember(data)
      members.value.push(response.data)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create member'
      console.error('Error creating member:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateMember = async (id: number, data: Partial<Member>): Promise<boolean> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateMember(id, data)
      const index = members.value.findIndex(m => m.id === id)
      if (index !== -1) {
        members.value[index] = response.data
      }
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update member'
      console.error('Error updating member:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteMember = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteMember(id)
      members.value = members.value.filter(m => m.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete member'
      console.error('Error deleting member:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const filteredMembers = (searchQuery: string, selectedDomain: string, selectedStatus: string): Member[] => {
    return members.value.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`
      const matchesSearch =
        !searchQuery ||
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.research_interests &&
          member.research_interests.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.position &&
          member.position.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDomain =
        !selectedDomain || member.research_interests === selectedDomain

      const matchesStatus =
        !selectedStatus || 
        (selectedStatus === 'active' && member.is_active) ||
        (selectedStatus === 'inactive' && !member.is_active)

      return matchesSearch && matchesDomain && matchesStatus
    })
  }

  return {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
    uniqueResearchDomains,
    filteredMembers
  }
}