import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

// Layout components
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

// Home page components
import Hero from './components/home/Hero.vue'
import StatsSection from './components/home/StatsSection.vue'
import ResearchAreasPreview from './components/home/ResearchAreasPreview.vue'
import QuickLinks from './components/home/QuickLinks.vue'

// Page components
import PeoplePage from './components/PeoplePage.vue'
import PublicationsPage from './components/PublicationsPage.vue'
import ResearchPage from './components/ResearchPage.vue'
import EventsPage from './components/EventsPage.vue'
import TeachingPage from './components/TeachingPage.vue'
import MScProjectsPage from './components/MScProjectsPage.vue'
import VacanciesPage from './components/VacanciesPage.vue'
import AwardsPage from './components/AwardsPage.vue'

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