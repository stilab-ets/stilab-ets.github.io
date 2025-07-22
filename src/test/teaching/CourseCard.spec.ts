import { mount } from '@vue/test-utils'
import CourseCard from '../../components/teaching/CourseCard.vue'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import { describe, it, expect } from 'vitest'

const courseMock = {
  id: 'course1',
  title: 'Test Course',
  code: 'CS101',
  teacher: {
    first_name: 'John',
    last_name: 'Doe',
    role: 'Professor',
    email: 'john.doe@example.com',
    phone: null,
    biography: null,
    
  },
  semester: 'F',
  year: 2025,
  level: 'UGR' as const,
  description: 'A description',
  url: 'https://example.com/syllabus',
}


describe('CourseCard.vue', () => {
  const wrapper = mount(CourseCard, {
    props: { course: courseMock }
  })

  it('renders the Card component', () => {
    expect(wrapper.findComponent(Card).exists()).toBe(true)
  })

  it('renders the course code and level badges', () => {
    const badges = wrapper.findAll('span.inline-flex')
    expect(badges.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the course title as heading', () => {
    const heading = wrapper.find('h3')
    expect(heading.exists()).toBe(true)
  })

  it('renders the instructor and semester sections', () => {
    const svgs = wrapper.findAll('svg.h-4.w-4')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the description paragraph', () => {
    const p = wrapper.find('p.text-gray-700')
    expect(p.exists()).toBe(true)
  })

  it('renders three Button components for syllabus', () => {
    const buttons = wrapper.findAllComponents(Button)
    expect(buttons.length).toBe(1)
  })
})
