<script>
  import '../app.css';
  import Main from '$lib/modules/main/Main.component.svelte';
  import Error from '$lib/modules/error/Error.component.svelte';
  import Footer from '$lib/modules/footer/Footer.component.svelte';
</script>

<Error />

<Main>
  <slot />
</Main>

<Footer />
