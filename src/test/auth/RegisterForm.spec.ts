import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/auth/RegisterForm.vue' // adjust path if needed
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock composables
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      auth: {
        register: {
          title: 'Register',
          subtitle: 'Please fill in the form to register',
          invitationNote: 'You have been invited! Please complete your registration.',
          sections: {
            personal: 'Personal Information',
            professional: 'Professional Information',
            links: 'Links',
            security: 'Security',
            actions: {
              submit: 'Submit',
              cancel: 'Cancel'
            }
          },
          form: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone',
            role: 'Role',
            researchDomain: 'Research Domain',
            biography: 'Biography',
            githubUrl: 'GitHub URL',
            linkedinUrl: 'LinkedIn URL',
            personalWebsite: 'Personal Website',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            selectRole: 'Select a Role'
          },
          roles: {
            professor: 'Professor',
            researcher: 'Researcher',
            postdoc: 'Postdoctoral Fellow',
            phdStudent: 'PhD Student',
            mscStudent: 'Master’s Student',
            other: 'Other'
          }
        }
      }
    }
  })
}))

vi.mock('@/composables/useInvitationToken', () => ({
  useInvitationToken: () => ({
    tokenData: { value: { token: 'abc123', email: 'test@example.com', role: 'tester' } },
    isLoading: false,
    canAccessRegister: true,
    tokenError: null,
    getPrefilledData: () => ({ email: 'test@example.com', role: 'tester' }),
    clearTokenFromUrl: vi.fn()
  })
}))

vi.mock('@/hooks/auth/useRegister', () => ({
  useRegister: () => ({
    registerWithToken: vi.fn(async () => ({ success: true })),
    isLoading: false,
    error: null,
    success: false,
    validateFormData: (data: any) => {
      // Simple validation: require email & password
      const errors = []
      if (!data.email) errors.push('Email is required')
      if (!data.password) errors.push('Password is required')
      return errors
    },
    resetState: vi.fn()
  })
}))

vi.mock('@/composables/useRouteGuard', () => ({
  useRouteGuard: () => ({
    isAccessDenied: false,
    accessError: null
  })
}))

describe('RegisterForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(RegisterForm)
  })

  it('renders title and subtitle', () => {
    expect(wrapper.text()).toContain('Register')
    expect(wrapper.text()).toContain('Please fill in the form to register')
  })

  it('shows invitation note if tokenData present', () => {
    expect(wrapper.text()).toContain('You have been invited! Please complete your registration.')
  })

  it('emits navigate event to login after successful registration', async () => {
    // email is disabled and prefilled, so do NOT set it.
    // Fill required editable fields only
    await wrapper.get('#firstName').setValue('John')
    await wrapper.get('#lastName').setValue('Doe')
    await wrapper.get('#password').setValue('123456')
    await wrapper.get('#confirmPassword').setValue('123456')

    await wrapper.find('form').trigger('submit.prevent')

    // wait for emit after internal timeout
    await new Promise(r => setTimeout(r, 2100))

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual(['login'])
  })
})
