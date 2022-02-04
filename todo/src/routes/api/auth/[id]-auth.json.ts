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

export const del = async ({ params }) => {
  
  const { data: user, error } = await supabase.auth.api.deleteUser(
    '715ed5db-f090-4b8c-a067-640ecee36aa0',
    'YOUR_SERVICE_ROLE_KEY'
  );

  if (error) {
    return {
      status: 500,
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
}