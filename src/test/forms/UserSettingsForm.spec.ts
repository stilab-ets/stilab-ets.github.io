import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserSettingsForm from '@/components/forms/UserSettingsForm.vue'
import { nextTick, ref } from 'vue'

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        userSettings: {
          title: 'User Settings',
          subtitle: 'Manage your profile and preferences.',
          sections: {
            profile: 'Profile',
            preferences: 'Preferences',
            security: 'Security'
          },
          form: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone',
            office: 'Office',
            researchDomains: 'Research Domains',
            biography: 'Biography',
            githubUrl: 'GitHub URL',
            linkedinUrl: 'LinkedIn URL',
            personalWebsite: 'Personal Website',
            profilePhoto: 'Profile Photo',
            language: 'Language',
            emailNotifications: 'Email Notifications',
            browserNotifications: 'Browser Notifications',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm Password',
            cancel: 'Cancel',
            save: 'Save',
            saving: 'Saving...'
          },
          languages: {
            french: 'French',
            english: 'English'
          },
          validation: {
            firstNameRequired: 'First name is required',
            lastNameRequired: 'Last name is required',
            emailRequired: 'Email is required',
            emailInvalid: 'Email is invalid',
            currentPasswordRequired: 'Current password is required',
            newPasswordMinLength: 'New password must be at least 8 characters',
            passwordMismatch: 'Passwords do not match'
          },
          success: {
            profileUpdated: 'Profile updated successfully',
            passwordChanged: 'Password changed successfully'
          },
          errors: {
            updateFailed: 'Update failed, please try again'
          }
        }
      }
    })
  })
}))

vi.mock('@/components/ui/Card.vue', () => ({
  default: { template: '<div><slot /></div>' }
}))
vi.mock('@/components/ui/Button.vue', () => ({
  default: { template: '<button><slot /></button>' }
}))

describe('UserSettingsForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(UserSettingsForm)
  })

  it('renders title and subtitle', () => {
    expect(wrapper.text()).toContain('User Settings')
    expect(wrapper.text()).toContain('Manage your profile and preferences.')
  })

  it('initializes formData with initialData prop', async () => {
    const initialData = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com'
    }
    await wrapper.setProps({ initialData })
    await nextTick()
    const vm = wrapper.vm as unknown as { formData: { firstName: string; lastName: string; email: string } }
    expect(vm.formData.firstName).toBe('Alice')
    expect(vm.formData.lastName).toBe('Smith')
    expect(vm.formData.email).toBe('alice@example.com')
  })

  it('validates profile form and shows errors on empty required fields', async () => {
    wrapper.vm.activeSection = 'profile'
    wrapper.vm.formData.firstName = ''
    wrapper.vm.formData.lastName = ''
    wrapper.vm.formData.email = ''
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect((wrapper.vm as any).errors.firstName).toBe('First name is required')
    expect((wrapper.vm as any).errors.lastName).toBe('Last name is required')
    expect((wrapper.vm as any).errors.email).toBe('Email is required')
    expect(wrapper.text()).toContain('First name is required')
    expect(wrapper.text()).toContain('Last name is required')
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('validates profile form email format', async () => {
    wrapper.vm.activeSection = 'profile'
    wrapper.vm.formData.firstName = 'Bob'
    wrapper.vm.formData.lastName = 'Jones'
    wrapper.vm.formData.email = 'invalid-email'
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('validates password form and shows errors', async () => {
    wrapper.vm.activeSection = 'security'
    wrapper.vm.formData.currentPassword = ''
    wrapper.vm.formData.newPassword = 'short'
    wrapper.vm.formData.confirmPassword = 'different'
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('emits submit event with form data on valid profile submit', async () => {
    wrapper.vm.activeSection = 'profile'
    wrapper.vm.formData.firstName = 'John'
    wrapper.vm.formData.lastName = 'Doe'
    wrapper.vm.formData.email = 'john@example.com'
    wrapper.vm.formData.phone = '1234567890'
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect((wrapper.vm as any).errors).toEqual({})
    expect(wrapper.emitted('submit')).toBeTruthy()
    const submittedData = wrapper.emitted('submit')![0][0] as { firstName: string; section: string }
    expect(submittedData.firstName).toBe('John')
    expect(submittedData.section).toBe('profile')
    expect(wrapper.vm.successMessage).toBe('Profile updated successfully')
  })

  it('emits submit event with form data on valid password submit and clears passwords', async () => {
    wrapper.vm.activeSection = 'security'
    wrapper.vm.formData.currentPassword = 'oldpassword'
    wrapper.vm.formData.newPassword = 'newpassword123'
    wrapper.vm.formData.confirmPassword = 'newpassword123'
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect((wrapper.vm as any).errors).toEqual({})
    expect(wrapper.emitted('submit')).toBeTruthy()
    const submittedData = wrapper.emitted('submit')![0][0] as { section: string }
    expect(submittedData.section).toBe('security')
    expect((wrapper.vm as any).successMessage).toBe('Password changed successfully')
    expect((wrapper.vm as any).formData.currentPassword).toBe('')
    expect((wrapper.vm as any).formData.newPassword).toBe('')
    expect((wrapper.vm as any).formData.confirmPassword).toBe('')
  })

  it('shows success message after submit', async () => {
    wrapper.vm.activeSection = 'profile'
    wrapper.vm.formData.firstName = 'Test'
    wrapper.vm.formData.lastName = 'User'
    wrapper.vm.formData.email = 'test@example.com'
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    const successDiv = wrapper.find('.bg-green-50')
    expect(successDiv.exists()).toBe(true)
    expect(successDiv.text()).toContain('Profile updated successfully')
  })


  it('switches active sections when section buttons are clicked', async () => {
    const buttons = wrapper.findAll('nav button')
    await buttons[1].trigger('click')
    expect((wrapper.vm as any).activeSection).toBe('preferences')

    await buttons[2].trigger('click')
    expect((wrapper.vm as any).activeSection).toBe('security')

    await buttons[0].trigger('click')
    expect((wrapper.vm as any).activeSection).toBe('profile')
  })
})
