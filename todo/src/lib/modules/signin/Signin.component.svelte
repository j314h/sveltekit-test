<script lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';

  import { createObjectAsFormData } from 'woo-format';

  // envoie formulaire connexion user
  const handlerConnexion = async (e) => {
    // format formData
    const formData = createObjectAsFormData(e.target);

    // signin
    const res = await fetch('api/auth.json', { method: 'POST', body: JSON.stringify(formData) });
    const user = await res.json();

    // redirection si tout est ok + creation session
    if (res.ok) {
      $session.user = { ...user };
      goto('/todo');
    }

    // effacement du formulaire
    e.target.reset();
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
        <input type="email" placeholder="E-Mail" class="input input-primary input-bordered" />
      </div>
      <!-- input mot de passe -->
      <div class="mt-2 mb-12">
        <input
          type="password"
          placeholder="Mot de passe"
          class="input input-primary input-bordered"
        />
        <!-- mot de passe oublié -->
        <div class="text-right">
          <a href="#" class="label-text-alt text-2xs hover:text-accent">Mot de passe oublié ?</a>
        </div>
      </div>
      <!-- btn envoie formulaire -->
      <button class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</section>
