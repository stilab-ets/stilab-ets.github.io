export interface UserSettingsFormTranslations {

}

export const userSettingsFormTranslations: Record<'fr' | 'en', UserSettingsFormTranslations> = {
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
