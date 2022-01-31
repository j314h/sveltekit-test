import { supabase } from '$lib/providers/supabase/supabase.service';

export const post = async ({ request }) => {
  // format donnée en objet
  const body = await request.json();

  console.log(body);

  // signin
  const { user, error } = await supabase.auth.signIn({
    email: body.email,
    password: body.password
  });

  // si error connexion
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
      ...user
    }
  };
};
