import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

import PublicationsPage from '../../components/publications/PublicationsPage.vue'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const samplePublications = [
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
  },
  {
    id: '2',
    entrytype: 'conference',
    citekey: 'key2',
    title: 'Another Publication',
    author: 'Author Three',
    journal: null,
    booktitle: 'Conference Proceedings',
    publisher: null,
    year: 2022,
    volume: null,
    number: null,
    pages: '21-30',
    url: 'http://example.com/2',
    is_approved: true,
    bibtex: '@inproceedings{key2,...}'
  }
]

describe('PublicationsPage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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
    mockedAxios.get.mockResolvedValue({ data: samplePublications })
    const wrapper = mount(PublicationsPage)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
    expect(cards.length).toBe(samplePublications.length)
  })

  it('renders EmptyState component if no publications match', () => {
    const wrapper = mount(PublicationsPage)
    const emptyState = wrapper.findComponent({ name: 'EmptyState' })
    expect(emptyState.exists()).toBe(true)
  })

it('updates filters via SearchAndFilters @update-filter event', async () => {
  mockedAxios.get.mockResolvedValue({ data: samplePublications })
  const wrapper = mount(PublicationsPage)
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$nextTick()
  // Simulate filter change
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$emit('update-filter', 'year', '2022')
  await wrapper.vm.$nextTick()
  // Now only 1 publication should be shown
  const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
  expect(cards.length).toBe(1)
  expect(cards[0].props('publication').year).toBe(2022)
})

it('updates searchQuery via SearchAndFilters @update:search-query event', async () => {
  mockedAxios.get.mockResolvedValue({ data: samplePublications })
  const wrapper = mount(PublicationsPage)
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$nextTick()
  // Simulate search input
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$emit('update:search-query', 'Another')
  await wrapper.vm.$nextTick()
  const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
  expect(cards.length).toBe(1)
  expect(cards[0].props('publication').title).toContain('Another')
})

it('updates sortBy via PublicationSortOptions v-model', async () => {
  mockedAxios.get.mockResolvedValue({ data: samplePublications })
  const wrapper = mount(PublicationsPage)
  await wrapper.findComponent({ name: 'PublicationSortOptions' }).vm.$nextTick()
  // Simulate sort change
  await wrapper.findComponent({ name: 'PublicationSortOptions' }).vm.$emit('update:sort-by', 'title-asc')
  await wrapper.vm.$nextTick()
  const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
  expect(cards[0].props('publication').title).toBe('Another Publication')
  expect(cards[1].props('publication').title).toBe('Sample Publication Title')
})

it('filters by author when PublicationCard emits filter-by-author', async () => {
  mockedAxios.get.mockResolvedValue({ data: samplePublications })
  const wrapper = mount(PublicationsPage)
  await wrapper.vm.$nextTick()
  await wrapper.vm.$nextTick()
  // Simulate author click on first card
  const card = wrapper.findAllComponents({ name: 'PublicationCard' })[1]
  await card.vm.$emit('filter-by-author', 'Author Three')
  await wrapper.vm.$nextTick()
  // Now only the publication with Author Three should be shown
  const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
  expect(cards.length).toBe(1)
  expect(cards[0].props('publication').author).toContain('Author Three')
})

it('shows EmptyState when filters exclude all publications', async () => {
  mockedAxios.get.mockResolvedValue({ data: samplePublications })
  const wrapper = mount(PublicationsPage)
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$nextTick()
  // Simulate filter to a year not present
  await wrapper.findComponent({ name: 'SearchAndFilters' }).vm.$emit('update-filter', 'year', '1999')
  await wrapper.vm.$nextTick()
  const emptyState = wrapper.findComponent({ name: 'EmptyState' })
  expect(emptyState.exists()).toBe(true)
})
})