// src/data/translations/dashboard.translate.ts
export interface DashboardTranslations {
  admin: {
    title: string
    welcome: string
    tabs: {
      overview: string
      users: string
      content: string
      system: string
      reports: string
    }
    actions: {
      inviteUser: string
      inviteUserDesc: string
      moderateContent: string
      moderateContentDesc: string
      systemSettings: string
      systemSettingsDesc: string
      viewReports: string
      viewReportsDesc: string
    }
    stats: {
      totalUsers: string
      activeUsers: string
      pendingContent: string
      systemHealth: string
    }
    recentActivity: {
      title: string
      userRegistered: string
      contentSubmitted: string
      systemAlert: string
    }
    content: {
      pendingReviews: string
      reviewAll: string
      review: string
      approve: string
    }
    system: {
      settings: string
      maintenanceMode: string
      registrationOpen: string
      health: string
    }
    reports: {
      title: string
      userReport: string
      contentReport: string
      systemReport: string
    }
  }
  professor: {
    title: string
    welcome: string
    tabs: {
      overview: string
      publications: string
      teaching: string
      research: string
      students: string
      profile: string
    }
    actions: {
      addPublication: string
      addPublicationDesc: string
      createEvent: string
      createEventDesc: string
      manageProject: string
      manageProjectDesc: string
      updateProfile: string
      updateProfileDesc: string
    }
    stats: {
      publications: string
      activeProjects: string
      students: string
      upcomingEvents: string
    }
    overview: {
      recentPublications: string
      activeProjects: string
      upcomingEvents: string
      viewAll: string
    }
    publications: {
      title: string
      addNew: string
      edit: string
      view: string
    }
    students: {
      title: string
      addNew: string
      empty: string
    }
  }
  student: {
    title: string
    welcome: string
    tabs: {
      overview: string
      projects: string
      courses: string
      events: string
      profile: string
    }
    actions: {
      quickActions: string
      browseProjects: string
      browseProjectsDesc: string
      registerEvents: string
      registerEventsDesc: string
      viewCourses: string
      viewCoursesDesc: string
      updateProfile: string
      updateProfileDesc: string
    }
    stats: {
      enrolledProjects: string
      upcomingEvents: string
      completedCourses: string
      submissions: string
    }
    overview: {
      myProjects: string
      upcomingEvents: string
      quickActions: string
      viewAll: string
    }
    projects: {
      title: string
      noProjects: string
      apply: string
      status: string
    }
    courses: {
      title: string
      noCourses: string
      enrolled: string
      completed: string
    }
    events: {
      title: string
      noEvents: string
      register: string
      registered: string
    }
    profile: {
      title: string
      personalInfo: string
      academicInfo: string
      save: string
    }
  }
}

