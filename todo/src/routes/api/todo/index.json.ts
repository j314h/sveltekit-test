import { supabase } from '$lib/providers/supabase/supabase.service';

export const get = async () => {
  // recupere le user connecter
  const user = supabase.auth.user();

  // get les todo du user connecter
  const { data: todos, error } = await supabase.from('todos').select('*').eq('uid_user', user.id);
  console.log(todos);

  // si error
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
      todos
    }
  };
};
