<script lang="ts">
  import { session } from '$app/stores';
  import { createObjectAsFormData } from '$lib/providers/format/format.service';
  import type { ITodo } from './todo.type';

  let styleLoading = '';

  const handlerCreateTodo = async (e) => {
    styleLoading = 'loading';

    // fomat données
    const formData = createObjectAsFormData<ITodo>(e.target);
    formData.check = false;
    formData.uid_user = $session.user.id;

    // create todo
    const res = await fetch('api/todo.json', { method: 'POST', body: JSON.stringify(formData) });
    const resJson = await res.json();

    if (!resJson.created) {
      throw new Error(resJson.error);
    } else {
      e.target.reset();
    }
    styleLoading = '';
  };
</script>

<section class="mb-12 w-full">
  <form class="flex justify-center" on:submit|preventDefault={handlerCreateTodo}>
    <!-- input -->
    <input
      type="text"
      placeholder="Ajouter une tâche"
      class="input input-bordered input-sm rounded-full w-full sm:w-7/12 md:w-6/12 lg:w-5/12"
      name="text"
      required
    />
    <!-- btn submit -->
    <button class={`btn btn-primary btn-sm rounded-full ml-4 ${styleLoading}`}>Valider</button>
  </form>
</section>
