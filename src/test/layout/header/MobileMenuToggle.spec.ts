import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MobileMenuToggle from '../../../components/layout/header/MobileMenuToggle.vue';

describe('MobileMenuToggle.vue', () => {
  it('renders hamburger icon when open is false', () => {
    const wrapper = mount(MobileMenuToggle, {
      props: { open: false },
    });
    // Hamburger icon has 3 horizontal lines path (d="M4 6h16M4 12h16M4 18h16")
    expect(wrapper.html()).toContain('d="M4 6h16M4 12h16M4 18h16"');
  });

  it('renders close icon when open is true', () => {
    const wrapper = mount(MobileMenuToggle, {
      props: { open: true },
    });
    // Close icon has two crossing lines (d="M6 18L18 6M6 6l12 12")
    expect(wrapper.html()).toContain('d="M6 18L18 6M6 6l12 12"');
  });

  it('emits toggle event when clicked', async () => {
    const wrapper = mount(MobileMenuToggle, {
      props: { open: false },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('toggle');
    expect(wrapper.emitted('toggle')?.length).toBe(1);
  });
});
