import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import PublicationSortOptions from '../../components/publications/PublicationSortOptions.vue';

describe('PublicationSortOptions.vue', () => {
  it('renders select element with options', () => {
    const wrapper = mount(PublicationSortOptions, {
      props: { sortBy: 'year-desc' },
    });
    const select = wrapper.find('select#sort');

    expect(select.exists()).toBe(true);

    const options = select.findAll('option');
    expect(options).toHaveLength(3);
    expect(options[0].element.value).toBe('year-desc');
    expect(options[1].element.value).toBe('year-asc');
    expect(options[2].element.value).toBe('title-asc');
  });

  it('emits update:sortBy with new value on change', async () => {
    const wrapper = mount(PublicationSortOptions, {
      props: { sortBy: 'year-desc' },
    });
    const select = wrapper.find('select#sort');

    await select.setValue('title-asc');

    expect(wrapper.emitted('update:sortBy')).toBeTruthy();
    expect(wrapper.emitted('update:sortBy')![0]).toEqual(['title-asc']);
  });
});
