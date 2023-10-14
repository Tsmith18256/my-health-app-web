<script lang="ts">
  import BodyCompEditEntryModal from '$lib/components/body-comp/body-comp-edit-entry-modal/body-comp-edit-entry-modal.svelte';
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompNewEntryButton from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompNewEntryModal from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-modal.svelte';
  import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
  import { bodyCompEntries } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';

  let isNewEntryModalVisible = false;
  let isEditEntryModalVisible = false;

  let entryBeingEdited: IBodyCompEntry | undefined;

  const showNewEntryModal = () => {
    isNewEntryModalVisible = true;
  };

  const editEntry = (entry: IBodyCompEntry) => {
    entryBeingEdited = entry;
    isEditEntryModalVisible = true;
  };
</script>

<BodyCompNewEntryButton on:click={showNewEntryModal} />

<div class="body-comp-table">
  <BodyCompTableHeading />
  {#each $bodyCompEntries as entry}
    <BodyCompListItem {entry} on:click={() => editEntry(entry)} />
  {/each}

  <BodyCompNewEntryModal bind:isVisible={isNewEntryModalVisible} />
  {#if entryBeingEdited}
    <BodyCompEditEntryModal entryToEdit={entryBeingEdited} bind:isVisible={isEditEntryModalVisible} />
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';

  .body-comp-table {
    @media (min-width: breakpoints.$tablet) {
      margin-top: 1rem;
    }
  }
</style>
