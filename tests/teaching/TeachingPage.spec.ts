import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TeachingPage from '../../src/components/teaching/TeachingPage.vue'

describe('TeachingPage.vue', () => {
  it('renders PageHeader, StatisticsGrid and SearchAndFilters components', () => {
    const wrapper = mount(TeachingPage)

    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'StatisticsGrid' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'SearchAndFilters' }).exists()).toBe(true)
  })

  it('renders CourseCard components when filteredCourses has items', () => {
    const wrapper = mount(TeachingPage)

    const courseCards = wrapper.findAllComponents({ name: 'CourseCard' })

    expect(courseCards.length).toBeGreaterThan(0)
  })
})
