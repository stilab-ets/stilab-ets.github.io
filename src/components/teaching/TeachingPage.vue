<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useCourses } from '@/hooks/teaching/useCourses'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Teaching components
import CourseCard from './CourseCard.vue'

// Language and translations
const { t } = useLanguage()

// Use courses hook
const {
  courses,
  isLoading,
  error,
  fetchCourses,
  filteredCourses,
  uniqueLevels,
  uniqueSemesters,
  clearError
} = useCourses()

// Filter state
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')

// Fetch courses on mount
onMounted(() => {
  fetchCourses()
})

// Computed filtered courses using the hook's filter function
const filteredCoursesComputed = computed(() => {
  return filteredCourses(searchQuery.value, selectedLevel.value, selectedSemester.value)
})

// Statistics for the statistics grid - with proper null checking
const statistics = computed(() => {
  const coursesList = courses.value || []
  return [
    {
      label: t.value.teaching.stats.totalCourses,
      value: coursesList.length.toString(),
      icon: 'book',
      color: 'bg-blue-500'
    },
    {
      label: t.value.teaching.stats.undergraduateCourses,
      value: coursesList.filter(c => c.level === 'undergraduate').length.toString(),
      icon: 'users',
      color: 'bg-green-500'
    },
    {
      label: t.value.teaching.stats.graduateCourses,
      value: coursesList.filter(c => c.level === 'graduate').length.toString(),
      icon: 'award',
      color: 'bg-purple-500'
    },
    {
      label: t.value.teaching.stats.instructors,
      value: new Set(coursesList.map(c => c.teacher ? `${c.teacher.first_name} ${c.teacher.last_name}` : 'Unknown')).size.toString(),
      icon: 'user-check',
      color: 'bg-orange-500'
    }
  ]
})

// Filters configuration - with proper null checking
const filters = computed(() => [
  {
    id: 'level',
    label: t.value.teaching.filters.level,
    value: selectedLevel.value,
    options: [
      { value: '', label: t.value.teaching.filters.allLevels },
      ...(uniqueLevels.value || []).map(level => ({
        value: level,
        label: level === 'undergraduate' ? t.value.teaching.levels.undergraduate : t.value.teaching.levels.graduate
      }))
    ]
  },
  {
    id: 'semester',
    label: t.value.teaching.filters.semester,
    value: selectedSemester.value,
    options: [
      { value: '', label: t.value.teaching.filters.allSemesters },
      ...(uniqueSemesters.value || []).map(semester => ({
        value: semester,
        label: getFullSemesterName(semester)
      }))
    ]
  }
])

// Helper function to get full semester name
const getFullSemesterName = (semester: string | null): string => {
  if (!semester) return ''
  switch (semester) {
    case 'F':
      return t.value.teaching.semesters.fall
    case 'W':
      return t.value.teaching.semesters.winter
    case 'S':
      return t.value.teaching.semesters.summer
    default:
      return semester
  }
}

// Results text - with proper null checking
const resultsText = computed(() => {
  const count = filteredCoursesComputed.value?.length || 0
  if (count === 0) return `0 ${t.value.teaching.results.course}`
  if (count === 1) return `1 ${t.value.teaching.results.course}`
  return `${count} ${t.value.teaching.results.courses}`
})

// Filter update method
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'level':
      selectedLevel.value = value
      break
    case 'semester':
      selectedSemester.value = value
      break
    case 'search':
      searchQuery.value = value
      break
  }
}

// Clear error and retry
const retryFetch = () => {
  clearError()
  fetchCourses()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.teaching.pageTitle"
      :subtitle="t.teaching.pageSubtitle"
      highlight-word="Teaching"
    />

    <!-- Statistics Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <StatisticsGrid :statistics="statistics" />
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <SearchAndFilters
        v-model:search-query="searchQuery"
        :filters="filters"
        :results-text="resultsText"
        @update-filter="updateFilter"
        @update:search-query="updateFilter('search', $event)"
      />
    </div>

    <!-- Error State -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto text-center">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-red-600">{{ error }}</p>
          <button 
            @click="retryFetch"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {{ t.common.retry }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Course List -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <div v-if="filteredCoursesComputed.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseCard
            v-for="course in filteredCoursesComputed"
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
