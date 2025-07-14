export interface EventsFormTranslations {

}

export const eventsFormTranslations: Record<'fr' | 'en', EventsFormTranslations> = {
      fr: {
      title: "",
      description: "",
      fields: {
          name: "",
          email: "",
          role: ""
      },
      actions: {
          save: "",
          cancel: "",
          delete: ""
      }
  },
  en: {
      title: "",
      description: "",
      fields: {
          name: "",
          email: "",
          role: ""
      },
      actions: {
          save: "",
          cancel: "",
          delete: ""
      }
  }
} as const
