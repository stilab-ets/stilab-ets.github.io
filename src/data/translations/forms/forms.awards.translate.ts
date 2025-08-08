export interface AwardsFormTranslations {
  titleEdit: string;
  titleCreate: string;
  subtitle: string;
  sections: {
    basic: string;
    details: string;
    recipients: string;
    recognition: string;
  };
  form: {
    title: string;
    titlePlaceholder: string;
    category: string;
    selectCategory: string;
    organization: string;
    organizationPlaceholder: string;
    year: string;
    recipients: string;
    selectRecipient: string;
    coRecipients: string;
    selectCoRecipients: string;
    description: string;
    descriptionPlaceholder: string;
    significance: string;
    significancePlaceholder: string;
    amount: string;
    amountPlaceholder: string;
    criteria: string;
    criteriaPlaceholder: string;
    ceremony: string;
    ceremonyPlaceholder: string;
    certificateUrl: string;
    certificateUrlPlaceholder: string;
    websiteUrl: string;
    websiteUrlPlaceholder: string;
    mediaUrl: string;
    mediaUrlPlaceholder: string;
    level: string;
    selectLevel: string;
    status: string;
    selectStatus: string;
    tags: string;
    tagsPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    featured: string;
    url: string;
    urlPlaceholder: string;
    cancel: string;
    create: string;
    update: string;
    submitting: string;
  };
  categories: {
    publication: string;
    research: string;
    teaching: string;
    service: string;
    career: string;
    excellence: string;
    innovation: string;
    collaboration: string;
  };
  levels: {
    international: string;
    national: string;
    regional: string;
    institutional: string;
    departmental: string;
  };
  statuses: {
    received: string;
    nominated: string;
    pending: string;
    declined: string;
  };
  validation: {
    titleRequired: string;
    categoryRequired: string;
    organizationRequired: string;
    yearRequired: string;
    yearInvalid: string;
    recipientRequired: string;
    descriptionRequired: string;
    amountInvalid: string;
    urlInvalid: string;
    levelRequired: string;
    statusRequired: string;
  };
  errors: {
    submitFailed: string;
  };
}

export const awardsFormTranslations: Record<
  'fr' | 'en',
  AwardsFormTranslations
