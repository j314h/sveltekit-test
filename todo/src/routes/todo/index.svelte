<script context="module" lang="ts">
  import Todo from '$lib/modules/todo/Todo.component.svelte';

  export const load = async ({ session, fetch }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    const res = await fetch('api/todo.json');

    if (res.ok) {
      const todos = await res.json();

      return {
        props: {
          todos
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
  export let todos;
</script>

<h2 class="mb-8">MES TODOS</h2>

<Todo />
