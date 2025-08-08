import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { mainAPI } from '@/services/ApiFactory';
import type { Project, Event } from '@/services/MainAPI';

interface StudentStats {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
}

interface StudentProject {
  id: string;
  title: string;
  status: 'enrolled' | 'completed' | 'pending';
  progress: number;
  supervisor: string;
  deadline: string;
}

export function useStudentDashboard() {
  const { t } = useLanguage();

  const projects = ref<Project[]>([]);
  const events = ref<Event[]>([]);
  const isLoading = ref(false);

  const tabs = computed(() => [
    {
      id: 'overview',
      label: t.value.dashboard.student.tabs.overview,
      icon: 'BarChart3',
    },
    {
      id: 'projects',
      label: t.value.dashboard.student.tabs.projects,
      icon: 'Briefcase',
    },
    {
      id: 'courses',
      label: t.value.dashboard.student.tabs.courses,
      icon: 'GraduationCap',
    },
    {
      id: 'events',
      label: t.value.dashboard.student.tabs.events,
      icon: 'Calendar',
    },
    {
      id: 'profile',
      label: t.value.dashboard.student.tabs.profile,
      icon: 'User',
    },
  ]);

  const studentStats = computed<StudentStats[]>(() => [
    {
      title: t.value.dashboard.student.stats.enrolledProjects,
      value: myProjects.value.filter((p) => p.status === 'enrolled').length,
      icon: 'Briefcase',
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.student.stats.upcomingEvents,
      value: nextEvents.value.length,
      icon: 'Calendar',
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.student.stats.availableProjects,
      value: projects.value.filter((p) => p.status === 'available').length,
      icon: 'GraduationCap',
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.student.stats.totalProjects,
      value: projects.value.length,
      icon: 'FileText',
      color: 'bg-orange-500',
    },
  ]);

  const myProjects = computed<StudentProject[]>(() => {
    return projects.value
      .filter((p) => p.status === 'assigned' || p.status === 'completed')
      .map((project) => ({
        id: project.id,
        title: project.title,
        status: project.status === 'completed' ? 'completed' : 'enrolled',
        progress:
          project.status === 'completed'
            ? 100
            : Math.floor(Math.random() * 80) + 10,
        supervisor: project.supervisor || 'Unknown',
        deadline:
          typeof project.endDate === 'string'
            ? project.endDate
            : project.endDate.toISOString(),
      }));
  });

  const nextEvents = computed(() => {
    const now = new Date();
    return events.value
      .filter((event) => event.date && new Date(event.date) > now)
      .slice(0, 5)
      .map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date || 'Unknown',
        location: event.location || 'TBD',
        type: event.type || 'event',
      }));
  });

  const quickActions = computed(() => [
    {
      title: t.value.dashboard.student.actions.viewProjects,
      description: t.value.dashboard.student.actions.viewProjectsDesc,
      icon: 'Briefcase',
      action: () => console.log('Switch to projects tab'),
      color: 'bg-blue-500',
    },
    {
      title: t.value.dashboard.student.actions.checkEvents,
      description: t.value.dashboard.student.actions.checkEventsDesc,
      icon: 'Calendar',
      action: () => console.log('Switch to events tab'),
      color: 'bg-green-500',
    },
    {
      title: t.value.dashboard.student.actions.updateProfile,
      description: t.value.dashboard.student.actions.updateProfileDesc,
      icon: 'User',
      action: () => console.log('Switch to profile tab'),
      color: 'bg-purple-500',
    },
    {
      title: t.value.dashboard.student.actions.viewCourses,
      description: t.value.dashboard.student.actions.viewCoursesDesc,
      icon: 'GraduationCap',
      action: () => console.log('Switch to courses tab'),
      color: 'bg-orange-500',
    },
  ]);

  const loadDashboardData = async () => {
    isLoading.value = true;
    try {
      const [projectsRes, eventsRes] = await Promise.all([
        mainAPI.getProjects
          ? mainAPI.getProjects()
          : Promise.resolve({ data: [] }),
        mainAPI.getEvents(),
      ]);

      projects.value = projectsRes.data || [];
      events.value = eventsRes.data || [];
    } catch (error) {
      console.error('Failed to load student dashboard data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadDashboardData();
  });

  return {
    tabs,
    studentStats,
    myProjects,
    nextEvents,
    quickActions,
    isLoading,
    loadDashboardData,
  };
}
