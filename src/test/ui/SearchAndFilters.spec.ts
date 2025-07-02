import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchFilters from '../../components/ui/SearchAndFilters.vue'

describe('SearchFilters.vue', () => {
  const mockFilters = [
    {
      id: 'category',
      label: 'Category',
      value: 'all',
      options: [
        { value: 'all', label: 'All' },
        { value: 'ai', label: 'AI' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      value: 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' }
      ]
    }
  ]

  it('renders the search input when searchLabel is provided', () => {
    const wrapper = mount(SearchFilters, {
      props: {
        searchLabel: 'Search Projects',
        searchQuery: '',
        searchPlaceholder: 'Search...',
        filters: [],
        resultsText: ''
      }
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('emits update:searchQuery when typing in search input', async () => {
    const wrapper = mount(SearchFilters, {
      props: {
        searchLabel: 'Search Projects',
        searchQuery: '',
        filters: []
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('deep learning')

    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()
    expect(wrapper.emitted('update:searchQuery')![0]).toEqual(['deep learning'])
  })

  it('renders the correct number of filter dropdowns', () => {
    const wrapper = mount(SearchFilters, {
      props: {
        filters: mockFilters
      }
    })

    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(mockFilters.length)
  })

  it('emits updateFilter when changing a filter option', async () => {
    const wrapper = mount(SearchFilters, {
      props: {
        filters: mockFilters
      }
    })

    const select = wrapper.findAll('select')[0]
    await select.setValue('ai')

    expect(wrapper.emitted('updateFilter')).toBeTruthy()
    expect(wrapper.emitted('updateFilter')![0]).toEqual(['category', 'ai'])
  })

  it('shows the results text if provided', () => {
    const wrapper = mount(SearchFilters, {
      props: {
        resultsText: '10 results found'
      }
    })

    expect(wrapper.find('p').exists()).toBe(true)
  })
})
