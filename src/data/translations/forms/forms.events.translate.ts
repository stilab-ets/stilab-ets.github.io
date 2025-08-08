export interface EventsFormTranslations {
  titleEdit: string;
  titleCreate: string;
  subtitle: string;
  form: {
    title: string;
    titlePlaceholder: string;
    type: string;
    selectType: string;
    speaker: string;
    speakerPlaceholder: string;
    date: string;
    time: string;
    duration: string;
    selectDuration: string;
    minutes: string;
    hour: string;
    hours: string;
    fullDay: string;
    location: string;
    locationPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    tags: string;
    tagsPlaceholder: string;
    tagsHelp: string;
    meetingUrl: string;
    meetingUrlPlaceholder: string;
    recordingUrl: string;
    recordingUrlPlaceholder: string;
    cancel: string;
    create: string;
    update: string;
    submitting: string;
  };
  eventTypes: {
    seminar: string;
    workshop: string;
    conference: string;
    defense: string;
    meeting: string;
    colloquium: string;
    masterclass: string;
  };
  registration: {
    title: string;
    required: string;
    capacity: string;
    capacityPlaceholder: string;
    deadline: string;
    url: string;
    urlPlaceholder: string;
    urlHelp: string;
  };
  visibility: {
    title: string;
    public: string;
    internal: string;
    private: string;
  };
  validation: {
    titleRequired: string;
    typeRequired: string;
    dateRequired: string;
    dateInPast: string;
    locationRequired: string;
    descriptionRequired: string;
    deadlineAfterEvent: string;
  };
  errors: {
    submitFailed: string;
  };
}

export const eventsFormTranslations: Record<
  'fr' | 'en',
  EventsFormTranslations
> = {
  fr: {
    titleEdit: "Modifier l'événement",
    titleCreate: 'Créer un événement',
    subtitle: "Remplissez les détails de l'événement",
    form: {
      title: 'Titre',
      titlePlaceholder: 'Entrez un titre',
      type: 'Type',
      selectType: 'Sélectionnez un type',
      speaker: 'Intervenant',
      speakerPlaceholder: "Nom de l'intervenant (optionnel)",
      date: 'Date',
      time: 'Heure',
      duration: 'Durée',
      selectDuration: 'Sélectionnez la durée',
      minutes: 'minutes',
      hour: 'heure',
      hours: 'heures',
      fullDay: 'Journée complète',
      location: 'Lieu',
      locationPlaceholder: 'Entrez le lieu',
      description: 'Description',
      descriptionPlaceholder: 'Entrez une description',
      tags: 'Mots-clés',
      tagsPlaceholder: 'Appuyez sur Entrée pour ajouter un mot-clé',
      tagsHelp: 'Utilisez des mots-clés pour catégoriser votre événement.',
      meetingUrl: 'URL de réunion',
      meetingUrlPlaceholder: 'https://...',
      recordingUrl: "URL d'enregistrement",
      recordingUrlPlaceholder: 'https://...',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...',
    },
    eventTypes: {
      seminar: 'Séminaire',
      workshop: 'Workshop',
      conference: 'Conférence',
      defense: 'Soutenance',
      meeting: 'Réunion',
      colloquium: 'Colloque',
      masterclass: 'Masterclass',
    },
    registration: {
      title: 'Inscription',
      required: 'Inscription requise',
      capacity: 'Capacité',
      capacityPlaceholder: 'Nombre maximum de participants',
      deadline: "Date limite d'inscription",
      url: "URL d'inscription",
      urlPlaceholder: 'https://inscription.com',
      urlHelp: "Lien optionnel pour l'inscription.",
    },
    visibility: {
      title: 'Visibilité',
      public: 'Public',
      internal: 'Interne',
      private: 'Privé',
    },
    validation: {
      titleRequired: 'Le titre est requis',
      typeRequired: 'Le type est requis',
      dateRequired: 'La date est requise',
      dateInPast: 'La date ne peut pas être dans le passé',
      locationRequired: 'Le lieu est requis',
      descriptionRequired: 'La description est requise',
      deadlineAfterEvent: "La date limite doit être avant l'événement",
    },
    errors: {
      submitFailed: 'Échec de la soumission du formulaire',
    },
  },
  en: {
    titleEdit: 'Edit Event',
    titleCreate: 'Create Event',
    subtitle: 'Fill in the event details',
    form: {
      title: 'Title',
      titlePlaceholder: 'Enter a title',
      type: 'Type',
      selectType: 'Select a type',
      speaker: 'Speaker',
      speakerPlaceholder: 'Optional speaker name',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      selectDuration: 'Select duration',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      fullDay: 'Full Day',
      location: 'Location',
      locationPlaceholder: 'Enter the location',
      description: 'Description',
      descriptionPlaceholder: 'Enter a description',
      tags: 'Tags',
      tagsPlaceholder: 'Press enter to add a tag',
      tagsHelp: 'Use keywords to help categorize your event.',
      meetingUrl: 'Meeting URL',
      meetingUrlPlaceholder: 'https://...',
      recordingUrl: 'Recording URL',
      recordingUrlPlaceholder: 'https://...',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...',
    },
    eventTypes: {
      seminar: 'Seminar',
      workshop: 'Workshop',
      conference: 'Conference',
      defense: 'Defense',
      meeting: 'Meeting',
      colloquium: 'Colloquium',
      masterclass: 'Masterclass',
    },
    registration: {
      title: 'Registration',
      required: 'Requires registration',
      capacity: 'Capacity',
      capacityPlaceholder: 'Max participants',
      deadline: 'Registration deadline',
      url: 'Registration URL',
      urlPlaceholder: 'https://register.com',
      urlHelp: 'Optional link for registration.',
    },
    visibility: {
      title: 'Visibility',
      public: 'Public',
      internal: 'Internal',
      private: 'Private',
    },
    validation: {
      titleRequired: 'Title is required',
      typeRequired: 'Type is required',
      dateRequired: 'Date is required',
      dateInPast: 'Date cannot be in the past',
      locationRequired: 'Location is required',
      descriptionRequired: 'Description is required',
      deadlineAfterEvent: 'Deadline must be before the event date',
    },
    errors: {
      submitFailed: 'Failed to submit the form',
    },
  },
} as const;
