import type { IProfil } from './profil.type';
import { supabase } from './../../providers/supabase/supabase.service';
import { writable } from 'svelte/store';


const storeProfil = () => {
  const {set, subscribe, update} = writable({} as IProfil);

  return {
    set,
    subscribe,

    listen: (id: string) => {
      const sub = supabase.from(`profils:uid_user=eq.${id}`)
      .on('UPDATE', payload => {
        console.log('Change received!', payload)
        
        update((n) => {
          n = { ...n, ...payload.new}
          return n;
        })
      })
      .subscribe()
    }
  }
};

export const profileStore = storeProfil();