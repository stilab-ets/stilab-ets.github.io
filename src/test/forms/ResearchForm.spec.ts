import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ResearchForm from '@/components/research/ResearchForm.vue'
import { nextTick, ref } from 'vue'

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        research: {
          subtitle: 'Fill in the research project details.',
          titleCreate: 'Create Research Project',
          titleEdit: 'Edit Research Project',
          form: {
            update: 'Update',
            create: 'Create',
            submitting: 'Submitting...',
            cancel: 'Cancel',
            title: 'Title',
            titlePlaceholder: 'Enter title',
            domain: 'Domain',
            selectDomain: 'Select a domain',
            status: 'Status',
            selectStatus: 'Select a status',
            description: 'Description',
            descriptionPlaceholder: 'Enter description',
            objectives: 'Objectives',
            objectivesPlaceholder: 'Enter objectives',
            methodology: 'Methodology',
            methodologyPlaceholder: 'Enter methodology',
            leader: 'Leader',
            selectLeader: 'Select a leader',
            participants: 'Participants',
            selectParticipants: 'Select participants',
            budget: 'Budget',
            budgetPlaceholder: 'Enter budget',
            funding: 'Funding',
            fundingPlaceholder: 'Enter funding',
            githubUrl: 'GitHub URL',
            websiteUrl: 'Website URL',
            startDate: 'Start Date',
            endDate: 'End Date',
          },
          validation: {
            titleRequired: 'Title is required.',
            domainRequired: 'Domain is required.',
            statusRequired: 'Status is required.',
            descriptionRequired: 'Description is required.',
            leaderRequired: 'Leader is required.',
            startDateRequired: 'Start date is required.',
            endDateAfterStart: 'End date must be after start date.'
          },
          errors: {
            submitFailed: 'Submit failed, please try again.'
          },
          sections: {
            basic: 'Basic Information',
            description: 'Project Description',
            team: 'Team Members',
            resources: 'Resources & Funding',
            timeline: 'Timeline'
          },
          domains: {
            softwareArchitecture: 'Software Architecture',
            artificialIntelligence: 'Artificial Intelligence',
            cybersecurity: 'Cybersecurity',
            devops: 'DevOps',
            cloudComputing: 'Cloud Computing',
            softwareTesting: 'Software Testing',
            distributedSystems: 'Distributed Systems',
            blockchain: 'Blockchain'
          },
          statuses: {
            planned: 'Planned',
            active: 'Active',
            completed: 'Completed'
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

describe('ResearchForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(ResearchForm)
  })

  it('renders form title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Research Project')
    expect(wrapper.text()).toContain('Fill in the research project details.')
  })

  it('shows validation errors for required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    const text = wrapper.text()
    expect(text).toContain('Domain is required.')
    expect(text).toContain('Description is required.')
    expect(text).toContain('Leader is required.')
    expect(text).toContain('Start date is required.')
  })

})
