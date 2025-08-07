export interface UserSettingsFormTranslations {
  title: string
  subtitle: string
  sections: {
    security: any
    profile: string
    account: string
    privacy: string
    notifications: string
    preferences: string
  }
  form: {
    office: any
    researchDomains: any
    profilePhoto: any
    notifications: any
    browserNotifications: any
    firstName: string
    firstNamePlaceholder: string
    lastName: string
    lastNamePlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    title: string
    titlePlaceholder: string
    biography: string
    biographyPlaceholder: string
    photo: string
    uploadPhoto: string
    removePhoto: string
    currentPassword: string
    currentPasswordPlaceholder: string
    newPassword: string
    newPasswordPlaceholder: string
    confirmPassword: string
    confirmPasswordPlaceholder: string
    language: string
    selectLanguage: string
    timezone: string
    selectTimezone: string
    theme: string
    selectTheme: string
    profileVisibility: string
    selectProfileVisibility: string
    emailVisibility: string
    phoneVisibility: string
    researchInterests: string
    researchInterestsPlaceholder: string
    githubUrl: string
    githubUrlPlaceholder: string
    linkedinUrl: string
    linkedinUrlPlaceholder: string
    stackoverflowUrl: string
    stackoverflowUrlPlaceholder: string
    twitterxUrl: string
    twitterxUrlPlaceholder: string
    googlescholarUrl: string
    googlescholarUrlPlaceholder: string
    dblpUrl: string
    dblpUrlPlaceholder: string
    personalWebsite: string
    personalWebsitePlaceholder: string
    orcidId: string
    orcidIdPlaceholder: string
    emailNotifications: string
    pushNotifications: string
    weeklyDigest: string
    eventReminders: string
    publicationAlerts: string
    save: string
    cancel: string
    saving: string
    deleteAccount: string
    confirmDelete: string
  }
  languages: {
    french: string
    english: string
  }
  themes: {
    light: string
    dark: string
    system: string
  }
  visibilityOptions: {
    public: string
    members: string
    private: string
  }
  notifications: {
    all: string
    important: string
    none: string
  }
  validation: {
    firstNameRequired: string
    lastNameRequired: string
    emailRequired: string
    emailInvalid: string
    phoneInvalid: string
    currentPasswordRequired: string
    newPasswordMinLength: string
    passwordMismatch: string
    urlInvalid: string
    orcidInvalid: string
  }
  errors: {
    updateFailed: string
    saveFailed: string
    photoUploadFailed: string
    passwordChangeFailed: string
    deleteAccountFailed: string
  }
  success: {
    profileUpdated: string
    passwordChanged: string
    accountDeleted: string
  }
}

