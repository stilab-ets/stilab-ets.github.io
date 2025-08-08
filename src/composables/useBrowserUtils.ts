export const useBrowserUtils = () => {
  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return { openUrl };
};
