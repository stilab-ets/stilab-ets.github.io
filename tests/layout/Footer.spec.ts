import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import Footer from '../../src/components/layout/Footer.vue'

describe('Footer.vue', () => {
  it('renders all main child components', () => {
    const wrapper = mount(Footer)

    expect(wrapper.findComponent({ name: 'LabInfo' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'QuickLinks' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ContactInfo' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CopyrightFooter' }).exists()).toBe(true)
  })

  it('emits "setCurrentPage" when QuickLinks emits "navigate-to-page"', async () => {
    const wrapper = mount(Footer)

    // Simuler l’émission de l’événement par QuickLinks
    await wrapper.findComponent({ name: 'QuickLinks' }).vm.$emit('navigate-to-page', 'home')

    expect(wrapper.emitted('setCurrentPage')).toBeTruthy()
    expect(wrapper.emitted('setCurrentPage')![0]).toEqual(['home'])
  })
})
