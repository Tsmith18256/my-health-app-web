<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import {
    addBodyCompEntry,
    deleteBodyCompEntryById,
    updateBodyCompEntry,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
  import BodyCompEditEntryForm from '../../../lib/body-comp/components/body-comp-edit-entry-form.svelte';

  const modalStore = getModalStore();
  const entryToEdit: IBodyCompEntry | undefined =
    $modalStore[0]?.meta.entryToEdit;

  const submitEntry = (e: IBodyCompEntry) => {
    if (entryToEdit) {
      updateBodyCompEntry(e);
    } else {
      addBodyCompEntry(e);
    }

    modalStore.close();
  };

  const deleteEntry = () => {
    if (entryToEdit) {
      deleteBodyCompEntryById(entryToEdit.id);
    }

    modalStore.close();
  };
</script>

<div class="w-modal overflow-y-scroll rounded-3xl bg-surface-700 p-8">
  <BodyCompEditEntryForm
    {entryToEdit}
    {submitEntry}
    cancel={modalStore.close}
    {deleteEntry}
  />
</div>
