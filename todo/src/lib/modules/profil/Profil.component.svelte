<script lang="ts">
  import BtnUpdate from '../btn/btnUpdate/BtnUpdate.component.svelte';
  import { profileStore } from './profil.store';
  import { firstToUppperCase } from 'woo-format';
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
  <div class="flex justify-end">
    <BtnUpdate {updateChange} />
  </div>

  <!-- partie profile -->
  {#if !profilUpdate && $profileStore?.id}
    <section class="p-3">
      <p>nom: {firstToUppperCase($profileStore.last_name)}</p>
      <p>prénom: {firstToUppperCase($profileStore.first_name)}</p>
      <p>pseudo: {$profileStore.pseudo}</p>
      <p>adresse: {firstToUppperCase($profileStore.adress)}</p>
      <p>code postal: {firstToUppperCase($profileStore.code_post)}</p>
      <p>ville: {firstToUppperCase($profileStore.city)}</p>
      <p>email: {firstToUppperCase($profileStore.email)}</p>
    </section>
  {:else}
    <p>blabla</p>
  {/if}

  <!-- partie update profile -->
</section>
