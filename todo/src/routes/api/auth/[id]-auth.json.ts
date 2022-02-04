import { createClient } from '@supabase/supabase-js';
import { supabase } from './../../../lib/providers/supabase/supabase.service';

export const patch = async ({ params, request }) => {
  // récupéré le body
  const body = await request.json();

  console.log('body=>', body);

  // modification du user
  const { user, error } = await supabase.auth.update({
    data: body
  });

  // si erreur
  if (error) {
    return {
      status: 500,
      body: {
        error: error.message
      }
    };
  }

  return {
    status: 200,
    body: {
      user
    }
  };
};

export const del = async ({ params }) => {
  console.log('user=>', supabase.auth.user().id);
  const userId = supabase.auth.user().id;

  const supa = createClient(import.meta.env.VITE_URL_SUPABASE, import.meta.env.VITE_SECRET);

  const { error } = await supa.auth.api.deleteUser(userId);

  console.log('ERR=>', error);

  if (error) {
    return {
      status: error.status,
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
