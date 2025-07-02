import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PeopleFilters from '../../components/people/PeopleFilters.vue'

describe('PeopleFilters.vue', () => {
  const props = {
    searchQuery: '',
    selectedDomain: '',
    selectedStatus: '',
    resultsCount: 0
  }

  it('renders the Card component', () => {
    const wrapper = mount(PeopleFilters, { props })
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true)
  })

  it('renders search input', () => {
    const wrapper = mount(PeopleFilters, { props })
    expect(wrapper.find('input[type="text"]#search').exists()).toBe(true)
  })

  it('renders domain select filter', () => {
    const wrapper = mount(PeopleFilters, { props })
    expect(wrapper.find('select#domain-filter').exists()).toBe(true)
  })

  it('renders status select filter', () => {
    const wrapper = mount(PeopleFilters, { props })
    expect(wrapper.find('select#status-filter').exists()).toBe(true)
  })

  it('renders results count paragraph', () => {
    const wrapper = mount(PeopleFilters, { props })
    expect(wrapper.find('p.text-sm').exists()).toBe(true)
  })

  it('emits update:searchQuery when typing in search input', async () => {
    const wrapper = mount(PeopleFilters, { props })
    const input = wrapper.find('input#search')
    await input.setValue('test search')
    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()
    expect(wrapper.emitted('update:searchQuery')![0]).toEqual(['test search'])
  })

  it('emits update:selectedStatus when changing status select', async () => {
    const wrapper = mount(PeopleFilters, { props })
    const select = wrapper.find('select#status-filter')
    await select.setValue('active')
    expect(wrapper.emitted('update:selectedStatus')).toBeTruthy()
    expect(wrapper.emitted('update:selectedStatus')![0]).toEqual(['active'])
  })
})
