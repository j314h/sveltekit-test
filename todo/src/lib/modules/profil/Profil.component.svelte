<script lang="ts">
  import BtnUpdate from '../btn/btnUpdate/BtnUpdate.component.svelte';
  import { profileStore } from './profil.store';

  let profilUpdate: boolean = false;
  export let resProfil;

  // set le profil
  profileStore.set(resProfil);

  // afficher ou cacher la modification du profil
  const updateChange = () => {
    profilUpdate = !profilUpdate;
  };
</script>

<section>
  <!-- partie boutton -->
  <div>
    <BtnUpdate {updateChange} />
  </div>

  <!-- partie profile -->
  {#if !profilUpdate && $profileStore?.id}
    <p>{$profileStore.pseudo}</p>
  {:else}
    <p>blabla</p>
  {/if}

  <!-- partie update profile -->
</section>
