import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import QuickLinks from '../../../components/layout/footer/QuickLinks.vue';

describe('QuickLinks.vue', () => {
  it('renders a button for each navigation link', () => {
    const wrapper = mount(QuickLinks);

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(4);
  });

  it('emits navigateToPage with correct payload on button click', async () => {
    const wrapper = mount(QuickLinks);

    const buttons = wrapper.findAll('button');
    await buttons[2].trigger('click');

    expect(wrapper.emitted('navigateToPage')).toBeTruthy();
    expect(wrapper.emitted('navigateToPage')![0]).toEqual(['publications']);
  });

  it('each button has a non-empty aria-label attribute', () => {
    const wrapper = mount(QuickLinks);
    const buttons = wrapper.findAll('button');

    for (const button of buttons) {
      const label = button.attributes('aria-label');
      expect(label).toBeTruthy();
    }
  });
});
