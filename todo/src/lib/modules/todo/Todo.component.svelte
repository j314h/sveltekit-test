<script lang="ts">
  import { todoStore } from './todo.store';
</script>

{#if $todoStore.todos}
  <section class="shadow-lg py-4 px-2 card bordered">
    <label class="cursor-pointer label">
      <input type="checkbox" checked={false} class="checkbox mr-2" />
      <span class="label-text">Remember me</span>
    </label>
  </section>
{/if}
