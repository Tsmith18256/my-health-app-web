<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';

  import BodyCompEditEntryForm from './body-comp-edit-entry-form.svelte';
  import {
    addBodyCompEntry,
    deleteBodyCompEntryById,
    updateBodyCompEntry,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';

  export let parent: any;

  const modalStore = getModalStore();

  const entryToEdit: IBodyCompEntryV2 | undefined =
    $modalStore[0]?.meta.entryToEdit;

  const onFormSubmit = (e: CustomEvent<IBodyCompEntryV2>) => {
    if (entryToEdit) {
      updateBodyCompEntry(e.detail);
    } else {
      addBodyCompEntry(e.detail);
    }

    parent.onClose();
  };

  const onDeleteEntry = () => {
    if (entryToEdit) {
      deleteBodyCompEntryById(entryToEdit.id);
    }

    parent.onClose();
  };
</script>

<div class="{parent.width} overflow-y-scroll rounded-3xl bg-surface-700 p-8">
  <BodyCompEditEntryForm
    {entryToEdit}
    on:submit={onFormSubmit}
    on:cancel={parent.onClose}
    on:delete={onDeleteEntry}
  />
</div>
