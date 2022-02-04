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
  console.log('user=>',supabase.auth.user().id);
  
  const { data: user, error } = await supabase.auth.api.deleteUser(
    supabase.auth.user().id +
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQzNjQxMjQyLCJleHAiOjE5NTkyMTcyNDJ9.MeVpnoc7OJHiZOcHiD9vwCx4j48E4zc0-a0VjuoDx1U'
  );
    console.log('USER=>',user);
    
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
}