import { supabase } from '$lib/providers/supabase/supabase.service';

export const get = async () => {
  //envoie mail de rĂ©initialisation
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(supabase.auth.user().email);

  // si error
  if (error) {
    return {
      status: error.status,
      body: {
        error: error.message
      }
    };
  }

  return {
    status: 200,
    body: {
      data
    }
  };
};
