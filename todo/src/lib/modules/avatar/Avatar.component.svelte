<script>
  import { supabase } from '$lib/providers/supabase/supabase.service';

  // pour stocker le fichier
  let form;

  /**
   * au chargement du fichier dans le input
   * @param e => event du on:change
   */
  const change = (e) => {
    form = e.target.files[0];
  };

  /**
   * upload image et enregistrement du path dans la table profil
   */
  const uploadAvatar = async () => {
    // upload image
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload('public/avatar1.png', form, {
        cacheControl: '3600',
        upsert: false
      });

    // je t'ai mis de log le data retourne un objet {key: string}
    // c'est cette key qu'il faut mettre dans la colonne avatar de la table profil
    // pour le profil il faudra passer par le serveur cette fois
    console.log('lien image => ', data);
    console.log('error => ', error);
  };
</script>

<div>
  <!-- form -->
  <form on:submit|preventDefault={uploadAvatar}>
    <label class="button primary block" for="single"> upload </label>
    <!-- input file -->
    <input on:change={change} type="file" id="file" name="file" />
    <!-- btn envoie -->
    <button>ajouter image</button>
  </form>
</div>
