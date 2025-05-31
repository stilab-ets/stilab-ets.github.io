import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

// Import all page components
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

// Register all page components globally
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