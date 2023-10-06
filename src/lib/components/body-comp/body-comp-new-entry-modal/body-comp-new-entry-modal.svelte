<script lang="ts">
  import Modal from '$lib/components/shared/modal/modal.svelte';
  import BodyCompNewEntryForm from '../body-comp-new-entry-form/body-comp-new-entry-form.svelte';
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';

  export let isVisible = false;

  const onFormSubmit = (e: CustomEvent<IBodyCompEntry>) => {
    console.log(e.detail);
  };
</script>

<Modal bind:isVisible>
  <BodyCompNewEntryForm on:submit={onFormSubmit} />
</Modal>
