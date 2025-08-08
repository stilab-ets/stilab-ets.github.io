import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import StudentDashboard from '@/components/dashboard/student/StudentDashboard.vue';
import DashboardHeader from '@/components/dashboard/common/DashboardHeader.vue';
import DashboardTabs from '@/components/dashboard/common/DashboardTabs.vue';
import DashboardStats from '@/components/dashboard/common/DashboardStats.vue';

const stubs = {
  DashboardHeader,
  DashboardTabs,
  DashboardStats,
  StudentOverview: true,
  StudentProjects: true,
  StudentCourses: true,
  StudentEvents: true,
  StudentProfile: true,
};

let isLoadingMock = false;

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      dashboard: {
        student: {
          title: 'Student Dashboard',
          welcome: 'Welcome Student',
        },
        header: {
          settings: 'Settings',
        },
      },
    },
  }),
}));

vi.mock('@/hooks/dashboard/useStudentDashboard', () => ({
  useStudentDashboard: () => ({
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'projects', label: 'Projects' },
      { id: 'courses', label: 'Courses' },
      { id: 'events', label: 'Events' },
      { id: 'profile', label: 'Profile' },
    ],
    studentStats: [{ label: 'Completed Courses', value: 10 }],
    isLoading: isLoadingMock,
  }),
}));

describe('StudentDashboard.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    isLoadingMock = false;
    wrapper = mount(StudentDashboard, {
      global: {
        stubs,
      },
    });
  });

  it('renders DashboardHeader with correct title and subtitle', () => {
    const header = wrapper.findComponent(DashboardHeader);
    expect(header.exists()).toBe(true);
    expect(header.props('title')).toBe('Student Dashboard');
    expect(header.props('subtitle')).toBe('Welcome Student');
  });

  it('renders DashboardTabs with tabs and v-model binding', async () => {
    const tabs = wrapper.findComponent(DashboardTabs);
    expect(tabs.exists()).toBe(true);
    expect(tabs.props('tabs')).toHaveLength(5);
    expect(tabs.props('modelValue')).toBe('overview');

    await tabs.vm.$emit('update:modelValue', 'projects');
    expect(wrapper.vm.activeTab).toBe('projects');
  });

  it('shows loading spinner when isLoading is true', () => {
    isLoadingMock = true;
    const loadingWrapper = mount(StudentDashboard, {
      global: { stubs },
    });

    expect(loadingWrapper.find('div.animate-spin').exists()).toBe(true);
    expect(loadingWrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders DashboardStats only on overview tab', async () => {
    expect(wrapper.vm.activeTab).toBe('overview');
    expect(wrapper.findComponent(DashboardStats).exists()).toBe(true);

    wrapper.vm.activeTab = 'events';
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders the correct tab component based on activeTab', async () => {
    const tabToComponentName = {
      overview: 'StudentOverview',
      projects: 'StudentProjects',
      courses: 'StudentCourses',
      events: 'StudentEvents',
      profile: 'StudentProfile',
    };

    for (const [tab, compName] of Object.entries(tabToComponentName)) {
      wrapper.vm.activeTab = tab;
      await wrapper.vm.$nextTick();

      const stub = wrapper.findComponent({ name: compName });
      expect(stub.exists()).toBe(true);
    }
  });
});
