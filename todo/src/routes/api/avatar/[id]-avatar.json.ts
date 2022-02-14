import { supabase } from './../../../lib/providers/supabase/supabase.service';

export const patch = async ({ params, request }) => {
  // récupérer le body
  const body = await request.json();

  // modifier le profile de l'avatar
  const { error } = await supabase
    .from('profils')
    .update({ avatar: body.avatar })
    .eq('id', params.id);

  // si erreur
  if (error) {
    return {
      status: error.code,
      body: {
        error: error.message,
        update: false
      }
    };
  }

  return {
    status: 200,
    body: {
      update: true
    }
  };
};
