import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TeachingForm from '@/components/teaching/TeachingForm.vue'
import { nextTick, ref } from 'vue'

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        teaching: {
          subtitle: 'Fill in the course details.',
          titleCreate: 'Create Teaching Course',
          titleEdit: 'Edit Teaching Course',
          form: {
            title: 'Title',
            titlePlaceholder: 'Enter course title',
            code: 'Code',
            codePlaceholder: 'Enter course code',
            instructor: 'Instructor',
            selectInstructor: 'Select an instructor',
            level: 'Level',
            selectLevel: 'Select a level',
            semester: 'Semester',
            semesterPlaceholder: 'Enter semester',
            credits: 'Credits',
            creditsPlaceholder: 'Enter number of credits',
            description: 'Description',
            descriptionPlaceholder: 'Enter description',
            prerequisites: 'Prerequisites',
            prerequisitesPlaceholder: 'Enter prerequisites',
            objectives: 'Objectives',
            objectivesPlaceholder: 'Enter objectives',
            topics: 'Topics',
            topicsPlaceholder: 'Enter topics',
            syllabusUrl: 'Syllabus URL',
            moodleUrl: 'Moodle URL',
            githubUrl: 'GitHub URL',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            submitting: 'Submitting...',
          },
          validation: {
            titleRequired: 'Title is required',
            codeRequired: 'Code is required',
            instructorRequired: 'Instructor is required',
            levelRequired: 'Level is required',
            semesterRequired: 'Semester is required',
            creditsRequired: 'Credits are required',
            creditsInvalid: 'Credits must be a positive number',
            descriptionRequired: 'Description is required',
          },
          errors: {
            submitFailed: 'Submit failed, please try again.',
          },
          sections: {
            basic: 'Basic Information',
            content: 'Course Content',
            resources: 'Resources',
          },
          levels: {
            undergraduate: 'Undergraduate',
            graduate: 'Graduate',
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

describe('TeachingForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(TeachingForm)
  })

  it('renders form title and subtitle correctly for creation mode', () => {
    expect(wrapper.text()).toContain('Create Teaching Course')
    expect(wrapper.text()).toContain('Fill in the course details.')
  })

  it('renders form title correctly for editing mode', async () => {
    await wrapper.setProps({ isEditing: true })
    expect(wrapper.text()).toContain('Edit Teaching Course')
  })

  it('shows validation errors when submitting empty form', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    const text = wrapper.text()
    expect(text).toContain('Title is required')
    expect(text).toContain('Code is required')
    expect(text).toContain('Instructor is required')
    expect(text).toContain('Level is required')
    expect(text).toContain('Semester is required')
    expect(text).toContain('Credits are required')
    expect(text).toContain('Description is required')
  })

  it('emits cancel event when cancel button clicked', async () => {
    await wrapper.find('button[type="button"]').trigger('click')
    await nextTick()
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('shows update text on submit button when editing', async () => {
    await wrapper.setProps({ isEditing: true })
    await nextTick()

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('Update')
  })
})
