import { supabase } from '../../../lib/providers/supabase/supabase.service';

export const patch = async ({ params, request }) => {
  // récupérer le body
  const body = await request.json();

  // modifier le profile
  const { error } = await supabase.from('profils').update(body).eq('id', params.id);

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

export const del = async ({ params }) => {
  // supprime le profil en ciblant la colone id
  const { error } = await supabase.from('profils').delete().eq('id', params.id);

  // si erreur
  if (error) {
    return {
      status: error.code,
      body: {
        error: error.message,
        deleted: false
      }
    };
  }

  return {
    status: 200,
    body: {
      deleted: true
    }
  };
};
