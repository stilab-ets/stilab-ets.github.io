import { ref, computed, readonly, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Award } from '@/services/MainAPI'

export interface AwardRecipient {
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
    personal_website?: string | null
    status?: string | null
  }
}

export interface ExtendedAward extends Award {
  recipients?: AwardRecipient[]
}

interface UseAwardsOptions {
  autoFetch?: boolean
}

interface UseAwardsReturn {
  awards: Readonly<Ref<ExtendedAward[]>>
  isLoading: Readonly<Ref<boolean>>
  error: Readonly<Ref<string | null>>
  fetchAwards: () => Promise<void>
  refreshAwards: () => Promise<void>
  uniqueOrganizations: Readonly<Ref<string[]>>
  awardedMembers: Readonly<Ref<string[]>>
  availableYears: Readonly<Ref<number[]>>
  oldestAwardYear: Readonly<Ref<number>>
  totalAwards: Readonly<Ref<number>>
  yearsOfRecognition: Readonly<Ref<number>>
}

export function useAwards(options: UseAwardsOptions = {}): UseAwardsReturn {
  const { autoFetch = true } = options

  // State
  const awards = ref<ExtendedAward[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed values
  const uniqueOrganizations = computed(() => {
    return [...new Set(awards.value.map(award => award.award_type || 'Unknown'))].sort()
  })

  const awardedMembers = computed(() => {
    const members: string[] = []
    awards.value.forEach(award => {
      if (award.recipients) {
        award.recipients.forEach(recipient => {
          const fullName = `${recipient.member.first_name} ${recipient.member.last_name}`
          if (!members.includes(fullName)) {
            members.push(fullName)
          }
        })
      }
    })
    return members.sort()
  })

  const availableYears = computed(() => {
    const years = awards.value
      .map(award => {
        if (award.year) return award.year
        return new Date(award.date_received).getFullYear()
      })
      .filter(year => !isNaN(year))
    return [...new Set(years)].sort((a, b) => b - a)
  })

  const oldestAwardYear = computed(() => {
    const years = availableYears.value
    return years.length > 0 ? Math.min(...years) : new Date().getFullYear()
  })

  const totalAwards = computed(() => awards.value.length)

  const yearsOfRecognition = computed(() => {
    const years = availableYears.value
    return years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0
  })

  // Actions
  const fetchAwards = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getAwards()
      // API returns array directly, not paginated
      awards.value = response.data || []
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch awards'
      console.error('Error fetching awards:', err)
    } finally {
      isLoading.value = false
    }
  }

  const refreshAwards = async (): Promise<void> => {
    await fetchAwards()
  }

  return {
    awards: awards,
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchAwards,
    refreshAwards,
    uniqueOrganizations,
    awardedMembers,
    availableYears,
    oldestAwardYear,
    totalAwards,
    yearsOfRecognition
  }
}
