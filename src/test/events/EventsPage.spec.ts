import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import EventsPage from '../../components/events/EventPage.vue';

import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockEventData = {
  id: '1',
  title: 'Test Event Title',
  speaker: {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    role: 'Professor',
    email: 'john.doe@example.com',
    phone: null,
    biography: null,
  },
  date: '2025-06-20',
  time: '14:00',
  location: 'Room 101',
  description: 'This is a test description of the academic event.',
  registration_url: 'https://register.example.com',
  tags: ['tag1', 'tag2'],
  is_upcoming: true,
  capacity: 100,
  current_registrations: 50,
  domain: 'seminar' as const,
  participants: [],
};

describe('EventsPage.vue', () => {
  it('renders the main UI components', async () => {
    mockedAxios.get.mockResolvedValue({ data: [mockEventData] });

    const wrapper = mount(EventsPage, {
      global: {
        stubs: [
          'PageHeader',
          'StatisticsGrid',
          'SearchAndFilters',
          'EventCard',
          'EmptyState',
        ],
      },
    });

    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBe(true);

    expect(wrapper.findComponent({ name: 'StatisticsGrid' }).exists()).toBe(
      true
    );

    expect(wrapper.findComponent({ name: 'SearchAndFilters' }).exists()).toBe(
      true
    );

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'EventCard' }).exists()).toBe(false);
  });
});
