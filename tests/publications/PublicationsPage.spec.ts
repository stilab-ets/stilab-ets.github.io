import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

import PublicationsPage from '../../src/components/publications/PublicationsPage.vue'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('PublicationsPage.vue', () => {
  it('renders PageHeader with correct title, subtitle, and highlight word', () => {
    const wrapper = mount(PublicationsPage)

    const pageHeader = wrapper.findComponent({ name: 'PageHeader' })
    expect(pageHeader.exists()).toBe(true)
    expect(pageHeader.props('title')).toBeDefined()
    expect(pageHeader.props('subtitle')).toBeDefined()
    expect(pageHeader.props('highlightWord')).toBe('Publications')
  })

  it('renders SearchAndFilters component with correct props', () => {
    const wrapper = mount(PublicationsPage)

    const searchFilters = wrapper.findComponent({ name: 'SearchAndFilters' })
    expect(searchFilters.exists()).toBe(true)
    expect(searchFilters.props('searchQuery')).toBe('')
    expect(searchFilters.props('filters')).toBeDefined()
    expect(searchFilters.props('resultsText')).toBeDefined()
  })

  it('renders PublicationCard components if sortedPublications > 0', async () => {
    // Arrange: mock the axios get call to return sample publication(s)
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          entrytype: 'journal',
          citekey: 'key1',
          title: 'Sample Publication Title',
          author: 'Author One and Author Two',
          journal: 'Journal of Testing',
          booktitle: null,
          publisher: null,
          year: 2023,
          volume: '5',
          number: '1',
          pages: '10-20',
          url: 'http://example.com',
          is_approved: true,
          bibtex: '@article{key1,...}'
        }
      ]
    })

    // Act
    const wrapper = mount(PublicationsPage)
    // Wait for async onMounted and reactivity
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // Assert
    const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
    expect(cards.length).toBeGreaterThan(0)
  })

  it('renders EmptyState component if no publications match', () => {
    const wrapper = mount(PublicationsPage)
    const emptyState = wrapper.findComponent({ name: 'EmptyState' })
    expect(emptyState.exists()).toBe(true)
  })
})
