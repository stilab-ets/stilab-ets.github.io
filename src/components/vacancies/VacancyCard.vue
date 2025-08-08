<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import { useBrowserUtils } from '@/composables/useBrowserUtils';
import type { Vacancy } from '@/services/MainAPI';
import Card from '@/ui/Card.vue';
import Button from '@/ui/Button.vue';

const { openUrl } = useBrowserUtils();

interface Props {
  vacancy: Vacancy;
}

const props = defineProps<Props>();
const { t } = useLanguage();

// Methods
const getTypeColor = (type: Vacancy['type']) => {
  const colors: Record<Vacancy['type'], string> = {
    phd: 'bg-purple-100 text-purple-800',
    postdoc: 'bg-blue-100 text-blue-800',
    researcher: 'bg-green-100 text-green-800',
    engineer: 'bg-orange-100 text-orange-800',
    intern: 'bg-yellow-100 text-yellow-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getTypeLabel = (type: Vacancy['type']) => {
  const typeKey = type as keyof typeof t.value.vacancies.positionTypes;
  return t.value.vacancies.positionTypes[typeKey] || type;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const isDeadlineSoon = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14 && diffDays >= 0;
};

const getDaysUntilDeadline = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return t.value.vacancies.deadlineStatus.deadlinePassed;
  } else if (diffDays === 0) {
    return t.value.vacancies.deadlineStatus.deadlineToday;
  } else if (diffDays === 1) {
    return t.value.vacancies.deadlineStatus.deadlineTomorrow;
  } else {
    return `${diffDays} ${t.value.vacancies.deadlineStatus.daysRemaining}`;
  }
};

const shareVacancy = () => {
  if (navigator.share) {
    navigator.share({
      title: props.vacancy.title,
      text: props.vacancy.description,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    const shareText = `${props.vacancy.title}\n\n${props.vacancy.description}\n\n${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Lien copié dans le presse-papiers!');
    });
  }
};

const applyToVacancy = () => {
  openUrl(props.vacancy.apply_url);
};
</script>

<template>
  <Card variant="hover">
    <!-- Vacancy Card Header -->
    <div
      class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4"
    >
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
              getTypeColor(vacancy.type),
            ]"
          >
            {{ getTypeLabel(vacancy.type) }}
          </span>
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              isDeadlineSoon(vacancy.deadline)
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{
              isDeadlineSoon(vacancy.deadline)
                ? t.vacancies.vacancyCard.urgent
                : t.vacancies.vacancyCard.standard
            }}
          </span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ vacancy.title }}
        </h3>
        <div
          class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-3"
        >
          <div class="flex items-center">
            <svg
              class="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="font-medium"
              >{{ t.vacancies.vacancyCard.supervisor }}:</span
            >
            <span class="ml-1">{{ vacancy.supervisor }}</span>
          </div>
          <div v-if="vacancy.duration" class="flex items-center">
            <svg
              class="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ vacancy.duration }}</span>
          </div>
          <div v-if="vacancy.salary" class="flex items-center">
            <svg
              class="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span>{{ vacancy.salary }}</span>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="flex flex-col text-sm text-gray-600 lg:text-right lg:ml-6">
        <div class="flex items-center lg:justify-end mb-1">
          <svg
            class="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="font-medium"
            >{{ t.vacancies.vacancyCard.deadline }}:</span
          >
          <span class="ml-1">{{ formatDate(vacancy.deadline) }}</span>
        </div>
        <div class="flex items-center lg:justify-end">
          <svg
            class="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="font-medium"
            >{{ t.vacancies.vacancyCard.startDate }}:</span
          >
          <span class="ml-1">{{ formatDate(vacancy.start_date) }}</span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-4">
      <p class="text-gray-700 leading-relaxed">{{ vacancy.description }}</p>
    </div>

    <!-- Requirements -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">
        {{ t.vacancies.vacancyCard.profile }}
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          v-for="requirement in vacancy.requirements"
          :key="requirement"
          class="flex items-center text-sm text-gray-600"
        >
          <svg
            class="h-3 w-3 text-green-500 mr-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          {{ requirement }}
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in vacancy.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100"
    >
      <div class="text-sm text-gray-500 mb-3 sm:mb-0">
        <span
          :class="[
            'font-medium',
            isDeadlineSoon(vacancy.deadline) ? 'text-red-600' : 'text-gray-700',
          ]"
        >
          {{ getDaysUntilDeadline(vacancy.deadline) }}
        </span>
      </div>
      <div class="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          @click="shareVacancy"
          class="hover:cursor-pointer"
        >
          <svg
            class="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          {{ t.vacancies.vacancyCard.share }}
        </Button>
        <Button @click="applyToVacancy" class="hover:cursor-pointer">
          {{ t.vacancies.vacancyCard.apply }}
          <svg
            class="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Button>
      </div>
    </div>
  </Card>
</template>
