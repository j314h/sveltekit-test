<script lang="ts">
  import { createObjectAsFormData } from 'woo-format';
  import BtnCloseUpdate from '../btn/btn-close-update/BtnCloseUpdate.component.svelte';
  import BtnUpdate from '../btn/btnUpdate/BtnUpdate.component.svelte';
  import HoverBtn from '../hover-btn/hover-btn.component.svelte';

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
    btnUpdate = !btnUpdate;
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

<!-- section read -->
{#if todo && !btnUpdate}
  <section class="w-full">
    <label class="cursor-pointer label">
      <!-- input checkbox -->
      <input
        type="checkbox"
        checked={todo.check}
        class="checkbox mr-6 checkbox-secondary"
        on:change={async (e) => {
          await changeCheck(e, todo.id);
        }}
      />
      <span class="label-text ml-2 md:ml-4 text-justify">{todo.text}</span>
      <div class="flex">
        <!-- btn change text -->
        <HoverBtn>
          <BtnUpdate {updateChange} />
        </HoverBtn>

        <!-- btn delete -->
        <HoverBtn>
          <button
            class="text-red-500"
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
        </HoverBtn>
      </div>
    </label>
  </section>
{:else if todo && btnUpdate}
  <!-- section update -->
  <section class="w-full">
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
          class="input input-bordered input-sm rounded-full w-full "
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
      <BtnCloseUpdate {updateChange} />
    </div>
  </section>
{/if}
