import { supabase } from '$lib/providers/supabase/supabase.service';
import { writable } from 'svelte/store';
import type { ITodo } from './todo.type';

const storeTodos = () => {
  const { set, subscribe, update } = writable([] as ITodo[]);

  return {
    subscribe,
    set,
    init: async () => {
      const { data: todos, error } = await supabase.from('todos').select('*');
      set(todos);
    },

    listen: () => {
      const sub = supabase
        .from('todos')
        .on('*', (payload) => {
          console.log('Change received!', payload);
          if (payload.eventType === 'INSERT') {
            console.log('je insert');

            update((n) => {
              n = [...n, payload.new];
              return n;
            });
          } else if (payload.eventType === 'DELETE') {
            console.log('je delete');

            update((n) => {
              n = n.filter((el) => el?.id != payload.old.id);
              return n;
            });
          } else if (payload.eventType === 'UPDATE') {
            console.log('je update');

            update((n) => {
              n = n.map((el) => {
                if (el.id === payload.new.id) {
                  el = { ...el, ...payload.new };
                }

                return el;
              });
              return n;
            });
          }
        })
        .subscribe();

      return () => supabase.removeSubscription(sub);
    }
  };
};

export const todoStore = storeTodos();
