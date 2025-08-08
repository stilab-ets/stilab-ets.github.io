import { mount } from '@vue/test-utils';
import VacancyCard from '../../components/vacancies/VacancyCard.vue';
import Card from '../../components/ui/Card.vue';
import Button from '../../components/ui/Button.vue';
import { describe, it, expect } from 'vitest';

const vacancyMock = {
  type: 'phd',
  title: 'Example Vacancy',
  supervisor: 'Dr. Example',
  duration: '12 months',
  salary: '$3000/month',
  deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  startDate: new Date().toISOString(),
  description: 'A test vacancy description',
  requirements: ['Req 1', 'Req 2'],
  tags: ['tag1', 'tag2'],
  applyUrl: 'https://apply.here',
};

describe('VacancyCard.vue', () => {
  const wrapper = mount(VacancyCard, {
    props: { vacancy: vacancyMock },
  });

  it('renders the Card component', () => {
    expect(wrapper.findComponent(Card).exists()).toBe(true);
  });

  it('renders two Button components', () => {
    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBe(2);
  });

  it('renders the vacancy title as a heading', () => {
    const heading = wrapper.find('h3');
    expect(heading.exists()).toBe(true);
  });

  it('renders the requirements list', () => {
    const requirements = wrapper.findAll(
      '[class*="requirements"] , [class*="flex items-center text-sm text-gray-600"]'
    );
    expect(requirements.length).toBeGreaterThan(0);
  });

  it('renders the tags', () => {
    const tags = wrapper.findAll('span');
    expect(tags.length).toBeGreaterThanOrEqual(vacancyMock.tags.length);
  });

  it('renders the deadline and start date sections', () => {
    const deadlineSection = wrapper
      .findAll('svg')
      .filter((svg) => svg.attributes('viewBox') === '0 0 24 24');
    expect(deadlineSection.length).toBeGreaterThan(0);
  });
});
