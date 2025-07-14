// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

// Layout components
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import LogoButton from '@/components/layout/header/LogoButton.vue'
import NavItems from '@/components/layout/header/NavItems.vue'
import MobileMenuToggle from '@/components/layout/header/MobileMenuToggle.vue'
import LanguageToggle from '@/components/layout/header/LanguageToggle.vue'
import UserProfile from '@/components/layout/header/UserProfile.vue'
import LabInfo from '@/components/layout/footer/LabInfo.vue'
import QuickLinks from '@/components/layout/footer/QuickLinks.vue'
import ContactInfo from '@/components/layout/footer/ContactInfo.vue'
import CopyrightFooter from '@/components/layout/footer/CopyrightFooter.vue'

// Home page components
import Hero from '@/components/home/Hero.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import ResearchAreasPreview from '@/components/home/ResearchAreasPreview.vue'
import QuickLinksHome from '@/components/home/QuickLinks.vue'

// Page components
import PeoplePage from '@/components/people/PeoplePage.vue'
import PersonCard from '@/components/people/PersonCard.vue'
import PersonModal from '@/components/people/PersonModal.vue'
import PeopleFilters from '@/components/people/PeopleFilters.vue'

import PublicationsPage from '@/components/publications/PublicationsPage.vue'
import PublicationCard from '@/components/publications/PublicationCard.vue'
import PublicationSortOptions from '@/components/publications/PublicationSortOptions.vue'

import ResearchPage from '@/components/research/ResearchPage.vue'
import ResearchOverview from '@/components/research/ResearchOverview.vue'
import FeaturedProjects from '@/components/research/FeaturedProjects.vue'
import ResearchAreasAccordion from '@/components/research/ResearchAreasAccordion.vue'

import EventsPage from '@/components/events/EventsPage.vue'
import EventCard from '@/components/events/EventCard.vue'

import TeachingPage from '@/components/teaching/TeachingPage.vue'
import CourseCard from '@/components/teaching/CourseCard.vue'

import ProjectsPage from '@/components/projects/ProjectPage.vue'
import ProjectsInfoBanner from '@/components/projects/ProjectsInfoBanner.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import InterestModal from '@/components/projects/InterestModal.vue'

import VacanciesPage from '@/components/vacancies/VacanciesPage.vue'
import VacanciesInfoBanner from '@/components/vacancies/VacanciesInfoBanner.vue'
import VacancyCard from '@/components/vacancies/VacancyCard.vue'

import AwardsPage from '@/components/awards/AwardsPage.vue'
import AwardsTimeline from '@/components/awards/AwardsTimeline.vue'
import NotableAchievements from '@/components/awards/NotableAchievements.vue'

// Authentication components
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

// Form components
import PublicationForm from '@/components/forms/PublicationForm.vue'
import EventForm from '@/components/forms/EventForm.vue'
import ProjectForm from '@/components/forms/ProjectForm.vue'
import MemberForm from '@/components/forms/MemberForm.vue'
import ResearchForm from '@/components/forms/ResearchForm.vue'
import TeachingForm from '@/components/forms/TeachingForm.vue'
import AwardForm from '@/components/forms/AwardForm.vue'
import VacancyForm from '@/components/forms/VacancyForm.vue'
import UserSettingsForm from '@/components/forms/UserSettingsForm.vue'
import AdminManagementForm from '@/components/forms/AdminManagementForm.vue'

// UI components
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Create Vue application
const app = createApp(App)

// Register layout components globally
app.component('Header', Header)
app.component('Footer', Footer)
app.component('LogoButton', LogoButton)
app.component('NavItems', NavItems)
app.component('MobileMenuToggle', MobileMenuToggle)
app.component('LanguageToggle', LanguageToggle)
app.component('UserProfile', UserProfile)
app.component('LabInfo', LabInfo)
app.component('QuickLinksFooter', QuickLinks)
app.component('ContactInfo', ContactInfo)
app.component('CopyrightFooter', CopyrightFooter)

// Register home page components globally
app.component('Hero', Hero)
app.component('StatsSection', StatsSection)
app.component('ResearchAreasPreview', ResearchAreasPreview)
app.component('QuickLinksHome', QuickLinksHome)

// Register page components globally
app.component('PeoplePage', PeoplePage)
app.component('PersonCard', PersonCard)
app.component('PersonModal', PersonModal)
app.component('PeopleFilters', PeopleFilters)

app.component('PublicationsPage', PublicationsPage)
app.component('PublicationCard', PublicationCard)
app.component('PublicationSortOptions', PublicationSortOptions)

app.component('ResearchPage', ResearchPage)
app.component('ResearchOverview', ResearchOverview)
app.component('FeaturedProjects', FeaturedProjects)
app.component('ResearchAreasAccordion', ResearchAreasAccordion)

app.component('EventsPage', EventsPage)
app.component('EventCard', EventCard)

app.component('TeachingPage', TeachingPage)
app.component('CourseCard', CourseCard)

app.component('ProjectsPage', ProjectsPage)
app.component('ProjectsInfoBanner', ProjectsInfoBanner)
app.component('ProjectCard', ProjectCard)
app.component('InterestModal', InterestModal)

app.component('VacanciesPage', VacanciesPage)
app.component('VacanciesInfoBanner', VacanciesInfoBanner)
app.component('VacancyCard', VacancyCard)

app.component('AwardsPage', AwardsPage)
app.component('AwardsTimeline', AwardsTimeline)
app.component('NotableAchievements', NotableAchievements)

// Register authentication components globally
app.component('LoginForm', LoginForm)
app.component('RegisterForm', RegisterForm)

// Register form components globally
app.component('PublicationForm', PublicationForm)
app.component('EventForm', EventForm)
app.component('ProjectForm', ProjectForm)
app.component('MemberForm', MemberForm)
app.component('ResearchForm', ResearchForm)
app.component('TeachingForm', TeachingForm)
app.component('AwardForm', AwardForm)
app.component('VacancyForm', VacancyForm)
app.component('UserSettingsForm', UserSettingsForm)
app.component('AdminManagementForm', AdminManagementForm)

// Register UI components globally
app.component('Card', Card)
app.component('Button', Button)
app.component('PageHeader', PageHeader)
app.component('SearchAndFilters', SearchAndFilters)
app.component('StatisticsGrid', StatisticsGrid)
app.component('EmptyState', EmptyState)

// Mount the application
app.mount('#app')