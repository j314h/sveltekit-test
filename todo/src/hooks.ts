import { supabase } from '$lib/providers/supabase/supabase.service';

export const handle = async ({ event, resolve }) => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('HANDLE EVENT : ', event);
    console.log('HANDLE SESSION : ', session);
  });

  // recupere le user depuis supabase si son token est toujours valide
  event.locals.user = supabase.auth.user() ? supabase.auth.user() : null;

  console.log('USER HANDLE : ', event.locals.user);

  const response = await resolve(event);
  return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (event) => {
  console.log('USER GETSESSION : ', event.locals.user);

  return event.locals.user ? { user: { ...event.locals.user } } : {};
};
