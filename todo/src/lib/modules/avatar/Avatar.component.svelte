<script type="ts">
  import { session } from '$app/stores';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import { onMount } from 'svelte';
  import { profileStore } from '../profil/profil.store';

  onMount(() => {
    profileStore.listen($session.user.id);
  });
  // pour stocker le fichier
  let form;
  export let resProfil;
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
  const uploadAvatar = async (e, id) => {
    // création de l'url de l'image
    const url_avatar = form.lastModified + form.name;

    // si il y a deja un avatar
    if (resProfil.avatar !== null) {
      const old_avatar = resProfil.id_avatar;
      console.log(old_avatar);
      const { data, error } = await supabase.storage
        .from('avatars')
        .remove(['public/' + old_avatar]);
    }

    // upload image
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`public/${url_avatar}`, form, {
        cacheControl: '3600',
        upsert: false
      });

    // récupérer l'url de l'avatar
    const body = {
      avatar: import.meta.env.VITE_URL_SUPABASE_AVATAR + data.Key,
      id_avatar: url_avatar
    };

    // ajout de l'avatar dans profil
    const res_avatar_profil = await fetch(`api/avatar/${resProfil.id}-avatar.json`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  };
</script>

<div>
  <!-- form -->
  <form
    on:submit|preventDefault={async (e) => {
      uploadAvatar(e, $profileStore.id);
    }}
  >
    <label class="button primary block" for="single"> upload </label>
    <!-- input file -->
    <input on:change={change} type="file" id="file" name="file" />
    <!-- btn envoie -->
    <button>ajouter image</button>
  </form>
</div>