export const dashboardTranslations = {
  en: {
    admin: {
      title: 'Admin Dashboard',
      welcome: 'Welcome back,',
      tabs: {
        overview: 'Overview',
        users: 'User Management',
        content: 'Content Moderation',
        system: 'System Settings',
        reports: 'Reports'
      },
      actions: {
        inviteUser: 'Invite User',
        inviteUserDesc: 'Send invitation to new researcher',
        moderateContent: 'Moderate Content',
        moderateContentDesc: 'Review pending submissions',
        systemSettings: 'System Settings',
        systemSettingsDesc: 'Configure lab settings',
        viewReports: 'View Reports',
        viewReportsDesc: 'Access analytics and reports'
      },
      stats: {
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        pendingContent: 'Pending Content',
        systemHealth: 'System Health'
      },
      recentActivity: {
        title: 'Recent Activity',
        userRegistered: 'New user registered',
        contentSubmitted: 'Content submitted for review',
        systemAlert: 'System maintenance alert'
      },
      content: {
        pendingReviews: 'Pending Reviews',
        reviewAll: 'Review All',
        review: 'Review',
        approve: 'Approve'
      },
      system: {
        settings: 'System Settings',
        maintenanceMode: 'Maintenance Mode',
        registrationOpen: 'Open Registration',
        health: 'System Health'
      },
      reports: {
        title: 'Analytics & Reports',
        userReport: 'User Report',
        contentReport: 'Content Report',
        systemReport: 'System Report'
      }
    },
    professor: {
      title: 'Dashboard',
      welcome: 'Welcome back,',
      tabs: {
        overview: 'Overview',
        publications: 'Publications',
        teaching: 'Teaching',
        research: 'Research',
        students: 'Students',
        profile: 'Profile'
      },
      actions: {
        addPublication: 'Add Publication',
        addPublicationDesc: 'Share your latest research',
        createEvent: 'Create Event',
        createEventDesc: 'Organize workshops and seminars',
        manageProject: 'Manage Projects',
        manageProjectDesc: 'Update research projects',
        updateProfile: 'Update Profile',
        updateProfileDesc: 'Edit your profile information'
      },
      stats: {
        publications: 'Publications',
        activeProjects: 'Active Projects',
        students: 'Students'
      },
      overview: {
        recentPublications: 'Recent Publications',
        activeProjects: 'Active Projects',
        upcomingEvents: 'Upcoming Events',
        viewAll: 'View All'
      },
      publications: {
        title: 'My Publications',
        addNew: 'Add Publication',
        edit: 'Edit',
        view: 'View'
      },
      students: {
        title: 'My Students',
        addNew: 'Add Student',
        empty: 'No students assigned yet'
      }
    },
    student: {
      title: 'Student Dashboard',
      welcome: 'Welcome back,',
      tabs: {
        overview: 'Overview',
        projects: 'My Projects',
        courses: 'Courses',
        events: 'Events',
        profile: 'Profile'
      },
      actions: {
        browseProjects: 'Browse Projects',
        browseProjectsDesc: 'Find new research opportunities',
        registerEvents: 'Register for Events',
        registerEventsDesc: 'Join upcoming seminars and workshops',
        viewCourses: 'View Courses',
        viewCoursesDesc: 'Check your enrolled courses',
        updateProfile: 'Update Profile',
        updateProfileDesc: 'Manage your account settings',
        quickActions: 'Quick actions'
      },
      stats: {
        enrolledProjects: 'Enrolled Projects',
        upcomingEvents: 'Upcoming Events',
        completedCourses: 'Completed Courses',
        submissions: 'Submissions'
      },
      overview: {
        myProjects: 'My Projects',
        upcomingEvents: 'Upcoming Events',
        quickActions: 'Quick Actions',
        viewAll: 'View All'
      },
      projects: {
        title: 'My Projects',
        noProjects: 'No enrolled projects yet',
        apply: 'Apply',
        status: 'Status'
      },
      courses: {
        title: 'My Courses',
        noCourses: 'No enrolled courses yet',
        enrolled: 'Enrolled',
        completed: 'Completed'
      },
      events: {
        title: 'Events',
        noEvents: 'No upcoming events',
        register: 'Register',
        registered: 'Registered'
      },
      profile: {
        title: 'Profile',
        personalInfo: 'Personal Information',
        academicInfo: 'Academic Information',
        save: 'Save Changes'
      }
    }
  },
  fr: {
    admin: {
      title: 'Tableau de bord administrateur',
      welcome: 'Bon retour,',
      tabs: {
        overview: 'Vue d\'ensemble',
        users: 'Gestion des utilisateurs',
        content: 'Modération du contenu',
        system: 'Paramètres système',
        reports: 'Rapports'
      },
      actions: {
        inviteUser: 'Inviter un utilisateur',
        inviteUserDesc: 'Envoyer une invitation à un nouveau chercheur',
        moderateContent: 'Modérer le contenu',
        moderateContentDesc: 'Examiner les soumissions en attente',
        systemSettings: 'Paramètres système',
        systemSettingsDesc: 'Configurer les paramètres du laboratoire',
        viewReports: 'Voir les rapports',
        viewReportsDesc: 'Accéder aux analyses et rapports',
        quickActions: 'Actions rapides'
      },
      stats: {
        totalUsers: 'Total des utilisateurs',
        activeUsers: 'Utilisateurs actifs',
        pendingContent: 'Contenu en attente',
        systemHealth: 'Santé du système'
      },
      recentActivity: {
        title: 'Activité récente',
        userRegistered: 'Nouvel utilisateur inscrit',
        contentSubmitted: 'Contenu soumis pour examen',
        systemAlert: 'Alerte de maintenance système'
      },
      content: {
        pendingReviews: 'Examens en attente',
        reviewAll: 'Tout examiner',
        review: 'Examiner',
        approve: 'Approuver'
      },
      system: {
        settings: 'Paramètres système',
        maintenanceMode: 'Mode maintenance',
        registrationOpen: 'Inscription ouverte',
        health: 'Santé du système'
      },
      reports: {
        title: 'Analyses et rapports',
        userReport: 'Rapport utilisateurs',
        contentReport: 'Rapport contenu',
        systemReport: 'Rapport système'
      }
    },
    professor: {
      title: 'Tableau de bord',
      welcome: 'Bon retour,',
      tabs: {
        overview: 'Vue d\'ensemble',
        publications: 'Publications',
        teaching: 'Enseignement',
        research: 'Recherche',
        students: 'Étudiants',
        profile: 'Profil'
      },
      actions: {
        addPublication: 'Ajouter une publication',
        addPublicationDesc: 'Partagez vos dernières recherches',
        createEvent: 'Créer un événement',
        createEventDesc: 'Organiser des ateliers et séminaires',
        manageProject: 'Gérer les projets',
        manageProjectDesc: 'Mettre à jour les projets de recherche',
        updateProfile: 'Mettre à jour le profil',
        updateProfileDesc: 'Modifier vos informations de profil'
      },
      stats: {
        publications: 'Publications',
        activeProjects: 'Projets actifs',
        students: 'Étudiants',
        upcomingEvents: 'Événements à venir'
      },
      overview: {
        recentPublications: 'Publications récentes',
        activeProjects: 'Projets actifs',
        upcomingEvents: 'Événements à venir',
        viewAll: 'Voir tout'
      },
      publications: {
        title: 'Mes publications',
        addNew: 'Ajouter une publication',
        edit: 'Modifier',
        view: 'Voir'
      },
      students: {
        title: 'Mes étudiants',
        addNew: 'Ajouter un étudiant',
        empty: 'Aucun étudiant assigné pour le moment'
      }
    },
    student: {
      title: 'Tableau de bord étudiant',
      welcome: 'Bon retour,',
      tabs: {
        overview: 'Vue d\'ensemble',
        projects: 'Mes projets',
        courses: 'Cours',
        events: 'Événements',
        profile: 'Profil'
      },
      actions: {
        browseProjects: 'Parcourir les projets',
        browseProjectsDesc: 'Trouver de nouvelles opportunités de recherche',
        registerEvents: 'S\'inscrire aux événements',
        registerEventsDesc: 'Rejoindre les séminaires et ateliers à venir',
        viewCourses: 'Voir les cours',
        viewCoursesDesc: 'Vérifier vos cours inscrits',
        updateProfile: 'Mettre à jour le profil',
        updateProfileDesc: 'Gérer les paramètres de votre compte'
      },
      stats: {
        enrolledProjects: 'Projets inscrits',
        upcomingEvents: 'Événements à venir',
        completedCourses: 'Cours terminés',
        submissions: 'Soumissions'
      },
      overview: {
        myProjects: 'Mes projets',
        upcomingEvents: 'Événements à venir',
        quickActions: 'Actions rapides',
        viewAll: 'Voir tout'
      },
      projects: {
        title: 'Mes projets',
        noProjects: 'Aucun projet inscrit pour le moment',
        apply: 'Postuler',
        status: 'Statut'
      },
      courses: {
        title: 'Mes cours',
        noCourses: 'Aucun cours inscrit pour le moment',
        enrolled: 'Inscrit',
        completed: 'Terminé'
      },
      events: {
        title: 'Événements',
        noEvents: 'Aucun événement à venir',
        register: 'S\'inscrire',
        registered: 'Inscrit'
      },
      profile: {
        title: 'Profil',
        personalInfo: 'Informations personnelles',
        academicInfo: 'Informations académiques',
        save: 'Sauvegarder les modifications'
      }
    }
  }
} as const