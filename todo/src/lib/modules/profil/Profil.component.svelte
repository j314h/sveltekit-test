<script lang="ts">
  import { profileStore } from './profil.store';
  import { createObjectAsFormData, firstToUppperCase } from 'woo-format';
  import { createEventDispatcher, onMount } from 'svelte';
  import { session } from '$app/stores';

  // dispatch pour changer la variable du parent pour fermer le volet profil
  const disp = createEventDispatcher();

  let profilUpdate = false;
  export let resProfil;

  // afficher ou cacher la modification du profil
  const updateChange = () => {
    profilUpdate = !profilUpdate;
  };

  // modification du profil
  const updateProfil = async (e, id) => {
    const formData = createObjectAsFormData(e.target);

    console.log('FORM : ', formData);
    console.log('ID : ', id);

    // modification du user metadata
    const resUser = await fetch(`api/auth/${id}-auth.json`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    const resUserJson = await resUser.json();

    if (!resUser.ok) {
      throw new Error(resUserJson.error);
    } else {
      $session.user = resUserJson.user;
    }

    // modification du profil
    const res = await fetch(`api/profil/${id}-profil.json`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    const resJson = await res.json();

    if (!resJson.update) {
      throw new Error(resJson.error);
    } else {
      updateChange();
    }
  };

  // delete du user connecté
  const deleteProfil = async (id: string): Promise<void> => {
    // delete le profil
    const res = await fetch(`api/profil/${id}-profil.json`, { method: 'DELETE' });
    const resJson = await res.json();

    if (!resJson.deleted) {
      throw new Error(resJson.error);
    }

    // delete le user metadata
    const resUser = await fetch(`api/auth/${id}-auth.json`, { method: 'DELETE' });
    const resJsonUser = await resUser.json();

    if (!resJsonUser.deleted) {
      throw new Error(resJsonUser.error);
    } else {
      // $session.user = null;
      console.log('réussi');
    }
  };

  // ferme le volet profil
  const closeProfil = () => {
    disp('closeShutterProfil', { seeProfil: false });
  };

  onMount(() => {
    // si le store est vide on set le profil
    if (!$profileStore?.id) {
      profileStore.set(resProfil);
    }
  });
</script>

<section
  class="absolute w-72 sm:w-96 bg-white shadow-lg border-2 border-primary pl-4 pr-4 pb-8 sm:pl-12 sm:pr-12 sm:pb-12 pt-5 rounded-xl"
>
  <!-- btn delete -->
  <button
    class="text-red-500 ml-4"
    on:click={async () => {
      await deleteProfil($profileStore.id);
    }}
  >
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
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
  <!-- fermeture du volet profil -->
  <div class="text-right">
    <button
      class="btn btn-circle btn-sm sm:btn-md text-primary bg-slate-100 border-none hover:bg-slate-300"
      on:click={closeProfil}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-4 h-4 sm:w-6 sm:h-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
  <div class="flex items-center mb-6">
    <h2 class="card-title m-0 text-primary mr-4">Vos infos</h2>
    <!-- partie boutton -->
    <button on:click={updateChange} class="text-secondary">
      {#if profilUpdate}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 static"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
            clip-rule="evenodd"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 static"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          />
        </svg>
      {/if}
    </button>
  </div>

  <!-- partie profile -->
  {#if !profilUpdate && $profileStore?.id}
    <section class="profil_info">
      <p><span>Pseudo :</span> {$profileStore.pseudo}</p>
      <p><span>Email :</span> {$profileStore.email}</p>
      <p>
        <span>Nom :</span>
        {$profileStore?.last_name ? firstToUppperCase($profileStore.last_name) : '-'}
      </p>
      <p>
        <span>Prénom :</span>
        {$profileStore?.first_name ? firstToUppperCase($profileStore.first_name) : '-'}
      </p>
      <p>
        <span>Adresse :</span>
        {$profileStore?.adress ? firstToUppperCase($profileStore.adress) : '-'}
        {$profileStore?.code_post ? firstToUppperCase($profileStore.code_post) : '-'}
        {$profileStore?.city ? firstToUppperCase($profileStore.city) : '-'}
      </p>
    </section>
  {:else}
    <!-- partie update profile -->
    <section>
      <form
        on:submit|preventDefault={async (e) => {
          updateProfil(e, $profileStore.id);
        }}
      >
        <!-- nom -->
        <div>
          <label for="last_name">Nom : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="last_name"
            name="last_name"
            type="text"
            placeholder="nom"
            value={$profileStore.last_name}
          />
        </div>

        <!-- prenom -->
        <div>
          <label for="first_name">Prénom : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="first_name"
            name="first_name"
            type="text"
            placeholder="prénom"
            value={$profileStore.first_name}
          />
        </div>

        <!-- pseudo -->
        <div>
          <label for="pseudo">Pseudo : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="pseudo"
            name="pseudo"
            type="text"
            placeholder="pseudo"
            value={$profileStore.pseudo}
          />
        </div>

        <!-- adress -->
        <div>
          <label for="adress">Addresse : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="adress"
            name="adress"
            type="text"
            placeholder="addresse"
            value={$profileStore.adress}
          />
        </div>

        <!-- code_post -->
        <div>
          <label for="code_post">Code postal : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="code_post"
            name="code_post"
            type="text"
            placeholder="code postal"
            value={$profileStore.code_post}
          />
        </div>

        <!-- city -->
        <div>
          <label for="city">Ville : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="city"
            name="city"
            type="text"
            placeholder="Ville"
            value={$profileStore.city}
          />
        </div>

        <div class="flex justify-end mr-4 my-6">
          <button class="btn btn-primary btn-sm">Modifier</button>
        </div>
      </form>
    </section>
  {/if}
</section>

<style>
  label {
    display: block;
    font-weight: bold;
    margin-top: 15px;
  }

  input {
    margin-top: 2px;
  }

  .profil_info :nth-child(3) {
    margin-top: 25px;
  }

  p span {
    font-weight: bold;
  }
</style>
