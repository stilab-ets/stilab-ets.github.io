import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import AdminDashboard from '@/components/dashboard/admin/AdminDashboard.vue';
import DashboardHeader from '@/components/dashboard/common/DashboardHeader.vue';
import DashboardTabs from '@/components/dashboard/common/DashboardTabs.vue';
import DashboardStats from '@/components/dashboard/common/DashboardStats.vue';

// Stub all admin tab components to avoid deep render issues
const stubs = {
  DashboardHeader,
  DashboardTabs,
  DashboardStats,
  AdminOverview: true,
  AdminUserManagement: true,
  AdminInvitations: true,
  AdminContentManagement: true,
  AdminReports: true,
  AdminForm: true,
};

// Use a variable to control the mock return value dynamically
let isLoadingMock = false;

// Mock useLanguage composable
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      dashboard: {
        admin: {
          title: 'Admin Dashboard',
          welcome: 'Welcome Admin',
          overview: {
            quickActions: 'Quick Actions',
          },
        },
        header: {
          settings: 'Settings',
        },
      },
    },
  }),
}));

// Mock useAdminDashboard composable once, reading from isLoadingMock
vi.mock('@/hooks/dashboard/useAdminDashboard', () => ({
  useAdminDashboard: () => ({
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'users', label: 'Users' },
      { id: 'invitations', label: 'Invitations' },
      { id: 'content', label: 'Content' },
      { id: 'reports', label: 'Reports' },
      { id: 'forms', label: 'Forms' },
    ],
    adminStats: [{ label: 'Users', value: 10 }],
    isLoading: isLoadingMock,
  }),
}));

describe('AdminDashboard.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    isLoadingMock = false;

    wrapper = mount(AdminDashboard, {
      global: {
        stubs,
      },
    });
  });

  it('renders DashboardHeader with correct title and subtitle', () => {
    const header = wrapper.findComponent(DashboardHeader);
    expect(header.exists()).toBe(true);
    expect(header.props('title')).toBe('Admin Dashboard');
    expect(header.props('subtitle')).toBe('Welcome Admin');
  });

  it('renders DashboardTabs with tabs and v-model binding', async () => {
    const tabs = wrapper.findComponent(DashboardTabs);
    expect(tabs.exists()).toBe(true);
    expect(tabs.props('tabs')).toHaveLength(6);
    expect(tabs.props('modelValue')).toBe('overview');

    await tabs.vm.$emit('update:modelValue', 'users');
    expect(wrapper.vm.activeTab).toBe('users');
  });

  it('shows loading spinner when isLoading is true', async () => {
    isLoadingMock = true;

    const loadingWrapper = mount(AdminDashboard, {
      global: {
        stubs,
      },
    });

    expect(loadingWrapper.find('div.animate-spin').exists()).toBe(true);
    expect(loadingWrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders DashboardStats only on overview tab', async () => {
    expect(wrapper.vm.activeTab).toBe('overview');
    expect(wrapper.findComponent(DashboardStats).exists()).toBe(true);

    wrapper.vm.activeTab = 'users';
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(DashboardStats).exists()).toBe(false);
  });

  it('renders the correct tab component based on activeTab', async () => {
    const tabToComponentName = {
      overview: 'AdminOverview',
      users: 'AdminUserManagement',
      invitations: 'AdminInvitations',
      content: 'AdminContentManagement',
      reports: 'AdminReports',
      forms: 'AdminForm',
    };

    for (const [tab, compName] of Object.entries(tabToComponentName)) {
      wrapper.vm.activeTab = tab;
      await wrapper.vm.$nextTick();

      const stub = wrapper.findComponent({ name: compName });
      expect(stub.exists()).toBe(true);
    }
  });
});
