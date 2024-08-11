<script lang="ts">
  import type { PageData } from './$types';
  import {
    addBodyCompEntry,
    bodyCompEntries,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import BodyCompTable from '$lib/body-comp/components/body-comp-table/body-comp-table.svelte';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import type { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
    import Icon, { IconImage } from '$lib/shared/components/display/icon/icon.svelte';

  export let data: PageData;

  const modalStore = getModalStore();

  if ($bodyCompEntries.length === 0) {
    data.entries.forEach((entry) => {
      addBodyCompEntry(entry);
    });
  }

  const editEntry = (entry?: BodyCompEntry) => {
    modalStore.trigger({
      type: 'component',
      component: 'bodyCompEditEntryModal',
      meta: {
        entryToEdit: entry,
      },
    });
  };
</script>

<button
  class="variant-filled-secondary btn"
  type="button"
  on:click={() => editEntry()}
>
  <span><Icon iconImage={IconImage.Plus} /></span>
  <span>New entry</span>
</button>

<BodyCompTable
  entries={$bodyCompEntries}
  on:entryClick={(e) => editEntry(e.detail)}
/>
