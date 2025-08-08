import { mount } from '@vue/test-utils';
import VacanciesInfoBanner from '../../components/vacancies/VacanciesInfoBanner.vue';
import { describe, it, expect } from 'vitest';

describe('VacanciesInfoBanner.vue', () => {
  it('renders the main container', () => {
    const wrapper = mount(VacanciesInfoBanner);
    const container = wrapper.find('div.max-w-7xl');
    expect(container.exists()).toBe(true);
  });

  it('renders two main sections side by side', () => {
    const wrapper = mount(VacanciesInfoBanner);
    const sections = wrapper.findAll('div.grid > div');
    expect(sections.length).toBe(2);
  });

  it('renders both section titles as h3 elements', () => {
    const wrapper = mount(VacanciesInfoBanner);
    const headings = wrapper.findAll('h3');
    expect(headings.length).toBe(2);
  });

  it('renders the list of benefits as a <ul> with list items', () => {
    const wrapper = mount(VacanciesInfoBanner);
    const ul = wrapper.find('ul');
    const listItems = wrapper.findAll('ul > li');
    expect(ul.exists()).toBe(true);
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('renders the HR contact section with three <p> elements', () => {
    const wrapper = mount(VacanciesInfoBanner);
    const paragraphs = wrapper.findAll('div.text-sm > p');
    expect(paragraphs.length).toBe(3);
  });
});
