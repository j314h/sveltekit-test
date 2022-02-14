import { writable } from 'svelte/store';


const storeAvatar = () => {
  const { set, subscribe, update } = writable([] as []);

  return {
    set,
    subscribe,

    

  }
} 

export const avatarStore = storeAvatar();