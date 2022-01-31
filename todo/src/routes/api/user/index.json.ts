import { supabase } from '$lib/providers/supabase/supabase.service';

// creation de user
export const post = async ({ request }) => {
  // on recupere sous forme de json
  const body = await request.json();
  // on stocke le mot de passe
  const password = body.password;
  // suppression du mot de passe
  delete body.password;

  // creation du user auth
  const { user, session, error } = await supabase.auth.signUp(
    {
      email: body.email,
      password: password
    },
    {
      data: body
    }
  );
  // si error auth
  if (error) {
    return {
      status: error.status,
      body: {
        error: error.message
      }
    };
  }

  // suppression de l'email
  delete body.email;

  // creation du profil du user
  const profil = await supabase.from('profils').insert([{ uid_user: user.id, ...body }]);
  // si error profil
  if (profil.error) {
    return {
      status: 500,
      body: {
        error: profil.error.message
      }
    };
  }

  return {
    status: 201,
    body: {
      user,
      session
    }
  };
};

// recupere tous les users
export const get = async () => {
  console.log('coucou');
};
