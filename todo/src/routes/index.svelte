<script context="module" lang="ts">
  export const load = async ({ session, url }) => {
    //si session ouverte on va sur todo
    if (session.user) {
      return {
        status: 302,
        redirect: '/todo'
      };
    }

    // si l'url contient un h de supabase
    if (url.hash) {
      // on creer un tableau avec les params de l'url
      const getParams: string[] = url.hash.split('&');
      // on recupere la partie du token
      const get_acces_token = getParams[0].split('=');
      // on recupere le token
      const acces_token = get_acces_token[get_acces_token.length - 1];
      return {
        props: {
          acces_token,
          recover: getParams[getParams.length - 1]
        }
      };
    }

    return {};
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Signin from '$lib/modules/signin/Signin.component.svelte';
  import Signup from '$lib/modules/signup/Signup.component.svelte';
  import { onMount } from 'svelte';

  export let recover;
  export let acces_token;

  onMount(() => {
    if (recover === 'type=recovery' || recover === 'type=magiclink') {
      goto(`/init-password/${acces_token}`);
    }
  });
</script>

<!-- head -->
<svelte:head>
  <title>Accueil | La todo du futur</title>
</svelte:head>

<h1 class="font-bold text-4xl text-center">La todo du futur</h1>
<!-- accueil -->
<Signin />

<!-- inscription -->
<Signup />
