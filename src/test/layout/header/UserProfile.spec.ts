import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserProfile from '../../../components/layout/header/UserProfile.vue'

describe('UserProfile.vue', () => {
  const user = {
    id: '123',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Researcher',
    avatar: undefined
  }

  it('renders mobile layout with user info and menu items', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user,
        isMobile: true
      }
    })

    expect(wrapper.text()).toContain(user.name)
    expect(wrapper.text()).toContain(user.email)
    expect(wrapper.text()).toContain(user.role)
    expect(wrapper.findAll('button').length).toBeGreaterThan(0)
  })

  it('renders desktop layout with profile button', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user,
        isMobile: false
      }
    })

    const profileBtn = wrapper.find('button[aria-haspopup="true"]')
    expect(profileBtn.exists()).toBe(true)
    expect(profileBtn.text()).toContain(user.name.split(' ')[0])
  })

  it('toggles dropdown open and close on desktop', async () => {
    const wrapper = mount(UserProfile, {
      props: {
        user,
        isMobile: false
      }
    })

    const profileBtn = wrapper.find('button[aria-haspopup="true"]')

    await profileBtn.trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)

    await profileBtn.trigger('click')
  })

  it('emits navigate event when clicking menu item', async () => {
    const wrapper = mount(UserProfile, {
      props: {
        user,
        isMobile: false
      }
    })

    await wrapper.find('button[aria-haspopup="true"]').trigger('click')

    const menuButtons = wrapper.findAll('[role="menuitem"]')
    await menuButtons[0].trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual(['dashboard'])
  })

  it('emits logout event when clicking logout button', async () => {
    const wrapper = mount(UserProfile, {
      props: {
        user,
        isMobile: false
      }
    })

    await wrapper.find('button[aria-haspopup="true"]').trigger('click')

    const logoutBtn = wrapper.find('button.text-red-600')
    expect(logoutBtn.exists()).toBe(true)

    await logoutBtn.trigger('click')
    expect(wrapper.emitted('logout')).toBeTruthy()
  })

  it('shows user initials if no avatar', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: {
          ...user,
          avatar: undefined
        },
        isMobile: false
      }
    })

    const initials = user.name
      .split(' ')
      .map(w => w.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)

    expect(wrapper.text()).toContain(initials)
  })
})
