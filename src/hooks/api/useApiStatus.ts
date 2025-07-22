import { ref, onMounted } from 'vue'
import { mainAPI } from '@/services/ApiFactory'

export function useApiStatus() {
  const isApiHealthy = ref(true)
  const isLoading = ref(false)
  const lastChecked = ref<Date | null>(null)

  const checkApiHealth = async () => {
    isLoading.value = true
    try {
      // Simple API health check - you can implement a specific health endpoint
      await mainAPI.getPublications()
      isApiHealthy.value = true
      lastChecked.value = new Date()
    } catch (error) {
      console.warn('API health check failed:', error)
      isApiHealthy.value = false
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    checkApiHealth()
  })

  return {
    isApiHealthy,
    isLoading,
    lastChecked,
    checkApiHealth
  }
}