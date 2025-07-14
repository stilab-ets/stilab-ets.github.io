export interface MemberFormTranslations {

}

export const memberFormTranslations: Record<'fr' | 'en', MemberFormTranslations> = {
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
