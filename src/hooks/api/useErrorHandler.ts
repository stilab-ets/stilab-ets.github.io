import { ref } from 'vue'
import { ApiError } from '@/services/BaseAPI'

export interface ErrorState {
  message: string
  status?: number
  timestamp: Date
}

export function useErrorHandler() {
  const errors = ref<ErrorState[]>([])
  const hasErrors = ref(false)

  const addError = (error: unknown) => {
    let errorState: ErrorState

    if (error instanceof ApiError) {
      errorState = {
        message: error.message,
        status: error.status,
        timestamp: new Date()
      }
    } else if (error instanceof Error) {
      errorState = {
        message: error.message,
        timestamp: new Date()
      }
    } else {
      errorState = {
        message: 'An unknown error occurred',
        timestamp: new Date()
      }
    }

    errors.value.push(errorState)
    hasErrors.value = true
  }

  const clearErrors = () => {
    errors.value = []
    hasErrors.value = false
  }

  const removeError = (index: number) => {
    errors.value.splice(index, 1)
    hasErrors.value = errors.value.length > 0
  }

  const handleApiCall = async <T>(
    apiCall: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      return await apiCall()
    } catch (error) {
      if (errorMessage) {
        addError(new Error(errorMessage))
      } else {
        addError(error)
      }
      return null
    }
  }

  return {
    errors,
    hasErrors,
    addError,
    clearErrors,
    removeError,
    handleApiCall
  }
}