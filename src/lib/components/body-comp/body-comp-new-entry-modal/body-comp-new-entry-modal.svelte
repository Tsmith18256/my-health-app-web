<script lang="ts">
  import Modal from '$lib/components/shared/modal/modal.svelte';
  import BodyCompEditEntryForm from './body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import type { INewBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { addBodyCompEntry } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';

  export let isVisible = false;

  const onFormSubmit = (e: CustomEvent<INewBodyCompEntry>) => {
    addBodyCompEntry(e.detail);
    closeModal();
  };

  const closeModal = () => {
    isVisible = false;
  };
</script>

<Modal bind:isVisible>
  <BodyCompEditEntryForm on:submit={onFormSubmit} on:cancel={closeModal} />
</Modal>
