import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { mainAPI } from '@/services/ApiFactory';
import { useInvitations } from '@/hooks/admin/useInvitations';
import type { Publication, Event, Research } from '@/services/MainAPI';
import { Member } from '@/services/user.types';

interface AdminStats {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
  joined: string;
}

interface RecentContent {
  id: string;
  title: string;
  type: 'publication' | 'event' | 'project' | 'user';
  author: string;
  timestamp: string;
  status: string;
  icon: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  action: () => void;
  color: string;
}

export function useAdminDashboard() {
  const { t } = useLanguage();
  const { invitations, fetchInvitations } = useInvitations();

  const users = ref<Member[]>([]);
  const publications = ref<Publication[]>([]);
  const events = ref<Event[]>([]);
  const projects = ref<Research[]>([]);
  const isLoading = ref(false);

  const tabs = computed(() => [
    {
      id: 'overview',
      label: t.value.dashboard.admin.tabs.overview,
      icon: 'BarChart3',
    },
    {
      id: 'users',
      label: t.value.dashboard.admin.tabs.users,
      icon: 'Users',
      count: users.value.length,
    },
    {
      id: 'invitations',
      label: t.value.dashboard.admin.tabs.invitations,
      icon: 'UserPlus',
      count: invitations.value.filter((inv) => inv.status === 'pending').length,
    },
    {
      id: 'content',
      label: t.value.dashboard.admin.tabs.content,
      icon: 'FileText',
    },
    {
      id: 'reports',
      label: t.value.dashboard.admin.tabs.reports,
      icon: 'TrendingUp',
    },
    {
      id: 'forms',
      label: t.value.dashboard.admin.tabs.forms,
      icon: 'FilePlus',
    },
  ]);

  const adminStats = computed<AdminStats[]>(() => [
    {
      title: t.value.dashboard.admin.stats.totalUsers,
      value: users.value.length,
      icon: 'Users',
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.admin.stats.totalPublications,
      value: publications.value.length,
      icon: 'FileText',
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.admin.stats.activeProjects,
      value: projects.value.length,
      icon: 'Briefcase',
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.admin.stats.pendingInvitations,
      value: invitations.value.filter((inv) => inv.status === 'pending').length,
      icon: 'UserPlus',
      color: 'bg-orange-500',
    },
  ]);

  const recentUsers = computed<RecentUser[]>(() => {
    return users.value
      .slice()
      .sort(
        (a, b) =>
          new Date(b.user?.date_joined || 0).getTime() -
          new Date(a.user?.date_joined || 0).getTime()
      )
      .slice(0, 10)
      .map((member) => ({
        id: member.id,
        name: `${member.first_name} ${member.last_name}`.trim(),
        email: member.email || member.user?.email || '',
        role: member.user?.is_staff ? 'admin' : member.role || 'student',
        initials: getInitials(
          `${member.first_name} ${member.last_name}`.trim()
        ),
        joined: member.user?.date_joined
          ? new Date(member.user.date_joined).toLocaleDateString()
          : t.value.dashboard.admin.overview.unknown,
      }));
  });

  const recentContent = computed<RecentContent[]>(() => {
    const content: RecentContent[] = [];

    // Add publications
    publications.value.slice(0, 3).forEach((pub) => {
      content.push({
        id: `pub-${pub.id}`,
        title: pub.title,
        type: 'publication',
        author: pub.author || t.value.dashboard.admin.overview.unknown,
        timestamp: pub.year
          ? `${pub.year}`
          : t.value.dashboard.admin.overview.unknown,
        status: pub.is_approved ? 'published' : 'pending',
        icon: 'FileText',
      });
    });

    // Add events
    events.value.slice(0, 3).forEach((event) => {
      content.push({
        id: `event-${event.id}`,
        title: event.title,
        type: 'event',
        author: event.speaker
          ? `${event.speaker.first_name} ${event.speaker.last_name}`
          : t.value.dashboard.admin.overview.system,
        timestamp: event.date || t.value.dashboard.admin.overview.unknown,
        status: event.is_upcoming ? 'upcoming' : 'past',
        icon: 'Calendar',
      });
    });

    // Add projects
    projects.value.slice(0, 2).forEach((project) => {
      content.push({
        id: `project-${project.id}`,
        title: project.title,
        type: 'project',
        author: t.value.dashboard.admin.overview.system,
        timestamp: project.start_date,
        status: 'active',
        icon: 'Briefcase',
      });
    });

    return content.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

  const quickActions = computed<QuickAction[]>(() => [
    {
      title: t.value.dashboard.admin.actions.sendInvitation,
      description: t.value.dashboard.admin.actions.sendInvitationDesc,
      icon: 'UserPlus',
      action: () => console.log('Navigate to invitation form'),
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.admin.actions.manageUsers,
      description: t.value.dashboard.admin.actions.manageUsersDesc,
      icon: 'Users',
      action: () => console.log('Navigate to user management'),
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.admin.actions.manageContent,
      description: t.value.dashboard.admin.actions.manageContentDesc,
      icon: 'FileText',
      action: () => console.log('Navigate to content management'),
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.admin.actions.viewReports,
      description: t.value.dashboard.admin.actions.viewReportsDesc,
      icon: 'TrendingUp',
      action: () => console.log('Navigate to reports'),
      color: 'bg-orange-500',
    },
  ]);

  const userManagement = computed(() => ({
    totalUsers: users.value.length,
    activeUsers: users.value.filter((u) => u.user?.is_active).length,
    adminUsers: users.value.filter((u) => u.user?.is_staff).length,
    recentRegistrations: users.value.filter((u) => {
      if (!u.user?.date_joined) return false;
      const joinDate = new Date(u.user.date_joined);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return joinDate > weekAgo;
    }).length,
  }));

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name[0]?.toUpperCase() || 'U';
  };

  const loadDashboardData = async () => {
    isLoading.value = true;
    try {
      const [membersRes, publicationsRes, eventsRes, researchRes] =
        await Promise.all([
          mainAPI.getMembers(),
          mainAPI.getPublications(),
          mainAPI.getEvents(),
          mainAPI.getResearch(),
          fetchInvitations(),
        ]);

      users.value = membersRes.data || [];
      publications.value = publicationsRes.data || [];
      events.value = eventsRes.data || [];
      projects.value = researchRes.data || [];
    } catch (error) {
      console.error('Failed to load admin dashboard data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadDashboardData();
  });

  return {
    tabs,
    adminStats,
    recentUsers,
    recentContent,
    quickActions,
    userManagement,
    invitations,
    isLoading,
    loadDashboardData,
  };
}
