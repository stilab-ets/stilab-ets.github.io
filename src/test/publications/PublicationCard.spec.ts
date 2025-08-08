import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

import PublicationCard from '../../components/publications/PublicationCard.vue';

describe('PublicationCard.vue', () => {
  const basePublication = {
    id: '1',
    entrytype: 'article',
    citekey: 'key1',
    title: 'Test Publication Title',
    author: 'Alice and Bob',
    journal: 'Journal of Tests',
    booktitle: null,
    publisher: null,
    year: 2023,
    volume: '12',
    number: '3',
    pages: '45-50',
    url: 'https://example.com',
    is_approved: true,
    bibtex: '@article{key1, ...}',
  };

  it('renders Card component', () => {
    const wrapper = mount(PublicationCard, {
      props: { publication: basePublication },
    });
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true);
  });

  it('renders publication title', () => {
    const wrapper = mount(PublicationCard, {
      props: { publication: basePublication },
    });
    expect(wrapper.find('h3').text()).toContain(basePublication.title);
  });

  it('toggles Bibtex visibility on toggle button click', async () => {
    const wrapper = mount(PublicationCard, {
      props: { publication: basePublication },
    });
    const toggleBtn = wrapper.find('button.text-sm');
    expect(wrapper.find('pre').exists()).toBe(false);

    await toggleBtn.trigger('click');
    expect(wrapper.find('pre').exists()).toBe(true);

    await toggleBtn.trigger('click');
    expect(wrapper.find('pre').exists()).toBe(false);
  });

  it('renders Button component when publication.url exists and opens link on click', async () => {
    const wrapper = mount(PublicationCard, {
      props: { publication: basePublication },
    });

    const btn = wrapper.findComponent({ name: 'Button' });
    expect(btn.exists()).toBe(true);

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    await btn.trigger('click');
    expect(openSpy).toHaveBeenCalledWith(basePublication.url, '_blank');

    openSpy.mockRestore();
  });

  it('does not render Button component when publication.url is null', () => {
    const pubNoUrl = { ...basePublication, url: null };
    const wrapper = mount(PublicationCard, {
      props: { publication: pubNoUrl },
    });

    expect(wrapper.findComponent({ name: 'Button' }).exists()).toBe(false);
  });
});
