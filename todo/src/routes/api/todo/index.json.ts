import { supabase } from '$lib/providers/supabase/supabase.service';

export const post = async ({ request }) => {
  const body = await request.json();

  // create todo
  const { error } = await supabase.from('todos').insert([body]);

  if (error) {
    return {
      status: error.code,
      body: {
        error: error.message,
        created: false
      }
    };
  }

  return {
    status: 201,
    body: {
      created: true
    }
  };
};

export const get = async () => {
  // get les todo du user connecter
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('uid_user', supabase.auth.user().id);

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
