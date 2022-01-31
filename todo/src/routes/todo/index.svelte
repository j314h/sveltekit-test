<script context="module" lang="ts">
  export const load = async ({ session }) => {
    console.log(session);

    return {
      props: {
        test: ''
      }
    };
  };
</script>

<p>VOICI MES TODOS</p>
