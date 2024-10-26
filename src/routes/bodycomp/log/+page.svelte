<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import type { PageData } from './$types';
  import {
    addBodyCompEntry,
    bodyCompEntries,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import BodyCompTable from './body-comp-table.svelte';
  import Icon from '$lib/shared/components/display/icon/icon.svelte';
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';
  import { IconImage } from '$lib/shared/types/icon-image.type';

  export let data: PageData;

  const modalStore = getModalStore();

  if ($bodyCompEntries.length === 0) {
    data.entries.forEach((entry) => {
      addBodyCompEntry(entry);
    });
  }

  const editEntry = (entry?: IBodyCompEntryV2) => {
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
