import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LanguageToggle from '../../../components/layout/header/LanguageToggle.vue'

describe('LanguageSwitcher.vue', () => {
  it('renders mobile buttons when isMobile=true', () => {
    const wrapper = mount(LanguageToggle, {
      props: {
        currentLanguage: 'fr',
        isMobile: true
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)

    const activeButton = buttons.find(btn => btn.classes().includes('bg-[#08a4d4]'))
    expect(activeButton).toBeTruthy()
    expect(activeButton?.text()).toContain('🇫🇷')
  })

  it('emits languageChanged when clicking a mobile language button', async () => {
    const wrapper = mount(LanguageToggle, {
      props: {
        currentLanguage: 'fr',
        isMobile: true
      }
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('languageChanged')).toBeTruthy()
    expect(wrapper.emitted('languageChanged')![0]).toEqual(['en'])
  })

  it('renders dropdown and current language when isMobile=false', () => {
    const wrapper = mount(LanguageToggle, {
      props: {
        currentLanguage: 'fr',
        isMobile: false
      }
    })

    const toggleButton = wrapper.find('button[aria-haspopup="true"]')
    expect(toggleButton.exists()).toBe(true)
    expect(toggleButton.text()).toContain('🇫🇷')
  })

  it('shows other languages in dropdown and emits languageChanged on click', async () => {
    const wrapper = mount(LanguageToggle, {
      props: {
        currentLanguage: 'fr',
        isMobile: false
      }
    })

    await wrapper.find('button[aria-haspopup="true"]').trigger('click')

    const options = wrapper.findAll('[role="menuitem"]')
    expect(options.length).toBe(1)
    expect(options[0].text()).toContain('English')

    await options[0].trigger('click')

    expect(wrapper.emitted('languageChanged')).toBeTruthy()
    expect(wrapper.emitted('languageChanged')![0]).toEqual(['en'])
  })
})
