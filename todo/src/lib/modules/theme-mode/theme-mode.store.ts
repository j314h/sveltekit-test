import { browser } from '$app/env';
import { writable } from 'svelte/store';

let theme_mode;

// si le navigateur est disponible
if (browser) {
  // si mode_dark existe on l'utilise sinon on le set
  if (localStorage.getItem('mode_dark')) {
    theme_mode = localStorage.getItem('mode_dark');
    document.querySelector('#baliseHtml').setAttribute('data-theme', theme_mode);
  } else {
    theme_mode = 'light';
    localStorage.setItem('mode_dark', theme_mode);
    document.querySelector('#baliseHtml').setAttribute('data-theme', theme_mode);
  }
}

// creation du store themeMode
const createThemeModeStore = () => {
  const { set, subscribe, update } = writable(theme_mode);

  return {
    set,
    subscribe,
    update
  };
};

// store themeMode
export const themeModeStore = createThemeModeStore();
