<script setup lang="ts">
import { ref } from 'vue'
import PublicationForm from '@/components/publications/PublicationForm.vue'
import MemberForm from '@/components/people/MemberForm.vue'
import ResearchForm from '@/components/research/ResearchForm.vue'
import TeachingForm from '@/components/teaching/TeachingForm.vue'

const currentPage = ref<'form-list' | 'publication-form' | 'member-form' | 'research-form' | 'teaching-form'>('form-list')

function setCurrentPage(page: typeof currentPage.value) {
  currentPage.value = page
}
</script>

<template>
  <div>
    <!-- List of forms to choose from -->
    <div v-if="currentPage === 'form-list'" class="space-y-4">
      <h2 class="text-xl font-semibold mb-4">Available Forms</h2>
      <div class="flex flex-col space-y-3">
        <button class="btn btn-primary" @click="setCurrentPage('publication-form')">
          Publication Form
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('member-form')">
          Member Form
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('research-form')">
          Research Form
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('teaching-form')">
          Teaching Form
        </button>
      </div>
    </div>

    <!-- Back Button when in a specific form -->
    <div v-else class="mb-6">
      <button class="btn btn-secondary" @click="setCurrentPage('form-list')">
        ← Back to Form List
      </button>
    </div>

    <!-- Dynamically rendered forms -->
    <PublicationForm
      v-if="currentPage === 'publication-form'"
      @navigate="setCurrentPage"
    />

    <MemberForm
      v-else-if="currentPage === 'member-form'"
      @navigate="setCurrentPage"
    />

    <ResearchForm
      v-else-if="currentPage === 'research-form'"
      @navigate="setCurrentPage"
    />

    <TeachingForm
      v-else-if="currentPage === 'teaching-form'"
      @navigate="setCurrentPage"
    />

  </div>
</template>
