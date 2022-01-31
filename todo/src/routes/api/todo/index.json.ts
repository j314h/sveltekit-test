import { supabase } from '$lib/providers/supabase/supabase.service';

export const post = async () => {
  console.log('coucou');
};

export const get = async () => {
  const user = supabase.auth.user();

  const { data: todos, error } = await supabase.from('todos').select('*').eq('uid_user', user.id);

  console.log('ERROR :  ', error);
  console.log('TODOS :  ', todos);

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
