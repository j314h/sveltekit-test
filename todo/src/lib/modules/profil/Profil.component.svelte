<script lang="ts">
  import { profileStore } from './profil.store';
  import { createObjectAsFormData, firstToUppperCase } from 'woo-format';

  let profilUpdate = false;
  export let resProfil;

  // set le profil
  profileStore.set(resProfil);

  // afficher ou cacher la modification du profil
  const updateChange = () => {
    profilUpdate = !profilUpdate;
  };

  // modification du profil
  const updateProfil = async (e, id) => {
    const formData = createObjectAsFormData(e.target);

    console.log('FORM : ', formData);
    console.log('ID : ', id);

    const res = await fetch(`api/profil/${id}-profil.json`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    const resJson = await res.json();

    if (!resJson.update) {
      throw new Error(resJson.error);
    }
  };
</script>

<section>
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
      <p><span>Email :</span> {firstToUppperCase($profileStore.email)}</p>
      <p><span>Nom :</span> {firstToUppperCase($profileStore.last_name)}</p>
      <p><span>Prénom :</span> {firstToUppperCase($profileStore.first_name)}</p>
      <p>
        <span>Adresse :</span>
        {firstToUppperCase($profileStore.adress)}
        {firstToUppperCase($profileStore.code_post)}
        {firstToUppperCase($profileStore.city)}
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

        <!-- email -->
        <div>
          <label for="email">Email : </label>
          <input
            class="input input-bordered input-sm rounded-full w-full"
            id="email"
            name="email"
            type="text"
            placeholder="email"
            value={$profileStore.email}
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
