<script context="module" lang="ts">
  export const load = async ({ session }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/'
      };
    }

    return {};
  };
</script>

<p>VOICI MES TODOS</p>
