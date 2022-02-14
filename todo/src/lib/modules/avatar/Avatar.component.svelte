<script type="ts">
  import { session } from '$app/stores';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import {
    constNotificationConfirmation,
    constNotificationError
  } from '../notification/notification.const';
  import { notificationStore } from '../notification/notification.store';
  import { profileStore } from '../profil/profil.store';

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
    const type_file = form.type.split('/')[1];
    const img = `${$session.user.id}.${type_file}`;

    // variable pour stokage reponse upload
    let res_bucket_avatar;
    let bucket_avatar;

    // upload image
    res_bucket_avatar = await supabase.storage.from('avatars').upload(`public/${img}`, form, {
      cacheControl: '0',
      upsert: true
    });

    // si il y a une erreur au moment du upload ou update
    if (res_bucket_avatar.error) {
      notificationStore.addNewNotification(constNotificationError.UPLOAD_AVATAR);
      throw new Error(res_bucket_avatar.error.message);
    }

    // on recupere l'url apres creation ou modification
    bucket_avatar = res_bucket_avatar.data.Key;

    // on verifie si un avatar existe deja si oui on efface
    if (resProfil.avatar !== null) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .remove([`public/${resProfil.avatar}`]);

      // si erreur a l'effacement de l'avatar
      if (error) {
        throw new Error(error.message);
      }
    }

    // ajout de l'avatar dans profil
    const res_avatar_profil = await fetch(`api/avatar/${$profileStore.id}-avatar.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: bucket_avatar
      })
    });
    const avatar_profil = await res_avatar_profil.json();

    // si error
    if (!res_avatar_profil.ok) {
      notificationStore.addNewNotification(constNotificationError.UPDATE_AVATAR);
      throw new Error(avatar_profil.error);
    }

    notificationStore.addNewNotification(constNotificationConfirmation.UPDATE_AVATAR);
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
