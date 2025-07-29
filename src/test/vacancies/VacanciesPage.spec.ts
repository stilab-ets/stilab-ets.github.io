import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import VacanciesPage from '../../components/vacancies/VacanciesPage.vue'

// Mock useVacancies composable with example vacancy data
vi.mock('@/hooks/vacancies/useVacancies', () => {
  return {
    useVacancies: () => ({
      vacancies: ref([
        {
          id: 1,
          title: 'Mock Vacancy',
          is_active: true,
          deadline: '2025-12-01',
          created_at: '2025-07-01',
          type: 'Internship',
          supervisor: 'John Doe',
        },
      ]),
      isLoading: ref(false),
      error: ref(null),
      fetchVacancies: vi.fn(),
      filteredVacancies: () => [
        {
          id: 1,
          title: 'Mock Vacancy',
          is_active: true,
          deadline: '2025-12-01',
          created_at: '2025-07-01',
          type: 'Internship',
          supervisor: 'John Doe',
        },
      ],
      activeVacancies: ref([]),
      upcomingDeadlines: ref([]),
      uniqueTypes: ref(['Internship']),
      uniqueSupervisors: ref(['John Doe']),
      clearError: vi.fn(),
    }),
  }
})

// Mock useLanguage composable with all needed translation keys
vi.mock('@/composables/useLanguage', () => {
  return {
    useLanguage: () => ({
      t: ref({
        vacancies: {
          pageTitle: 'Vacancies',
          pageSubtitle: 'Find your opportunity',
          filters: {
            positionType: 'Type',
            allTypes: 'All Types',
            supervisor: 'Supervisor',
            allSupervisors: 'All Supervisors',
            sortBy: 'Sort by',
          },
          sorting: {
            deadlineClose: 'Soonest Deadline',
            deadlineFar: 'Furthest Deadline',
            positionType: 'Position Type',
            recent: 'Most Recent',
          },
          results: {
            offer: 'offer',
            offers: 'offers',
            available: 'available',
          },
          empty: {
            title: 'No Results',
            message: 'Try adjusting your filters.',
          },
          positionTypes: {
            Internship: 'Internship',
            FullTime: 'Full Time',
            PartTime: 'Part Time',
          },
          infoBox: {
            whyJoinUs: 'Why Join Us?',
            benefits: [
              'Great team',
              'Career growth',
              'Flexible hours',
            ],
          },
          vacancyCard: {
            urgent: 'Urgent',
            standard: 'Standard',
          },
          deadlineStatus: {
            deadlineTomorrow: 'Deadline Tomorrow',
            daysRemaining: 'days remaining',
          },
        },
        common: {
          retry: 'Retry',
        },
      }),
    }),
  }
})

describe('VacanciesPage.vue', () => {
  it('renders the PageHeader component', () => {
    const wrapper = mount(VacanciesPage)
    const header = wrapper.findComponent({ name: 'PageHeader' })
    expect(header.exists()).toBe(true)
  })

  it('renders the VacanciesInfoBanner component', () => {
    const wrapper = mount(VacanciesPage)
    const banner = wrapper.findComponent({ name: 'VacanciesInfoBanner' })
    expect(banner.exists()).toBe(true)
  })

  it('renders the SearchAndFilters component', () => {
    const wrapper = mount(VacanciesPage)
    const filters = wrapper.findComponent({ name: 'SearchAndFilters' })
    expect(filters.exists()).toBe(true)
  })

  it('renders at least one VacancyCard when data is present', () => {
    const wrapper = mount(VacanciesPage)
    const cards = wrapper.findAllComponents({ name: 'VacancyCard' })
    expect(cards.length).toBeGreaterThan(0)
  })

  it('does not render EmptyState when there are vacancies', () => {
    const wrapper = mount(VacanciesPage)
    const emptyState = wrapper.findComponent({ name: 'EmptyState' })
    expect(emptyState.exists()).toBe(false)
  })
})
