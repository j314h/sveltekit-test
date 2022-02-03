import { supabase } from './../../providers/supabase/supabase.service';
import { writable } from 'svelte/store';


const storeProfil = () => {
  const {set, subscribe, update} = writable([]);

  return {
    set,
    subscribe,

    listen: (id: string) => {
      const sub = supabase.from('profils')
      .on('UPDATE', payload => {
        console.log('Change received!', payload)
        
        update((n) => {
          n = n.map((el) => {
            if(el.id === payload.new.id) {
              el = {...el, ...payload.new };
            }
            return el;
          });
          return n;
        })
      })
      .subscribe()
    }
  }
};

export const profileStore = storeProfil();