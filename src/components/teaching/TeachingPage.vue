<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useCourses } from '@/hooks/teaching/useCourses'

// Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import CourseCard from './CourseCard.vue'

const { t } = useLanguage()

// Get data from the useCourses hook
const {
  courses,
  fetchCourses,
} = useCourses()

// State
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSemester = ref('')

// Fetch on mount
onMounted(() => {
  fetchCourses()
})

// Helper: full semester name
const getFullSemester = (semester: string, year: number) => {
  let label = ''
  switch (semester) {
    case 'F': label = t.value.teaching.semesters.fall; break
    case 'W': label = t.value.teaching.semesters.winter; break
    case 'S': label = t.value.teaching.semesters.summer; break
    default: label = semester
  }
  return `${label} ${year}`
}

// Computed: available semesters
const availableSemesters = computed(() => {
  const semesters = courses.value.map(c => getFullSemester(c.semester, c.year))
  return [...new Set(semesters)].sort()
})

// Computed: instructors
const uniqueInstructors = computed(() => {
  return [...new Set(courses.value.map(
    c => `${c.teacher.first_name} ${c.teacher.last_name}`
  ))]
})

// Computed: filtered courses
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const search = searchQuery.value.toLowerCase()

    return (
      (!searchQuery.value ||
        course.title.toLowerCase().includes(search) ||
        course.code.toLowerCase().includes(search) ||
        course.description?.toLowerCase().includes(search)
      ) &&
      (!selectedLevel.value || course.level === selectedLevel.value)
    )
  })
})

// Computed: statistics
const statistics = computed(() => [
  { value: courses.value.length, label: t.value.teaching.statistics.coursesOffered },
  { value: uniqueInstructors.value.length, label: t.value.teaching.statistics.instructors },
  { value: 2, label: t.value.teaching.statistics.studyLevels }
])

// Filters
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
      ...availableSemesters.value.map(s => ({ value: s, label: s }))
    ]
  }
])

// Update filter values
const updateFilter = (filterId: string, value: string) => {
  if (filterId === 'level') selectedLevel.value = value
  if (filterId === 'semester') selectedSemester.value = value
  if (filterId === 'search') searchQuery.value = value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader
      :title="t.teaching.pageTitle"
      :subtitle="t.teaching.pageSubtitle"
      highlight-word="Enseignement"
    />

    <StatisticsGrid :statistics="statistics" :columns="3" />

    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="max-w-6xl mx-auto">
        <SearchAndFilters
          :search-query="searchQuery"
          :search-label="t.teaching.search.label"
          :search-placeholder="t.teaching.search.placeholder"
          :filters="filters"
          @update:search-query="val => updateFilter('search', val)"
          @update-filter="updateFilter"
        />
      </div>
    </div>

    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.id"
            :course="course"
          />
        </div>

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
