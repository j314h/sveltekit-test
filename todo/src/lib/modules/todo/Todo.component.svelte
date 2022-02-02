<script lang="ts">
  import { createObjectAsFormData } from 'woo-format';
  import Error from '../error/Error.component.svelte';

  import type { ITodo } from './todo.type';

  // todo reçus
  export let todo: ITodo;

  export let btnUpdate: boolean = false;

  const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`api/todo/${id}-todo.json`, { method: 'DELETE' });
    const resJson = await res.json();

    if (!resJson.deleted) {
      throw new Error(resJson.error);
    }
  };

  // changer de la variable boolean btnUpdate
  const updateChange = () => {
    if (!btnUpdate) {
      btnUpdate = true;
    } else {
      btnUpdate = false;
    }
  };

  // fonction update
  const validateUpdate = async (e, id): Promise<void> => {
    // creation formData
    const formData = createObjectAsFormData<ITodo>(e.target);

    const res = await fetch(`api/todo/${id}-todo.json`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    const resJson = await res.json();

    if (!resJson.update) {
      throw new Error(resJson.error);
    }
  };
</script>

{#if todo && !btnUpdate}
  <section class="shadow-md py-4 px-2 card bordered mt-4 w-full md:w-8/12 lg:w-6/12">
    <label class="cursor-pointer label">
      <input type="checkbox" checked={todo.check} class="checkbox mr-6" />
      <span class="label-text">{todo.text}</span>

      <button
        class="text-red-500 ml-4"
        on:click={async () => {
          await deleteTodo(todo.id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <button on:click={updateChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </label>
  </section>
{:else if todo && btnUpdate}
  <section
    class="flex-direction: row-reverse shadow-md py-4 px-2 card bordered mt-4 w-full md:w-8/12 lg:w-6/12"
  >
    <!-- formulaire de modification du la todo selectionner -->
    <form
      on:submit|preventDefault={(e) => {
        validateUpdate(e, todo.id);
      }}
    >
      <!-- input du text -->
      <input type="text" name="text" value={todo.text} />

      <!-- boutton de validation du formulaire -->
      <button class="text-green-500 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </form>
    <!-- boutton pour revenir a la todo -->
    <button class="text-red-500 ml-4" on:click={updateChange}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </section>
{/if}
