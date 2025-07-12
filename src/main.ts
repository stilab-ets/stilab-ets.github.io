import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

// Layout components
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

// Home page components
import Hero from '@/home/Hero.vue'
import StatsSection from '@/home/StatsSection.vue'
import ResearchAreasPreview from '@/home/ResearchAreasPreview.vue'
import QuickLinks from '@/home/QuickLinks.vue'

// Page components
import PeoplePage from '@/people/PeoplePage.vue'
import PublicationsPage from '@/publications/PublicationsPage.vue'
import ResearchPage from '@/research/ResearchPage.vue'
import EventsPage from '@/events/EventsPage.vue'
import TeachingPage from '@/teaching/TeachingPage.vue'
import ProjectPage from '@/projects/ProjectPage.vue'
import VacanciesPage from '@/vacancies/VacanciesPage.vue'
import AwardsPage from '@/awards/AwardsPage.vue'

// Authentication components
import LoginForm from '@/auth/LoginForm.vue'
import RegisterForm from '@/auth/RegisterForm.vue'

// Form components
import PublicationForm from '@/forms/PublicationForm.vue'
import EventForm from '@/forms/EventForm.vue'
import ProjectForm from '@/forms/ProjectForm.vue'
import MemberForm from '@/forms/MemberForm.vue'
import ResearchForm from '@/forms/ResearchForm.vue'
import TeachingForm from '@/forms/TeachingForm.vue'
import AwardForm from '@/forms/AwardForm.vue'
import VacancyForm from '@/forms/VacancyForm.vue'
import UserSettingsForm from '@/forms/UserSettingsForm.vue'
import AdminManagementForm from '@/forms/AdminManagementForm.vue'

// UI components
import Card from '@/ui/Card.vue'
import Button from '@/ui/Button.vue'
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/ui/StatisticsGrid.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Create Vue application
const app = createApp(App)

// Register layout components globally
app.component('Header', Header)
app.component('Footer', Footer)

// Register home page components globally
app.component('Hero', Hero)
app.component('StatsSection', StatsSection)
app.component('ResearchAreasPreview', ResearchAreasPreview)
app.component('QuickLinks', QuickLinks)

// Register page components globally
app.component('PeoplePage', PeoplePage)
app.component('PublicationsPage', PublicationsPage)
app.component('ResearchPage', ResearchPage)
app.component('EventsPage', EventsPage)
app.component('TeachingPage', TeachingPage)
app.component('ProjectPage', ProjectPage)
app.component('VacanciesPage', VacanciesPage)
app.component('AwardsPage', AwardsPage)

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