export const userSettingsFormTranslations: Record<'fr' | 'en', UserSettingsFormTranslations> = {
  fr: {
    title: 'Paramètres du compte',
    subtitle: 'Gérez vos informations personnelles et préférences',
    sections: {
      profile: 'Profil',
      account: 'Compte',
      privacy: 'Confidentialité',
      notifications: 'Notifications',
      preferences: 'Préférences',
      security: "Sécurité"
    },
    form: {
      firstName: 'Prénom',
      firstNamePlaceholder: 'Votre prénom',
      lastName: 'Nom',
      lastNamePlaceholder: 'Votre nom',
      email: 'Email',
      emailPlaceholder: 'votre.email@univ.fr',
      phone: 'Téléphone',
      phonePlaceholder: '+33 1 23 45 67 89',
      title: 'Titre',
      titlePlaceholder: 'Dr., Prof., etc.',
      biography: 'Biographie',
      biographyPlaceholder: 'Parlez-nous de vous...',
      photo: 'Photo de profil',
      uploadPhoto: 'Télécharger une photo',
      removePhoto: 'Supprimer la photo',
      currentPassword: 'Mot de passe actuel',
      currentPasswordPlaceholder: 'Entrez votre mot de passe actuel',
      newPassword: 'Nouveau mot de passe',
      newPasswordPlaceholder: 'Entrez un nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: 'Confirmez le nouveau mot de passe',
      language: 'Langue',
      selectLanguage: 'Sélectionnez votre langue',
      timezone: 'Fuseau horaire',
      selectTimezone: 'Sélectionnez votre fuseau horaire',
      theme: 'Thème',
      selectTheme: 'Sélectionnez un thème',
      profileVisibility: 'Visibilité du profil',
      selectProfileVisibility: 'Qui peut voir votre profil',
      emailVisibility: 'Visibilité de l\'email',
      phoneVisibility: 'Visibilité du téléphone',
      researchInterests: 'Intérêts de recherche',
      researchInterestsPlaceholder: 'Vos domaines d\'intérêt...',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/username',
      linkedinUrl: 'LinkedIn',
      linkedinUrlPlaceholder: 'https://linkedin.com/in/username',
      stackoverflowUrl: 'Stack Overflow',
      stackoverflowUrlPlaceholder: 'https://stackoverflow.com/users/userid/username',
      twitterxUrl: 'Twitter/X',
      twitterxUrlPlaceholder: 'https://x.com/username',
      googlescholarUrl: 'Google Scholar',
      googlescholarUrlPlaceholder: 'https://scholar.google.ca/citations?user=userid&hl=en',
      dblpUrl: 'DBLP',
      dblpUrlPlaceholder: 'https://dblp.org/pid/id/userid-1.html',
      personalWebsite: 'Site web personnel',
      personalWebsitePlaceholder: 'https://votre-site.com',
      orcidId: 'ORCID iD',
      orcidIdPlaceholder: '0000-0000-0000-0000',
      emailNotifications: 'Notifications par email',
      pushNotifications: 'Notifications push',
      weeklyDigest: 'Résumé hebdomadaire',
      eventReminders: 'Rappels d\'événements',
      publicationAlerts: 'Alertes de publications',
      save: 'Enregistrer',
      cancel: 'Annuler',
      saving: 'Enregistrement...',
      deleteAccount: 'Supprimer le compte',
      confirmDelete: 'Confirmer la suppression',
      office: "Bureau",
      researchDomains: "Domaine de recherche",
      profilePhoto: "Photo de profil",
      notifications: "Notifications",
      browserNotifications: "Notification du navigateur"
    },
    languages: {
      french: 'Français',
      english: 'Anglais'
    },
    themes: {
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système'
    },
    visibilityOptions: {
      public: 'Public',
      members: 'Membres uniquement',
      private: 'Privé'
    },
    notifications: {
      all: 'Toutes',
      important: 'Importantes uniquement',
      none: 'Aucune'
    },
    validation: {
      firstNameRequired: 'Le prénom est requis',
      lastNameRequired: 'Le nom est requis',
      emailRequired: 'L\'email est requis',
      emailInvalid: 'Format d\'email invalide',
      phoneInvalid: 'Format de téléphone invalide',
      currentPasswordRequired: 'Le mot de passe actuel est requis',
      newPasswordMinLength: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      urlInvalid: 'URL invalide',
      orcidInvalid: 'Format ORCID invalide'
    },
    errors: {
      saveFailed: 'Échec de l\'enregistrement',
      photoUploadFailed: 'Échec du téléchargement de la photo',
      passwordChangeFailed: 'Échec du changement de mot de passe',
      deleteAccountFailed: 'Échec de la suppression du compte',
      updateFailed: "Échec de la mise à jour"
    },
    success: {
      profileUpdated: 'Profil mis à jour avec succès',
      passwordChanged: 'Mot de passe modifié avec succès',
      accountDeleted: 'Compte supprimé avec succès'
    }
  },
  en: {
    title: 'Account Settings',
    subtitle: 'Manage your personal information and preferences',
    sections: {
      profile: 'Profile',
      account: 'Account',
      privacy: 'Privacy',
      notifications: 'Notifications',
      preferences: 'Preferences',
      security: "Security"
    },
    form: {
      firstName: 'First Name',
      firstNamePlaceholder: 'Your first name',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Your last name',
      email: 'Email',
      emailPlaceholder: 'your.email@univ.edu',
      phone: 'Phone',
      phonePlaceholder: '+1 234 567 8900',
      title: 'Title',
      titlePlaceholder: 'Dr., Prof., etc.',
      biography: 'Biography',
      biographyPlaceholder: 'Tell us about yourself...',
      photo: 'Profile Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      currentPassword: 'Current Password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter a new password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm the new password',
      language: 'Language',
      selectLanguage: 'Select your language',
      timezone: 'Timezone',
      selectTimezone: 'Select your timezone',
      theme: 'Theme',
      selectTheme: 'Select a theme',
      profileVisibility: 'Profile Visibility',
      selectProfileVisibility: 'Who can see your profile',
      emailVisibility: 'Email Visibility',
      phoneVisibility: 'Phone Visibility',
      researchInterests: 'Research Interests',
      researchInterestsPlaceholder: 'Your areas of interest...',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/username',
      linkedinUrl: 'LinkedIn',
      linkedinUrlPlaceholder: 'https://linkedin.com/in/username',
      stackoverflowUrl: 'Stack Overflow',
      stackoverflowUrlPlaceholder: 'https://stackoverflow.com/users/userid/username',
      twitterxUrl: 'Twitter/X',
      twitterxUrlPlaceholder: 'https://x.com/username',
      googlescholarUrl: 'Google Scholar',
      googlescholarUrlPlaceholder: 'https://scholar.google.ca/citations?user=userid&hl=en',
      dblpUrl: 'DBLP',
      dblpUrlPlaceholder: 'https://dblp.org/pid/id/userid-1.html',
      personalWebsite: 'Personal Website',
      personalWebsitePlaceholder: 'https://your-site.com',
      orcidId: 'ORCID iD',
      orcidIdPlaceholder: '0000-0000-0000-0000',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      weeklyDigest: 'Weekly Digest',
      eventReminders: 'Event Reminders',
      publicationAlerts: 'Publication Alerts',
      save: 'Save',
      cancel: 'Cancel',
      saving: 'Saving...',
      deleteAccount: 'Delete Account',
      confirmDelete: 'Confirm Deletion',
      office: "Office",
      researchDomains: "Research domains",
      profilePhoto: "Profile picture",
      notifications: "Notifications",
      browserNotifications: "Browser notifications"
    },
    languages: {
      french: 'French',
      english: 'English'
    },
    themes: {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    visibilityOptions: {
      public: 'Public',
      members: 'Members Only',
      private: 'Private'
    },
    notifications: {
      all: 'All',
      important: 'Important Only',
      none: 'None'
    },
    validation: {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      phoneInvalid: 'Invalid phone format',
      currentPasswordRequired: 'Current password is required',
      newPasswordMinLength: 'New password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      urlInvalid: 'Invalid URL',
      orcidInvalid: 'Invalid ORCID format'
    },
    errors: {
      saveFailed: 'Failed to save',
      photoUploadFailed: 'Failed to upload photo',
      passwordChangeFailed: 'Failed to change password',
      deleteAccountFailed: 'Failed to delete account',
      updateFailed: "Failed to update"
    },
    success: {
      profileUpdated: 'Profile updated successfully',
      passwordChanged: 'Password changed successfully',
      accountDeleted: 'Account deleted successfully'
    }
  }
} as const