import type { IProfil } from './profil.type';
import { supabase } from './../../providers/supabase/supabase.service';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

// creation affiche / cache volet profil store
const createSeeProfil = () => {
  const { set, subscribe, update } = writable(false);

  return {
    set,
    subscribe,
    update
  };
};

// store seeProfil
export const seeProfilStore = createSeeProfil();

// creation du store profil
const storeProfil = () => {
  const { set, subscribe, update } = writable({} as IProfil);

  return {
    set,
    subscribe,

    // ecoute profil
    listen: (id: string) => {
      const sub = supabase
        .from(`profils:uid_user=eq.${id}`)
        .on('UPDATE', (payload) => {
          console.log('Change received!', payload);

          update((n) => {
            n = { ...n, ...payload.new };
            return n;
          });
        })
        .subscribe();
    }
  };
};

// store profil
export const profileStore = storeProfil();
