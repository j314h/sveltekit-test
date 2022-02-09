import { supabase } from '$lib/providers/supabase/supabase.service';

/**
 * modification email dans auth
 * @param param0
 * @returns
 */
export const post = async ({ request }) => {
  // recuperation des données
  const body = await request.json();

  // modification du email dans auth
  const { error } = await supabase.auth.update({ email: body.email });
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
      change_email: true
    }
  };
};
