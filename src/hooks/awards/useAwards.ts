// hooks/awards/useAwards.ts
import { ref, computed, readonly, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Award } from '@/services/MainAPI'

export interface AwardRecipient {
  id: string
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
  getAwardById: (id: string) => Award | undefined
  createAward: (data: Partial<Award>) => Promise<boolean>
  updateAward: (id: string, data: Partial<Award>) => Promise<boolean>
  deleteAward: (id: string) => Promise<boolean>

}

export function useAwards(options: UseAwardsOptions = {}): UseAwardsReturn {
  const { autoFetch = true } = options

  // State
  const awards = ref<ExtendedAward[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed values
  const uniqueOrganizations = computed(() => {
    return [...new Set(awards.value.map(award => award.organization || 'Unknown'))].sort()
  })

  const awardedMembers = computed(() => {
    const members: string[] = []
    awards.value.forEach(award => {
      if (award.recipients) {
        award.recipients.forEach(recipient => {
          const fullName = `${recipient.first_name} ${recipient.last_name}`
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
      
      // Handle both array and object responses
      let awardsData: ExtendedAward[] = []
      if (Array.isArray(response.data)) {
        awardsData = response.data
      } else if (response.data && typeof response.data === 'object') {
        awardsData = response.data || []
      }
      
      awards.value = awardsData
    } catch (err: any) {
      // Handle 404s gracefully - awards endpoint might not exist
      if (err.status === 404) {
        awards.value = []
        error.value = null // Don't treat 404 as an error for optional endpoints
      } else {
        error.value = err.message || 'Failed to fetch awards'
        awards.value = [] // Set to empty array on error
      }
    } finally {
      isLoading.value = false
    }
  }

  const getAwardById = (id: string): Award | undefined => {
    return awards.value.find(r => r.id === id)
  }

  const createAward = async (data: Partial<Award>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createAward(data)
      awards.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create an award'
      console.error('Error creating an award:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateAward = async (id: string, data: Partial<Award>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateAward(id, data)
      const index = awards.value.findIndex(r => r.id === id)
      if (index !== -1) {
        awards.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update award'
      console.error('Error updating award:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteAward = async (id: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteAward(id)
      awards.value = awards.value.filter(r => r.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete award'
      console.error('Error deleting award:', err)
      return false
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
    yearsOfRecognition,
    getAwardById,
    createAward,
    updateAward,
    deleteAward,
  }
}
