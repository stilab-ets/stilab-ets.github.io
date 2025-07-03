import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EventForm from '@/components/forms/EventForm.vue'

// Mock useLanguage composable
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      value: {
        forms: {
          event: {
            titleEdit: 'Edit Event',
            titleCreate: 'Create Event',
            subtitle: 'Fill in the event details',
            form: {
              title: 'Title',
              titlePlaceholder: 'Enter a title',
              type: 'Type',
              selectType: 'Select a type',
              speaker: 'Speaker',
              speakerPlaceholder: 'Optional speaker name',
              date: 'Date',
              time: 'Time',
              duration: 'Duration',
              selectDuration: 'Select duration',
              minutes: 'minutes',
              hour: 'hour',
              hours: 'hours',
              fullDay: 'Full Day',
              location: 'Location',
              locationPlaceholder: 'Enter the location',
              description: 'Description',
              descriptionPlaceholder: 'Enter a description',
              tags: 'Tags',
              tagsPlaceholder: 'Press enter to add a tag',
              tagsHelp: 'Use keywords to help categorize your event.',
              meetingUrl: 'Meeting URL',
              meetingUrlPlaceholder: 'https://...',
              recordingUrl: 'Recording URL',
              recordingUrlPlaceholder: 'https://...',
              cancel: 'Cancel',
              create: 'Create',
              update: 'Update',
              submitting: 'Submitting...',
            },
            eventTypes: {
              seminar: 'Seminar',
              workshop: 'Workshop',
              conference: 'Conference',
              defense: 'Defense',
              meeting: 'Meeting',
              colloquium: 'Colloquium',
              masterclass: 'Masterclass',
            },
            registration: {
              title: 'Registration',
              required: 'Requires registration',
              capacity: 'Capacity',
              capacityPlaceholder: 'Max participants',
              deadline: 'Registration deadline',
              url: 'Registration URL',
              urlPlaceholder: 'https://register.com',
              urlHelp: 'Optional link for registration.',
            },
            visibility: {
              title: 'Visibility',
              public: 'Public',
              internal: 'Internal',
              private: 'Private',
            },
            validation: {
              titleRequired: 'Title is required',
              typeRequired: 'Type is required',
              dateRequired: 'Date is required',
              dateInPast: 'Date cannot be in the past',
              locationRequired: 'Location is required',
              descriptionRequired: 'Description is required',
              deadlineAfterEvent: 'Deadline must be before the event date',
            },
            errors: {
              submitFailed: 'Failed to submit the form',
            },
          },
        },
      },
    },
  }),
}))

describe('EventForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  const mountComponent = (initialData = {}) => {
    wrapper = mount(EventForm, {
      props: {
        initialData,
        isEditing: false,
      },
    })
  }

  beforeEach(() => {
    mountComponent()
  })

  it('renders the create title', () => {
    expect(wrapper.text()).toContain('Create Event')
  })

  it('shows validation errors when required fields are empty', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Title is required')
    expect(wrapper.text()).toContain('Type is required')
    expect(wrapper.text()).toContain('Date is required')
    expect(wrapper.text()).toContain('Location is required')
    expect(wrapper.text()).toContain('Description is required')
  })

  it('submits valid form data', async () => {
    await wrapper.find('#title').setValue('My Event')
    await wrapper.find('#type').setValue('workshop')
    await wrapper.find('#date').setValue('2099-12-31')
    await wrapper.find('#location').setValue('Auditorium')
    await wrapper.find('#description').setValue('An awesome event.')

    await wrapper.find('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toMatchObject({
      title: 'My Event',
      type: 'workshop',
      location: 'Auditorium',
      description: 'An awesome event.',
    })
  })

  it('adds and removes a tag', async () => {
    const input = wrapper.find('#tagInput')
    await input.setValue('Vue3')
    await input.trigger('keydown.enter')

    expect(wrapper.text()).toContain('Vue3')

    await wrapper.find('button[type="button"]').trigger('click') // remove tag
    expect(wrapper.text()).not.toContain('Vue3')
  })
})
