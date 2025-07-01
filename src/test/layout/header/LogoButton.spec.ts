import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LogoButton from '../../../components/layout/header/LogoButton.vue'

describe('LogoButton.vue', () => {
  it('renders the logo image', () => {
    const wrapper = mount(LogoButton)
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBeTruthy()
    expect(img.attributes('alt')).toBe('STIL company logo')
  })

  it('renders a heading element for the logo name', () => {
    const wrapper = mount(LogoButton)
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
  })

  it('emits "navigate" event with "home" when clicked', async () => {
    const wrapper = mount(LogoButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual(['home'])
  })
})
