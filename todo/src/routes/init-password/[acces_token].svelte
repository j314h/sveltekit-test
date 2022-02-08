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
  import { createObjectAsFormData } from 'woo-format';

  export let acces_token;

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
        const data = await res.json();
        goto('/');
      } else {
        // gestion de l'erreur
        const data = await res.json();
        throw new Error(data.error);
      }
    } else {
      //gestion error mot de passe ne corresponds pas
      throw new Error('Les mots de passe ne sont pas identique');
    }
  };
</script>

<section>
  <h1 class="mb-12 text-3xl text-center md:text-left">Réinitialisation mot de passe</h1>
  <form
    class="bg-slate-100 py-12 px-4 flex flex-col justify-center items-center"
    on:submit|preventDefault={handlerUpdatePassword}
  >
    <div>
      <input
        type="password"
        name="password"
        placeholder="Nouveau mot de passe"
        class="input input-bordered"
      />
    </div>
    <div class="mt-2 mb-8">
      <input
        type="password"
        name="confirme_password"
        placeholder="Confirmer le mot de passe"
        class="input input-bordered"
      />
    </div>
    <button class="btn btn-primary">Modifier</button>
  </form>
</section>
