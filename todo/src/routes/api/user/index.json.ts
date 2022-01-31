import { supabase } from "$lib/providers/supabase/supabase.service";

// creation de user
export const post = async({request}) => {
    // on recupere sous forme de json
    const body = await request.json();

    // on stocke le mot de passe
    const password = body.password

    // suppression du mot de passe
    delete body.password

    // creation du user
    const { user, session, error } = await supabase.auth.signUp(
        {
          email: body.email,
          password: password,
        },
        {
          data: body
        }
      )

      console.log('USER : ', user);
      console.log('SESSION : ', session);
      console.log('ERROR : ', error);
      

      // si error
      if(error){
          return {
              status: error.status,
              body: {
                  error: error.message
              }
          }
      }

      return {
          status: 201,
          body: {
              user,
              session,
          }
      }
}

// recupere tous les users
export const get = async() => {
    console.log('coucou');
}