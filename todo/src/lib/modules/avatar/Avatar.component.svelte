<script>
  let form;
  const change = (e) => {
    form = new FormData();
    form.append('file', e.target.files[0]);
  };

  const uploadAvatar = async () => {
    const res = await fetch(`api/avatar.json`, {
      method: 'POST',
      body: form
    });
  };
</script>

<div>
  <form on:submit|preventDefault={uploadAvatar}>
    <label class="button primary block" for="single"> upload </label>
    <input on:change={change} type="file" id="file" />
    <button>ajouter image</button>
  </form>
</div>
