<script lang="ts" context="module">
  export const load = ({ params }) => {
    // si pas de params on retourne sur l'accueil
    if (!params.acces_token) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    return {
      props: {
        acces_token: params.acces_token
      }
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { constNotificationError } from '$lib/modules/notification/notification.const';
  import { notificationStore } from '$lib/modules/notification/notification.store';
  import { createObjectAsFormData } from '$lib/providers/format/format.service';

  // recuperation du token contenu dans l'url cela viens de la load fonction
  export let acces_token;

  // pour afficher l'oeil ou pas
  let value1 = false;
  // pour le type du input 1
  let typePwd1 = 'password';
  // reagis en fonction du type de l'input affiche ou pas le mot de passe
  $: seePassword1 = typePwd1 === 'password' ? false : true;

  /**
   * modification du mot de passe
   * @param e => event formulaire
   */
  const handlerUpdatePassword = async (e) => {
    // creation des données
    const formData: { password: string; confirme_password: string } = createObjectAsFormData(
      e.target
    );

    // si les mot de passe correspond
    if (formData.confirme_password === formData.password) {
      // call api init password
      const res = await fetch(`${import.meta.env.VITE_URL}api/init-password.json`, {
        method: 'POST',
        body: JSON.stringify({ password: formData.password, acces_token: acces_token })
      });

      if (res.ok) {
        goto('/');
      } else {
        const data = await res.json();
        notificationStore.addNewNotification(data.error);
        throw new Error(data.error);
      }
    } else {
      notificationStore.addNewNotification(constNotificationError.INIT_PASSWORD);
      throw new Error('Les mots de passe ne sont pas identique');
    }
  };

  /**
   * change type du input numero 1
   */
  const handlerSeePwd1 = () => {
    if (typePwd1 === 'password') {
      typePwd1 = 'text';
    } else {
      typePwd1 = 'password';
    }
  };

  /**
   * repere si le premier input est vide ou pas
   * en fonction de ça il va modifier value1 pour afficher ou pas l'oeil
   * @param e
   */
  const handlerChangeInput1 = (e) => {
    if (e.target.value !== '') {
      value1 = true;
    } else {
      value1 = false;
    }
  };
</script>

<section>
  <h1 class="mb-12 text-3xl text-center md:text-left">Réinitialisation mot de passe</h1>
  <form
    class="bg-slate-100 py-12 px-4 flex flex-col justify-center items-center"
    on:submit|preventDefault={handlerUpdatePassword}
  >
    <!-- input pwd 1 -->
    <div>
      <div class="relative">
        <input
          type={typePwd1}
          name="password"
          placeholder="Nouveau mot de passe"
          class="input input-bordered"
          required
          on:input={handlerChangeInput1}
        />
        <!-- logo see pwd1 -->
        {#if value1}
          <div
            class="absolute top-3 right-4 hover:text-secondary cursor-pointer"
            on:click={handlerSeePwd1}
          >
            {#if seePassword1}
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div class="mt-2 mb-8">
      <!-- input pwd 2 -->
      <input
        type="password"
        name="confirme_password"
        placeholder="Confirmer le mot de passe"
        class="input input-bordered"
        required
      />
    </div>
    <button class="btn btn-primary">Modifier</button>
  </form>
</section>
