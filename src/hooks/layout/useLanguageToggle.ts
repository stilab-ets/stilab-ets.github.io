import { ref, computed } from 'vue';

interface Language {
  code: string;
  label: string;
  flag: string;
  ariaLabel: string;
}

export function useLanguageToggle(currentLanguage: string) {
  const isDropdownOpen = ref(false);

  const availableLanguages: Language[] = [
    {
      code: 'fr',
      label: 'Français',
      flag: '🇫🇷',
      ariaLabel: 'Basculer vers le français',
    },
    {
      code: 'en',
      label: 'English',
      flag: '🇬🇧',
      ariaLabel: 'Switch to English',
    },
  ];

  const currentLang = computed(() => {
    return (
      availableLanguages.find((lang) => lang.code === currentLanguage) ||
      availableLanguages[0]
    );
  });

  const otherLanguages = computed(() => {
    return availableLanguages.filter((lang) => lang.code !== currentLanguage);
  });

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const closeDropdown = () => {
    isDropdownOpen.value = false;
  };

  return {
    availableLanguages,
    currentLang,
    otherLanguages,
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  };
}
