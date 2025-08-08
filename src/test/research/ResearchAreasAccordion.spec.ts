import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ResearchAreas from '../../components/research/ResearchAreasAccordion.vue';

describe('ResearchAreas.vue', () => {
  const mockResearchAreas = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      description: 'AI-related research',
      icon: '🤖',
    },
    {
      id: 'robotics',
      name: 'Robotics',
      description: 'Robotic systems',
      icon: '🤖',
    },
  ];

  const mockProjects = [
    {
      id: 'p1',
      title: 'AI Project',
      description: 'Research in AI',
      leadResearcher: 'Dr. Smith',
      participants: ['Dr. Smith', 'Jane Doe'],
      startDate: '2024-01-01',
      status: 'active' as 'active' | 'completed',
      domains: ['Artificial Intelligence'],
      domain: 'Artificial Intelligence',
    },
  ];

  const getProjectsByDomain = (domain: string) => {
    if (domain === 'Artificial Intelligence') return mockProjects;
    return [];
  };

  it('renders one accordion per research area', () => {
    const wrapper = mount(ResearchAreas, {
      props: {
        researchAreas: mockResearchAreas,
        getProjectsByDomain,
      },
    });

    const accordions = wrapper.findAll('button');
    expect(accordions.length).toBe(mockResearchAreas.length);
  });

  it('toggles accordion open/close on click', async () => {
    const wrapper = mount(ResearchAreas, {
      props: {
        researchAreas: mockResearchAreas,
        getProjectsByDomain,
      },
    });

    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(false);

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true);

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(false);
  });

  it('renders Card components if projects exist for a domain', async () => {
    const wrapper = mount(ResearchAreas, {
      props: {
        researchAreas: mockResearchAreas,
        getProjectsByDomain,
      },
    });

    await wrapper.findAll('button')[0].trigger('click');
    const cards = wrapper.findAllComponents({ name: 'Card' });
    expect(cards.length).toBe(mockProjects.length);
  });

  it('shows empty message if no projects found', async () => {
    const wrapper = mount(ResearchAreas, {
      props: {
        researchAreas: mockResearchAreas,
        getProjectsByDomain,
      },
    });

    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(false);
    expect(wrapper.text()).toContain('No active projects');
  });
});
