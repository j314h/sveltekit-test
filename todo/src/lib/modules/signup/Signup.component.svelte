<script lang="ts">
  const handlerCreateUser = async () => {
    console.log('coucou');
  };
</script>

<section class="card card-bordered">
  <div class="card-body">
    <!-- title -->
    <h2 class="mb-8 card-title text-center">Inscription</h2>

    <!-- formulaire creation user -->
    <form on:submit|preventDefault={handlerCreateUser}>
      <!-- nom -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Nom</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="Nom"
          class="input input-bordered"
          name="last_name"
        />
      </div>

      <!-- prenom -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Prénom</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="Prénom"
          class="input input-bordered"
          name="first_name"
        />
      </div>

      <!-- Pseudo -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Pseudo</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="Pseudo"
          class="input input-bordered"
          name="pseudo"
        />
      </div>

      <!-- Email -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="text"
          required={false}
          placeholder="Email"
          class="input input-bordered"
          name="email"
        />
      </div>

      <!-- mot de passe -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Mot de passe</span>
        </label>
        <input
          type="text"
          required={false}
          placeholder="Mot de passe"
          class="input input-bordered"
          name="password"
        />
      </div>

      <!-- adresse -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Adresse</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="Adresse"
          class="input input-bordered"
          name="adresse"
        />
      </div>

      <!-- code postale -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Code postale</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="62119"
          class="input input-bordered"
          name="code_post"
        />
      </div>

      <!-- ville -->
      <div class="form-control mt-2">
        <label for="label">
          <span class="label-text">Ville</span>
        </label>
        <input
          type="text"
          required={true}
          placeholder="Dourges"
          class="input input-bordered"
          name="city"
        />
      </div>

      <!-- btn envoie formulaire -->
      <div class="text-right">
        <button class="btn btn-primary mt-8">Créer mon compte</button>
      </div>
    </form>
  </div>
</section>
