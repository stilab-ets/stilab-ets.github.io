import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EventsPage from '../../components/events/EventsPage.vue'

describe('EventsPage.vue', () => {
  it('renders the main UI components', () => {
    const wrapper = mount(EventsPage, {
      global: {
        stubs: ['PageHeader', 'StatisticsGrid', 'SearchAndFilters', 'EventCard', 'EmptyState']
      }
    })

    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'StatisticsGrid' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'SearchAndFilters' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'EventCard' }).exists()).toBe(true)
  })
})
