<script context="module" lang="ts">
  export const load = async ({ session }) => {
    if (session.user) {
      return {
        status: 302,
        redirect: '/todo'
      };
    }

    return {};
  };
</script>

<script lang="ts">
  import Signin from '$lib/modules/signin/Signin.component.svelte';
  import Signup from '$lib/modules/signup/Signup.component.svelte';
</script>

<!-- head -->
<svelte:head>
  <title>Accueil | TODO</title>
</svelte:head>

<h1 class="font-bold text-4xl text-center">La todo du futur</h1>
<!-- accueil -->
<Signin />

<!-- inscription -->
<Signup />
