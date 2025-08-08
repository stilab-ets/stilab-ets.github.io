import { ref, reactive, computed, type Ref } from 'vue';
import { useEvents } from './useEvents';
import type { Event } from '@/services/MainAPI';

interface EventFormData {
  title: string;
  speaker?: string;
  date: string;
  time?: string;
  location: string;
  type: Event['type'];
  description: string;
  registration_url?: string;
  tags: string[];
  capacity?: number;
  current_registrations?: number;
}

interface UseEventFormState {
  formData: EventFormData;
  isSubmitting: Ref<boolean>;
  errors: Ref<Record<string, string>>;
  isValid: Ref<boolean>;
}

interface UseEventFormActions {
  initializeForm: (event?: Event) => void;
  updateField: (field: keyof EventFormData, value: any) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  validateForm: () => boolean;
  submitForm: () => Promise<Event | null>;
  resetForm: () => void;
}

type UseEventFormReturn = UseEventFormState & UseEventFormActions;

const initialFormData: EventFormData = {
  title: '',
  speaker: '',
  date: '',
  time: '',
  location: '',
  type: 'seminar',
  description: '',
  registration_url: '',
  tags: [],
  capacity: undefined,
  current_registrations: 0,
};

export function useEventForm(eventId?: number): UseEventFormReturn {
  const { createEvent, updateEvent } = useEvents();

  const formData = reactive<EventFormData>({ ...initialFormData });
  const isSubmitting = ref(false);
  const errors = ref<Record<string, string>>({});

  const isValid = computed(() => {
    return (
      formData.title.trim() !== '' &&
      formData.date !== '' &&
      formData.location.trim() !== '' &&
      formData.type &&
      formData.description.trim() !== '' &&
      Object.keys(errors.value).length === 0
    );
  });

  const initializeForm = (event?: Event): void => {
    if (event) {
      formData.title = event.title;
      formData.speaker = event.speaker || '';
      formData.date = event.date;
      formData.time = event.time || '';
      formData.location = event.location;
      formData.type = event.type;
      formData.description = event.description;
      formData.registration_url = event.registration_url || '';
      formData.tags = [...event.tags];
      formData.capacity = event.capacity;
      formData.current_registrations = event.current_registrations || 0;
    } else {
      Object.assign(formData, { ...initialFormData });
    }
    errors.value = {};
  };

  const updateField = (field: keyof EventFormData, value: any): void => {
    (formData as any)[field] = value;

    // Clear field-specific error when user starts typing
    if (errors.value[field]) {
      delete errors.value[field];
    }
  };

  const addTag = (tag: string): void => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      formData.tags.push(trimmedTag);
    }
  };

  const removeTag = (index: number): void => {
    formData.tags.splice(index, 1);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (eventDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.type) {
      newErrors.type = 'Event type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (formData.registration_url && !isValidUrl(formData.registration_url)) {
      newErrors.registration_url = 'Please enter a valid URL';
    }

    if (formData.capacity && formData.capacity < 1) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    if (
      formData.current_registrations &&
      formData.capacity &&
      formData.current_registrations > formData.capacity
    ) {
      newErrors.current_registrations =
        'Current registrations cannot exceed capacity';
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<Event | null> => {
    if (!validateForm()) {
      return null;
    }

    try {
      isSubmitting.value = true;

      const eventData: Partial<Event> = {
        title: formData.title.trim(),
        speaker: formData.speaker?.trim() || undefined,
        date: formData.date,
        time: formData.time?.trim() || undefined,
        location: formData.location.trim(),
        type: formData.type,
        description: formData.description.trim(),
        registration_url: formData.registration_url?.trim() || undefined,
        tags: formData.tags.filter((tag) => tag.trim()),
        capacity: formData.capacity || undefined,
        current_registrations: formData.current_registrations || 0,
        is_upcoming: new Date(formData.date) >= new Date(),
      };

      const result = eventId
        ? await updateEvent(eventId, eventData)
        : await createEvent(eventData);

      if (result) {
        resetForm();
      }

      return result;
    } catch (error) {
      console.error('Error submitting event form:', error);
      errors.value.submit = 'Failed to save event. Please try again.';
      return null;
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetForm = (): void => {
    Object.assign(formData, { ...initialFormData });
    errors.value = {};
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return {
    // State
    formData,
    isSubmitting,
    errors,
    isValid,

    // Actions
    initializeForm,
    updateField,
    addTag,
    removeTag,
    validateForm,
    submitForm,
    resetForm,
  };
}
