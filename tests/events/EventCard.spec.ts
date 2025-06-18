import { mount } from '@vue/test-utils'
import EventCard from '../../src/components/events/EventCard.vue'
import Card from '../../src/components/ui/Card.vue'
import Button from '../../src/components/ui/Button.vue'
import { describe, it, expect } from 'vitest'

const mockEventData = {
  id: '1',
  title: 'Test Event Title',
  speaker: 'Dr. John Doe',
  date: '2025-06-20',
  time: '14:00',
  location: 'Room 101',
  type: 'seminar' as const,
  description: 'This is a test description of the academic event.',
  registrationUrl: 'https://register.example.com',
  tags: ['tag1', 'tag2'],
  isUpcoming: true,
  capacity: 100,
  currentRegistrations: 50,
}

describe('EventCard.vue', () => {
  it('renders Card and Button components', () => {
    const wrapper = mount(EventCard, {
      props: {
        eventData: mockEventData,
        isPast: false,
      },
      global: {
        components: { Card, Button }
      }
    })

    expect(wrapper.findComponent(Card).exists()).toBe(true)
    expect(wrapper.findComponent(Button).exists()).toBe(true)
  })

  it('renders event title and description', () => {
    const wrapper = mount(EventCard, {
      props: { eventData: mockEventData },
      global: { components: { Card, Button } }
    })

    expect(wrapper.text()).toContain(mockEventData.title)
    expect(wrapper.text()).toContain(mockEventData.description)
  })

  it('renders event date in formatted form', () => {
    const wrapper = mount(EventCard, {
      props: { eventData: mockEventData },
      global: { components: { Card, Button } }
    })

    // Date formatted in French locale (ex: "vendredi 20 juin 2025")
    const formattedDate = new Date(mockEventData.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    expect(wrapper.text()).toContain(formattedDate)
  })

  it('renders event type label with correct class', () => {
    const wrapper = mount(EventCard, {
      props: { eventData: mockEventData },
      global: { components: { Card, Button } }
    })

    const typeBadge = wrapper.find('span.inline-flex')
    expect(typeBadge.exists()).toBe(true)
  })

  it('renders registration button enabled if capacity not full', () => {
    const wrapper = mount(EventCard, {
      props: { eventData: mockEventData, isPast: false },
      global: { components: { Card, Button } }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('disables registration button when capacity full', () => {
    const fullCapacityEvent = { ...mockEventData, currentRegistrations: 100 }
    const wrapper = mount(EventCard, {
      props: { eventData: fullCapacityEvent, isPast: false },
      global: { components: { Card, Button } }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('disabled')).toBeDefined()
  })
})
