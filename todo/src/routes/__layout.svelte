<script>
  import '../app.css';
  import Main from '$lib/modules/main/Main.component.svelte';
  import Error from '$lib/modules/error/Error.component.svelte';
</script>

<Error />

<Main>
  <slot />
</Main>
