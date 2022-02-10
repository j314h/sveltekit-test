<script lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { createObjectAsFormData } from '$lib/providers/format/format.service';
  import { constNotificationError } from '../notification/notification.const';
  import { notificationStore } from '../notification/notification.store';

  let styleLoader = '';
  let typePwd = 'password';
  $: seePassword = typePwd === 'password' ? false : true;

  // envoie formulaire connexion user
  const handlerConnexion = async (e) => {
    styleLoader = 'loading';

    // format formData
    const formData = createObjectAsFormData(e.target);

    // signin
    const res = await fetch('api/auth.json', { method: 'POST', body: JSON.stringify(formData) });
    const user = await res.json();

    // redirection si tout est ok + creation session
    if (res.ok) {
      $session.user = { ...user };
      goto('/todo');
      // effacement du formulaire
      e.target.reset();
    } else {
      notificationStore.addNewNotification(constNotificationError.CONNECTION_USER);
    }

    // effacement du formulaire
    e.target.reset();
    styleLoader = '';
  };

  const handlerSeePwd = () => {
    if (typePwd === 'password') {
      typePwd = 'text';
    } else {
      typePwd = 'password';
    }
  };
</script>

<section class="card shadow-lg card-bordered my-12">
  <div class="card-body">
    <!-- title -->
    <h2 class="card-title text-center">Vous avez déjà un compte ? connectez vous !</h2>
    <!-- formulaire -->
    <form class="flex flex-col items-center mt-8" on:submit|preventDefault={handlerConnexion}>
      <!-- input email -->
      <div>
        <input
          type="email"
          placeholder="E-Mail"
          class="input input-primary input-bordered"
          name="email"
          required
        />
      </div>
      <!-- input mot de passe -->
      <div class="mt-2 mb-12">
        <div class="relative">
          <input
            type={typePwd}
            placeholder="Mot de passe"
            class="input input-primary input-bordered"
            name="password"
            required
          />
          <!-- logo oeil -->
          <div
            class="absolute top-3 right-4 hover:text-secondary cursor-pointer"
            on:click={handlerSeePwd}
          >
            {#if seePassword}
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
        </div>
        <!-- mot de passe oublié -->
        <div class="text-right">
          <a
            href="/init-password/init-password-send-mail"
            class="label-text-alt text-2xs hover:text-accent">Mot de passe oublié ?</a
          >
        </div>
      </div>
      <!-- btn envoie formulaire -->
      <button class={`btn btn-primary ${styleLoader}`}>Se connecter</button>
    </form>
  </div>
</section>
