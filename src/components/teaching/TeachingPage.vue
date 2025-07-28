<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mainAPI } from '@/services/ApiFactory'
import type { Course } from '@/services/MainAPI'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Teaching components
import CourseCard from './CourseCard.vue'

// Language and translations
const { t } = useLanguage()

// State
const allCourses = ref<Course[]>([])
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchCourses = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await mainAPI.getCourses()
    allCourses.value = response.data.results || response.data
  } catch (err) {
    console.error('Error fetching courses:', err)
    error.value = 'Failed to load courses'
  } finally {
    isLoading.value = false
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
      allCourses.value.map((course: Course) => getFullSemester(course))
    )
  ]
  return semesters.sort()
})

const uniqueInstructors = computed(() => {
  return [...new Set(allCourses.value.map(course => course.instructor))]
})

const filteredCourses = computed(() => {
  return allCourses.value.filter(course => {
    const matchesSearch = !searchQuery.value ||
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLevel = !selectedLevel.value ||
      course.code.startsWith(selectedLevel.value)

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

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto text-center">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-red-600">{{ error }}</p>
          <button 
            @click="fetchCourses"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Course List -->
    <div v-else class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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