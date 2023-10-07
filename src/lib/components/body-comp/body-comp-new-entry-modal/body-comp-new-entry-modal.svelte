<script lang="ts">
  import Modal from '$lib/components/shared/modal/modal.svelte';
  import BodyCompNewEntryForm from './body-comp-new-entry-form/body-comp-new-entry-form.svelte';
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { addBodyCompEntry } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';

  export let isVisible = false;

  const onFormSubmit = (e: CustomEvent<IBodyCompEntry>) => {
    addBodyCompEntry(e.detail);
    closeModal();
  };

  const closeModal = () => {
    isVisible = false;
  };
</script>

<Modal bind:isVisible>
  <BodyCompNewEntryForm on:submit={onFormSubmit} on:cancel={closeModal} />
</Modal>
