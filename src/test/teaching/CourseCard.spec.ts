import { mount } from '@vue/test-utils'
import CourseCard from '../../components/teaching/CourseCard.vue'
import Card from '../../components/ui/Card.vue'
import Button from '../../components/ui/Button.vue'
import { describe, it, expect } from 'vitest'

const courseMock = {
  id: 'course1',
  title: 'Test Course',
  code: 'CS101',
  instructor: 'Prof. Tester',
  semester: 'Fall 2025',
  level: 'undergraduate' as const,
  description: 'A description',
  credits: 3,
  prerequisites: ['Intro to CS', 'Math 320'],
  objectives: ['Learn basics', 'Understand concepts'],
  topics: ['Topic 1', 'Topic 2'],
  syllabusUrl: 'https://example.com/syllabus',
  moodleUrl: 'https://example.com/moodle',
  githubUrl: 'https://github.com/example'
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

  it('renders the prerequisites, objectives, and topics sections', () => {
    expect(wrapper.find('div.flex > span.font-medium').exists()).toBe(true)
    expect(wrapper.findAll('span.inline-flex.items-center').length).toBeGreaterThanOrEqual(courseMock.topics.length)
  })

  it('renders three Button components for syllabus, moodle and github links', () => {
    const buttons = wrapper.findAllComponents(Button)
    expect(buttons.length).toBe(3)
  })

  it('renders the credits section', () => {
    const credits = wrapper.find('div.text-sm.text-gray-500')
    expect(credits.exists()).toBe(true)
  })
})
