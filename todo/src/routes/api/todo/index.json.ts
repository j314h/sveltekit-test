import { supabase } from '$lib/providers/supabase/supabase.service';

export const post = async () => {
  console.log('coucou');
};

export const get = async () => {
  const user = supabase.auth.user();

  const { data: todos, error } = await supabase.from('todos').select(user.id);
};
