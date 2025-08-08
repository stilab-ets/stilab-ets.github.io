import { mount } from '@vue/test-utils';
import LoginForm from '@/components/auth/LoginForm.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock composable
vi.mock('@/composables/useLanguage.ts', () => ({
  useLanguage: () => ({
    t: {
      value: {
        auth: {
          login: {
            title: 'Login',
            subtitle: 'Welcome back!',
            form: {
              email: 'Email',
              emailPlaceholder: 'Enter your email',
              password: 'Password',
              passwordPlaceholder: 'Enter your password',
              rememberMe: 'Remember me',
              forgotPassword: 'Forgot password?',
              submit: 'Log in',
              submitting: 'Logging in...',
            },
            validation: {
              emailRequired: 'Email is required',
              emailInvalid: 'Invalid email format',
              passwordRequired: 'Password is required',
              passwordMinLength: 'Password must be at least 6 characters',
            },
            errors: {
              loginFailed: 'Login failed',
            },
          },
        },
      },
    },
  }),
}));

describe('LoginForm.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(LoginForm);
  });

  it('renders title and subtitle correctly', () => {
    expect(wrapper.text()).toContain('Login');
    expect(wrapper.text()).toContain('Welcome back!');
  });

  it('shows error when fields are empty', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Email is required');
    expect(wrapper.text()).toContain('Password is required');
  });

  it('shows error for invalid email format', async () => {
    await wrapper.get('#username_or_email').setValue('invalid-email');
    await wrapper.get('#password').setValue('123456');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Invalid email format');
  });

  it('shows error for short password', async () => {
    await wrapper.get('#username_or_email').setValue('user@example.com');
    await wrapper.get('#password').setValue('123');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Password must be at least 6 characters');
  });

  it('emits login event when form is valid', async () => {
    await wrapper.get('#username_or_email').setValue('user@example.com');
    await wrapper.get('#password').setValue('123456');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('login')).toBeTruthy();
    expect(wrapper.emitted('login')![0][0]).toEqual({
      email: 'user@example.com',
      password: '123456',
      rememberMe: false,
    });
  });
});
