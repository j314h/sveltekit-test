<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import { createObjectAsFormData } from '$lib/providers/format/format.service';

  /**
   * changement de mot de passe user
   * @param e => event du formulaire
   */
  const handlerForgetPassword = async (e) => {
    // creation format des données
    const formData: { email: string } = createObjectAsFormData(e.target);

    // envoie du mail pour changement de mot de passe
    const { error } = await supabase.auth.signIn({
      email: formData.email
    });

    if (error) {
      // gestion erreur
      throw new Error(error.message);
    } else {
      //ajouter notification pour afficher l'envoie du mail
      goto('/');
    }
  };
</script>

<section>
  <!-- title -->
  <h1 class="mb-12 text-3xl text-center md:text-left">Mot de passe oublié</h1>

  <!-- form -->
  <form
    class="bg-slate-100 py-12 px-4 flex flex-col justify-center items-center"
    on:submit|preventDefault={handlerForgetPassword}
  >
    <!-- input email -->
    <div>
      <input
        type="email"
        name="email"
        placeholder="Email de votre compte"
        class="input input-bordered mb-6"
        required
      />
    </div>
    <button class="btn btn-primary">Envoyer</button>
  </form>

  <!-- info formulaire -->
  <p class="text-2xs mt-6 md:w-7/12">
    * Un mail sera envoyer à votre adresse, veuillez suivre les instructions contenu dans cette
    e-mail
  </p>
</section>
