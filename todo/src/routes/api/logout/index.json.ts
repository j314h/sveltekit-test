import { supabase } from '$lib/providers/supabase/supabase.service';

export const get = async () => {
  const { error } = await supabase.auth.signOut();
  console.log('DISCONNECT SERVER : ', supabase.auth.user());

  if (error) {
    return {
      status: error.status,
      body: {
        error: error.message,
        disconnect: false
      }
    };
  }

  return {
    status: 302,
    headers: {
      Location: '/'
    }
  };
};
