import { createClient } from '@supabase/supabase-js';
import { supabase } from './../../../lib/providers/supabase/supabase.service';

export const patch = async ({ params, request }) => {
  // récupéré le body
  const body = await request.json();

  // modification du user dans la table auth
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

export const del = async () => {
  // recuperation de l'id du user current
  const userId = supabase.auth.user().id;

  // creation du client supabase avec la clef secret_role
  const supa = createClient(import.meta.env.VITE_URL_SUPABASE, import.meta.env.VITE_SECRET);

  // suppression du user dans la table auth user
  const { error } = await supa.auth.api.deleteUser(userId);

  // si error
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
