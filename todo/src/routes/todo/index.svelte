<script context="module" lang="ts">
  import { browser } from '$app/env';
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

    let themeMode;
    if (browser) {
      if (localStorage.getItem('mode_dark')) {
        const storageTheme = localStorage.getItem('mode_dark');
        document.querySelector('#baliseHtml').setAttribute('data-theme', storageTheme);
        themeMode = storageTheme;
      }
    }

    // appelle todo
    const res = await fetch('api/todo.json', { method: 'GET' });
    // si error
    if (!res.ok) {
      return {
        status: 404,
        error: 'Impossible de récupèrer les todos'
      };
    }

    // appelle profil
    const resProfil = await fetch('api/profil.json', { method: 'GET' });
    // si error
    if (!resProfil.ok) {
      return {
        status: 404,
        error: 'Impossible de récupèrer le profil'
      };
    }

    // modification json
    const todos = await res.json();
    const profil = await resProfil.json();

    return {
      props: {
        themeMode,
        todos: todos.todos,
        resProfil: profil.profil
      }
    };
  };
</script>

<script lang="ts">
  import TodoCreate from '$lib/modules/todo/Todo-create.component.svelte';
  import { session } from '$app/stores';
  import { beforeUpdate, onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import Header from '$lib/modules/header/Header.component.svelte';
  import { profileStore } from '$lib/modules/profil/profil.store';

  export let resProfil;
  export let todos: ITodo[];
  export let themeMode;
  todoStore.set(todos);

  beforeUpdate(() => {
    // si le store est vide on set le profil
    if (!$profileStore?.id) {
      profileStore.set(resProfil);
    }
  });

  onMount(() => {
    todoStore.listen($session.user.id);
    profileStore.listen($session.user.id);
  });
</script>

<!-- head -->
<svelte:head>
  <title>Accueil | Ma Todo</title>
</svelte:head>

<!-- header -->
<Header {resProfil} {themeMode} />

<!-- si profil et todo sont charger -->
{#if $todoStore?.length > 0 && $profileStore?.id}
  <h2 class="mb-8 font-bold text-lg text-center">
    {$profileStore?.id ? $profileStore.pseudo : 'utilisateur'}, il y a encore des choses à faire
  </h2>
{/if}

<!-- creation des todos -->
<TodoCreate />

<!-- list todo -->
{#if $todoStore?.length > 0}
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
    <!-- si profil est charger -->
    {#if $profileStore?.id}
      Hé {$profileStore?.id ? $profileStore.pseudo : 'utilisateur'}, vous pouvez vous reposer !
    {/if}
  </p>
{/if}
