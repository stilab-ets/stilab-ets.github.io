import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavItems from '../../../components/layout/header/NavItems.vue'

describe('Navigation.vue', () => {
  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ]

  it('renders one button per nav item', () => {
    const wrapper = mount(NavItems, {
      props: {
        items,
        currentPage: 'home'
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(items.length)
  })

  it('applies active class to current page', () => {
    const wrapper = mount(NavItems, {
      props: {
        items,
        currentPage: 'about'
      }
    })

    const activeButton = wrapper.findAll('button').find(btn =>
      btn.classes().includes('bg-[#08a4d4]')
    )

    expect(activeButton).toBeTruthy()
  })

  it('emits navigate event with correct id on click', async () => {
    const wrapper = mount(NavItems, {
      props: {
        items,
        currentPage: 'home'
      }
    })

    const secondButton = wrapper.findAll('button')[1]
    await secondButton.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual(['about'])
  })

  it('renders mobile layout if isMobile is true', () => {
    const wrapper = mount(NavItems, {
      props: {
        items,
        currentPage: 'home',
        isMobile: true
      }
    })

    expect(wrapper.classes()).toContain('space-y-2')
  })

  it('renders desktop layout if isMobile is false or undefined', () => {
    const wrapper = mount(NavItems, {
      props: {
        items,
        currentPage: 'home'
      }
    })

    expect(wrapper.classes()).toContain('xl:flex')
  })
})
