<script lang="ts">
  import type { ITodo } from './todo.type';

  // todo reçus
  export let todo: ITodo;
</script>

{#if todo}
  <section class="shadow-lg py-4 px-2 card bordered">
    <label class="cursor-pointer label">
      <input type="checkbox" checked={todo.check} class="checkbox mr-2" />
      <span class="label-text">{todo.text}</span>
    </label>
  </section>
{/if}
