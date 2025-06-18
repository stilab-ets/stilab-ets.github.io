import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import AwardsPage from '../../src/components/awards/AwardsPage.vue'

import PageHeader from '../../src/components/ui/PageHeader.vue'
import SearchAndFilters from '../../src/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '../../src/components/ui/StatisticsGrid.vue'
import EmptyState from '../../src/components/ui/EmptyState.vue'
import AwardsTimeline from '../../src/components/awards/AwardsTimeline.vue'
import NotableAchievements from '../../src/components/awards/NotableAchievements.vue'

describe('AwardsPage.vue', () => {
  it('renders core UI components', () => {
    const wrapper = mount(AwardsPage)

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true)
    expect(wrapper.findComponent(SearchAndFilters).exists()).toBe(true)
    expect(wrapper.findComponent(StatisticsGrid).exists()).toBe(true)
    expect(wrapper.findComponent(NotableAchievements).exists()).toBe(true)
  })

  it('renders AwardsTimeline or EmptyState depending on filteredAwards', async () => {
    const wrapper = mount(AwardsPage)

    const hasTimeline = wrapper.findComponent(AwardsTimeline).exists()
    const hasEmptyState = wrapper.findComponent(EmptyState).exists()

    expect(hasTimeline || hasEmptyState).toBe(true)
  })
})
