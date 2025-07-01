import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PeoplePage from '../../components/people/PeoplePage.vue'

describe('PeoplePage.vue', () => {
  it('renders main heading and subtitle', () => {
    const wrapper = mount(PeoplePage)

    const heading = wrapper.find('h1')
    const subtitle = wrapper.find('p')

    expect(heading.exists()).toBe(true)
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text().length).toBeGreaterThan(0)
  })

  it('renders PeopleFilters component', () => {
    const wrapper = mount(PeoplePage)
    const filters = wrapper.findComponent({ name: 'PeopleFilters' })
    expect(filters.exists()).toBe(true)
  })

  it('renders PersonCard components based on filteredResearchers', () => {
    const wrapper = mount(PeoplePage)
    const cards = wrapper.findAllComponents({ name: 'PersonCard' })
    expect(cards.length).toBeGreaterThan(0)
  })

  it('renders PersonModal component', () => {
    const wrapper = mount(PeoplePage)
    const modal = wrapper.findComponent({ name: 'PersonModal' })
    expect(modal.exists()).toBe(true)
  })
})
