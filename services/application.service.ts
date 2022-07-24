import { APPLICATION_LOCAL_STORAGE_THEME_KEY, APPLICATION_THEMES } from '~/constants';

class ApplicationService {
  initialTheme() {
    const theme = localStorage.getItem(APPLICATION_LOCAL_STORAGE_THEME_KEY);

    if (theme) {
      document.documentElement.classList.add(theme);
      window.$nuxt.$store.dispatch('application/setLayoutTheme', theme);
    }
  }

  changeTheme() {
    const { dark, light } = APPLICATION_THEMES;
    const currentTheme = document.documentElement.className || light;
    const theme = currentTheme === light ? dark : light;

    localStorage.setItem(APPLICATION_LOCAL_STORAGE_THEME_KEY, theme);
    document.documentElement.className = theme;
    window.$nuxt.$store.dispatch('application/setLayoutTheme', theme);
  }
}

export default new ApplicationService();
