import { adminManagementFormTranslations, AdminManagementFormTranslations } from './forms.adminManagement.translate'
import { awardsFormTranslations, AwardsFormTranslations } from './forms.awards.translate'
import { eventsFormTranslations, EventsFormTranslations } from './forms.events.translate'
import { memberFormTranslations, MemberFormTranslations } from './forms.member.translate'
import { projectFormTranslations, ProjectFormTranslations } from './forms.project.translate'
import { publicationFormTranslations, PublicationFormTranslations } from './forms.publication.translate'
import { researchFormTranslations, ResearchFormTranslations } from './forms.research.translate'
import { teachingFormTranslations, TeachingFormTranslations } from './forms.teaching.translate'
import { userSettingsFormTranslations, UserSettingsFormTranslations } from './forms.userSettings.translate'
import { vacancyFormTranslations, VacancyFormTranslations } from './forms.vacancy.translate'

export interface FormsTranslations {
  adminManagement: AdminManagementFormTranslations
  awards: AwardsFormTranslations
  events: EventsFormTranslations
  member: MemberFormTranslations
  project: ProjectFormTranslations
  publication: PublicationFormTranslations
  research: ResearchFormTranslations
  teaching: TeachingFormTranslations
  userSettings: UserSettingsFormTranslations
  vacancy: VacancyFormTranslations
}

export const formsTranslations: Record<'fr' | 'en', FormsTranslations> = {
  fr: {
    adminManagement: adminManagementFormTranslations.fr,
    awards: awardsFormTranslations.fr,
    events: eventsFormTranslations.fr,
    member: memberFormTranslations.fr,
    project: projectFormTranslations.fr,
    publication: publicationFormTranslations.fr,
    research: researchFormTranslations.fr,
    teaching: teachingFormTranslations.fr,
    userSettings: userSettingsFormTranslations.fr,
    vacancy: vacancyFormTranslations.fr
  },
  en: {
    adminManagement: adminManagementFormTranslations.en,
    awards: awardsFormTranslations.en,
    events: eventsFormTranslations.en,
    member: memberFormTranslations.en,
    project: projectFormTranslations.en,
    publication: publicationFormTranslations.en,
    research: researchFormTranslations.en,
    teaching: teachingFormTranslations.en,
    userSettings: userSettingsFormTranslations.en,
    vacancy: vacancyFormTranslations.en
  }
}
