import { ref, computed, readonly, type Ref } from 'vue'
import type { Award } from '@/services/MainAPI'

interface AwardRecipient {
  id: string
  member: {
    first_name: string
    last_name: string
    role: string
    email: string | null
    phone?: string | null
    biography?: string | null
    research_domain?: string | null
    image_url?: string | null
    github_url?: string | null
    linkedin_url?: string | null
    stackoverflowUrl?: string | null
    twitterxUrl?: string | null
    googlescholarUrl?: string | null
    dblpUrl?: string | null
    personal_website?: string | null
    status?: string | null
  }
}

interface ExtendedAward extends Award {
  recipients?: AwardRecipient[]
  url?: string
  year?: number
}

interface UseFilteredAwardsOptions {
  awards: Ref<ExtendedAward[]>
}

interface UseFilteredAwardsReturn {
  selectedYear: Ref<string>
  selectedOrganization: Ref<string>
  selectedMember: Ref<string>
  filteredAwards: Readonly<Ref<ExtendedAward[]>>
  updateFilter: (filterId: string, value: string) => void
  clearFilters: () => void
}

export function useFilteredAwards({ awards }: UseFilteredAwardsOptions): UseFilteredAwardsReturn {
  // Filter state
  const selectedYear = ref('')
  const selectedOrganization = ref('')
  const selectedMember = ref('')

  // Filtered awards computation
  const filteredAwards = computed(() => {
    return awards.value.filter(award => {
      const awardYear = award.year || new Date(award.date_received).getFullYear()
      const matchesYear = !selectedYear.value || awardYear.toString() === selectedYear.value
      const matchesOrg = !selectedOrganization.value || award.organization === selectedOrganization.value
      
      let matchesMember = true
      if (selectedMember.value) {
        if (award.recipients) {
          matchesMember = award.recipients.some(
            r => `${r.member.first_name} ${r.member.last_name}` === selectedMember.value
          )
        } else if (award.recipient) {
          matchesMember = award.recipient === selectedMember.value
        } else {
          matchesMember = false
        }
      }

      return matchesYear && matchesOrg && matchesMember
    })
  })

  // Filter update method
  const updateFilter = (filterId: string, value: string) => {
    switch (filterId) {
      case 'year':
        selectedYear.value = value
        break
      case 'organization':
        selectedOrganization.value = value
        break
      case 'member':
        selectedMember.value = value
        break
    }
  }

  // Clear all filters
  const clearFilters = () => {
    selectedYear.value = ''
    selectedOrganization.value = ''
    selectedMember.value = ''
  }

  return {
    selectedYear,
    selectedOrganization,
    selectedMember,
    filteredAwards: filteredAwards,
    updateFilter,
    clearFilters
  }
}