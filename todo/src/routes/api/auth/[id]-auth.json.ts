import { supabase } from './../../../lib/providers/supabase/supabase.service';
export const patch = async ({params, request}) => {
  // récupéré le body 
  const body = await request.json();

  console.log('body=>',body);
  
  // modification du user
  const { user, error } = await supabase.auth.update({ 
    data: body,
  })

  // si erreur
  if (error) {
    return {
      status: 500,
      body: {
      error: error.message,
      },
    }
  }

  return {
    status: 200,
    body: {
      user
    }
  }
}