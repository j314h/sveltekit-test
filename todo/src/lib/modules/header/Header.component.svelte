<script lang="ts">
  import { session } from '$app/stores';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import Profil from '../profil/Profil.component.svelte';

  // profil venant de la fonction load
  export let resProfil;
  // variable pour modifier le theme en mode dark
  export let themeMode = 'light';
  // variable pour la balise html
  let myHtmlBalise = document.querySelector('#baliseHtml');

  // switch pour mode dark
  let btnDark = false;
  // pour afficher/cacher profil
  let seeProfil = false;

  // deconnection user
  const deconnect = async () => {
    const res = await fetch('api/logout.json');

    if (res.ok) {
      $session.user = null;
    }
  };

  // affiche cache le profil
  const forSeeProfil = () => {
    seeProfil = !seeProfil;
  };

  // close volet profil depuis le composant profil
  const closedProfil = (e) => {
    seeProfil = e.detail.seeProfil;
  };

  // fonction pour switch de mode dark a mode light
  const switchTheme = (e) => {
    // condition qui verifier dans quel théme on se trouve
    if (themeMode === 'light') {
      themeMode = 'dark';
      btnDark = true;
      myHtmlBalise.setAttribute('data-theme', themeMode);
    } else {
      themeMode = 'light';
      btnDark = false;
      myHtmlBalise.setAttribute('data-theme', themeMode);
    }
  };
</script>

<header class="bg-primary py-4 px-8 md:px-12 z-40 fixed top-0 left-0 w-full flex justify-between">
  <!-- boutton profile -->
  <button class="text-white" on:click={forSeeProfil}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  <!-- profil -->
  {#if seeProfil}
    <Profil {resProfil} on:closeShutterProfil={closedProfil} />
  {/if}

  <!-- switch dark mode -->
  <div>
    <button class="text-white" on:click={switchTheme}>
      {#if btnDark}
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      {:else}
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
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      {/if}
    </button>

    <!-- boutton déconnecté -->
    <button class="ml-4 md:ml-8" on:click={deconnect}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 18 18" fill="none">
        <path
          d="M10 0H8V10H10V0ZM14.83 2.17L13.41 3.59C14.99 4.86 16 6.81 16 9C16 12.87 12.87 16 9 16C5.13 16 2 12.87 2 9C2 6.81 3.01 4.86 4.58 3.58L3.17 2.17C1.23 3.82 0 6.26 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 6.26 16.77 3.82 14.83 2.17Z"
          fill="#ffffff"
        />
      </svg>
    </button>
  </div>
</header>
