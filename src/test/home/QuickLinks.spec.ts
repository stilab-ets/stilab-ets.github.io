import { mount } from '@vue/test-utils'
import QuickLinks from '../../components/home/QuickLinks.vue'
import { describe, it, expect } from 'vitest'

describe('QuickLinks.vue', () => {
  it('renders all quick links', () => {
    const wrapper = mount(QuickLinks)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)

    expect(wrapper.text()).toContain('Publications')
  })

  it('emits setCurrentPage when a quick link is clicked', async () => {
    const wrapper = mount(QuickLinks)
    const buttons = wrapper.findAll('button')

    await buttons[1].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('setCurrentPage')
    expect(wrapper.emitted('setCurrentPage')![0]).toEqual(['events'])
  })
})
