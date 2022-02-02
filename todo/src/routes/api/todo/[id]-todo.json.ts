import { supabase } from '$lib/providers/supabase/supabase.service';

export const del = async ({ params }) => {
  const { data, error } = await supabase.from('todos').delete().eq('id', params.id);
  console.log(data);

  if (error) {
    return {
      status: error.code,
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
};
