import { supabase } from './../../../lib/providers/supabase/supabase.service';


export const post = async ({ request }) => {
  // récupéré le body sous forme json
  const body = await request.json();

  // création du bucket
  const res = await supabase
  .storage
  .createBucket(body);

  // si erreur
  if (res.error) {
    return {
    status: 500,
      body: {
        error: res.error.message,
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