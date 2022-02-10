import { writable } from 'svelte/store';

const storeNotification = () => {
  const { set, subscribe, update } = writable([] as string[]);

  return {
    set,
    subscribe,

    // ajouter une nouvelle notification
    addNewNotification: (value: string): void => {
      update((n) => {
        // si la notification existe déjà on la retire
        n = n.filter((el) => el !== value);
        n = [...n, value];
        return n;
      });
    },

    // supprimer une notification
    removeNotification: (value: string): void => {
      update((n) => {
        n = n.filter((el) => el !== value);
        return n;
      });
    }
  };
};

export const notificationStore = storeNotification();
