import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import ResearchPage from '../../components/research/ResearchPage.vue'

describe('ResearchPage.vue', () => {
  it('renders PageHeader with correct props', () => {
    const wrapper = mount(ResearchPage)
    const pageHeader = wrapper.findComponent({ name: 'PageHeader' })

    expect(pageHeader.exists()).toBe(true)
    expect(pageHeader.props('title')).toBeDefined()
    expect(pageHeader.props('subtitle')).toBeDefined()
    expect(pageHeader.props('highlightWord')).toBe('Recherches')
  })

  it('renders ResearchOverview component', () => {
    const wrapper = mount(ResearchPage)
    expect(wrapper.findComponent({ name: 'ResearchOverview' }).exists()).toBe(true)
  })

  it('renders StatisticsGrid with correct props', () => {
    const wrapper = mount(ResearchPage)
    const statsGrid = wrapper.findComponent({ name: 'StatisticsGrid' })

    expect(statsGrid.exists()).toBe(true)
    expect(statsGrid.props('statistics')).toBeDefined()
    expect(statsGrid.props('columns')).toBe(1)
    expect(statsGrid.props('backgroundClass')).toBe('bg-gradient-to-r from-blue-50 to-indigo-50')
  })

  it('renders FeaturedProjects with featured projects filtered correctly', () => {
    const wrapper = mount(ResearchPage)
    const featured = wrapper.findComponent({ name: 'FeaturedProjects' })
    expect(featured.exists()).toBe(true)

    const projectsProp = featured.props('projects')
    expect(Array.isArray(projectsProp)).toBe(true)
    expect(projectsProp.length).toBeLessThanOrEqual(4)
    expect(projectsProp.every((p: { status: string }) => p.status === 'active')).toBe(true)
  })
})
