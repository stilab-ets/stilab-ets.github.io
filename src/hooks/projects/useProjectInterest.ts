import { ref, watch } from 'vue'
import type { Project, ProjectInterest } from '@/services/MainAPI'

export function useProjectInterest() {
  const isModalOpen = ref(false)
  const selectedProject = ref<Project | null>(null)
  const submitting = ref(false)
  const submitError = ref('')

  const interestForm = ref({
    name: '',
    email: '',
    level: '',
    motivation: ''
  })

  const openModal = (project: Project) => {
    selectedProject.value = project
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedProject.value = null
  }

  const resetForm = () => {
    interestForm.value = {
      name: '',
      email: '',
      level: '',
      motivation: ''
    }
    submitError.value = ''
  }

  const submitInterest = async (submitFn: (data: ProjectInterest) => Promise<any>) => {
    if (!selectedProject.value) return

    submitting.value = true
    submitError.value = ''

    try {
      await submitFn({
        project_id: selectedProject.value.id,
        full_name: interestForm.value.name,
        email: interestForm.value.email,
        study_level: interestForm.value.level,
        motivation: interestForm.value.motivation
      })

      closeModal()
      return true
    } catch (error) {
      console.warn('Failed to submit project interest:', error)
      submitError.value = 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.'
      return false
    } finally {
      submitting.value = false
    }
  }

  // Watch for modal open/close to reset form
  watch(isModalOpen, (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  })

  return {
    isModalOpen,
    selectedProject,
    submitting,
    submitError,
    interestForm,
    openModal,
    closeModal,
    resetForm,
    submitInterest
  }
}