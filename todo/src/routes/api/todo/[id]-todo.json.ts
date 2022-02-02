import { supabase } from '$lib/providers/supabase/supabase.service';

export const del = async ({ params }) => {
  const { error } = await supabase.from('todos').delete().eq('id', params.id);

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


export const patch = async ({ params, request }) => {
  // recupérer le body
  const body = await request.json();

  // update todo
  const { error } = await supabase.from('todos').update(body).eq('id', params.id);

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
