import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import ResearchForm from '@/components/research/ResearchForm.vue';

// Mock scrollTo to prevent errors
beforeAll(() => {
  window.scrollTo = vi.fn();
});

// --- Mocks --- //

// Mock useLanguage
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      forms: {
        research: {
          titleCreate: 'Create Research Project',
          subtitle: 'Add a new research project entry',
        },
      },
    },
  }),
}));

// Mock useResearch
const createResearchMock = vi.fn();
const isLoadingMock = ref(false);
const errorMock = ref(null);

vi.mock('@/hooks/useResearch', () => ({
  useResearch: () => ({
    createResearch: createResearchMock,
    isLoading: isLoadingMock,
    error: errorMock,
  }),
}));

// Mock useMembers
const fetchMembersMock = vi.fn();
const membersMock = ref([
  { id: '1', first_name: 'Alice', last_name: 'Smith' },
  { id: '2', first_name: 'Bob', last_name: 'Jones' },
]);

vi.mock('@/hooks/members/useMembers', () => ({
  useMembers: () => ({
    members: membersMock,
    fetchMembers: fetchMembersMock,
  }),
}));

// Mock useNavigation
const navigateToPageMock = vi.fn();

vi.mock('@/hooks/layout/useNavigation', () => ({
  useNavigation: () => ({
    navigateToPage: navigateToPageMock,
  }),
}));

describe('ResearchForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    createResearchMock.mockReset();
    navigateToPageMock.mockReset();
    errorMock.value = null;
    isLoadingMock.value = false;

    wrapper = mount(ResearchForm, {
      global: {
        stubs: {
          Form: {
            template: `<div>
              <slot />
              <p class="success" v-if="successMessage">{{ successMessage }}</p>
              <p class="error" v-if="error">{{ error }}</p>
            </div>`,
            props: ['successMessage', 'error'],
          },
          Button: true,
        },
      },
    });

    await nextTick();
  });

  it('shows validation errors on empty submit', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.text()).toContain('Title is required.');
    expect(wrapper.text()).toContain('Start date is required.');
    expect(wrapper.text()).toContain('Description is required.');
  });

  it('submits valid form data and shows success message', async () => {
    createResearchMock.mockResolvedValue(true);

    await wrapper.get('input[type="text"]').setValue('AI Research');
    await wrapper.get('input[type="date"]').setValue('2025-01-01');
    await wrapper.find('textarea').setValue('Description of the project');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(createResearchMock).toHaveBeenCalled();
    expect(wrapper.find('.success').text()).toContain(
      'Research project created successfully'
    );
  });

  it('displays general error if createResearch fails', async () => {
    createResearchMock.mockResolvedValue(false);
    errorMock.value = 'Creation failed';

    await wrapper.get('input[type="text"]').setValue('ML Research');
    await wrapper.get('input[type="date"]').setValue('2025-01-01');
    await wrapper
      .find('textarea')
      .setValue('Machine learning research description');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.find('.error').text()).toContain('Creation failed');
  });

  it('validates project_url and github_url formats', async () => {
    await wrapper.get('input[type="text"]').setValue('Bad URL Test');
    await wrapper.get('input[type="date"]').setValue('2025-01-01');
    await wrapper.find('textarea').setValue('Some description');
    await wrapper.findAll('input[type="url"]')[0].setValue('invalid-url');
    await wrapper.findAll('input[type="url"]')[1].setValue('http:/bad.url');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.text()).toContain('Invalid URL format.');
  });

  it('displays participants from members list', () => {
    const options = wrapper.findAll('select option');
    expect(options).toHaveLength(2);
    expect(options[0].text()).toContain('Alice Smith');
    expect(options[1].text()).toContain('Bob Jones');
  });
});
