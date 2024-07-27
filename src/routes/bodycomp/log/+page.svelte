<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type BodyCompEditEntryForm from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import BodyCompEditEntryModal from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-modal.svelte';
  import BodyCompNewEntryButton from '$lib/body-comp/components/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompListItem from '$lib/body-comp/components/body-comp-table/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompTableHeading from '$lib/body-comp/components/body-comp-table/body-comp-table-heading/body-comp-table-heading.svelte';
  import type { PageData } from './$types';
  import {
    addBodyCompEntry,
    bodyCompEntries,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';

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

<BodyCompNewEntryButton on:click={() => editEntry()} />

<div class="body-comp-table">
  <BodyCompTableHeading />
  {#each $bodyCompEntries as entry}
    <BodyCompListItem {entry} on:click={() => editEntry(entry)} />
  {/each}

  <BodyCompEditEntryModal
    entryToEdit={entryBeingEdited}
    bind:isVisible={isEditEntryModalVisible}
  />
</div>

<style lang="scss">
  @use '$lib/shared/styles/variables/breakpoints';

  .body-comp-table {
    @media (min-width: breakpoints.$tablet) {
      margin-top: 1rem;
    }
  }
</style>
