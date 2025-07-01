import { mount } from '@vue/test-utils'
import ResearchAreas from '../../components/home/ResearchAreasPreview.vue'
import { describe, it, expect } from 'vitest'

describe('ResearchAreas.vue', () => {
  it('renders the section with a heading and subtitle', () => {
    const wrapper = mount(ResearchAreas)

    const heading = wrapper.find('h2')
    const subtitle = wrapper.find('p.text-lg')

    expect(heading.exists()).toBe(true)
    expect(subtitle.exists()).toBe(true)
  })

  it('renders 4 research area cards', () => {
    const wrapper = mount(ResearchAreas)

    const cards = wrapper.findAll('.bg-white.rounded-xl')
    expect(cards.length).toBe(4)

    cards.forEach((card) => {
      expect(card.find('.text-3xl').exists() || card.find('.text-4xl').exists()).toBe(true) // Icon
      expect(card.find('h3').exists()).toBe(true) // Title
      expect(card.find('p.text-sm').exists()).toBe(true) // Description
    })
  })

  it('has responsive grid layout container', () => {
    const wrapper = mount(ResearchAreas)

    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
  })
})
