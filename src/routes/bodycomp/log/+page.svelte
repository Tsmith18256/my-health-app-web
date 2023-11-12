<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type BodyCompEditEntryForm from '$lib/components/body-comp/body-comp-edit-entry-modal/body-comp-edit-entry-form/body-comp-edit-entry-form.svelte';
  import BodyCompEditEntryModal from '$lib/components/body-comp/body-comp-edit-entry-modal/body-comp-edit-entry-modal.svelte';
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompNewEntryButton from '$lib/components/body-comp/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
  import { bodyCompEntries } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';

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

  <BodyCompEditEntryModal entryToEdit={entryBeingEdited} bind:isVisible={isEditEntryModalVisible} />
</div>

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';

  .body-comp-table {
    @media (min-width: breakpoints.$tablet) {
      margin-top: 1rem;
    }
  }
</style>
