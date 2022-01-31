<script lang="ts">
  import { createObjectAsFormData } from 'woo-format';

  // envoie fomulaire de creation user
  const handlerCreateUser = async (e) => {
    // formate formdata
    const data = createObjectAsFormData(e.target);

    // request create
    const res = await fetch('/api/user.json', { method: 'POST', body: JSON.stringify(data) });
    const user = await res.json();
    console.log('USER FRONT : ', user);
    console.log('RES : ', res);

    e.target.reset();
  };
</script>

<section class="card card-bordered">
  <div class="card-body">
    <!-- title -->
    <h2 class="mb-8 card-title text-center">Inscription</h2>

    <!-- formulaire creation user -->
    <form class="md:flex md:justify-between" on:submit|preventDefault={handlerCreateUser}>
      <section class="md:mr-12">
        <!-- Pseudo -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Pseudo *</span>
          </label>
          <input
            type="text"
            placeholder="Pseudo"
            class="input input-bordered"
            name="pseudo"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Email *</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            class="input input-bordered"
            name="email"
            required
          />
        </div>

        <!-- mot de passe -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text"
              >Mot de passe <span class="text-2xs">(6 caratères minimum)</span> *</span
            >
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            class="input input-bordered"
            name="password"
            required
          />
        </div>
      </section>

      <!-- non required -->
      <section>
        <!-- nom -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Nom</span>
          </label>
          <input type="text" placeholder="Nom" class="input input-bordered" name="last_name" />
        </div>

        <!-- prenom -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Prénom</span>
          </label>
          <input type="text" placeholder="Prénom" class="input input-bordered" name="first_name" />
        </div>

        <!-- adresse -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Adresse</span>
          </label>
          <input type="text" placeholder="Adresse" class="input input-bordered" name="adresse" />
        </div>

        <!-- code postale -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Code postale</span>
          </label>
          <input type="text" placeholder="62119" class="input input-bordered" name="code_post" />
        </div>

        <!-- ville -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Ville</span>
          </label>
          <input type="text" placeholder="Dourges" class="input input-bordered" name="city" />
        </div>
        <!-- btn envoie formulaire -->
        <div class="text-right">
          <button class="btn btn-primary mt-8">Créer mon compte</button>
        </div>
      </section>
    </form>
  </div>
</section>
