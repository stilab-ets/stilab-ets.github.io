import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import MemberForm from '@/components/people/MemberForm.vue';

beforeAll(() => {
  window.scrollTo = vi.fn();
});

// Mock useLanguage
vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      common: {
        mustBeLogged: 'You must be logged in',
        loginHere: 'Login here',
      },
      forms: {
        member: {
          titleCreate: 'Create Member',
          subtitle: 'Fill out the member details',
        },
      },
    },
  }),
}));

// Mock useMembers
const createMemberMock = vi.fn();
const loadingMock = ref(false);
const errorMock = ref(null);

vi.mock('@/hooks/members/useMembers', () => ({
  useMembers: () => ({
    createMember: createMemberMock,
    loading: loadingMock,
    error: errorMock,
  }),
}));

// Mock useNavigation
const navigateToPageMock = vi.fn();
vi.mock('@/hooks/layout/useNavigation', () => ({
  useNavigation: () => ({
    navigateToPage: navigateToPageMock,
  }),
}));

describe('MemberForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    createMemberMock.mockReset();
    navigateToPageMock.mockReset();
    errorMock.value = null;
    loadingMock.value = false;

    wrapper = mount(MemberForm, {
      global: {
        stubs: {
          Form: {
            // Stub Form component to render successMessage and error props for testing
            template: `<div>
              <slot />
              <p class="success" v-if="successMessage">{{ successMessage }}</p>
              <p class="error" v-if="error">{{ error }}</p>
            </div>`,
            props: ['successMessage', 'error'],
          },
        },
      },
    });

    await nextTick();
  });

  it('renders form title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Member');
  });

  it('shows validation errors on empty submit', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.text()).toContain('First name is required.');
    expect(wrapper.text()).toContain('Last name is required.');
  });

  it('submits valid form data and shows success message', async () => {
    createMemberMock.mockResolvedValue(true);

    // Fill required fields
    await wrapper.get('input[type="text"]').setValue('John');
    await wrapper.findAll('input[type="text"]')[1].setValue('Doe');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(createMemberMock).toHaveBeenCalled();
    expect(wrapper.find('.success').text()).toContain(
      'Member created successfully'
    );
  });

  it('displays general error if createMember fails', async () => {
    createMemberMock.mockResolvedValue(false);
    errorMock.value = 'Failed to create';

    await wrapper.get('input[type="text"]').setValue('Jane');
    await wrapper.findAll('input[type="text"]')[1].setValue('Doe');

    await wrapper.find('form').trigger('submit.prevent');
    await nextTick();

    expect(wrapper.find('.error').text()).toContain('Failed to create');
  });

  it('navigates to members page on cancel button click', async () => {
    await wrapper.get('button[type="button"]').trigger('click');
    expect(navigateToPageMock).toHaveBeenCalledWith('members');
  });
});
