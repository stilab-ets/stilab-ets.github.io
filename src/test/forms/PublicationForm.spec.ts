import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import PublicationForm from '@/components/publications/PublicationForm.vue';

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    isLoggedIn: ref(true),
    user: ref({ id: 1, name: 'Test User' }),
  }),
}));

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      common: {
        mustBeLogged: 'You must be logged in',
        loginHere: 'Login here',
      },
      forms: {
        publication: {
          titleCreate: 'Create Publication',
          subtitle: 'Fill in the details',
          form: {
            entryType: 'Entry Type',
            citekey: 'Citekey',
            citekeyPlaceholder: 'e.g., smith2023',
            title: 'Title',
            titlePlaceholder: 'Publication title',
            year: 'Year',
            create: 'Create',
            submitting: 'Submitting...',
          },
          entryTypes: {
            article: 'Article',
            book: 'Book',
          },
          validation: {
            entryTypeRequired: 'Entry type is required',
            yearInvalid: 'Year must be valid',
          },
          errors: {
            submitFailed: 'Failed to submit',
          },
          bibtexImport: {
            title: 'Import from BibTeX',
            description: 'Paste BibTeX data to auto-fill the form',
            placeholder: 'Paste BibTeX here',
            parse: 'Parse',
          },
        },
      },
    }),
  }),
}));

describe('PublicationForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = mount(PublicationForm, {
      global: {
        provide: {
          error: ref(null),
          errors: ref({}),
        },
      },
    });
    await nextTick();
  });

  it('renders the form title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Publication');
    expect(wrapper.text()).toContain('Fill in the details');
  });

  it('shows validation errors when submitting empty form', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Entry type is required');
  });

  it('submits form with valid minimal data', async () => {
    await wrapper.get('select#entrytype').setValue('article');
    await wrapper.get('input#citekey').setValue('smith2023');
    await wrapper.get('input#title').setValue('A Great Study');
    await wrapper.get('input#year').setValue('2023');

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.get('select#entrytype').element.value).toBe('article');
    expect(wrapper.get('input#citekey').element.value).toBe('smith2023');
    expect(wrapper.get('input#title').element.value).toBe('A Great Study');
    expect(wrapper.get('input#year').element.value).toBe('2023');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
