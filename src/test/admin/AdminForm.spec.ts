import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminForm from '@/components/dashboard/admin/AdminForm.vue'
import PublicationForm from '@/components/publications/PublicationForm.vue'
import MemberForm from '@/components/people/MemberForm.vue'
import ResearchForm from '@/components/research/ResearchForm.vue'
import TeachingForm from '@/components/teaching/TeachingForm.vue'
import EventForm from '@/components/events/EventForm.vue'

describe('AdminForm.vue', () => {
  it('renders form list initially', () => {
    const wrapper = mount(AdminForm)
    // Check the buttons for each form exist
    expect(wrapper.text()).toContain('Available Forms')
    expect(wrapper.find('button.btn-primary').exists()).toBe(true)
    expect(wrapper.findAll('button.btn-primary').length).toBe(5)
  })

  it('shows PublicationForm when clicking Publication Form button', async () => {
    const wrapper = mount(AdminForm)

    const pubButton = wrapper.findAll('button.btn-primary')[0]
    await pubButton.trigger('click')

    expect(wrapper.findComponent(PublicationForm).exists()).toBe(true)
    expect(wrapper.findComponent(MemberForm).exists()).toBe(false)
    expect(wrapper.findComponent(ResearchForm).exists()).toBe(false)
    expect(wrapper.findComponent(TeachingForm).exists()).toBe(false)
    expect(wrapper.findComponent(EventForm).exists()).toBe(false)

    // Back button should appear
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true)
  })

  it('shows MemberForm when clicking Member Form button', async () => {
    const wrapper = mount(AdminForm)

    const memberButton = wrapper.findAll('button.btn-primary')[1]
    await memberButton.trigger('click')

    expect(wrapper.findComponent(MemberForm).exists()).toBe(true)
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)
    expect(wrapper.findComponent(ResearchForm).exists()).toBe(false)
    expect(wrapper.findComponent(TeachingForm).exists()).toBe(false)
    expect(wrapper.findComponent(EventForm).exists()).toBe(false)

    // Back button should appear
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true)
  })

  it('shows ResearchForm when clicking Research Form button', async () => {
    const wrapper = mount(AdminForm)

    const researchButton = wrapper.findAll('button.btn-primary')[2]
    await researchButton.trigger('click')

    expect(wrapper.findComponent(ResearchForm).exists()).toBe(true)
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)
    expect(wrapper.findComponent(MemberForm).exists()).toBe(false)
    expect(wrapper.findComponent(TeachingForm).exists()).toBe(false)
    expect(wrapper.findComponent(EventForm).exists()).toBe(false)

    // Back button should appear
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true)
  })

  it('shows TeachingForm when clicking Teaching Form button', async () => {
    const wrapper = mount(AdminForm)
    const teachingButton = wrapper.findAll('button.btn-primary')[3]
    await teachingButton.trigger('click')
    expect(wrapper.findComponent(TeachingForm).exists()).toBe(true)
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)
    expect(wrapper.findComponent(MemberForm).exists()).toBe(false)
    expect(wrapper.findComponent(ResearchForm).exists()).toBe(false)
    expect(wrapper.findComponent(EventForm).exists()).toBe(false)
    // Back button should appear
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true)
  })

  it('shows EventForm when clicking Event Form button', async () => {
    const wrapper = mount(AdminForm)
    const eventButton = wrapper.findAll('button.btn-primary')[4]
    await eventButton.trigger('click')
    expect(wrapper.findComponent(EventForm).exists()).toBe(true)
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)
    expect(wrapper.findComponent(MemberForm).exists()).toBe(false)
    expect(wrapper.findComponent(ResearchForm).exists()).toBe(false)
    expect(wrapper.findComponent(TeachingForm).exists()).toBe(false)
    // Back button should appear
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true)
  })

  it('goes back to form list when clicking Back button', async () => {
    const wrapper = mount(AdminForm)

    // Navigate to a form first
    await wrapper.findAll('button.btn-primary')[0].trigger('click')

    // Now click back button
    const backButton = wrapper.find('button.btn-secondary')
    expect(backButton.exists()).toBe(true)
    await backButton.trigger('click')

    // Should show form list again
    expect(wrapper.text()).toContain('Available Forms')
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)
    expect(wrapper.findComponent(MemberForm).exists()).toBe(false)
  })

  it('changes page when child form emits navigate event', async () => {
    const wrapper = mount(AdminForm)

    // Go to publication form
    await wrapper.findAll('button.btn-primary')[0].trigger('click')
    const pubForm = wrapper.findComponent(PublicationForm)
    expect(pubForm.exists()).toBe(true)

    // Emit navigate event to go to member-form
    await pubForm.vm.$emit('navigate', 'member-form')

    expect(wrapper.findComponent(MemberForm).exists()).toBe(true)
    expect(wrapper.findComponent(PublicationForm).exists()).toBe(false)

    // Emit navigate event to go back to form list
    const memberForm = wrapper.findComponent(MemberForm)
    await memberForm.vm.$emit('navigate', 'form-list')

    expect(wrapper.text()).toContain('Available Forms')
  })
})
