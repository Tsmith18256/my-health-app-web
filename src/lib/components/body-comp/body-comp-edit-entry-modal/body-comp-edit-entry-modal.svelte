<script lang="ts">
  import Modal from '$lib/components/shared/modal/modal.svelte';
  import type { IBodyCompEntry, INewBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { updateBodyCompEntry } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';
  import BodyCompEditEntryForm from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import type { ComponentProps } from 'svelte';

  /**
   * The body comp entry to edit.
   */
  export let entryToEdit: NonNullable<ComponentProps<BodyCompEditEntryForm>['entryToEdit']>;
  /**
   * Whether or not the modal is currently visible.
   */
  export let isVisible = false;

  const onFormSubmit = (e: CustomEvent<INewBodyCompEntry | IBodyCompEntry>) => {
    // This should never be able to be false because we have provided the `entryToEdit` prop to the form.
    if (isBodyCompEntry(e.detail)) {
      updateBodyCompEntry(e.detail);
    }

    closeModal();
  };

  const closeModal = () => {
    isVisible = false;
  };

  const isBodyCompEntry = (entry: INewBodyCompEntry | IBodyCompEntry): entry is IBodyCompEntry => {
    return 'id' in entry;
  };
</script>

<Modal bind:isVisible>
  <BodyCompEditEntryForm {entryToEdit} on:submit={onFormSubmit} on:cancel={closeModal} />
</Modal>
