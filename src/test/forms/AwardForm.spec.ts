import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AwardForm from '@/components/awards/AwardForm.vue'
import { nextTick, ref } from 'vue'


vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    isLoggedIn: ref(true),
    user: ref({ id: 1, name: 'Test User' }),
  }),
}))

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      common: {
        mustBeLogged: 'You must be logged in',
        loginHere: 'Login here',
      },
      forms: {
        awards: {
          titleCreate: 'Create Award',
          titleEdit: 'Edit Award',
          subtitle: 'Fill in the award details below.',
          sections: {
            basic: 'Basic Information',
            details: 'Award Details',
            recipient: 'Recipient Information'
          },
          form: {
            title: 'Title',
            titlePlaceholder: 'Award Title',
            category: 'Category',
            selectCategory: 'Select category',
            organization: 'Organization',
            organizationPlaceholder: 'Awarding Organization',
            year: 'Year',
            description: 'Description',
            descriptionPlaceholder: 'Describe the award...',
            url: 'URL',
            urlPlaceholder: 'https://...',
            recipient: 'Recipient',
            selectRecipient: 'Select recipient',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            submitting: 'Submitting...'
          },
          categories: {
            publication: 'Publication',
            research: 'Research',
            teaching: 'Teaching',
            service: 'Service',
            career: 'Career',
            excellence: 'Excellence'
          },
          validation: {
            titleRequired: 'Title is required.',
            categoryRequired: 'Category is required.',
            organizationRequired: 'Organization is required.',
            yearRequired: 'Year is required.',
            yearInvalid: 'Invalid year.',
            recipientRequired: 'Recipient is required.'
          },
          errors: {
            submitFailed: 'Failed to submit.'
          }
        }
      }
    })
  })
}))

describe('AwardForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(AwardForm)
  })

  it('renders title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Award')
    expect(wrapper.text()).toContain('Fill in the award details below.')
  })

  it('shows validation errors on empty required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Title is required.')
    expect(wrapper.text()).toContain('Organization is required.')
  })

  it('validates invalid year', async () => {
    await wrapper.find('#title').setValue('Best Research Paper')
    await wrapper.find('#organization').setValue('IEEE')
    await wrapper.find('#year').setValue('1800')
    await wrapper.find('#recipients').setValue('1')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Invalid year.')
  })

  it('initializes form with props.initialData', async () => {
    const wrapperWithProps = mount(AwardForm, {
      props: {
        initialData: {
          title: 'Existing Title',
          organization: 'ACM',
          year: '2023',
          recipients: ['1'],
          url: 'https://example.com',
          description: 'Existing award',
        }
      }
    })

    await nextTick()

    expect(wrapperWithProps.find('#title').element.value).toBe('Existing Title')
    expect(wrapperWithProps.find('#organization').element.value).toBe('ACM')
    expect(wrapperWithProps.find('#year').element.value).toBe('2023')
  })
})
