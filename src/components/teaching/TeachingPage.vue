<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockResearchers } from '@/data/mockResearchers'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Teaching components
import CourseCard from './CourseCard.vue'

// Extended Course interface for teaching page
interface ExtendedCourse {
  id: string;
  title: string;
  code: string;
  instructor: string;
  semester: string;
  level: 'undergraduate' | 'graduate';
  description: string;
  credits?: number;
  prerequisites?: string[];
  objectives?: string[];
  topics?: string[];
  syllabusUrl?: string;
  moodleUrl?: string;
  githubUrl?: string;
}

// Language and translations
const { t } = useLanguage()

// State
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')

// Generate extended course data from researchers
const generateAllCourses = (): ExtendedCourse[] => {
  const additionalCourses: ExtendedCourse[] = [
    {
      id: 'c3',
      title: 'Développement Web Avancé',
      code: 'CS-401',
      instructor: 'Dr. Sarah Chen',
      semester: 'Fall 2024',
      level: 'undergraduate',
      description: 'Cours avancé sur le développement d\'applications web modernes avec focus sur les frameworks JavaScript et les architectures cloud.',
      credits: 6,
      prerequisites: ['HTML/CSS', 'JavaScript', 'Bases de données'],
      objectives: ['Maîtriser React/Vue.js', 'Comprendre les architectures microservices', 'Implémenter des APIs REST'],
      topics: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
      syllabusUrl: 'https://example.com/syllabus-web.pdf',
      moodleUrl: 'https://moodle.univ.fr/course/web-advanced',
      githubUrl: 'https://github.com/lab/web-course'
    },
    {
      id: 'c4',
      title: 'Sécurité Informatique',
      code: 'CS-503',
      instructor: 'Dr. Sarah Chen',
      semester: 'Spring 2024',
      level: 'graduate',
      description: 'Cours approfondi sur la cybersécurité, couvrant les vulnérabilités, les attaques et les contre-mesures dans les systèmes modernes.',
      credits: 6,
      prerequisites: ['Réseaux informatiques', 'Systèmes d\'exploitation', 'Cryptographie'],
      objectives: ['Identifier les vulnérabilités', 'Implémenter des mesures de sécurité', 'Analyser les incidents'],
      topics: ['Pentest', 'Blockchain Security', 'Threat Analysis', 'Incident Response'],
      syllabusUrl: 'https://example.com/syllabus-security.pdf',
      moodleUrl: 'https://moodle.univ.fr/course/security'
    },
    {
      id: 'c5',
      title: 'Gestion de Projets Logiciels',
      code: 'CS-403',
      instructor: 'Dr. Marie Dubois',
      semester: 'Fall 2024',
      level: 'undergraduate',
      description: 'Méthodologies de gestion de projets logiciels, incluant Agile, Scrum, et les outils de collaboration moderne.',
      credits: 4,
      prerequisites: ['Génie logiciel', 'Programmation orientée objet'],
      objectives: ['Maîtriser les méthodes Agile', 'Gérer une équipe de développement', 'Utiliser les outils DevOps'],
      topics: ['Scrum', 'Kanban', 'Git', 'CI/CD', 'Jira'],
      syllabusUrl: 'https://example.com/syllabus-pm.pdf',
      githubUrl: 'https://github.com/lab/project-management'
    },
    {
      id: 'c6',
      title: 'Intelligence Artificielle Appliquée',
      code: 'CS-504',
      instructor: 'Prof. Jean Martin',
      semester: 'Spring 2024',
      level: 'graduate',
      description: 'Application de l\'IA aux problèmes réels du génie logiciel : génération de code, test automatique, détection de bugs.',
      credits: 8,
      prerequisites: ['Machine Learning', 'Algorithmique avancée', 'Statistiques'],
      objectives: ['Développer des modèles ML', 'Appliquer l\'IA au développement', 'Évaluer les performances'],
      topics: ['NLP for Code', 'Code Generation', 'Bug Detection', 'Test Generation'],
      syllabusUrl: 'https://example.com/syllabus-ai.pdf',
      moodleUrl: 'https://moodle.univ.fr/course/ai-applied'
    }
  ]

  // Combine courses from researchers with additional courses
  const researcherCourses = mockResearchers.flatMap(researcher =>
    researcher.coursesTaught.map(course => ({
      ...course,
      instructor: researcher.name
    }))
  )

  return [...researcherCourses, ...additionalCourses] as ExtendedCourse[]
}

// Data
const allCourses = generateAllCourses()

// Computed
const availableSemesters = computed(() => {
  const semesters = [...new Set(allCourses.map(course => course.semester))]
  return semesters.sort()
})

const uniqueInstructors = computed(() => {
  return [...new Set(allCourses.map(course => course.instructor))]
})

const filteredCourses = computed(() => {
  return allCourses.filter(course => {
    const matchesSearch = !searchQuery.value ||
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLevel = !selectedLevel.value ||
      course.level === selectedLevel.value

    const matchesSemester = !selectedSemester.value ||
      course.semester === selectedSemester.value

    return matchesSearch && matchesLevel && matchesSemester
  })
})

// Statistics
const statistics = computed(() => [
  { value: allCourses.length, label: t.value.teaching.statistics.coursesOffered },
  { value: uniqueInstructors.value.length, label: t.value.teaching.statistics.instructors },
  { value: 2, label: t.value.teaching.statistics.studyLevels }
])

// Filters configuration
const filters = computed(() => [
  {
    id: 'level',
    label: t.value.teaching.filters.level,
    value: selectedLevel.value,
    options: [
      { value: '', label: t.value.teaching.filters.allLevels },
      { value: 'undergraduate', label: t.value.teaching.levels.undergraduate },
      { value: 'graduate', label: t.value.teaching.levels.graduate }
    ]
  },
  {
    id: 'semester',
    label: t.value.teaching.filters.semester,
    value: selectedSemester.value,
    options: [
      { value: '', label: t.value.teaching.filters.allSemesters },
      ...availableSemesters.value.map(semester => ({ value: semester, label: semester }))
    ]
  }
])

// Methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'level':
      selectedLevel.value = value
      break
    case 'semester':
      selectedSemester.value = value
      break
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.teaching.pageTitle"
      :subtitle="t.teaching.pageSubtitle"
      highlight-word="Enseignement"
    />

    <!-- Statistics -->
    <StatisticsGrid 
      :statistics="statistics"
      :columns="3"
    />

    <!-- Filters -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="max-w-6xl mx-auto">
        <SearchAndFilters
          :search-query="searchQuery"
          :search-label="t.teaching.search.label"
          :search-placeholder="t.teaching.search.placeholder"
          :filters="filters"
          @update:search-query="searchQuery = $event"
          @update-filter="updateFilter"
        />
      </div>
    </div>

    <!-- Course List -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.id"
            :course="course"
          />
        </div>

        <!-- Empty State -->
        <EmptyState 
          v-else
          :title="t.teaching.empty.title"
          :message="t.teaching.empty.message"
          icon="book"
        />
      </div>
    </div>
  </div>
</template>