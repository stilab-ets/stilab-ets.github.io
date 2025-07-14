export interface AdminManagementFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    userManagement: string
    rolePermissions: string
    systemSettings: string
    security: string
    maintenance: string
  }
  userManagement: {
    title: string
    subtitle: string
    form: {
      firstName: string
      firstNamePlaceholder: string
      lastName: string
      lastNamePlaceholder: string
      email: string
      emailPlaceholder: string
      role: string
      selectRole: string
      status: string
      selectStatus: string
      department: string
      selectDepartment: string
      permissions: string
      lastLogin: string
      accountCreated: string
      twoFactorAuth: string
      emailVerified: string
      passwordReset: string
      temporaryPassword: string
      temporaryPasswordPlaceholder: string
      sendInvitation: string
      revokeAccess: string
      suspendAccount: string
      deleteAccount: string
    }
    actions: {
      addUser: string
      editUser: string
      deleteUser: string
      suspendUser: string
      activateUser: string
      resetPassword: string
      resendInvitation: string
      exportUsers: string
      importUsers: string
    }
    filters: {
      allUsers: string
      activeUsers: string
      suspendedUsers: string
      pendingUsers: string
      searchPlaceholder: string
    }
  }
  rolePermissions: {
    title: string
    subtitle: string
    form: {
      roleName: string
      roleNamePlaceholder: string
      description: string
      descriptionPlaceholder: string
      permissions: string
      selectPermissions: string
      isDefault: string
      isActive: string
    }
    permissions: {
      userManagement: string
      contentManagement: string
      systemSettings: string
      viewReports: string
      managePublications: string
      manageEvents: string
      manageProjects: string
      manageMembers: string
      manageVacancies: string
      manageAwards: string
      moderateContent: string
      systemMaintenance: string
    }
    actions: {
      createRole: string
      editRole: string
      deleteRole: string
      cloneRole: string
    }
  }
  systemSettings: {
    title: string
    subtitle: string
    form: {
      siteName: string
      siteNamePlaceholder: string
      siteDescription: string
      siteDescriptionPlaceholder: string
      contactEmail: string
      contactEmailPlaceholder: string
      maintenanceMode: string
      registrationOpen: string
      requireEmailVerification: string
      allowPublicRegistration: string
      maxFileSize: string
      maxFileSizePlaceholder: string
      allowedFileTypes: string
      allowedFileTypesPlaceholder: string
      sessionTimeout: string
      sessionTimeoutPlaceholder: string
      backupFrequency: string
      selectBackupFrequency: string
      emailNotifications: string
      systemNotifications: string
    }
    backup: {
      title: string
      subtitle: string
      lastBackup: string
      backupSize: string
      createBackup: string
      restoreBackup: string
      downloadBackup: string
      scheduleBackup: string
    }
  }
  security: {
    title: string
    subtitle: string
    form: {
      enforceStrongPasswords: string
      requireTwoFactor: string
      passwordExpiry: string
      passwordExpiryPlaceholder: string
      maxLoginAttempts: string
      maxLoginAttemptsPlaceholder: string
      lockoutDuration: string
      lockoutDurationPlaceholder: string
      sessionSecurity: string
      ipWhitelist: string
      ipWhitelistPlaceholder: string
      auditLogging: string
      securityAlerts: string
    }
    logs: {
      title: string
      subtitle: string
      filters: {
        allLogs: string
        loginAttempts: string
        systemChanges: string
        securityEvents: string
        dateRange: string
      }
      export: string
      clear: string
    }
  }
  maintenance: {
    title: string
    subtitle: string
    actions: {
      clearCache: string
      optimizeDatabase: string
      checkSystemHealth: string
      updateSystem: string
      restartServices: string
      runDiagnostics: string
    }
    status: {
      systemHealth: string
      diskSpace: string
      memoryUsage: string
      cpuUsage: string
      databaseSize: string
      cacheSize: string
      uptime: string
    }
  }
  validation: {
    firstNameRequired: string
    lastNameRequired: string
    emailRequired: string
    emailInvalid: string
    roleRequired: string
    statusRequired: string
    roleNameRequired: string
    descriptionRequired: string
    permissionsRequired: string
    siteNameRequired: string
    contactEmailRequired: string
    maxFileSizeInvalid: string
    sessionTimeoutInvalid: string
    passwordExpiryInvalid: string
    maxLoginAttemptsInvalid: string
    lockoutDurationInvalid: string
  }
  errors: {
    saveUserFailed: string
    deleteUserFailed: string
    saveRoleFailed: string
    deleteRoleFailed: string
    saveSettingsFailed: string
    backupFailed: string
    restoreFailed: string
    clearCacheFailed: string
    systemUpdateFailed: string
    loadDataFailed: string
  }
  success: {
    userCreated: string
    userUpdated: string
    userDeleted: string
    roleCreated: string
    roleUpdated: string
    roleDeleted: string
    settingsSaved: string
    backupCreated: string
    backupRestored: string
    cacheCleared: string
    systemUpdated: string
    invitationSent: string
    passwordReset: string
  }
  confirmations: {
    deleteUser: string
    deleteRole: string
    suspendUser: string
    resetPassword: string
    clearCache: string
    restoreBackup: string
    systemUpdate: string
  }
}

