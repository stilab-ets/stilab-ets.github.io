import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ProfessorDashboard from '@/components/dashboard/professor/ProfessorDashboard.vue';
import DashboardHeader from '@/components/dashboard/common/DashboardHeader.vue';
import DashboardTabs from '@/components/dashboard/common/DashboardTabs.vue';
import DashboardStats from '@/components/dashboard/common/DashboardStats.vue';

const stubs = {
  DashboardHeader,
  DashboardTabs,
  DashboardStats,
  ProfessorOverview: true,
  ProfessorPublications: true,
  ProfessorTeaching: true,
  ProfessorResearch: true,
  ProfessorStudents: true,
  ProfessorProfile: true,
};

let isLoadingMock = false;

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      dashboard: {
        professor: {
          title: 'Professor Dashboard',
          welcome: 'Welcome Professor',
        },
        header: {
          settings: 'Settings',
        },
      },
    },
  }),
}));

vi.mock('@/hooks/dashboard/useProfessorDashboard', () => ({
  useProfessorDashboard: () => ({
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'publications', label: 'Publications' },
      { id: 'teaching', label: 'Teaching' },
      { id: 'research', label: 'Research' },
      { id: 'students', label: 'Students' },
      { id: 'profile', label: 'Profile' },
    ],
    professorStats: [{ label: 'Courses', value: 5 }],
    isLoading: isLoadingMock,
  }),
}));

describe('ProfessorDashboard.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    isLoadingMock = false;
    wrapper = mount(ProfessorDashboard, {
      global: {
        stubs,
      },
    });
  });

  it('renders DashboardHeader with correct title and subtitle', () => {
    const header = wrapper.findComponent(DashboardHeader);
    expect(header.exists()).toBe(true);
    expect(header.props('title')).toBe('Professor Dashboard');
    expect(header.props('subtitle')).toBe('Welcome Professor');
  });

  it('renders DashboardTabs with tabs and v-model binding', async () => {
    const tabs = wrapper.findComponent(DashboardTabs);
    expect(tabs.exists()).toBe(true);
    expect(tabs.props('tabs')).toHaveLength(6);
    expect(tabs.props('modelValue')).toBe('overview');

    await tabs.vm.$emit('update:modelValue', 'publications');
    expect(wrapper.vm.activeTab).toBe('publications');
  });

  it('shows loading spinner when isLoading is true', async () => {
    isLoadingMock = true;
    const loadingWrapper = mount(ProfessorDashboard, {
      global: { stubs },
    });

    expect(loadingWrapper.find('div.animate-spin').exists()).toBe(true);
    expect(loadingWrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders DashboardStats only on overview tab', async () => {
    expect(wrapper.vm.activeTab).toBe('overview');
    expect(wrapper.findComponent(DashboardStats).exists()).toBe(true);

    wrapper.vm.activeTab = 'teaching';
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders the correct tab component based on activeTab', async () => {
    const tabToComponentName = {
      overview: 'ProfessorOverview',
      publications: 'ProfessorPublications',
      teaching: 'ProfessorTeaching',
      research: 'ProfessorResearch',
      students: 'ProfessorStudents',
      profile: 'ProfessorProfile',
    };

    for (const [tab, compName] of Object.entries(tabToComponentName)) {
      wrapper.vm.activeTab = tab;
      await wrapper.vm.$nextTick();

      const stub = wrapper.findComponent({ name: compName });
      expect(stub.exists()).toBe(true);
    }
  });
});
