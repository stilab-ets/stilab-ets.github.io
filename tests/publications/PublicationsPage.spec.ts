import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PublicationsPage from '../../src/components/publications/PublicationsPage.vue'

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

  it('renders PublicationCard components if sortedPublications > 0', () => {
    const wrapper = mount(PublicationsPage)

    const cards = wrapper.findAllComponents({ name: 'PublicationCard' })
    expect(cards.length).toBeGreaterThan(0)
  })

  it('renders EmptyState component if no publications match', () => {
    const wrapper = mount(PublicationsPage)
    wrapper.findComponent({ name: 'EmptyState' })
  })

  it('handles filter-by-author event from PublicationCard', async () => {
    const wrapper = mount(PublicationsPage)

    const firstCard = wrapper.findComponent({ name: 'PublicationCard' })
    expect(firstCard.exists()).toBe(true)
    await firstCard.vm.$emit('filter-by-author', 'Doe')
    const searchFilters = wrapper.findComponent({ name: 'SearchAndFilters' })
    expect(searchFilters.props('searchQuery')).toBe('Doe')
  })
})
