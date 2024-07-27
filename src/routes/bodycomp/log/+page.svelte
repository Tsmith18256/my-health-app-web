<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type BodyCompEditEntryForm from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import type { PageData } from './$types';
  import {
    addBodyCompEntry,
    bodyCompEntries,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import BodyCompTable from '$lib/body-comp/components/body-comp-table/body-comp-table.svelte';

  export let data: PageData;

  if ($bodyCompEntries.length === 0) {
    data.entries.forEach((entry) => {
      addBodyCompEntry(entry);
    });
  }

  let isEditEntryModalVisible = false;

  let entryBeingEdited: ComponentProps<BodyCompEditEntryForm>['entryToEdit'];

  const editEntry = (entry?: typeof entryBeingEdited) => {
    entryBeingEdited = entry;
    isEditEntryModalVisible = true;
  };
</script>

<button type="button" class="btn variant-filled-secondary">
	<span><i class="far fa-plus" /></span>
	<span>New entry</span>
</button>

<BodyCompTable entries={$bodyCompEntries} on:entryClick={(e) => editEntry(e.detail)} />

<!-- <div class="body-comp-table">
  <BodyCompTableHeading />
  {#each $bodyCompEntries as entry}
    <BodyCompListItem {entry} on:click={() => editEntry(entry)} />
  {/each}

  <BodyCompEditEntryModal
    entryToEdit={entryBeingEdited}
    bind:isVisible={isEditEntryModalVisible}
  />
</div> -->
