<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';

interface LinksData {
  githubUrl: string;
  linkedinUrl: string;
  stackoverflowUrl: string;
  twitterxUrl: string;
  googlescholarUrl: string;
  dblpUrl: string;
  personalWebsite: string;
}

const props = defineProps<{
  modelValue: LinksData;
  errors: string[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: LinksData];
}>();

const { t } = useLanguage();

// Update specific field while preserving others
const updateField = (field: keyof LinksData, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t.auth.register.sections.links }}
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        Optional: Add your professional links and portfolio
      </p>
    </div>

    <!-- GitHub URL -->
    <div>
      <label for="githubUrl" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.githubUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          id="githubUrl"
          :value="modelValue.githubUrl"
          type="url"
          placeholder="https://github.com/username"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField('githubUrl', ($event.target as HTMLInputElement).value)
          "
        />
      </div>
    </div>

    <!-- LinkedIn URL -->
    <div>
      <label for="linkedinUrl" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.linkedinUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 0H.33C.148 0 0 .148 0 .33v19.34c0 .182.148.33.33.33h19.34c.182 0 .33-.148.33-.33V.33C20 .148 19.852 0 19.67 0z"
            />
          </svg>
        </div>
        <input
          id="linkedinUrl"
          :value="modelValue.linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/username"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField(
              'linkedinUrl',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <!-- StackOverflow URL -->
    <div>
      <label
        for="stackoverflowUrl"
        class="block text-sm font-medium text-gray-700"
      >
        {{ t.auth.register.form.stackoverflowUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path
              class="st0"
              d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z"
            />
            <path
              class="st1"
              d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z"
            />
          </svg>
        </div>
        <input
          id="stackoverflowUrl"
          :value="modelValue.stackoverflowUrl"
          type="url"
          placeholder="https://stackoverflow.com/users/userid/username"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField(
              'stackoverflowUrl',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <!-- Twitter/X URL -->
    <div>
      <label for="twitterxUrl" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.twitterxUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
            />
          </svg>
        </div>
        <input
          id="twitterxUrl"
          :value="modelValue.twitterxUrl"
          type="url"
          placeholder="https://x.com/username"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField(
              'twitterxUrl',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <!-- Google Scholar URL -->
    <div>
      <label
        for="googlescholarUrl"
        class="block text-sm font-medium text-gray-700"
      >
        {{ t.auth.register.form.googlescholarUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill="#4285f4" d="M256 411.12L0 202.667 256 0z" />
            <path fill="#356ac3" d="M256 411.12l256-208.453L256 0z" />
            <circle fill="#a0c3ff" cx="256" cy="362.667" r="149.333" />
            <path
              fill="#76a7fa"
              d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z"
            />
          </svg>
        </div>
        <input
          id="googlescholarUrl"
          :value="modelValue.googlescholarUrl"
          type="url"
          placeholder="https://scholar.google.ca/citations?user=userid&hl=en"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField(
              'googlescholarUrl',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <!-- DBLP URL -->
    <div>
      <label for="dblpUrl" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.dblpUrl }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M3.075.002c-.096.013-.154.092-.094.31L4.97 7.73 3.1 8.6s-.56.26-.4.85l2.45 9.159s.16.59.72.33l6.169-2.869 1.3-.61s.52-.24.42-.79l-.01-.06-1.13-4.22-.658-2.45-.672-2.49v-.04s-.16-.59-.84-1L3.5.141s-.265-.16-.425-.139zM18.324 5.03a.724.724 0 0 0-.193.06l-5.602 2.6.862 3.2 1.09 4.08.01.06c.05.47-.411.79-.411.79l-1.88.87.5 1.89.04.1c.07.17.28.6.81.91l6.95 4.269s.68.41.52-.17l-1.981-7.4 1.861-.86s.56-.26.4-.85L18.85 5.42s-.116-.452-.526-.39z"
            />
          </svg>
        </div>
        <input
          id="dblpUrl"
          :value="modelValue.dblpUrl"
          type="url"
          placeholder="https://dblp.org/pid/id/userid-1.html"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField('dblpUrl', ($event.target as HTMLInputElement).value)
          "
        />
      </div>
    </div>

    <!-- Personal Website -->
    <div>
      <label
        for="personalWebsite"
        class="block text-sm font-medium text-gray-700"
      >
        {{ t.auth.register.form.personalWebsite }}
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <input
          id="personalWebsite"
          :value="modelValue.personalWebsite"
          type="url"
          placeholder="https://your-website.com"
          class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="
            updateField(
              'personalWebsite',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <!-- Validation Errors -->
    <div
      v-if="errors.length > 0"
      class="bg-red-50 border border-red-200 rounded-md p-3"
    >
      <ul class="text-sm text-red-600 space-y-1">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
