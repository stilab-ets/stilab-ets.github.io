<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockResearchers } from '@/data/mockResearchers'
import axios from 'axios'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Teaching components
import CourseCard from './CourseCard.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface Teacher {
  id: string
  first_name: string
  last_name: string
  role: string
  email: string | null
  phone?: string | null
  biography?: string | null
  research_domain?: string | null
  image_url?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  personal_website?: string | null
  status?: string | null
}

interface Course {
  id: string;
  title: string;
  code: string;
  teacher: Teacher;
  semester: string;
  level: 'undergraduate' | 'graduate';
  description: string;
  url?: string;
  year: number;
}

// Language and translations
const { t } = useLanguage()

// State

const allCourses = ref<Course[]>([]);
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')

const fetchCourses = async () => {

  try {
    const response = await axios.get(`${API_BASE_URL}/api/courses`)
    allCourses.value = response.data 
  } catch (error) {
    console.error('Error fetching courses:', error)
  }
}
onMounted(fetchCourses)

const getFullSemester = (course: Course) => {
  let semesterLabel = ''
  switch (course.semester) {
    case 'F':
      semesterLabel = t.value.teaching.semesters.fall
      break
    case 'W':
      semesterLabel = t.value.teaching.semesters.winter
      break
    case 'S':
      semesterLabel = t.value.teaching.semesters.summer
      break
    default:
      semesterLabel = course.semester
  }

  return `${semesterLabel} ${course.year}`
}
// Computed
const availableSemesters = computed(() => {
  const semesters = [
    ...new Set(
      allCourses.value.map((course: Course) => {
        // Translate the semester using t
        return getFullSemester(course)
        
      })
    )
  ]
  return semesters.sort()
})

const uniqueInstructors = computed(() => {
  return [...new Set(allCourses.value.map(
    course => course.teacher.first_name + " " + course.teacher.last_name
  ))]
})

const filteredCourses = computed(() => {
  return allCourses.value.filter(course => {
    const matchesSearch = !searchQuery.value ||
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.teacher.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.teacher.last_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLevel = !selectedLevel.value ||
      course.level === selectedLevel.value

    const matchesSemester = !selectedSemester.value ||
      getFullSemester(course) === selectedSemester.value

    return matchesSearch && matchesLevel && matchesSemester
  })
})

// Statistics
const statistics = computed(() => [
  { value: allCourses.value.length, label: t.value.teaching.statistics.coursesOffered },
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
      { value: 'UGR', label: t.value.teaching.levels.undergraduate },
      { value: 'GRD', label: t.value.teaching.levels.graduate }
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
