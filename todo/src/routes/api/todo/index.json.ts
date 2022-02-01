import { supabase } from '$lib/providers/supabase/supabase.service';

export const get = async () => {
  // get les todo du user connecter
  const { data: todos, error } = await supabase.from('todos').select('*');

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
