export interface TeachingFormTranslations {

}

export const teachingFormTranslations: Record<'fr' | 'en', TeachingFormTranslations> = {
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
