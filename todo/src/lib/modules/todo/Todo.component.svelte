<script lang="ts">
  import type { ITodo } from './todo.type';

  // todo reçus
  export let todo: ITodo;
</script>

{#if todo}
  <section class="shadow-md py-4 px-2 card bordered mt-4 w-full md:w-8/12 lg:w-6/12">
    <label class="cursor-pointer label">
      <input type="checkbox" checked={todo.check} class="checkbox mr-2" />
      <span class="label-text">{todo.text}</span>

      <button class="text-red-500 ml-4">
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
    </label>
  </section>
{/if}
