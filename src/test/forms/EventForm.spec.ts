import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import EventForm from '@/components/events/EventForm.vue'

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
        events: {
          titleCreate: 'Create Event',
          subtitle: 'Add a new event to the calendar',
        },
      },
    },
  }),
}))

// Mock useEvents
const createEventMock = vi.fn()
const isLoadingMock = ref(false)
const errorMock = ref<string | null>(null)

vi.mock('@/hooks/events/useEvents', () => ({
  useEvents: () => ({
    createEvent: createEventMock,
    isLoading: isLoadingMock,
    error: errorMock,
  }),
}))

// Mock useMembers
const fetchMembersMock = vi.fn()
const membersMock = ref([
  { id: 'm1', first_name: 'Alice', last_name: 'Johnson' },
  { id: 'm2', first_name: 'Bob', last_name: 'Smith' },
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

describe('EventForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    createEventMock.mockReset()
    navigateToPageMock.mockReset()
    errorMock.value = null
    isLoadingMock.value = false
    fetchMembersMock.mockReset()

    wrapper = mount(EventForm, {
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
    expect(wrapper.text()).toContain('Domain is required.')
    expect(wrapper.text()).toContain('Speaker is required.')
  })
})
