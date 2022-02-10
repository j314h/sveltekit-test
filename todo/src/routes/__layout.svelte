<script>
  import '../app.css';
  import Main from '$lib/modules/main/Main.component.svelte';
  import Footer from '$lib/modules/footer/Footer.component.svelte';
  import Notification from '$lib/modules/notification/Notification.component.svelte';
  import HeaderHome from '$lib/modules/header/header-home.component.svelte';
</script>

<HeaderHome />

<!--  -->
<Main>
  <slot />
</Main>

<!-- component footer -->
<Footer />

<!-- notification -->
<Notification />
