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
import ResearchPage from '@/reseach/ResearchPage.vue'
import EventsPage from '@/events/EventsPage.vue'
import TeachingPage from '@/teaching/TeachingPage.vue'
import MScProjectsPage from '@/projects/MScProjectsPage.vue'
import VacanciesPage from '@/vacancies/VacanciesPage.vue'
import AwardsPage from '@/awards/AwardsPage.vue'

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
app.component('MScProjectsPage', MScProjectsPage)
app.component('VacanciesPage', VacanciesPage)
app.component('AwardsPage', AwardsPage)

// Mount the application
app.mount('#app')