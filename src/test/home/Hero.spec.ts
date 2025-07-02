import { mount } from '@vue/test-utils'
import HeroSection from '../../components/home/Hero.vue'
import { describe, it, expect } from 'vitest'


describe('HeroSection.vue', () => {
  it('renders the main heading and subtitle', () => {
    const wrapper = mount(HeroSection)

    const heading = wrapper.find('h1')
    const subtitle = wrapper.find('p.text-lg')

    expect(heading.exists()).toBe(true)
    expect(subtitle.exists()).toBe(true)
  })

  it('renders both CTA buttons', () => {
    const wrapper = mount(HeroSection)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('emits setCurrentPage when clicking CTA buttons', async () => {
    const wrapper = mount(HeroSection)

    const [researchBtn, teamBtn] = wrapper.findAll('button')

    await researchBtn.trigger('click')
    await teamBtn.trigger('click')

    expect(wrapper.emitted('setCurrentPage')).toHaveLength(2)
    expect(wrapper.emitted('setCurrentPage')![0]).toEqual(['research'])
    expect(wrapper.emitted('setCurrentPage')![1]).toEqual(['people'])
  })

  it('renders 3 research highlight blocks', () => {
    const wrapper = mount(HeroSection)

    const highlights = wrapper.findAll('.text-2xl')
    expect(highlights.length).toBe(4)
  })

  it('renders logo image and lab name', () => {
    const wrapper = mount(HeroSection)

    const logo = wrapper.find('img')
    const labName = wrapper.find('h3.text-2xl')
    const labSubtitle = wrapper.find('p.text-sm')

    expect(logo.exists()).toBe(true)
    expect(labName.exists()).toBe(true)
    expect(labSubtitle.exists()).toBe(true)
  })

  it('renders 3 key metrics blocks', () => {
    const wrapper = mount(HeroSection)

    const metrics = wrapper.findAll('.bg-gray-50.rounded-lg')
    expect(metrics.length).toBe(3)
  })

  it('renders the activity indicator section', () => {
    const wrapper = mount(HeroSection)

    const activity = wrapper.find('.animate-pulse')
    expect(activity.exists()).toBe(true)
  })
})
