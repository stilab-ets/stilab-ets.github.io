import { ref, reactive, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import type { Project } from '@/services/MainAPI';

interface ProjectFormData {
  projectType: 'research' | 'msc';
  title: string;
  domain: string;
  difficulty: string;
  status: string;
  abstract: string;
  supervisor: string;
  coSupervisor: string;
  requirements: string[];
  startDate: string;
  endDate: string;
  funding: string;
  githubUrl: string;
  websiteUrl: string;
}

interface ProjectFormErrors {
  [key: string]: string;
}

export function useProjectForm(initialData?: Partial<Project>) {
  const { t: translations } = useLanguage();
  const t = computed(() => translations.value.forms.project);

  const form = reactive<ProjectFormData>({
    projectType: 'msc',
    title: '',
    domain: '',
    difficulty: '',
    status: 'available',
    abstract: '',
    supervisor: '',
    coSupervisor: '',
    requirements: [],
    startDate: '',
    endDate: '',
    funding: '',
    githubUrl: '',
    websiteUrl: '',
    ...initialData,
  });

  const errors = ref<ProjectFormErrors>({});
  const generalError = ref<string>('');
  const isSubmitting = ref(false);
  const newRequirement = ref('');

  const validateForm = (): boolean => {
    errors.value = {};

    if (!form.title.trim()) {
      errors.value.title = t.value.validation.titleRequired;
    }

    if (!form.domain) {
      errors.value.domain = t.value.validation.domainRequired;
    }

    if (!form.abstract.trim()) {
      errors.value.abstract = t.value.validation.descriptionRequired;
    }

    if (!form.supervisor) {
      errors.value.supervisor = t.value.validation.supervisorRequired;
    }

    if (!form.startDate) {
      errors.value.startDate = t.value.validation.startDateRequired;
    }

    if (form.endDate && form.startDate) {
      const startDate = new Date(form.startDate);
      const endDate = new Date(form.endDate);

      if (endDate <= startDate) {
        errors.value.endDate = t.value.validation.endDateAfterStart;
      }
    }

    if (form.githubUrl && !isValidUrl(form.githubUrl)) {
      errors.value.githubUrl = t.value.validation.urlInvalid;
    }

    if (form.websiteUrl && !isValidUrl(form.websiteUrl)) {
      errors.value.websiteUrl = t.value.validation.urlInvalid;
    }

    return Object.keys(errors.value).length === 0;
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const addRequirement = () => {
    const req = newRequirement.value.trim();
    if (req && !form.requirements.includes(req)) {
      form.requirements.push(req);
      newRequirement.value = '';
    }
  };

  const removeRequirement = (index: number) => {
    form.requirements.splice(index, 1);
  };

  const resetForm = () => {
    Object.assign(form, {
      projectType: 'msc',
      title: '',
      domain: '',
      difficulty: '',
      status: 'available',
      abstract: '',
      supervisor: '',
      coSupervisor: '',
      requirements: [],
      startDate: '',
      endDate: '',
      funding: '',
      githubUrl: '',
      websiteUrl: '',
    });
    errors.value = {};
    generalError.value = '';
  };

  const prepareSubmissionData = (): Partial<Project> => {
    return {
      title: form.title.trim(),
      domain: form.domain,
      difficulty: form.difficulty as Project['difficulty'],
      status: form.status as Project['status'],
      abstract: form.abstract.trim(),
      supervisor: form.supervisor,
      co_supervisor: form.coSupervisor || undefined,
      requirements: form.requirements,
      proposed_date: form.startDate,
      // Map form fields to API fields as needed
    };
  };

  return {
    form,
    errors: computed(() => errors.value),
    generalError: computed(() => generalError.value),
    isSubmitting: computed(() => isSubmitting.value),
    newRequirement,
    t,
    validateForm,
    addRequirement,
    removeRequirement,
    resetForm,
    prepareSubmissionData,
    setSubmitting: (value: boolean) => {
      isSubmitting.value = value;
    },
    setGeneralError: (error: string) => {
      generalError.value = error;
    },
  };
}
