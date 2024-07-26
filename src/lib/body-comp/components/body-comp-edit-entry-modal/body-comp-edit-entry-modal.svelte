<script lang="ts">
  import { Modal } from '@tsmith18256/ty-ui';
  import { addBodyCompEntry, deleteBodyCompEntryById, updateBodyCompEntry } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import BodyCompEditEntryForm from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import type { ComponentProps } from 'svelte';
  import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';

  /**
   * The body comp entry to edit. If this is provided, the modal will open in Edit mode; otherwise, it will open in New
   * Entry mode.
   */
  export let entryToEdit: ComponentProps<BodyCompEditEntryForm>['entryToEdit'];
  /**
   * Whether or not the modal is currently visible.
   */
  export let isVisible = false;

  const onFormSubmit = (e: CustomEvent<BodyCompEntry>) => {
    if (entryToEdit) {
      updateBodyCompEntry(e.detail);
    } else {
      addBodyCompEntry(e.detail);
    }

    closeModal();
  };

  const onDeleteEntry = () => {
    if (entryToEdit) {
      deleteBodyCompEntryById(entryToEdit.id);
    }

    closeModal();
  };

  const closeModal = () => {
    isVisible = false;
  };
</script>

<Modal bind:isVisible>
  <BodyCompEditEntryForm {entryToEdit} on:submit={onFormSubmit} on:cancel={closeModal} on:delete={onDeleteEntry} />
</Modal>
