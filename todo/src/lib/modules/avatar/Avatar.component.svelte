<script type="ts">
  import { session } from '$app/stores';
  import { supabase } from '$lib/providers/supabase/supabase.service';
  import HoverBtn from '../hover-btn/hover-btn.component.svelte';
  import {
    constNotificationConfirmation,
    constNotificationError
  } from '../notification/notification.const';
  import { notificationStore } from '../notification/notification.store';
  import { profileStore, seeProfilStore } from '../profil/profil.store';
  import {} from '$lib/modules/header/Header.component.svelte';
  import { Input } from 'postcss';

  // pour stocker le fichier
  let form;
  // booleen pour les boutton modifier/valider/annuler
  let updateChangeAvatar = false;
  // pour récupéré la valeur de l'input avatar
  let scr;

  export let resProfil;

  /**
   * au chargement du fichier dans le input
   * @param e => event du on:change
   */
  const change = (e) => {
    // le form de l'image pour envoyé au serveur
    form = e.target.files[0];

    // récupération de l'image de l'input
    let reader = new FileReader();
    reader.readAsDataURL(form);
    reader.onload = (e) => {
      scr = e.target.result;
    };
    updateChangeAvatar = !updateChangeAvatar;
  };

  /*
   * afficher le boutton update ou les boutton accept/close
   */
  const changeButonAvatar = () => {
    updateChangeAvatar = !updateChangeAvatar;
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
    const res_avatar_profil = await fetch(`api/profil/${$profileStore.id}-profil.json`, {
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

  // fonction pour ouvrir la recherche de fichier pour avatar
  function thisFileUpload() {
    document.getElementById('file').click();
  }
</script>

<div class="flex justify-center mt-8">
  <div>
    {#if !updateChangeAvatar}
      <!-- image avatar -->
      <div>
        <img
          src={`${import.meta.env.VITE_URL_SUPABASE_AVATAR}${$profileStore.avatar}`}
          alt="avatar"
          class="h-16 w-16 rounded-full "
        />
      </div>
    {:else}
      <!-- image de l'input selectionner -->
      <div>
        <img id="changeAvatar" src={scr} alt="avatar" class="h-16 w-16 rounded-full " />
      </div>
    {/if}
  </div>

  <div class="self-end">
    <div data-tip="Modifier avatar" class="tooltip tooltip-bottom tooltip-secondary">
      <!-- input upload -->
      <input on:change={change} type="file" id="file" style="display:none;" value="" />
      <!-- boutton modifier -->
      {#if !updateChangeAvatar}
        <HoverBtn>
          <div
            on:click={thisFileUpload}
            class="h-33 w-3 rounded-full text-red-500 flex-row-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </div>
        </HoverBtn>
      {:else}
        <div class="flex">
          <!-- form -->
          <form
            on:submit={async (e) => {
              uploadAvatar(e, $profileStore.id);
            }}
          >
            <!-- boutton valider -->
            <HoverBtn>
              <button class="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </HoverBtn>
          </form>
          <!-- boutton annuler la modification -->
          <HoverBtn>
            <div on:click={changeButonAvatar} class="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </HoverBtn>
        </div>
      {/if}
    </div>
  </div>
</div>
