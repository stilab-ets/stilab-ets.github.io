<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import PublicationForm from '@/components/publications/PublicationForm.vue';
import MemberForm from '@/components/people/MemberForm.vue';
import ResearchForm from '@/components/research/ResearchForm.vue';
import TeachingForm from '@/components/teaching/TeachingForm.vue';
import EventForm from '@/components/events/EventForm.vue';
import AwardForm from '@/components/awards/AwardForm.vue';

const { t } = useLanguage();

const currentPage = ref<
  | 'form-list'
  | 'publication-form'
  | 'member-form'
  | 'research-form'
  | 'teaching-form'
  | 'event-form'
  | 'award-form'
>('form-list');

function setCurrentPage(page: typeof currentPage.value) {
  currentPage.value = page;
}
</script>

<template>
  <div>
    <!-- List of forms to choose from -->
    <div v-if="currentPage === 'form-list'" class="space-y-4">
      <h2 class="text-xl font-semibold mb-4">
        {{ t.forms.adminManagement.sections.availableForms }}
      </h2>
      <div class="flex flex-col space-y-3">
        <button
          class="btn btn-primary"
          @click="setCurrentPage('publication-form')"
        >
          {{ t.forms.adminManagement.form.publicationForm }}
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('member-form')">
          {{ t.forms.adminManagement.form.memberForm }}
        </button>
        <button
          class="btn btn-primary"
          @click="setCurrentPage('research-form')"
        >
          {{ t.forms.adminManagement.form.researchForm }}
        </button>
        <button
          class="btn btn-primary"
          @click="setCurrentPage('teaching-form')"
        >
          {{ t.forms.adminManagement.form.teachingForm }}
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('event-form')">
          {{ t.forms.adminManagement.form.eventForm }}
        </button>
        <button class="btn btn-primary" @click="setCurrentPage('award-form')">
          {{ t.forms.adminManagement.form.awardForm }}
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

    <EventForm
      v-else-if="currentPage === 'event-form'"
      @navigate="setCurrentPage"
    />

    <AwardForm
      v-else-if="currentPage === 'award-form'"
      @navigate="setCurrentPage"
    />
  </div>
</template>
