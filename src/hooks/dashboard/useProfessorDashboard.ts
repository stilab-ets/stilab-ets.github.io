import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { mainAPI } from '@/services/ApiFactory';
import type { Publication, Research, Event } from '@/services/MainAPI';

interface ProfessorStats {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
}

interface RecentPublication {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface ActiveProject {
  id: string;
  title: string;
  deadline: string;
  status: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: string;
}

export function useProfessorDashboard() {
  const { t } = useLanguage();

  const publications = ref<Publication[]>([]);
  const projects = ref<Research[]>([]);
  const events = ref<Event[]>([]);
  const isLoading = ref(false);

  const tabs = computed(() => [
    {
      id: 'overview',
      label: t.value.dashboard.professor.tabs.overview,
      icon: 'BarChart3',
    },
    {
      id: 'publications',
      label: t.value.dashboard.professor.tabs.publications,
      icon: 'FileText',
    },
    {
      id: 'teaching',
      label: t.value.dashboard.professor.tabs.teaching,
      icon: 'GraduationCap',
    },
    {
      id: 'research',
      label: t.value.dashboard.professor.tabs.research,
      icon: 'TrendingUp',
    },
    {
      id: 'students',
      label: t.value.dashboard.professor.tabs.students,
      icon: 'Users',
    },
    {
      id: 'profile',
      label: t.value.dashboard.professor.tabs.profile,
      icon: 'User',
    },
  ]);

  const professorStats = computed<ProfessorStats[]>(() => [
    {
      title: t.value.dashboard.professor.stats.publications,
      value: publications.value.length,
      icon: 'FileText',
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.professor.stats.activeProjects,
      value: activeProjects.value.length,
      icon: 'Briefcase',
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.professor.stats.totalProjects,
      value: projects.value.length,
      icon: 'TrendingUp',
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.professor.stats.upcomingEvents,
      value: upcomingEvents.value.length,
      icon: 'Calendar',
      color: 'bg-orange-500',
    },
  ]);

  const recentPublications = computed<RecentPublication[]>(() => {
    return publications.value
      .slice()
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 10)
      .map((pub) => ({
        id: pub.id,
        title: pub.title,
        status: pub.is_approved ? 'published' : 'pending',
        date: pub.year ? pub.year.toString() : 'Unknown',
      }));
  });

  const activeProjects = computed<ActiveProject[]>(() => {
    return projects.value.map((project) => ({
      id: project.id,
      title: project.title,
      deadline: project.end_date || 'No deadline',
      status: 'active',
    }));
  });

  const upcomingEvents = computed<UpcomingEvent[]>(() => {
    const now = new Date();
    return events.value
      .filter((event) => event.date && new Date(event.date) > now)
      .slice(0, 10)
      .map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date || 'Unknown',
        type: event.type || 'conference',
      }));
  });

  const quickActions = computed(() => [
    {
      title: t.value.dashboard.professor.actions.addPublication,
      description: t.value.dashboard.professor.actions.addPublicationDesc,
      icon: 'Plus',
      action: () => console.log('Navigate to publication form'),
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.professor.actions.createEvent,
      description: t.value.dashboard.professor.actions.createEventDesc,
      icon: 'Calendar',
      action: () => console.log('Navigate to event form'),
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.professor.actions.manageProject,
      description: t.value.dashboard.professor.actions.manageProjectDesc,
      icon: 'Briefcase',
      action: () => console.log('Switch to research tab'),
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.professor.actions.updateProfile,
      description: t.value.dashboard.professor.actions.updateProfileDesc,
      icon: 'Settings',
      action: () => console.log('Switch to profile tab'),
      color: 'bg-orange-500',
    },
  ]);

  const loadDashboardData = async () => {
    isLoading.value = true;
    try {
      const [publicationsRes, projectsRes, eventsRes] = await Promise.all([
        mainAPI.getPublications(),
        mainAPI.getResearch(),
        mainAPI.getEvents(),
      ]);

      publications.value = publicationsRes.data || [];
      projects.value = projectsRes.data || [];
      events.value = eventsRes.data || [];
    } catch (error) {
      console.error('Failed to load professor dashboard data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadDashboardData();
  });

  return {
    tabs,
    professorStats,
    recentPublications,
    activeProjects,
    upcomingEvents,
    quickActions,
    isLoading,
    loadDashboardData,
  };
}
