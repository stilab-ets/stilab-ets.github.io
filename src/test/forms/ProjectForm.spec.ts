import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectForm from '@/components/projects/ProjectForm.vue';
import { nextTick } from 'vue';

vi.mock('@/composables/useLanguage', () => {
  return {
    useLanguage: () => ({
      t: {
        value: {
          forms: {
            project: {
              titleEdit: 'Edit Project',
              titleCreate: 'Create Project',
              subtitle: 'Fill out the project form.',
              form: {
                title: 'Title',
                domain: 'Domain',
                description: 'Description',
                supervisor: 'Supervisor',
                startDate: 'Start Date',
                endDate: 'End Date',
                cancel: 'Cancel',
                submitting: 'Submitting...',
                create: 'Create',
                update: 'Update',
                requirements: 'Requirements',
                requirementsPlaceholder: 'Add a requirement',
                objectives: 'Objectives',
                objectivesPlaceholder: 'Add an objective',
              },
              validation: {
                titleRequired: 'Title is required',
                domainRequired: 'Domain is required',
                descriptionRequired: 'Description is required',
                supervisorRequired: 'Supervisor is required',
                startDateRequired: 'Start date is required',
                endDateAfterStart: 'End date must be after start date',
              },
              errors: {
                submitFailed: 'Failed to submit the form',
              },
              sections: {
                type: 'Project Type',
                basic: 'Basic Info',
                supervision: 'Supervision',
                requirements: 'Requirements',
                timeline: 'Timeline',
                additional: 'Additional Info',
              },
              projectTypes: {
                msc: 'MSc',
                research: 'Research',
              },
              domains: {
                softwareArchitecture: 'Software Architecture',
              },
              difficulties: {
                beginner: 'Beginner',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
              },
              statuses: {
                planned: 'Planned',
                active: 'Active',
                completed: 'Completed',
              },
            },
          },
        },
      },
    }),
  };
});

describe('ProjectForm.vue', () => {
  let wrapper: any;
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockReset();
    wrapper = mount(ProjectForm, {
      props: {
        isEditing: false,
        initialData: {},
        onSubmit: mockSubmit,
      },
    });
  });

  it('renders form title correctly', () => {
    expect(wrapper.text()).toContain('Create Project');
    expect(wrapper.text()).toContain('Fill out the project form.');
  });

  it('validates required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.text()).toContain('Title is required');
    expect(wrapper.text()).toContain('Domain is required');
    expect(wrapper.text()).toContain('Description is required');
    expect(wrapper.text()).toContain('Supervisor is required');
    expect(wrapper.text()).toContain('Start date is required');
  });

  it('adds a requirement', async () => {
    const input = wrapper.find('input[placeholder="Add a requirement"]');
    await input.setValue('Vue 3');
    await input.trigger('keydown.enter');
    expect(wrapper.text()).toContain('Vue 3');
  });

  it('adds an objective when type is msc', async () => {
    const input = wrapper.find('input[placeholder="Add an objective"]');
    await input.setValue('Finish thesis');
    await input.trigger('keydown.enter');
    expect(wrapper.text()).toContain('Finish thesis');
  });

  it('emits form data when valid', async () => {
    await wrapper.find('#title').setValue('Test Project');
    await wrapper.find('#domain').setValue('software-architecture');
    await wrapper.find('#description').setValue('This is a test project.');
    await wrapper.find('#supervisor').setValue('Dr. Marie Dubois');
    await wrapper.find('#startDate').setValue('2025-07-01');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')![0][0].title).toBe('Test Project');
  });
});
