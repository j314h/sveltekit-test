<script lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import {
    constNotificationConfirmation,
    constNotificationError
  } from '$lib/modules/notification/notification.const';
  import { notificationStore } from '$lib/modules/notification/notification.store';
  import { profileStore } from '$lib/modules/profil/profil.store';
  import { createObjectAsFormData } from '$lib/providers/format/format.service';

  let loader = '';

  /**
   * changement d'email de l'utilisateur connecté
   * @param e => event du formulaire
   */
  const handlerChangeEmail = async (e) => {
    loader = 'loading';

    // creation format des données
    const formData: { email: string } = createObjectAsFormData(e.target);

    // modification du email dans auth
    const res = await fetch(`${import.meta.env.VITE_URL}api/init-email.json`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    const resJson = await res.json();

    // modification de l'email dans le profil
    // modification du profil correspondant au user connecté
    const resProfil = await fetch(
      `${import.meta.env.VITE_URL}api/profil/${$profileStore.id}-profil.json`,
      {
        method: 'PATCH',
        body: JSON.stringify(formData)
      }
    );

    // deconnection
    const resDeconnect = await fetch(`${import.meta.env.VITE_URL}api/logout.json`);

    if (!res.ok && !resDeconnect.ok && !resProfil.ok) {
      notificationStore.addNewNotification(constNotificationError.UPDATE_ACCOUNT);
      throw new Error(resJson.error);
    } else {
      notificationStore.addNewNotification(constNotificationConfirmation.UPDATE_EMAIL);
      $session.user = null;
      loader = '';
      goto('/');
    }
  };
</script>

<section>
  <!-- title -->
  <h1 class="mb-12 text-3xl text-center md:text-left">Modification de votre email</h1>

  <!-- form -->
  <form
    class="bg-slate-100 py-12 px-4 flex flex-col justify-center items-center"
    on:submit|preventDefault={handlerChangeEmail}
  >
    <!-- input email -->
    <div>
      <input
        type="email"
        name="email"
        placeholder="Nouvelle adresse e-mail"
        class="input input-bordered mb-6"
        required
      />
    </div>
    <!-- btn -->
    <div class="flex">
      <a href="/todo" class="btn btn-secondary mr-4">Annuler</a>
      <button class={`btn btn-primary ${loader}`}>Envoyer</button>
    </div>
  </form>

  <!-- info formulaire -->
  <p class="text-2xs mt-6 md:w-7/12">
    * Un mail sera envoyé à votre nouvelle adresse, veuillez suivre les instructions contenues dans
    cette email
  </p>
</section>
