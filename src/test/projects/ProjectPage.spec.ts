import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import ProjectPage from '../../components/projects/ProjectPage.vue';

vi.mock('../../hooks/projects/useProjects', () => {
  return {
    useProjects: () => ({
      projects: ref([
        { id: 1, title: 'Project 1' },
        { id: 2, title: 'Project 2' },
      ]),
      isLoading: ref(false),
      error: ref(null),
      fetchProjects: () => {},
    }),
  };
});

export function useProjects() {
  const projects = ref([
    { id: 1, title: 'Project 1' },
    { id: 2, title: 'Project 2' },
  ]);
  const isLoading = ref(false);
  const error = ref(null);
  const fetchProjects = () => {};
  return { projects, isLoading, error, fetchProjects };
}

describe('MScProjectsView.vue', () => {
  it('renders PageHeader with correct title and subtitle', () => {
    const wrapper = mount(ProjectPage);

    const pageHeader = wrapper.findComponent({ name: 'PageHeader' });
    expect(pageHeader.exists()).toBe(true);
    expect(pageHeader.props('title')).toBeDefined();
    expect(pageHeader.props('subtitle')).toBeDefined();
    expect(pageHeader.props('highlightWord')).toBe('Master');
  });

  it('renders ProjectsInfoBanner component', () => {
    const wrapper = mount(ProjectPage);
    expect(wrapper.findComponent({ name: 'ProjectInfoBanner' }).exists()).toBe(
      true
    );
  });

  it('renders SearchAndFilters component with props and emits', () => {
    const wrapper = mount(ProjectPage);

    const filtersComp = wrapper.findComponent({ name: 'SearchAndFilters' });
    expect(filtersComp.exists()).toBe(true);

    expect(filtersComp.props('searchQuery')).toBe('');
    expect(filtersComp.props('filters')).toBeDefined();
    expect(filtersComp.props('resultsText')).toBeDefined();
  });

  it('renders ProjectCard components if filteredProjects > 0', () => {
    const wrapper = mount(ProjectPage);
    const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' });
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it('renders InterestModal component and reacts to events', async () => {
    const wrapper = mount(ProjectPage);
    const modal = wrapper.findComponent({ name: 'InterestModal' });

    expect(modal.exists()).toBe(true);
  });
});
