<script context="module" lang="ts">
  import Todo from '$lib/modules/todo/Todo.component.svelte';
  import { todoStore } from '$lib/modules/todo/todo.store';
  import type { ITodo } from '$lib/modules/todo/todo.type';

  export const load = async ({ fetch, session }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    // appelle todo
    const res = await fetch('api/todo.json', { method: 'GET' });
    const resProfil = await fetch('api/profil.json', { method: 'GET' });

    if (res.ok || resProfil.ok) {
      const todos = await res.json();
      const profil = await resProfil.json();
      return {
        props: {
          todos: todos.todos,
          resProfil: profil.profil
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
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import Header from '$lib/modules/header/Header.component.svelte';
  import { profileStore } from '$lib/modules/profil/profil.store';
  import Profil from '$lib/modules/profil/Profil.component.svelte';

  export let todos: ITodo[];
  todoStore.set(todos);

  const deconnect = async () => {
    const res = await fetch('api/logout.json');

    if (res.ok) {
      $session.user = null;
    }
  };

  onMount(() => {
    todoStore.listen($session.user.id);
    profileStore.listen($session.user.id);
  });
</script>

<!-- head -->
<svelte:head>
  <title>Accueil | Ma liste</title>
</svelte:head>

<!-- header -->
<Header {resProfil} />

<button class="btn btn-primary mb-12" on:click={deconnect}>Me déconnecter</button>

{#if $todoStore.length > 0}
  <h2 class="mb-8 font-bold text-lg text-center">
    {$session.user ? $session.user.user_metadata.pseudo : null}, il a encore des choses à faire
  </h2>
{/if}

<!-- creation des todos -->
<TodoCreate />

<!-- list todo -->
{#if $todoStore.length > 0}
  {#each $todoStore as todo, index (todo)}
    <div
      class="shadow-md py-4 px-2 card bordered mt-4 w-full md:w-8/12 lg:w-6/12"
      animate:flip={{ duration: 500 }}
    >
      <Todo {todo} />
    </div>
  {/each}
{:else}
  <p class="font-bold text-3xl text-center">
    Hé {$session.user ? $session.user.user_metadata.pseudo : null}, vous pouvez vous reposer !
  </p>
{/if}
