<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockResearchers } from '../data/mockResearchers'

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

// State
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')

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

// Methods
const getLevelColor = (level: string) => {
  const colors = {
    undergraduate: 'bg-green-100 text-green-800',
    graduate: 'bg-blue-100 text-blue-800'
  }
  return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getLevelLabel = (level: string) => {
  const labels = {
    undergraduate: 'Licence',
    graduate: 'Master'
  }
  return labels[level as keyof typeof labels] || level
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            <span class="text-[#08a4d4]">Enseignement</span>
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Découvrez les cours dispensés par les membres de notre laboratoire
          </p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">{{ allCourses.length }}</div>
            <div class="text-gray-600">Cours proposés</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">{{ uniqueInstructors.length }}</div>
            <div class="text-gray-600">Enseignants</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">2</div>
            <div class="text-gray-600">Niveaux d'étude</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="md:col-span-2">
              <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
                Rechercher un cours
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input id="search" v-model="searchQuery" type="text" placeholder="Titre, code, enseignant..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" />
              </div>
            </div>

            <!-- Level Filter -->
            <div>
              <label for="level-filter" class="block text-sm font-medium text-gray-700 mb-2">
                Niveau
              </label>
              <select id="level-filter" v-model="selectedLevel"
                class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
                <option value="">Tous les niveaux</option>
                <option value="undergraduate">Licence</option>
                <option value="graduate">Master</option>
              </select>
            </div>

            <!-- Semester Filter -->
            <div>
              <label for="semester-filter" class="block text-sm font-medium text-gray-700 mb-2">
                Semestre
              </label>
              <select id="semester-filter" v-model="selectedSemester"
                class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
                <option value="">Tous les semestres</option>
                <option v-for="semester in availableSemesters" :key="semester" :value="semester">
                  {{ semester }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course List -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="course in filteredCourses" :key="course.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
            <!-- Course Card -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-3">
                    {{ course.code }}
                  </span>
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getLevelColor(course.level)
                  ]">
                    {{ getLevelLabel(course.level) }}
                  </span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
                <div class="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                  <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ course.instructor }}
                  </div>
                  <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ course.semester }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-700 mb-4 leading-relaxed">{{ course.description }}</p>

            <!-- Course Details -->
            <div class="space-y-2 text-sm text-gray-600">
              <div v-if="course.prerequisites" class="flex">
                <span class="font-medium mr-2">Prérequis:</span>
                <span>{{ course.prerequisites.join(', ') }}</span>
              </div>
              <div v-if="course.objectives" class="flex">
                <span class="font-medium mr-2">Objectifs:</span>
                <span>{{ course.objectives.join(', ') }}</span>
              </div>
              <div v-if="course.topics" class="flex flex-wrap">
                <span class="font-medium mr-2">Sujets abordés:</span>
                <div class="flex flex-wrap gap-1">
                  <span v-for="topic in course.topics" :key="topic"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {{ topic }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Course Links -->
            <div class="mt-4 flex items-center justify-between">
              <div class="flex space-x-2">
                <a v-if="course.syllabusUrl" :href="course.syllabusUrl" target="_blank"
                  class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clip-rule="evenodd" />
                  </svg>
                  Syllabus
                </a>
                <a v-if="course.moodleUrl" :href="course.moodleUrl" target="_blank"
                  class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Moodle
                </a>
                <a v-if="course.githubUrl" :href="course.githubUrl" target="_blank"
                  class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
              <div v-if="course.credits" class="text-sm text-gray-500">
                {{ course.credits }} ECTS
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun cours trouvé</h3>
          <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
        </div>
      </div>
    </div>
  </div>
</template>