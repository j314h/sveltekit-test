<script context="module" lang="ts">
  import Todo from '$lib/modules/todo/Todo.component.svelte';
  import { todoStore } from '$lib/modules/todo/todo.store';
  import type { ITodo } from '$lib/modules/todo/todo.type';
  import { session } from '$app/stores';

  export const load = async ({ fetch, session }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    // appelle todo
    const res = await fetch('api/todo.json', { method: 'GET' });
    if (res.ok) {
      const todos = await res.json();

      return {
        props: {
          todos: todos.todos
        }
      };
    } else {
      return {
        status: 404,
        error: "Les todos n'ont pas pu etre récupèré"
      };
    }
  };
</script>

<script lang="ts">
  import TodoCreate from '$lib/modules/todo/Todo-create.component.svelte';

  import { get, readable } from 'svelte/store';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import { session } from '$app/stores';

  export let todos;
  todoStore.set({ todos: todos });

  const todosRead = readable(todos, (set) => {
    console.log('coucou');

    supabase
      .from('todos')
      .select('*')
      .then(({ error, data }) => set(data));
    const subscription = supabase
      .from('totos')
      .on('*', (payload) => {
        if (payload.eventType === 'INSERT') {
          set([...todos, payload.new]);
        }
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  });

  const deconnect = async () => {
    const res = await fetch('api/logout.json');

    if (res.ok) {
      $session.user = null;
    }
  };
</script>

<button class="btn btn-primary mb-12" on:click={deconnect}>Me déconnecter</button>

<h2 class="mb-8">Ma liste de chose à faire</h2>

<!-- creation des todos -->
<TodoCreate />

<!-- list todo -->
{#if $todosRead}
  {#each $todoStore.todos as todo}
    <Todo {todo} />
  {/each}
{:else}
  <p class="font-bold text-3xl text-center">Aucune tâche</p>
{/if}
