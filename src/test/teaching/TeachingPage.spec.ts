import { mount } from '@vue/test-utils'
import { describe, it, expect, vi} from 'vitest'
import TeachingPage from '../../components/teaching/TeachingPage.vue'
import CourseCard from '../../components/teaching/CourseCard.vue'

import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

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

describe('TeachingPage.vue', () => {
  it('renders PageHeader, StatisticsGrid and SearchAndFilters components', () => {
    const wrapper = mount(TeachingPage)

    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'StatisticsGrid' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'SearchAndFilters' }).exists()).toBe(true)
  })
})
