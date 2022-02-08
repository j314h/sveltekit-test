import { supabase } from '$lib/providers/supabase/supabase.service';

export const post = async ({ request }) => {
  // recupere et format les données
  const body = await request.json();

  // request modification mot de passe
  const { error, data } = await supabase.auth.api.updateUser(body.acces_token, {
    password: body.password
  });
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
