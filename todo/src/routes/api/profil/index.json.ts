import { supabase } from '../../../lib/providers/supabase/supabase.service';


export const get = async () => {
  // afficher le profil de la personne connecter
  const { data: profil, error } = await (await supabase.from('profils').select('*').eq('id', supabase.auth.user().id));

  // si erreur
  if(error) {
    return {
      status: 500,
      body: {
        error: error.message,
      }
    };
  }

  return {
    status: 200,
    body: {
      profil,
    }
  }
}