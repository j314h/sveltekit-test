<script>
  import '../app.css';
  import Main from '$lib/modules/main/Main.component.svelte';
  import Footer from '$lib/modules/footer/Footer.component.svelte';
</script>

<Main>
  <slot />
</Main>

<Footer />
