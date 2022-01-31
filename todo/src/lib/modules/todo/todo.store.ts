import { writable } from 'svelte/store';
import type { ITodo } from './todo.type';

export const todoStore = writable({
  todos: [] as ITodo[]
});
