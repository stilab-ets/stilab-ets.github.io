import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import AwardsPage from '../../components/awards/AwardsPage.vue';

import PageHeader from '../../components/ui/PageHeader.vue';
import SearchAndFilters from '../../components/ui/SearchAndFilters.vue';
import StatisticsGrid from '../../components/ui/StatisticsGrid.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import AwardsTimeline from '../../components/awards/AwardsTimeline.vue';
import NotableAchievements from '../../components/awards/NotableAchievements.vue';

describe('AwardsPage.vue', () => {
  it('renders core UI components', () => {
    const wrapper = mount(AwardsPage);

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(SearchAndFilters).exists()).toBe(true);
    expect(wrapper.findComponent(StatisticsGrid).exists()).toBe(true);
    expect(wrapper.findComponent(NotableAchievements).exists()).toBe(true);
  });

  it('renders AwardsTimeline or EmptyState depending on filteredAwards', async () => {
    const wrapper = mount(AwardsPage);

    const hasTimeline = wrapper.findComponent(AwardsTimeline).exists();
    const hasEmptyState = wrapper.findComponent(EmptyState).exists();

    expect(hasTimeline || hasEmptyState).toBe(true);
  });
});
