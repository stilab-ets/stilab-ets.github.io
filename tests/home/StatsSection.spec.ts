import { mount } from '@vue/test-utils'
import StatsSection from '../../src/components/home/StatsSection.vue'
import { describe, it, expect } from 'vitest'

describe('StatsSection.vue', () => {
  const labStats = {
    members: { value: 12, label: 'Membres' },
    publications: { value: 34, label: 'Publications' },
    projects: { value: 5, label: 'Projets' },
    awards: { value: 8, label: 'Récompenses' }
  }

  it('renders the component root and grid', () => {
    const wrapper = mount(StatsSection, {
      props: { labStats }
    })

    expect(wrapper.classes()).toContain('bg-white')

    const gridItems = wrapper.findAll('.text-center')
    expect(gridItems.length).toBe(5)
  })

  it('renders number and label containers for each stat', () => {
    const wrapper = mount(StatsSection, {
      props: { labStats }
    })

    const labelBlocks = wrapper.findAll('.text-gray-600')
    expect(labelBlocks.length).toBe(4)
  })

  it('renders the section title element', () => {
    const wrapper = mount(StatsSection, {
      props: { labStats }
    })

    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.classes()).toContain('text-center')
  })
})
