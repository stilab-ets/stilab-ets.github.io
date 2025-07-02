import { mount } from '@vue/test-utils'
import VacanciesPage from '../../components/vacancies/VacanciesPage.vue'
import { describe, it, expect } from 'vitest'

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
