import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import TeachingForm from '@/components/teaching/TeachingForm.vue'

// Mock scrollTo to prevent errors
beforeAll(() => {
  window.scrollTo = vi.fn()
})

// --- Mocks ---

// Mock useLanguage
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      forms: {
        teaching: {
          titleCreate: 'Create Course',
          subtitle: 'Add a new teaching entry',
        },
      },
    },
  }),
}))

// Mock useCourses
const createCourseMock = vi.fn()
const isLoadingMock = ref(false)
const errorMock = ref<string | null>(null)

vi.mock('@/hooks/teaching/useCourses', () => ({
  useCourses: () => ({
    createCourse: createCourseMock,
    isLoading: isLoadingMock,
    error: errorMock,
  }),
}))

// Mock useMembers
const fetchMembersMock = vi.fn()
const membersMock = ref([
  { id: 'm1', first_name: 'John', last_name: 'Doe' },
  { id: 'm2', first_name: 'Jane', last_name: 'Smith' },
])

vi.mock('@/hooks/members/useMembers', () => ({
  useMembers: () => ({
    members: membersMock,
    fetchMembers: fetchMembersMock,
  }),
}))

// Mock useNavigation
const navigateToPageMock = vi.fn()

vi.mock('@/hooks/layout/useNavigation', () => ({
  useNavigation: () => ({
    navigateToPage: navigateToPageMock,
  }),
}))

describe('TeachingForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    createCourseMock.mockReset()
    navigateToPageMock.mockReset()
    errorMock.value = null
    isLoadingMock.value = false
    fetchMembersMock.mockReset()

    wrapper = mount(TeachingForm, {
      global: {
        stubs: {
          Form: {
            template: `<div>
              <slot />
              <p class="success" v-if="successMessage">{{ successMessage }}</p>
              <p class="error" v-if="error">{{ error }}</p>
            </div>`,
            props: ['successMessage', 'error'],
          },
          Button: true,
        },
      },
    })

    await nextTick()
  })

  it('calls fetchMembers on mount', () => {
    expect(fetchMembersMock).toHaveBeenCalled()
  })

  it('shows validation errors if required fields are empty', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Title is required.')
    expect(wrapper.text()).toContain('Code is required.')
    expect(wrapper.text()).toContain('Teacher is required.')
  })

  it('displays general error message when submission fails', async () => {
    createCourseMock.mockResolvedValue(false)
    errorMock.value = 'Submission failed.'

    // Fill required fields
    const inputsText = wrapper.findAll('input[type="text"]')
    await inputsText[0].setValue('Course Title')
    await inputsText[1].setValue('CS101')
    await wrapper.get('select:last-of-type').setValue('m1')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Submission failed.')
  })
})
