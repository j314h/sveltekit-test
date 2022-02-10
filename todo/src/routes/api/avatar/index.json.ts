import { supabase } from '../../../lib/providers/supabase/supabase.service'


export const post = async ({ request }) => {
  // récupéré le body sous forme json
  const body = await request.formData();

  // création de l'avatar
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload('public/avatar1.png', body, {
    upsert: false
  })

  // si erreur
  if (error) {
    return {
    status: 500,
      body: {
        error: error.message,
        created: false,
      }
    }
  }

  return {
    status: 200,
    body: {
      created: true,
    }
  }
}