export const adminManagementFormTranslations: Record<'fr' | 'en', AdminManagementFormTranslations> = {
  fr: {
    titleEdit: 'Gestion des administrateurs',
    titleCreate: 'Ajouter un administrateur',
    subtitle: 'Gérez les utilisateurs, rôles et paramètres système',
    sections: {
      userManagement: 'Gestion des utilisateurs',
      rolePermissions: 'Rôles et permissions',
      systemSettings: 'Paramètres système',
      security: 'Sécurité',
      maintenance: 'Maintenance'
    },
    userManagement: {
      title: 'Gestion des utilisateurs',
      subtitle: 'Gérez les comptes utilisateurs et leurs accès',
      form: {
        firstName: 'Prénom',
        firstNamePlaceholder: 'Prénom de l\'utilisateur',
        lastName: 'Nom',
        lastNamePlaceholder: 'Nom de l\'utilisateur',
        email: 'Email',
        emailPlaceholder: 'adresse@univ.fr',
        role: 'Rôle',
        selectRole: 'Sélectionnez un rôle',
        status: 'Statut',
        selectStatus: 'Sélectionnez un statut',
        department: 'Département',
        selectDepartment: 'Sélectionnez un département',
        permissions: 'Permissions',
        lastLogin: 'Dernière connexion',
        accountCreated: 'Compte créé',
        twoFactorAuth: 'Authentification à deux facteurs',
        emailVerified: 'Email vérifié',
        passwordReset: 'Réinitialiser le mot de passe',
        temporaryPassword: 'Mot de passe temporaire',
        temporaryPasswordPlaceholder: 'Générer automatiquement',
        sendInvitation: 'Envoyer une invitation',
        revokeAccess: 'Révoquer l\'accès',
        suspendAccount: 'Suspendre le compte',
        deleteAccount: 'Supprimer le compte'
      },
      actions: {
        addUser: 'Ajouter un utilisateur',
        editUser: 'Modifier l\'utilisateur',
        deleteUser: 'Supprimer l\'utilisateur',
        suspendUser: 'Suspendre l\'utilisateur',
        activateUser: 'Activer l\'utilisateur',
        resetPassword: 'Réinitialiser le mot de passe',
        resendInvitation: 'Renvoyer l\'invitation',
        exportUsers: 'Exporter les utilisateurs',
        importUsers: 'Importer les utilisateurs'
      },
      filters: {
        allUsers: 'Tous les utilisateurs',
        activeUsers: 'Utilisateurs actifs',
        suspendedUsers: 'Utilisateurs suspendus',
        pendingUsers: 'En attente',
        searchPlaceholder: 'Rechercher un utilisateur...'
      }
    },
    rolePermissions: {
      title: 'Rôles et permissions',
      subtitle: 'Gérez les rôles et leurs permissions',
      form: {
        roleName: 'Nom du rôle',
        roleNamePlaceholder: 'Nom du rôle',
        description: 'Description',
        descriptionPlaceholder: 'Description du rôle...',
        permissions: 'Permissions',
        selectPermissions: 'Sélectionnez les permissions',
        isDefault: 'Rôle par défaut',
        isActive: 'Rôle actif'
      },
      permissions: {
        userManagement: 'Gestion des utilisateurs',
        contentManagement: 'Gestion du contenu',
        systemSettings: 'Paramètres système',
        viewReports: 'Voir les rapports',
        managePublications: 'Gérer les publications',
        manageEvents: 'Gérer les événements',
        manageProjects: 'Gérer les projets',
        manageMembers: 'Gérer les membres',
        manageVacancies: 'Gérer les offres d\'emploi',
        manageAwards: 'Gérer les prix',
        moderateContent: 'Modérer le contenu',
        systemMaintenance: 'Maintenance système'
      },
      actions: {
        createRole: 'Créer un rôle',
        editRole: 'Modifier le rôle',
        deleteRole: 'Supprimer le rôle',
        cloneRole: 'Dupliquer le rôle'
      }
    },
    systemSettings: {
      title: 'Paramètres système',
      subtitle: 'Configurez les paramètres généraux du système',
      form: {
        siteName: 'Nom du site',
        siteNamePlaceholder: 'Laboratoire STIL',
        siteDescription: 'Description du site',
        siteDescriptionPlaceholder: 'Description du laboratoire...',
        contactEmail: 'Email de contact',
        contactEmailPlaceholder: 'contact@laboratoire.fr',
        maintenanceMode: 'Mode maintenance',
        registrationOpen: 'Inscriptions ouvertes',
        requireEmailVerification: 'Vérification email requise',
        allowPublicRegistration: 'Autoriser l\'inscription publique',
        maxFileSize: 'Taille maximale des fichiers',
        maxFileSizePlaceholder: 'En MB',
        allowedFileTypes: 'Types de fichiers autorisés',
        allowedFileTypesPlaceholder: 'pdf,doc,jpg,png',
        sessionTimeout: 'Délai d\'expiration de session',
        sessionTimeoutPlaceholder: 'En minutes',
        backupFrequency: 'Fréquence de sauvegarde',
        selectBackupFrequency: 'Sélectionnez la fréquence',
        emailNotifications: 'Notifications par email',
        systemNotifications: 'Notifications système'
      },
      backup: {
        title: 'Sauvegarde',
        subtitle: 'Gérez les sauvegardes du système',
        lastBackup: 'Dernière sauvegarde',
        backupSize: 'Taille de la sauvegarde',
        createBackup: 'Créer une sauvegarde',
        restoreBackup: 'Restaurer une sauvegarde',
        downloadBackup: 'Télécharger la sauvegarde',
        scheduleBackup: 'Programmer une sauvegarde'
      }
    },
    security: {
      title: 'Sécurité',
      subtitle: 'Configurez les paramètres de sécurité',
      form: {
        enforceStrongPasswords: 'Forcer des mots de passe forts',
        requireTwoFactor: 'Exiger l\'authentification à deux facteurs',
        passwordExpiry: 'Expiration des mots de passe',
        passwordExpiryPlaceholder: 'En jours',
        maxLoginAttempts: 'Tentatives de connexion max',
        maxLoginAttemptsPlaceholder: 'Nombre d\'essais',
        lockoutDuration: 'Durée de verrouillage',
        lockoutDurationPlaceholder: 'En minutes',
        sessionSecurity: 'Sécurité des sessions',
        ipWhitelist: 'Liste blanche d\'IP',
        ipWhitelistPlaceholder: 'IP autorisées...',
        auditLogging: 'Journalisation d\'audit',
        securityAlerts: 'Alertes de sécurité'
      },
      logs: {
        title: 'Journaux de sécurité',
        subtitle: 'Consultez les journaux d\'activité',
        filters: {
          allLogs: 'Tous les journaux',
          loginAttempts: 'Tentatives de connexion',
          systemChanges: 'Modifications système',
          securityEvents: 'Événements de sécurité',
          dateRange: 'Plage de dates'
        },
        export: 'Exporter',
        clear: 'Effacer'
      }
    },
    maintenance: {
      title: 'Maintenance',
      subtitle: 'Outils de maintenance et diagnostics',
      actions: {
        clearCache: 'Vider le cache',
        optimizeDatabase: 'Optimiser la base de données',
        checkSystemHealth: 'Vérifier l\'état du système',
        updateSystem: 'Mettre à jour le système',
        restartServices: 'Redémarrer les services',
        runDiagnostics: 'Lancer les diagnostics'
      },
      status: {
        systemHealth: 'État du système',
        diskSpace: 'Espace disque',
        memoryUsage: 'Utilisation mémoire',
        cpuUsage: 'Utilisation CPU',
        databaseSize: 'Taille de la base de données',
        cacheSize: 'Taille du cache',
        uptime: 'Temps de fonctionnement'
      }
    },
    validation: {
      firstNameRequired: 'Le prénom est requis',
      lastNameRequired: 'Le nom est requis',
      emailRequired: 'L\'email est requis',
      emailInvalid: 'Format d\'email invalide',
      roleRequired: 'Le rôle est requis',
      statusRequired: 'Le statut est requis',
      roleNameRequired: 'Le nom du rôle est requis',
      descriptionRequired: 'La description est requise',
      permissionsRequired: 'Au moins une permission est requise',
      siteNameRequired: 'Le nom du site est requis',
      contactEmailRequired: 'L\'email de contact est requis',
      maxFileSizeInvalid: 'Taille de fichier invalide',
      sessionTimeoutInvalid: 'Délai d\'expiration invalide',
      passwordExpiryInvalid: 'Délai d\'expiration invalide',
      maxLoginAttemptsInvalid: 'Nombre de tentatives invalide',
      lockoutDurationInvalid: 'Durée de verrouillage invalide'
    },
    errors: {
      saveUserFailed: 'Échec de l\'enregistrement de l\'utilisateur',
      deleteUserFailed: 'Échec de la suppression de l\'utilisateur',
      saveRoleFailed: 'Échec de l\'enregistrement du rôle',
      deleteRoleFailed: 'Échec de la suppression du rôle',
      saveSettingsFailed: 'Échec de l\'enregistrement des paramètres',
      backupFailed: 'Échec de la sauvegarde',
      restoreFailed: 'Échec de la restauration',
      clearCacheFailed: 'Échec du vidage du cache',
      systemUpdateFailed: 'Échec de la mise à jour',
      loadDataFailed: 'Échec du chargement des données'
    },
    success: {
      userCreated: 'Utilisateur créé avec succès',
      userUpdated: 'Utilisateur mis à jour avec succès',
      userDeleted: 'Utilisateur supprimé avec succès',
      roleCreated: 'Rôle créé avec succès',
      roleUpdated: 'Rôle mis à jour avec succès',
      roleDeleted: 'Rôle supprimé avec succès',
      settingsSaved: 'Paramètres enregistrés avec succès',
      backupCreated: 'Sauvegarde créée avec succès',
      backupRestored: 'Sauvegarde restaurée avec succès',
      cacheCleared: 'Cache vidé avec succès',
      systemUpdated: 'Système mis à jour avec succès',
      invitationSent: 'Invitation envoyée avec succès',
      passwordReset: 'Mot de passe réinitialisé avec succès'
    },
    confirmations: {
      deleteUser: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      deleteRole: 'Êtes-vous sûr de vouloir supprimer ce rôle ?',
      suspendUser: 'Êtes-vous sûr de vouloir suspendre cet utilisateur ?',
      resetPassword: 'Êtes-vous sûr de vouloir réinitialiser le mot de passe ?',
      clearCache: 'Êtes-vous sûr de vouloir vider le cache ?',
      restoreBackup: 'Êtes-vous sûr de vouloir restaurer cette sauvegarde ?',
      systemUpdate: 'Êtes-vous sûr de vouloir mettre à jour le système ?'
    }
  },
  en: {
    titleEdit: 'Admin Management',
    titleCreate: 'Add Administrator',
    subtitle: 'Manage users, roles, and system settings',
    sections: {
      userManagement: 'User Management',
      rolePermissions: 'Roles & Permissions',
      systemSettings: 'System Settings',
      security: 'Security',
      maintenance: 'Maintenance'
    },
    userManagement: {
      title: 'User Management',
      subtitle: 'Manage user accounts and their access',
      form: {
        firstName: 'First Name',
        firstNamePlaceholder: 'User first name',
        lastName: 'Last Name',
        lastNamePlaceholder: 'User last name',
        email: 'Email',
        emailPlaceholder: 'user@univ.edu',
        role: 'Role',
        selectRole: 'Select a role',
        status: 'Status',
        selectStatus: 'Select a status',
        department: 'Department',
        selectDepartment: 'Select a department',
        permissions: 'Permissions',
        lastLogin: 'Last Login',
        accountCreated: 'Account Created',
        twoFactorAuth: 'Two-Factor Authentication',
        emailVerified: 'Email Verified',
        passwordReset: 'Reset Password',
        temporaryPassword: 'Temporary Password',
        temporaryPasswordPlaceholder: 'Auto-generate',
        sendInvitation: 'Send Invitation',
        revokeAccess: 'Revoke Access',
        suspendAccount: 'Suspend Account',
        deleteAccount: 'Delete Account'
      },
      actions: {
        addUser: 'Add User',
        editUser: 'Edit User',
        deleteUser: 'Delete User',
        suspendUser: 'Suspend User',
        activateUser: 'Activate User',
        resetPassword: 'Reset Password',
        resendInvitation: 'Resend Invitation',
        exportUsers: 'Export Users',
        importUsers: 'Import Users'
      },
      filters: {
        allUsers: 'All Users',
        activeUsers: 'Active Users',
        suspendedUsers: 'Suspended Users',
        pendingUsers: 'Pending',
        searchPlaceholder: 'Search users...'
      }
    },
    rolePermissions: {
      title: 'Roles & Permissions',
      subtitle: 'Manage roles and their permissions',
      form: {
        roleName: 'Role Name',
        roleNamePlaceholder: 'Role name',
        description: 'Description',
        descriptionPlaceholder: 'Role description...',
        permissions: 'Permissions',
        selectPermissions: 'Select permissions',
        isDefault: 'Default Role',
        isActive: 'Active Role'
      },
      permissions: {
        userManagement: 'User Management',
        contentManagement: 'Content Management',
        systemSettings: 'System Settings',
        viewReports: 'View Reports',
        managePublications: 'Manage Publications',
        manageEvents: 'Manage Events',
        manageProjects: 'Manage Projects',
        manageMembers: 'Manage Members',
        manageVacancies: 'Manage Vacancies',
        manageAwards: 'Manage Awards',
        moderateContent: 'Moderate Content',
        systemMaintenance: 'System Maintenance'
      },
      actions: {
        createRole: 'Create Role',
        editRole: 'Edit Role',
        deleteRole: 'Delete Role',
        cloneRole: 'Clone Role'
      }
    },
    systemSettings: {
      title: 'System Settings',
      subtitle: 'Configure general system settings',
      form: {
        siteName: 'Site Name',
        siteNamePlaceholder: 'STIL Laboratory',
        siteDescription: 'Site Description',
        siteDescriptionPlaceholder: 'Laboratory description...',
        contactEmail: 'Contact Email',
        contactEmailPlaceholder: 'contact@lab.edu',
        maintenanceMode: 'Maintenance Mode',
        registrationOpen: 'Registration Open',
        requireEmailVerification: 'Require Email Verification',
        allowPublicRegistration: 'Allow Public Registration',
        maxFileSize: 'Max File Size',
        maxFileSizePlaceholder: 'In MB',
        allowedFileTypes: 'Allowed File Types',
        allowedFileTypesPlaceholder: 'pdf,doc,jpg,png',
        sessionTimeout: 'Session Timeout',
        sessionTimeoutPlaceholder: 'In minutes',
        backupFrequency: 'Backup Frequency',
        selectBackupFrequency: 'Select frequency',
        emailNotifications: 'Email Notifications',
        systemNotifications: 'System Notifications'
      },
      backup: {
        title: 'Backup',
        subtitle: 'Manage system backups',
        lastBackup: 'Last Backup',
        backupSize: 'Backup Size',
        createBackup: 'Create Backup',
        restoreBackup: 'Restore Backup',
        downloadBackup: 'Download Backup',
        scheduleBackup: 'Schedule Backup'
      }
    },
    security: {
      title: 'Security',
      subtitle: 'Configure security settings',
      form: {
        enforceStrongPasswords: 'Enforce Strong Passwords',
        requireTwoFactor: 'Require Two-Factor Authentication',
        passwordExpiry: 'Password Expiry',
        passwordExpiryPlaceholder: 'In days',
        maxLoginAttempts: 'Max Login Attempts',
        maxLoginAttemptsPlaceholder: 'Number of tries',
        lockoutDuration: 'Lockout Duration',
        lockoutDurationPlaceholder: 'In minutes',
        sessionSecurity: 'Session Security',
        ipWhitelist: 'IP Whitelist',
        ipWhitelistPlaceholder: 'Allowed IPs...',
        auditLogging: 'Audit Logging',
        securityAlerts: 'Security Alerts'
      },
      logs: {
        title: 'Security Logs',
        subtitle: 'View activity logs',
        filters: {
          allLogs: 'All Logs',
          loginAttempts: 'Login Attempts',
          systemChanges: 'System Changes',
          securityEvents: 'Security Events',
          dateRange: 'Date Range'
        },
        export: 'Export',
        clear: 'Clear'
      }
    },
    maintenance: {
      title: 'Maintenance',
      subtitle: 'Maintenance tools and diagnostics',
      actions: {
        clearCache: 'Clear Cache',
        optimizeDatabase: 'Optimize Database',
        checkSystemHealth: 'Check System Health',
        updateSystem: 'Update System',
        restartServices: 'Restart Services',
        runDiagnostics: 'Run Diagnostics'
      },
      status: {
        systemHealth: 'System Health',
        diskSpace: 'Disk Space',
        memoryUsage: 'Memory Usage',
        cpuUsage: 'CPU Usage',
        databaseSize: 'Database Size',
        cacheSize: 'Cache Size',
        uptime: 'Uptime'
      }
    },
    validation: {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      roleRequired: 'Role is required',
      statusRequired: 'Status is required',
      roleNameRequired: 'Role name is required',
      descriptionRequired: 'Description is required',
      permissionsRequired: 'At least one permission is required',
      siteNameRequired: 'Site name is required',
      contactEmailRequired: 'Contact email is required',
      maxFileSizeInvalid: 'Invalid file size',
      sessionTimeoutInvalid: 'Invalid session timeout',
      passwordExpiryInvalid: 'Invalid password expiry',
      maxLoginAttemptsInvalid: 'Invalid login attempts',
      lockoutDurationInvalid: 'Invalid lockout duration'
    },
    errors: {
      saveUserFailed: 'Failed to save user',
      deleteUserFailed: 'Failed to delete user',
      saveRoleFailed: 'Failed to save role',
      deleteRoleFailed: 'Failed to delete role',
      saveSettingsFailed: 'Failed to save settings',
      backupFailed: 'Backup failed',
      restoreFailed: 'Restore failed',
      clearCacheFailed: 'Failed to clear cache',
      systemUpdateFailed: 'System update failed',
      loadDataFailed: 'Failed to load data'
    },
    success: {
      userCreated: 'User created successfully',
      userUpdated: 'User updated successfully',
      userDeleted: 'User deleted successfully',
      roleCreated: 'Role created successfully',
      roleUpdated: 'Role updated successfully',
      roleDeleted: 'Role deleted successfully',
      settingsSaved: 'Settings saved successfully',
      backupCreated: 'Backup created successfully',
      backupRestored: 'Backup restored successfully',
      cacheCleared: 'Cache cleared successfully',
      systemUpdated: 'System updated successfully',
      invitationSent: 'Invitation sent successfully',
      passwordReset: 'Password reset successfully'
    },
    confirmations: {
      deleteUser: 'Are you sure you want to delete this user?',
      deleteRole: 'Are you sure you want to delete this role?',
      suspendUser: 'Are you sure you want to suspend this user?',
      resetPassword: 'Are you sure you want to reset the password?',
      clearCache: 'Are you sure you want to clear the cache?',
      restoreBackup: 'Are you sure you want to restore this backup?',
      systemUpdate: 'Are you sure you want to update the system?'
    }
  }
} as const