import { writable } from 'svelte/store';

export const todoStore = writable({
  todos: null
});
