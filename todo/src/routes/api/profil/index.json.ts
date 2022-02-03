import { supabase } from '../../../lib/providers/supabase/supabase.service';


export const get = async () => {
  // afficher le profil de la personne connecter
  const { data: profils, error } = await supabase.from('profils').select('*').eq('uid_user', supabase.auth.user().id);

  console.log('prof2=>',profils);
  
  // si erreur
  if(error) {
    return {
      status: error.code,
      body: {
        error: error.message,
      }
    };
  }

  return {
    status: 200,
    body: {
      profil: profils[0],
    }
  }
}