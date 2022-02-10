<script lang="ts">
  import { createObjectAsFormData } from '$lib/providers/format/format.service';
  import {
    constNotificationConfirmation,
    constNotificationError
  } from '../notification/notification.const';
  import { notificationStore } from '../notification/notification.store';

  let checkCondition = false;

  let load = '';

  // envoie fomulaire de creation user
  const handlerCreateUser = async (e) => {
    load = 'loading';

    if (checkCondition) {
      // formate formdata
      const data = createObjectAsFormData(e.target);

      // request create
      const res = await fetch('/api/user.json', { method: 'POST', body: JSON.stringify(data) });

      // gestion erreur + throw error
      if (!res.ok) {
        notificationStore.addNewNotification(constNotificationError.CREATE_ACCOUNT);
        throw new Error(constNotificationError.CREATE_ACCOUNT);
      } else {
        // notification de l'envoie du mail de confirmation
        notificationStore.addNewNotification(constNotificationConfirmation.CREATE_ACCOUNT);
      }

      e.target.reset();
    } else {
      // si la case à cocher des condition n'est pas coché
      notificationStore.addNewNotification(constNotificationError.CREATE_USER_CONDITION);
    }
    load = '';
  };
</script>

<section class="card card-bordered border-primary mb-12 md:w-10/12 lg:w-8/12 xl:w-6/12">
  <div class="card-body">
    <!-- title -->
    <h2 class="mb-8 card-title text-center">Inscription</h2>

    <!-- formulaire creation user -->
    <form class="md:flex" on:submit|preventDefault={handlerCreateUser}>
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
            placeholder="monemail@mail.com"
            class="input input-bordered"
            name="email"
            required
          />
        </div>

        <!-- mot de passe -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text"
              >Mot de passe * <span class="text-2xs">(6 caratères minimum)</span></span
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
        <h3 class="card-side card-title text-secondary mt-8 font-bold">Optionnel</h3>
        <!-- nom -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Nom</span>
          </label>
          <input type="text" placeholder="Gab" class="input input-bordered" name="last_name" />
        </div>

        <!-- prenom -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Prénom</span>
          </label>
          <input type="text" placeholder="Jean" class="input input-bordered" name="first_name" />
        </div>

        <!-- adress -->
        <div class="form-control mt-2">
          <label for="label">
            <span class="label-text">Adresse</span>
          </label>
          <input
            type="text"
            placeholder="1 rue des champs"
            class="input input-bordered"
            name="adress"
          />
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

        <!-- partie condition generale -->
        <div class="form-control">
          <p class="text-2xs my-4 form-control">
            Les informations de votre identifiant sont utilisées pour vous permettre de vous
            connecter en toute sécurité et d’accéder à vos données. Woopear enregistre certaines
            données d’utilisation pour des raisons de sécurité, d’assistance et de transmission de
            données
          </p>
          <label class="cursor-pointer label">
            <span class="label-text text-xs mr-4"
              >Vous acceptez nos <a
                href="/condition-gen"
                class="text-accent hover:underline hover:text-accent">Conditions générales</a
              ></span
            >
            <input type="checkbox" bind:checked={checkCondition} class="checkbox" />
          </label>
        </div>

        <!-- btn envoie formulaire -->
        <div class="text-right">
          <button class={`btn btn-primary mt-8 ${load}`}>Créer mon compte</button>
        </div>
      </section>
    </form>

    <p class="text-2xs mt-12">* Informations obligatoire</p>
  </div>
</section>
