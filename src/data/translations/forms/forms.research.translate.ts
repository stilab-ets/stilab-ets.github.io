export interface ResearchFormTranslations {

}

export const researchFormTranslations: Record<'fr' | 'en', ResearchFormTranslations> = {
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
