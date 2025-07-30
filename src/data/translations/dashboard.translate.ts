export interface DashboardTranslations {
  header: {
    settings: string
    logout: string
  }
  errors: {
    accessDenied: {
      title: string
      description: string
    }
    accessRestricted: {
      title: string
      description: string
    }
  }
  admin: {
    title: string
    welcome: string
    tabs: {
      overview: string
      users: string
      invitations: string
      content: string
      reports: string
    }
    stats: {
      totalUsers: string
      totalPublications: string
      activeProjects: string
      pendingInvitations: string
    }
    actions: {
      sendInvitation: string
      sendInvitationDesc: string
      manageUsers: string
      manageUsersDesc: string
      manageContent: string
      manageContentDesc: string
      viewReports: string
      viewReportsDesc: string
    }
    overview: {
      quickActions: string
      recentUsers: string
      pendingInvitations: string
      recentActivity: string
      viewAll: string
      sendInvitation: string
      invitationDetails: string
      sent: string
      byAuthor: string
      unknown: string
      system: string
      noPendingInvitations: string
      roles: {
        admin: string
        professor: string
        researcher: string
        student: string
      }
      contentStatus: {
        published: string
        draft: string
        active: string
        pending: string
        upcoming: string
        past: string
      }
    }
    users: {
      title: string
      description: string
      addUser: string
      searchPlaceholder: string
      stats: {
        totalUsers: string
        activeUsers: string
        adminUsers: string
        newThisWeek: string
      }
      table: {
        user: string
        role: string
        joined: string
        actions: string
      }
      filters: {
        allRoles: string
        admin: string
        professor: string
        researcher: string
        student: string
      }
      roles: {
        admin: string
        professor: string
        researcher: string
        student: string
      }
    }
    invitations: {
      title: string
      description: string
      sendInvitation: string
      sending: string
      searchPlaceholder: string
      confirmDelete: string
      confirmCancel: string
      roles: {
        student: string
        professor: string
        researcher: string
        admin: string
      }
      status: {
        all: string
        pending: string
        expired: string
        registered: string
        canceled: string
      }
      stats: {
        total: string
        pending: string
        registered: string
        expired: string
      }
      table: {
        email: string
        role: string
        status: string
        sentDate: string
        expires: string
        actions: string
      }
      sendInvitationModal: {
        title: string
        email: string
        emailPlaceholder: string
        role: string
      }
    }
    content: {
      publications: {
        title: string
        description: string
      }
      events: {
        title: string
        description: string
      }
      projects: {
        title: string
        description: string
      }
      recentContent: {
        title: string
        byAuthor: string
      }
      status: {
        published: string
        pending: string
        draft: string
      }
    }
    reports: {
      systemStatistics: string
      userAnalytics: string
      totalUsers: string
      activeUsers: string
      adminUsers: string
      newThisWeek: string
    }
    settings: {
      title: string
      description: string
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
    stats: {
      publications: string
      activeProjects: string
      totalProjects: string
      upcomingEvents: string
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
    overview: {
      quickActions: string
      recentPublications: string
      activeProjects: string
      upcomingEvents: string
      viewAll: string
      performanceMetrics: string
    }
    publications: {
      title: string
      addPublication: string
      status: {
        published: string
        pending: string
      }
    }
    research: {
      title: string
      addProject: string
      due: string
      status: {
        active: string
        completed: string
      }
    }
    students: {
      title: string
      addStudent: string
      noStudentsYet: string
      description: string
    }
    teaching: {
      title: string
      addCourse: string
      noCoursesYet: string
      description: string
    }
    profile: {
      title: string
      editProfile: string
      notSet: string
      unknown: string
      defaultRole: string
      fields: {
        firstName: string
        lastName: string
        email: string
        memberSince: string
      }
      roleLabel: {
        professor: string
        researcher: string
        admin: string
      }
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
    stats: {
      enrolledProjects: string
      upcomingEvents: string
      availableProjects: string
      totalProjects: string
    }
    actions: {
      viewProjects: string
      viewProjectsDesc: string
      checkEvents: string
      checkEventsDesc: string
      updateProfile: string
      updateProfileDesc: string
      viewCourses: string
      viewCoursesDesc: string
    }
    overview: {
      quickActions: string
      myProjects: string
      upcomingEvents: string
      viewAll: string
      academicProgress: string
    }
    projects: {
      title: string
      supervisor: string
      complete: string
      status: {
        enrolled: string
        completed: string
        pending: string
      }
    }
    courses: {
      title: string
      noCoursesAvailable: string
      description: string
    }
    events: {
      title: string
      types: {
        seminar: string
        workshop: string
        conference: string
      }
    }
    profile: {
      title: string
      editProfile: string
      notSet: string
      unknown: string
      defaultRole: string
      fields: {
        firstName: string
        lastName: string
        email: string
        memberSince: string
      }
      roleLabel: {
        student: string
      }
    }
  }
}

type DashboardTranslationDict = {
  fr: DashboardTranslations;
  en: DashboardTranslations;
};

export const dashboardTranslations: DashboardTranslationDict = {
  en: {
    header: {
      settings: 'Settings',
      logout: 'Logout'
    },
    errors: {
      accessDenied: {
        title: 'Access Denied',
        description: 'You need to be logged in to access the dashboard.'
      },
      accessRestricted: {
        title: 'Access Restricted',
        description: 'Your account doesn\'t have permission to access the dashboard.'
      }
    },
    admin: {
      title: 'Admin Dashboard',
      welcome: 'Welcome back, Administrator',
      tabs: {
        overview: 'Overview',
        users: 'Users',
        invitations: 'Invitations',
        content: 'Content',
        reports: 'Reports'
      },
      stats: {
        totalUsers: 'Total Users',
        totalPublications: 'Total Publications',
        activeProjects: 'Active Projects',
        pendingInvitations: 'Pending Invitations'
      },
      actions: {
        sendInvitation: 'Send Invitation',
        sendInvitationDesc: 'Invite new users to join',
        manageUsers: 'Manage Users',
        manageUsersDesc: 'Control user access and roles',
        manageContent: 'Manage Content',
        manageContentDesc: 'Review and moderate content',
        viewReports: 'View Reports',
        viewReportsDesc: 'Access analytics and insights'
      },
      overview: {
        quickActions: 'Quick Actions',
        recentUsers: 'Recent Users',
        pendingInvitations: 'Pending Invitations',
        recentActivity: 'Recent Activity',
        viewAll: 'View All',
        sendInvitation: 'Send Invitation',
        invitationDetails: 'Role:',
        sent: 'Sent:',
        byAuthor: 'by',
        unknown: 'Unknown',
        system: 'System',
        noPendingInvitations: 'No pending invitations',
        roles: {
          admin: 'Admin',
          professor: 'Professor',
          researcher: 'Researcher',
          student: 'Student'
        },
        contentStatus: {
          published: 'published',
          draft: 'draft',
          active: 'active',
          pending: 'pending',
          upcoming: 'upcoming',
          past: 'past'
        }
      },
      users: {
        title: 'User Management',
        description: 'Manage users, roles, and permissions',
        addUser: 'Add User',
        searchPlaceholder: 'Search users...',
        stats: {
          totalUsers: 'Total Users',
          activeUsers: 'Active Users',
          adminUsers: 'Admin Users',
          newThisWeek: 'New This Week'
        },
        table: {
          user: 'User',
          role: 'Role',
          joined: 'Joined',
          actions: 'Actions'
        },
        filters: {
          allRoles: 'All Roles',
          admin: 'Admin',
          professor: 'Professor',
          researcher: 'Researcher',
          student: 'Student'
        },
        roles: {
          admin: 'Admin',
          professor: 'Professor',
          researcher: 'Researcher',
          student: 'Student'
        }
      },
      invitations: {
        title: 'Invitations',
        description: 'Manage user invitations and registrations',
        sendInvitation: 'Send Invitation',
        sending: 'Sending...',
        searchPlaceholder: 'Search by email...',
        confirmDelete: 'Are you sure you want to delete this invitation?',
        confirmCancel: 'Are you sure you want to cancel this invitation?',
        roles: {
          student: 'Student',
          professor: 'Professor',
          researcher: 'Researcher',
          admin: 'Admin'
        },
        status: {
          all: 'All Status',
          pending: 'Pending',
          expired: 'Expired',
          registered: 'Registered',
          canceled: 'Canceled'
        },
        stats: {
          total: 'Total Invitations',
          pending: 'Pending',
          registered: 'Registered',
          expired: 'Expired'
        },
        table: {
          email: 'Email',
          role: 'Role',
          status: 'Status',
          sentDate: 'Sent Date',
          expires: 'Expires',
          actions: 'Actions'
        },
        sendInvitationModal: {
          title: 'Send Invitation',
          email: 'Email',
          emailPlaceholder: 'user@example.com',
          role: 'Role'
        }
      },
      content: {
        publications: {
          title: 'Publications',
          description: 'Manage research publications and papers.'
        },
        events: {
          title: 'Events',
          description: 'Manage conferences, seminars, and workshops.'
        },
        projects: {
          title: 'Projects',
          description: 'Manage research projects and collaborations.'
        },
        recentContent: {
          title: 'Recent Content',
          byAuthor: 'by'
        },
        status: {
          published: 'published',
          pending: 'pending',
          draft: 'draft'
        }
      },
      reports: {
        systemStatistics: 'System Statistics',
        userAnalytics: 'User Analytics',
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        adminUsers: 'Admin Users',
        newThisWeek: 'New This Week'
      },
      settings: {
        title: 'System Settings',
        description: 'Configure system-wide settings and preferences.'
      }
    },
    professor: {
      title: 'Dashboard',
      welcome: 'Welcome back, Professor',
      tabs: {
        overview: 'Overview',
        publications: 'Publications',
        teaching: 'Teaching',
        research: 'Research',
        students: 'Students',
        profile: 'Profile'
      },
      stats: {
        publications: 'Publications',
        activeProjects: 'Active Projects',
        totalProjects: 'Total Projects',
        upcomingEvents: 'Upcoming Events'
      },
      actions: {
        addPublication: 'Add Publication',
        addPublicationDesc: 'Share your latest research',
        createEvent: 'Create Event',
        createEventDesc: 'Organize a new event',
        manageProject: 'Manage Projects',
        manageProjectDesc: 'Update project status',
        updateProfile: 'Update Profile',
        updateProfileDesc: 'Edit your information'
      },
      overview: {
        quickActions: 'Quick Actions',
        recentPublications: 'Recent Publications',
        activeProjects: 'Active Projects',
        upcomingEvents: 'Upcoming Events',
        viewAll: 'View All',
        performanceMetrics: 'Performance Metrics'
      },
      publications: {
        title: 'My Publications',
        addPublication: 'Add Publication',
        status: {
          published: 'published',
          pending: 'pending'
        }
      },
      research: {
        title: 'Research Projects',
        addProject: 'Add Project',
        due: 'Due',
        status: {
          active: 'active',
          completed: 'completed'
        }
      },
      students: {
        title: 'Students',
        addStudent: 'Add Student',
        noStudentsYet: 'No Students Yet',
        description: 'Start supervising students to see them here.'
      },
      teaching: {
        title: 'Teaching',
        addCourse: 'Add Course',
        noCoursesYet: 'No Courses Yet',
        description: 'Start by adding your first course or teaching activity.'
      },
      profile: {
        title: 'Profile Settings',
        editProfile: 'Edit Profile',
        notSet: 'Not set',
        unknown: 'Unknown',
        defaultRole: 'Professor',
        fields: {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          memberSince: 'Member Since'
        },
        roleLabel: {
          professor: 'Professor',
          researcher: 'Researcher',
          admin: 'Admin'
        }
      }
    },
    student: {
      title: 'Student Dashboard',
      welcome: 'Welcome back, Student',
      tabs: {
        overview: 'Overview',
        projects: 'Projects',
        courses: 'Courses',
        events: 'Events',
        profile: 'Profile'
      },
      stats: {
        enrolledProjects: 'Enrolled Projects',
        upcomingEvents: 'Upcoming Events',
        availableProjects: 'Available Projects',
        totalProjects: 'Total Projects'
      },
      actions: {
        viewProjects: 'View Projects',
        viewProjectsDesc: 'Browse available projects',
        checkEvents: 'Check Events',
        checkEventsDesc: 'See upcoming events',
        updateProfile: 'Update Profile',
        updateProfileDesc: 'Edit your information',
        viewCourses: 'View Courses',
        viewCoursesDesc: 'Check your courses'
      },
      overview: {
        quickActions: 'Quick Actions',
        myProjects: 'My Projects',
        upcomingEvents: 'Upcoming Events',
        viewAll: 'View All',
        academicProgress: 'Academic Progress'
      },
      projects: {
        title: 'My Projects',
        supervisor: 'Supervisor',
        complete: 'complete',
        status: {
          enrolled: 'enrolled',
          completed: 'completed',
          pending: 'pending'
        }
      },
      courses: {
        title: 'My Courses',
        noCoursesAvailable: 'No Courses Available',
        description: 'Course information will be displayed here when available.'
      },
      events: {
        title: 'Upcoming Events',
        types: {
          seminar: 'seminar',
          workshop: 'workshop',
          conference: 'conference'
        }
      },
      profile: {
        title: 'Profile Settings',
        editProfile: 'Edit Profile',
        notSet: 'Not set',
        unknown: 'Unknown',
        defaultRole: 'Student',
        fields: {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          memberSince: 'Member Since'
        },
        roleLabel: {
          student: 'Student'
        }
      }
    }
  },
  fr: {
    header: {
      settings: 'Paramètres',
      logout: 'Déconnexion'
    },
    errors: {
      accessDenied: {
        title: 'Accès refusé',
        description: 'Vous devez être connecté pour accéder au tableau de bord.'
      },
      accessRestricted: {
        title: 'Accès restreint',
        description: 'Votre compte n\'a pas la permission d\'accéder au tableau de bord.'
      }
    },
    admin: {
      title: 'Tableau de bord administrateur',
      welcome: 'Bon retour, Administrateur',
      tabs: {
        overview: 'Vue d\'ensemble',
        users: 'Utilisateurs',
        invitations: 'Invitations',
        content: 'Contenu',
        reports: 'Rapports'
      },
      stats: {
        totalUsers: 'Total des utilisateurs',
        totalPublications: 'Total des publications',
        activeProjects: 'Projets actifs',
        pendingInvitations: 'Invitations en attente'
      },
      actions: {
        sendInvitation: 'Envoyer une invitation',
        sendInvitationDesc: 'Inviter de nouveaux utilisateurs',
        manageUsers: 'Gérer les utilisateurs',
        manageUsersDesc: 'Contrôler l\'accès et les rôles',
        manageContent: 'Gérer le contenu',
        manageContentDesc: 'Examiner et modérer le contenu',
        viewReports: 'Voir les rapports',
        viewReportsDesc: 'Accéder aux analyses et insights'
      },
      overview: {
        quickActions: 'Actions rapides',
        recentUsers: 'Utilisateurs récents',
        pendingInvitations: 'Invitations en attente',
        recentActivity: 'Activité récente',
        viewAll: 'Voir tout',
        sendInvitation: 'Envoyer une invitation',
        invitationDetails: 'Rôle :',
        sent: 'Envoyé :',
        byAuthor: 'par',
        unknown: 'Inconnu',
        system: 'Système',
        noPendingInvitations: 'Aucune invitation en attente',
        roles: {
          admin: 'Admin',
          professor: 'Professeur',
          researcher: 'Chercheur',
          student: 'Étudiant'
        },
        contentStatus: {
          published: 'publié',
          draft: 'brouillon',
          active: 'actif',
          pending: 'en attente',
          upcoming: 'à venir',
          past: 'passé'
        }
      },
      users: {
        title: 'Gestion des utilisateurs',
        description: 'Gérer les utilisateurs, rôles et permissions',
        addUser: 'Ajouter un utilisateur',
        searchPlaceholder: 'Rechercher des utilisateurs...',
        stats: {
          totalUsers: 'Total des utilisateurs',
          activeUsers: 'Utilisateurs actifs',
          adminUsers: 'Utilisateurs admin',
          newThisWeek: 'Nouveaux cette semaine'
        },
        table: {
          user: 'Utilisateur',
          role: 'Rôle',
          joined: 'Inscrit',
          actions: 'Actions'
        },
        filters: {
          allRoles: 'Tous les rôles',
          admin: 'Admin',
          professor: 'Professeur',
          researcher: 'Chercheur',
          student: 'Étudiant'
        },
        roles: {
          admin: 'Admin',
          professor: 'Professeur',
          researcher: 'Chercheur',
          student: 'Étudiant'
        }
      },
      invitations: {
        title: 'Invitations',
        description: 'Gérer les invitations et inscriptions d\'utilisateurs',
        sendInvitation: 'Envoyer une invitation',
        sending: 'Envoi en cours...',
        searchPlaceholder: 'Rechercher par email...',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette invitation ?',
        confirmCancel: 'Êtes-vous sûr de vouloir annuler cette invitation ?',
        roles: {
          student: 'Étudiant',
          professor: 'Professeur',
          researcher: 'Chercheur',
          admin: 'Admin'
        },
        status: {
          all: 'Tous les statuts',
          pending: 'En attente',
          expired: 'Expiré',
          registered: 'Inscrit',
          canceled: 'Annulé'
        },
        stats: {
          total: 'Total des invitations',
          pending: 'En attente',
          registered: 'Inscrits',
          expired: 'Expirés'
        },
        table: {
          email: 'Email',
          role: 'Rôle',
          status: 'Statut',
          sentDate: 'Date d\'envoi',
          expires: 'Expire',
          actions: 'Actions'
        },
        sendInvitationModal: {
          title: 'Envoyer une invitation',
          email: 'Email',
          emailPlaceholder: 'utilisateur@exemple.com',
          role: 'Rôle'
        }
      },
      content: {
        publications: {
          title: 'Publications',
          description: 'Gérer les publications de recherche et articles.'
        },
        events: {
          title: 'Événements',
          description: 'Gérer les conférences, séminaires et ateliers.'
        },
        projects: {
          title: 'Projets',
          description: 'Gérer les projets de recherche et collaborations.'
        },
        recentContent: {
          title: 'Contenu récent',
          byAuthor: 'par'
        },
        status: {
          published: 'publié',
          pending: 'en attente',
          draft: 'brouillon'
        }
      },
      reports: {
        systemStatistics: 'Statistiques système',
        userAnalytics: 'Analyses utilisateurs',
        totalUsers: 'Total des utilisateurs',
        activeUsers: 'Utilisateurs actifs',
        adminUsers: 'Utilisateurs admin',
        newThisWeek: 'Nouveaux cette semaine'
      },
      settings: {
        title: 'Paramètres système',
        description: 'Configurer les paramètres généraux du système.'
      }
    },
    professor: {
      title: 'Tableau de bord',
      welcome: 'Bon retour, Professeur',
      tabs: {
        overview: 'Vue d\'ensemble',
        publications: 'Publications',
        teaching: 'Enseignement',
        research: 'Recherche',
        students: 'Étudiants',
        profile: 'Profil'
      },
      stats: {
        publications: 'Publications',
        activeProjects: 'Projets actifs',
        totalProjects: 'Total des projets',
        upcomingEvents: 'Événements à venir'
      },
      actions: {
        addPublication: 'Ajouter une publication',
        addPublicationDesc: 'Partager vos dernières recherches',
        createEvent: 'Créer un événement',
        createEventDesc: 'Organiser un nouvel événement',
        manageProject: 'Gérer les projets',
        manageProjectDesc: 'Mettre à jour le statut des projets',
        updateProfile: 'Mettre à jour le profil',
        updateProfileDesc: 'Modifier vos informations'
      },
      overview: {
        quickActions: 'Actions rapides',
        recentPublications: 'Publications récentes',
        activeProjects: 'Projets actifs',
        upcomingEvents: 'Événements à venir',
        viewAll: 'Voir tout',
        performanceMetrics: 'Métriques de performance'
      },
      publications: {
        title: 'Mes publications',
        addPublication: 'Ajouter une publication',
        status: {
          published: 'publié',
          pending: 'en attente'
        }
      },
      research: {
        title: 'Projets de recherche',
        addProject: 'Ajouter un projet',
        due: 'Échéance',
        status: {
          active: 'actif',
          completed: 'terminé'
        }
      },
      students: {
        title: 'Étudiants',
        addStudent: 'Ajouter un étudiant',
        noStudentsYet: 'Aucun étudiant pour le moment',
        description: 'Commencez à superviser des étudiants pour les voir ici.'
      },
      teaching: {
        title: 'Enseignement',
        addCourse: 'Ajouter un cours',
        noCoursesYet: 'Aucun cours pour le moment',
        description: 'Commencez par ajouter votre premier cours ou activité d\'enseignement.'
      },
      profile: {
        title: 'Paramètres du profil',
        editProfile: 'Modifier le profil',
        notSet: 'Non défini',
        unknown: 'Inconnu',
        defaultRole: 'Professeur',
        fields: {
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Email',
          memberSince: 'Membre depuis'
        },
        roleLabel: {
          professor: 'Professeur',
          researcher: 'Chercheur',
          admin: 'Admin'
        }
      }
    },
    student: {
      title: 'Tableau de bord étudiant',
      welcome: 'Bon retour, Étudiant',
      tabs: {
        overview: 'Vue d\'ensemble',
        projects: 'Projets',
        courses: 'Cours',
        events: 'Événements',
        profile: 'Profil'
      },
      stats: {
        enrolledProjects: 'Projets inscrits',
        upcomingEvents: 'Événements à venir',
        availableProjects: 'Projets disponibles',
        totalProjects: 'Total des projets'
      },
      actions: {
        viewProjects: 'Voir les projets',
        viewProjectsDesc: 'Parcourir les projets disponibles',
        checkEvents: 'Vérifier les événements',
        checkEventsDesc: 'Voir les événements à venir',
        updateProfile: 'Mettre à jour le profil',
        updateProfileDesc: 'Modifier vos informations',
        viewCourses: 'Voir les cours',
        viewCoursesDesc: 'Vérifier vos cours'
      },
      overview: {
        quickActions: 'Actions rapides',
        myProjects: 'Mes projets',
        upcomingEvents: 'Événements à venir',
        viewAll: 'Voir tout',
        academicProgress: 'Progrès académique'
      },
      projects: {
        title: 'Mes projets',
        supervisor: 'Superviseur',
        complete: 'terminé',
        status: {
          enrolled: 'inscrit',
          completed: 'terminé',
          pending: 'en attente'
        }
      },
      courses: {
        title: 'Mes cours',
        noCoursesAvailable: 'Aucun cours disponible',
        description: 'Les informations sur les cours seront affichées ici lorsqu\'elles seront disponibles.'
      },
      events: {
        title: 'Événements à venir',
        types: {
          seminar: 'séminaire',
          workshop: 'atelier',
          conference: 'conférence'
        }
      },
      profile: {
        title: 'Paramètres du profil',
        editProfile: 'Modifier le profil',
        notSet: 'Non défini',
        unknown: 'Inconnu',
        defaultRole: 'Étudiant',
        fields: {
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Email',
          memberSince: 'Membre depuis'
        },
        roleLabel: {
          student: 'Étudiant'
        }
      }
    }
  }
} as const