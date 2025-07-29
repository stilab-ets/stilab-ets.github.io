import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref, computed } from 'vue'
import PublicationsPage from '@/components/publications/PublicationsPage.vue'

const samplePublications = [
  {
    id: '1',
    title: 'Vue for Beginners',
    year: 2023,
    entrytype: 'journal',
    authors: ['Alice']
  },
  {
    id: '2',
    title: 'Advanced Vue Patterns',
    year: 2022,
    entrytype: 'conference',
    authors: ['Bob']
  }
]

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      publications: {
        pageTitle: 'Publications',
        pageSubtitle: 'Explore our publications',
        filters: {
          year: 'Year',
          type: 'Type',
          allYears: 'All years',
          allTypes: 'All types'
        },
        search: {
          label: 'Search publications',
          placeholder: 'Enter a title or keyword'
        },
        results: {
          publication: 'publication',
          publications: 'publications'
        },
        empty: {
          title: 'No results found',
          message: 'Try adjusting your filters or search query.'
        }
      },
      common: {
        retry: 'Retry',
        loading: 'Loading...'
      }
    })
  })
}))

vi.mock('@/hooks/publications/usePublications', () => ({
  usePublications: () => ({
    publications: ref(samplePublications),
    isLoading: ref(false),
    error: ref(null),
    fetchPublications: vi.fn(),
    clearError: vi.fn()
  })
}))

vi.mock('@/hooks/publications/usePublicationFilters', () => ({
  usePublicationFilters: () => {
    const searchQuery = ref('')
    const selectedYear = ref('')
    const selectedType = ref('')
    const sortBy = ref('year-desc')
    const availableYears = ref([2023, 2022])
    const availableEntryTypes = ref(['journal', 'conference'])

    const resultsCount = computed(() =>
      samplePublications.filter(p =>
        (!selectedYear.value || p.year.toString() === selectedYear.value) &&
        (!selectedType.value || p.entrytype === selectedType.value) &&
        (!searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
      ).length
    )

    const sortedPublications = computed(() => {
      let pubs = samplePublications.filter(p =>
        (!selectedYear.value || p.year.toString() === selectedYear.value) &&
        (!selectedType.value || p.entrytype === selectedType.value) &&
        (!searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
      if (sortBy.value === 'title-asc') {
        pubs = pubs.sort((a, b) => a.title.localeCompare(b.title))
      }
      return pubs
    })

    return {
      searchQuery,
      selectedYear,
      selectedType,
      sortBy,
      sortedPublications,
      availableYears,
      availableEntryTypes,
      resultsCount,
      updateFilter: (filterId: string, value: string) => {
        if (filterId === 'year') selectedYear.value = value
        if (filterId === 'type') selectedType.value = value
      },
      filterByAuthor: (author: string) => {
        searchQuery.value = author
      }
    }
  }
}))

describe('PublicationsPage.vue', () => {
  it('renders correctly with publications', () => {
    const wrapper = mount(PublicationsPage, {
      global: {
        stubs: {
          SearchAndFilters: true,
          EmptyState: true,
          PublicationCard: true,
          PublicationSortOptions: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Publications')
    expect(wrapper.text()).not.toContain('Loading...')
    expect(wrapper.text()).not.toContain('No results found')
  })

  it('renders SearchAndFilters component', () => {
    const wrapper = mount(PublicationsPage, {
      global: {
        stubs: {
          SearchAndFilters: true,
          EmptyState: true,
          PublicationCard: true,
          PublicationSortOptions: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'SearchAndFilters' }).exists()).toBe(true)
  })

  it('renders PublicationSortOptions component', () => {
    const wrapper = mount(PublicationsPage, {
      global: {
        stubs: {
          SearchAndFilters: true,
          EmptyState: true,
          PublicationCard: true,
          PublicationSortOptions: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'PublicationSortOptions' }).exists()).toBe(true)
  })

  it('renders a PublicationCard for each publication', () => {
    const wrapper = mount(PublicationsPage, {
      global: {
        stubs: {
          SearchAndFilters: true,
          EmptyState: true,
          PublicationCard: true,
          PublicationSortOptions: true
        }
      }
    })

    const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
    expect(cards.length).toBe(samplePublications.length)
  })
})