> = {
  fr: {
    titleEdit: 'Modifier le prix',
    titleCreate: 'Ajouter un prix',
    subtitle: 'Enregistrez une distinction ou récompense',
    sections: {
      basic: 'Informations de base',
      details: 'Détails du prix',
      recipients: 'Lauréats',
      recognition: 'Reconnaissance',
    },
    form: {
      title: 'Titre du prix',
      titlePlaceholder: 'Nom de la distinction',
      category: 'Catégorie',
      selectCategory: 'Sélectionnez une catégorie',
      organization: 'Organisation',
      organizationPlaceholder: 'Organisme décernant le prix',
      year: 'Année',
      recipients: 'Lauréats principaux',
      selectRecipient: 'Sélectionnez le lauréat',
      coRecipients: 'Co-lauréats',
      selectCoRecipients: 'Sélectionnez les co-lauréats',
      description: 'Description',
      descriptionPlaceholder: 'Description du prix et de sa signification...',
      significance: 'Importance',
      significancePlaceholder: 'Impact et importance de cette distinction...',
      amount: 'Montant',
      amountPlaceholder: 'Dotation financière (optionnel)',
      criteria: 'Critères',
      criteriaPlaceholder: "Critères d'attribution...",
      ceremony: 'Cérémonie',
      ceremonyPlaceholder: 'Détails de la cérémonie de remise...',
      certificateUrl: 'URL du certificat',
      certificateUrlPlaceholder: 'https://...',
      websiteUrl: 'Site web du prix',
      websiteUrlPlaceholder: 'https://...',
      mediaUrl: 'Couverture médiatique',
      mediaUrlPlaceholder: 'Articles de presse, communiqués...',
      level: 'Niveau',
      selectLevel: 'Sélectionnez le niveau',
      status: 'Statut',
      selectStatus: 'Sélectionnez le statut',
      tags: 'Mots-clés',
      tagsPlaceholder: 'Mots-clés pour la recherche',
      notes: 'Notes',
      notesPlaceholder: 'Notes internes...',
      featured: 'Mise en avant',
      url: 'URL',
      urlPlaceholder: 'https://...',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...',
    },
    categories: {
      publication: 'Publication',
      research: 'Recherche',
      teaching: 'Enseignement',
      service: 'Service',
      career: 'Carrière',
      excellence: 'Excellence',
      innovation: 'Innovation',
      collaboration: 'Collaboration',
    },
    levels: {
      international: 'International',
      national: 'National',
      regional: 'Régional',
      institutional: 'Institutionnel',
      departmental: 'Départemental',
    },
    statuses: {
      received: 'Reçu',
      nominated: 'Nominé',
      pending: 'En attente',
      declined: 'Décliné',
    },
    validation: {
      titleRequired: 'Le titre est requis',
      categoryRequired: 'La catégorie est requise',
      organizationRequired: "L'organisation est requise",
      yearRequired: "L'année est requise",
      yearInvalid: 'Année invalide',
      recipientRequired: 'Le lauréat est requis',
      descriptionRequired: 'La description est requise',
      amountInvalid: 'Montant invalide',
      urlInvalid: 'URL invalide',
      levelRequired: 'Le niveau est requis',
      statusRequired: 'Le statut est requis',
    },
    errors: {
      submitFailed: 'Échec de la soumission',
    },
  },
  en: {
    titleEdit: 'Edit Award',
    titleCreate: 'Add Award',
    subtitle: 'Record a distinction or award',
    sections: {
      basic: 'Basic Information',
      details: 'Award Details',
      recipients: 'Recipients',
      recognition: 'Recognition',
    },
    form: {
      title: 'Award Title',
      titlePlaceholder: 'Name of the distinction',
      category: 'Category',
      selectCategory: 'Select a category',
      organization: 'Organization',
      organizationPlaceholder: 'Awarding organization',
      year: 'Year',
      recipients: 'Recipients',
      selectRecipient: 'Select recipient',
      coRecipients: 'Co-recipients',
      selectCoRecipients: 'Select co-recipients',
      description: 'Description',
      descriptionPlaceholder:
        'Description of the award and its significance...',
      significance: 'Significance',
      significancePlaceholder: 'Impact and importance of this distinction...',
      amount: 'Amount',
      amountPlaceholder: 'Financial prize (optional)',
      criteria: 'Criteria',
      criteriaPlaceholder: 'Award criteria...',
      ceremony: 'Ceremony',
      ceremonyPlaceholder: 'Award ceremony details...',
      certificateUrl: 'Certificate URL',
      certificateUrlPlaceholder: 'https://...',
      websiteUrl: 'Award Website',
      websiteUrlPlaceholder: 'https://...',
      mediaUrl: 'Media Coverage',
      mediaUrlPlaceholder: 'Press articles, announcements...',
      level: 'Level',
      selectLevel: 'Select level',
      status: 'Status',
      selectStatus: 'Select status',
      tags: 'Keywords',
      tagsPlaceholder: 'Keywords for search',
      notes: 'Notes',
      notesPlaceholder: 'Internal notes...',
      featured: 'Featured',
      url: 'URL',
      urlPlaceholder: 'https://...',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...',
    },
    categories: {
      publication: 'Publication',
      research: 'Research',
      teaching: 'Teaching',
      service: 'Service',
      career: 'Career',
      excellence: 'Excellence',
      innovation: 'Innovation',
      collaboration: 'Collaboration',
    },
    levels: {
      international: 'International',
      national: 'National',
      regional: 'Regional',
      institutional: 'Institutional',
      departmental: 'Departmental',
    },
    statuses: {
      received: 'Received',
      nominated: 'Nominated',
      pending: 'Pending',
      declined: 'Declined',
    },
    validation: {
      titleRequired: 'Title is required',
      categoryRequired: 'Category is required',
      organizationRequired: 'Organization is required',
      yearRequired: 'Year is required',
      yearInvalid: 'Invalid year',
      recipientRequired: 'Recipient is required',
      descriptionRequired: 'Description is required',
      amountInvalid: 'Invalid amount',
      urlInvalid: 'Invalid URL',
      levelRequired: 'Level is required',
      statusRequired: 'Status is required',
    },
    errors: {
      submitFailed: 'Failed to submit',
    },
  },
};
