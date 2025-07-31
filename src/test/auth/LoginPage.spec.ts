import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import LoginPage from '@/components/auth/LoginPage.vue'

// Mock composables
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      auth: {
        login: {
          subtitle: 'Welcome back!',
        },
      },
    },
    translations: computed(() => ({
      auth: {
        login: {
          subtitle: 'Welcome back!',
        },
      },
    })),
  }),
}))

vi.mock('@/hooks/auth/useAuth', () => ({
  useAuth: () => ({
    getDashboardRoute: { value: 'dashboard/research' },
  }),
}))

describe('LoginPage.vue', () => {
  let wrapper: ReturnType<typeof mount>

  const mountComponent = (options = {}) => {
    return mount(LoginPage, {
      global: {
        stubs: {
          // Stub LoginForm with a test component that emits events
          LoginForm: {
            template: `<div>
              <button id="success" @click="$emit('login-success')" />
              <button id="fail" @click="$emit('login-failed', 'Invalid credentials')" />
            </div>`,
          },
        },
      },
      ...options,
    })
  }

  beforeEach(() => {
    wrapper = mountComponent()
  })

  it('renders the title and subtitle', () => {
    expect(wrapper.text()).toContain('STIL Lab')
    expect(wrapper.text()).toContain('Welcome back!')
  })

  it('emits setCurrentPage with dashboard route on login success', async () => {
    await wrapper.find('#success').trigger('click')
    expect(wrapper.emitted('setCurrentPage')?.[0]).toEqual(['dashboard/research'])
  })

  it('logs a warning on login failure', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await wrapper.find('#fail').trigger('click')
    expect(warnSpy).toHaveBeenCalledWith('[LOGIN PAGE] Login failed:', 'Invalid credentials')
    warnSpy.mockRestore()
  })

  it('emits setCurrentPage with "home" when clicking back to home', async () => {
    const button = wrapper.find('button:not(#success):not(#fail)')
    await button.trigger('click')
    expect(wrapper.emitted('setCurrentPage')?.[0]).toEqual(['home'])
  })
})
