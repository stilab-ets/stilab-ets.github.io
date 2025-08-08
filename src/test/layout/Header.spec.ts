import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Header from '../../components/layout/Header.vue';

describe('Header.vue', () => {
  const navigationItems = [
    { id: 'home', label: 'Accueil', icon: 'home-icon' },
    { id: 'about', label: 'À propos', icon: 'info-icon' },
  ];
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  };

  it('renders all main child components', () => {
    const wrapper = mount(Header, {
      props: {
        currentPage: 'home',
        navigationItems,
        currentLanguage: 'fr',
        user,
      },
    });

    expect(wrapper.findComponent({ name: 'LogoButton' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'NavItems' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'MobileMenuToggle' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'LanguageToggle' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'UserProfile' }).exists()).toBe(true);
  });

  it('emits "setCurrentPage" when NavItems emits "navigate"', async () => {
    const wrapper = mount(Header, {
      props: {
        currentPage: 'home',
        navigationItems,
        currentLanguage: 'fr',
      },
    });

    await wrapper
      .findComponent({ name: 'NavItems' })
      .vm.$emit('navigate', 'about');

    expect(wrapper.emitted('setCurrentPage')).toBeTruthy();
    expect(wrapper.emitted('setCurrentPage')![0]).toEqual(['about']);
  });

  it('emits "setCurrentPage" when LogoButton emits "navigate"', async () => {
    const wrapper = mount(Header, {
      props: {
        currentPage: 'home',
        navigationItems,
        currentLanguage: 'fr',
      },
    });

    await wrapper
      .findComponent({ name: 'LogoButton' })
      .vm.$emit('navigate', 'home');

    expect(wrapper.emitted('setCurrentPage')).toBeTruthy();
    expect(wrapper.emitted('setCurrentPage')![0]).toEqual(['home']);
  });

  it('emits "languageChanged" when LanguageToggle emits "language-changed"', async () => {
    const wrapper = mount(Header, {
      props: {
        currentPage: 'home',
        navigationItems,
        currentLanguage: 'fr',
      },
    });

    await wrapper
      .findComponent({ name: 'LanguageToggle' })
      .vm.$emit('language-changed', 'en');

    expect(wrapper.emitted('languageChanged')).toBeTruthy();
    expect(wrapper.emitted('languageChanged')![0]).toEqual(['en']);
  });
});
