import { supabase } from '../../../lib/providers/supabase/supabase.service';
export const patch = async ({paramas, request}) => {
  // récupérer le body 
  const body = await request.json();

  // modifier le profile
  const { error } = await supabase.from('profils').update(body).eq('id', paramas.id);

  // si erreur
  if(error) {
    return {
      status: error.code,
      body: {
        error: error.message,
        uudate: false,
      }
    };
  }

  return {
    status: 200,
    body: {
      update: true,
    }
  }
}