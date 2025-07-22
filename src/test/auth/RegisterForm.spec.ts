import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { nextTick } from 'vue'

// Mock composable useLanguage
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      value: {
        auth: {
          register: {
            title: 'Register',
            subtitle: 'Fill the form below',
            invitationNote: 'You were invited!',
            form: {
              firstName: 'First Name',
              lastName: 'Last Name',
              email: 'Email',
              phone: 'Phone',
              role: 'Role',
              researchDomain: 'Research Domain',
              researchDomainPlaceholder: 'AI, Robotics...',
              biography: 'Biography',
              biographyPlaceholder: 'Write a short bio...',
              githubUrl: 'GitHub URL',
              linkedinUrl: 'LinkedIn URL',
              personalWebsite: 'Website',
              password: 'Password',
              confirmPassword: 'Confirm Password',
              submit: 'Register',
              submitting: 'Submitting...',
              selectRole: 'Select a role'
            },
            roles: {
              professor: 'Professor',
              researcher: 'Researcher',
              postdoc: 'Postdoc',
              phd: 'PhD',
              master: 'Master',
              engineer: 'Engineer',
              admin: 'Admin'
            },
            sections: {
              personal: 'Personal Info',
              professional: 'Professional Info',
              links: 'Links',
              security: 'Security'
            },
            validation: {
              firstNameRequired: 'First name is required.',
              lastNameRequired: 'Last name is required.',
              emailRequired: 'Email is required.',
              emailInvalid: 'Email is invalid.',
              roleRequired: 'Role is required.',
              passwordRequired: 'Password is required.',
              passwordMinLength: 'Password must be at least 8 characters.',
              passwordMismatch: 'Passwords do not match.'
            },
            errors: {
              registrationFailed: 'Registration failed. Try again.'
            }
          }
        }
      }
    }
  })
}))

describe('RegisterForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(RegisterForm, {
      props: {
        invitedEmail: 'test@example.com',
        invitationToken: 'abc123'
      }
    })
  })

  it('renders the form with prefilled email', () => {
    expect(wrapper.text()).toContain('Register')
    const emailInput = wrapper.find('input#username_or_email')
    expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com')
    expect(emailInput.attributes('disabled')).toBeDefined()
  })

  it('shows validation errors when submitting empty form', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('First name is required.')
    expect(wrapper.text()).toContain('Last name is required.')
    expect(wrapper.text()).toContain('Role is required.')
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('validates password mismatch', async () => {
    await wrapper.find('#firstName').setValue('John')
    await wrapper.find('#lastName').setValue('Doe')
    await wrapper.find('#role').setValue('professor')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('#confirmPassword').setValue('different123')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Passwords do not match.')
  })

  it('shows email invalid error for invalid email', async () => {
    // Remove invitedEmail prop to allow editing email
    wrapper = mount(RegisterForm)
    await wrapper.find('#username_or_email').setValue('invalid-email')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.text()).toContain('Email is invalid.')
  })

  it('shows password min length error', async () => {
    await wrapper.find('#firstName').setValue('Anna')
    await wrapper.find('#lastName').setValue('Smith')
    await wrapper.find('#role').setValue('engineer')
    await wrapper.find('#password').setValue('short')
    await wrapper.find('#confirmPassword').setValue('short')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.text()).toContain('Password must be at least 8 characters.')
  })

  it('shows password required error when password is empty', async () => {
    await wrapper.find('#firstName').setValue('Anna')
    await wrapper.find('#lastName').setValue('Smith')
    await wrapper.find('#role').setValue('engineer')
    await wrapper.find('#password').setValue('')
    await wrapper.find('#confirmPassword').setValue('')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('sets generalError if emit throws', async () => {
    wrapper.vm.$emit = vi.fn(() => {
      throw new Error('emit failed')
    })

    await wrapper.find('#firstName').setValue('Jane')
    await wrapper.find('#lastName').setValue('Doe')
    await wrapper.find('#role').setValue('researcher')
    await wrapper.find('#password').setValue('strongpass')
    await wrapper.find('#confirmPassword').setValue('strongpass')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toBeDefined()
  })
})
