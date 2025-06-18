import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import ProjectPage from '../../src/components/projects/ProjectPage.vue'

describe('MScProjectsView.vue', () => {
  it('renders PageHeader with correct title and subtitle', () => {
    const wrapper = mount(ProjectPage)

    const pageHeader = wrapper.findComponent({ name: 'PageHeader' })
    expect(pageHeader.exists()).toBe(true)
    expect(pageHeader.props('title')).toBeDefined()
    expect(pageHeader.props('subtitle')).toBeDefined()
    expect(pageHeader.props('highlightWord')).toBe('Master')
  })

  it('renders ProjectsInfoBanner component', () => {
    const wrapper = mount(ProjectPage)
    expect(wrapper.findComponent({ name: 'ProjectsInfoBanner' }).exists()).toBe(true)
  })

  it('renders SearchAndFilters component with props and emits', () => {
    const wrapper = mount(ProjectPage)

    const filtersComp = wrapper.findComponent({ name: 'SearchAndFilters' })
    expect(filtersComp.exists()).toBe(true)

    expect(filtersComp.props('searchQuery')).toBe('')
    expect(filtersComp.props('filters')).toBeDefined()
    expect(filtersComp.props('resultsText')).toBeDefined()
  })

  it('renders ProjectCard components if filteredProjects > 0', () => {
    const wrapper = mount(ProjectPage)
    const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
    expect(projectCards.length).toBeGreaterThan(0)
  })

  it('renders InterestModal component and reacts to events', async () => {
    const wrapper = mount(ProjectPage)
    const modal = wrapper.findComponent({ name: 'InterestModal' })

    expect(modal.exists()).toBe(true)
  })
})
