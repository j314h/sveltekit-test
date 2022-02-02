<script lang="ts">
  import { createObjectAsFormData } from 'woo-format';

  import type { ITodo } from './todo.type';

  // todo reçus
  export let todo: ITodo;
  // permet de switch entre le read et le update
  export let btnUpdate = false;

  // delete todo
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
  const validateUpdate = async (e, id: string): Promise<void> => {
    // creation formData
    const formData = createObjectAsFormData<ITodo>(e.target);

    // update text
    const res = await fetch(`api/todo/${id}-todo.json`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    const resJson = await res.json();

    // si erreur
    if (!resJson?.update) {
      throw new Error(resJson?.update);
    }
  };

  // update checked todo
  const changeCheck = async (e, id: string) => {
    console.log(e.target.checked);

    // update checked
    const res = await fetch(`api/todo/${id}-todo.json`, {
      method: 'PATCH',
      body: JSON.stringify({ check: e.target.checked })
    });
    const resJson = await res.json();

    // si erreur
    if (!resJson?.update) {
      throw new Error(resJson?.update);
    }
  };
</script>

{#if todo && !btnUpdate}
  <!-- section read -->
  <section class="mb-12 w-full">
    <label class="cursor-pointer label">
      <!-- input checkbox -->
      <input
        type="checkbox"
        checked={todo.check}
        class="checkbox mr-6"
        on:change={async (e) => {
          await changeCheck(e, todo.id);
        }}
      />
      <span class="label-text ml-4">{todo.text}</span>
      <div class="flex">
        <!-- btn change text -->
        <button on:click={updateChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </button>

        <!-- btn delete -->
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
      </div>
    </label>
  </section>
{:else if todo && btnUpdate}
  <section class="mb-12 w-full">
    <div class="flex">
      <!-- formulaire de modification du la todo selectionner -->
      <form
        class="flex justify-between w-full"
        on:submit|preventDefault={async (e) => {
          await validateUpdate(e, todo.id);
        }}
      >
        <!-- input du text -->
        <input
          class="input input-bordered input-sm rounded-full w-5/6 sm:w-7/12 md:w-6/12 lg:w-5/12"
          type="text"
          name="text"
          bind:value={todo.text}
        />

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
      <button class="text-red-500 ml-4 flex-row-reverse" on:click={updateChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
    </div>
  </section>
{/if}
