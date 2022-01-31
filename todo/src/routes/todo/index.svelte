<script context="module" lang="ts">
  import Todo from '$lib/modules/todo/Todo.component.svelte';

  export const load = async ({ session }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    return {};
  };
</script>

<h2 class="mb-8">MES TODOS</h2>

<Todo />
