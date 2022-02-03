<script>
  import '../app.css';
  import Main from '$lib/modules/main/Main.component.svelte';
  import Footer from '$lib/modules/footer/Footer.component.svelte';
  import Header from '$lib/modules/header/Header.component.svelte';
</script>

<!--  -->
<Main>
  <slot />
</Main>

<!-- component footer -->
<Footer />
