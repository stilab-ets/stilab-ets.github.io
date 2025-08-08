import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VacancyForm from '@/components/vacancies/VacancyForm.vue';
import { nextTick, ref } from 'vue';

// Mock useLanguage composable with full translation structure
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        vacancy: {
          subtitle: 'Fill in the vacancy details.',
          titleCreate: 'Create Vacancy',
          titleEdit: 'Edit Vacancy',
          form: {
            title: 'Title',
            titlePlaceholder: 'Enter vacancy title',
            type: 'Type',
            selectType: 'Select a type',
            supervisor: 'Supervisor',
            selectSupervisor: 'Select a supervisor',
            domain: 'Domain',
            selectDomain: 'Select a domain',
            description: 'Description',
            descriptionPlaceholder: 'Enter description',
            requirements: 'Requirements',
            requirementsPlaceholder: 'Enter requirements',
            duration: 'Duration',
            durationPlaceholder: 'Enter duration',
            startDate: 'Start Date',
            deadline: 'Deadline',
            salary: 'Salary',
            salaryPlaceholder: 'Enter salary',
            applyUrl: 'Apply URL',
            applyUrlPlaceholder: 'Enter apply URL',
            tags: 'Tags',
            tagsPlaceholder: 'Add a tag',
            cancel: 'Cancel',
            create: 'Create',
            update: 'Update',
            submitting: 'Submitting...',
          },
          types: {
            phd: 'PhD',
            postdoc: 'Postdoc',
            researcher: 'Researcher',
            engineer: 'Engineer',
            intern: 'Intern',
          },
          domains: {
            softwareArchitecture: 'Software Architecture',
            artificialIntelligence: 'Artificial Intelligence',
            cybersecurity: 'Cybersecurity',
            devops: 'DevOps',
            cloudComputing: 'Cloud Computing',
            softwareTesting: 'Software Testing',
            distributedSystems: 'Distributed Systems',
            blockchain: 'Blockchain',
          },
          validation: {
            titleRequired: 'Title is required',
            typeRequired: 'Type is required',
            supervisorRequired: 'Supervisor is required',
            domainRequired: 'Domain is required',
            descriptionRequired: 'Description is required',
            durationRequired: 'Duration is required',
            startDateRequired: 'Start date is required',
            deadlineRequired: 'Deadline is required',
            deadlineAfterToday: 'Deadline must be after today',
            applyUrlRequired: 'Apply URL is required',
            applyUrlInvalid: 'Apply URL is invalid',
          },
          errors: {
            submitFailed: 'Submit failed, please try again.',
          },
          sections: {
            basic: 'Basic Information',
            requirements: 'Requirements',
            timeline: 'Timeline',
            compensation: 'Compensation',
          },
        },
      },
    }),
  }),
}));

// Mock UI components
vi.mock('@/components/ui/Card.vue', () => ({
  default: { template: '<div><slot /></div>' },
}));
vi.mock('@/components/ui/Button.vue', () => ({
  default: { template: '<button><slot /></button>' },
}));

describe('VacancyForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(VacancyForm);
  });

  it('renders form title and subtitle correctly for creation mode', () => {
    expect(wrapper.text()).toContain('Create Vacancy');
    expect(wrapper.text()).toContain('Fill in the vacancy details.');
  });

  it('renders form title correctly for editing mode', async () => {
    await wrapper.setProps({ isEditing: true });
    expect(wrapper.text()).toContain('Edit Vacancy');
  });

  it('shows validation errors when submitting empty form', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    const text = wrapper.text();
    expect(text).toContain('Title is required');
    expect(text).toContain('Type is required');
    expect(text).toContain('Supervisor is required');
    expect(text).toContain('Domain is required');
    expect(text).toContain('Description is required');
    expect(text).toContain('Duration is required');
    expect(text).toContain('Start date is required');
    expect(text).toContain('Deadline is required');
    expect(text).toContain('Apply URL is required');
  });
});
