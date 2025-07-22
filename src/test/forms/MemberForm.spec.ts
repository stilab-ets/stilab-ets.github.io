import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import MemberForm from '@/components/people/MemberForm.vue'

// Mock composable
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        member: {
          titleCreate: 'Create Member',
          titleEdit: 'Edit Member',
          subtitle: 'Fill in the member details below.',
          sections: {
            personal: 'Personal Information',
            academic: 'Academic Information',
            research: 'Research Information',
            contact: 'Contact Information',
            additional: 'Additional Information',
          },
          form: {
            firstName: 'First Name',
            lastName: 'Last Name',
            title: 'Title',
            titlePlaceholder: 'e.g. Dr., Prof.',
            profilePhoto: 'Profile Photo',
            role: 'Role',
            selectRole: 'Select role',
            status: 'Status',
            selectStatus: 'Select status',
            department: 'Department',
            departmentPlaceholder: 'e.g. Software Engineering',
            researchDomains: 'Research Domains',
            researchDomainsPlaceholder: 'AI, Data Science...',
            biography: 'Biography',
            biographyPlaceholder: 'Write a short bio...',
            email: 'Email',
            emailPlaceholder: 'example@domain.com',
            phone: 'Phone',
            phonePlaceholder: '+1 555 123 4567',
            office: 'Office',
            officePlaceholder: 'B-1234',
            githubUrl: 'GitHub URL',
            linkedinUrl: 'LinkedIn URL',
            personalWebsite: 'Personal Website',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            submitting: 'Submitting...'
          },
          roles: {
            professor: 'Professor',
            researcher: 'Researcher',
            postdoc: 'Postdoc',
            phd: 'PhD Student',
            master: 'Master Student',
            engineer: 'Engineer',
            admin: 'Administrator'
          },
          statuses: {
            active: 'Active',
            alumni: 'Alumni',
            visitor: 'Visitor'
          },
          validation: {
            firstNameRequired: 'First name is required.',
            lastNameRequired: 'Last name is required.',
            titleRequired: 'Title is required.',
            emailRequired: 'Email is required.',
            emailInvalid: 'Invalid email format.',
            roleRequired: 'Role is required.',
            statusRequired: 'Status is required.'
          },
          errors: {
            submitFailed: 'Failed to submit.'
          }
        }
      }
    })
  })
}))

// Mock child components
vi.mock('@/components/ui/Card.vue', () => ({
  default: { template: '<div><slot /></div>' }
}))

vi.mock('@/components/ui/Button.vue', () => ({
  default: { template: '<button><slot /></button>' }
}))

describe('MemberForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(MemberForm)
  })

  it('renders the form title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Member')
    expect(wrapper.text()).toContain('Fill in the member details below.')
  })

  it('shows validation errors on empty required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('First name is required.')
    expect(wrapper.text()).toContain('Last name is required.')
    expect(wrapper.text()).toContain('Title is required.')
    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Role is required.')
  })

  it('shows email validation error for invalid email', async () => {
    await wrapper.find('#firstName').setValue('John')
    await wrapper.find('#lastName').setValue('Doe')
    await wrapper.find('#title').setValue('Prof.')
    await wrapper.find('#username_or_email').setValue('invalid-email')
    await wrapper.find('#role').setValue('professor')
    await wrapper.find('#status').setValue('active')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Invalid email format.')
  })
})
