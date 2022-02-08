<script lang="ts" context="module">
  import { goto } from '$app/navigation';
  export const load = ({ error, status }) => {
    console.log(error);

    return {
      props: {
        error: error.message,
        status
      }
    };
  };
</script>

<script lang="ts">
  export let error: string;
  export let status;
</script>

<section class="flex justify-center items-center">
  <div class="p-2 bg-primary rounded-sm">
    <!-- cadre btn -->
    <div class="flex justify-between items-center text-white mb-2">
      <h1 class="text-sm">Oupsss ... erreur</h1>
      <button class="text-red-600" on:click={() => goto('/')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="#fff"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
    <!-- cadre contenu de l'erreur -->
    <div class="bg-white py-12 px-12 rounded-md">
      <div class="flex flex-col items-center justify-center">
        <p class="font-bold text-red-600 text-2xl">Erreur {status}</p>
        <p class="mt-6">{error}</p>
      </div>
      <button
        on:click={() => goto('/')}
        class="bg-gray-300 border-2 border-gray-400 rounded-lg py-2 px-4 mt-12 text-sm hover:bg-gray-200"
        >Retourner à l'accueil</button
      >
    </div>
  </div>
</section>
