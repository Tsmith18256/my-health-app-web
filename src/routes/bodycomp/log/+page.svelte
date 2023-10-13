<script lang="ts">
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompNewEntryButton from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompNewEntryModal from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-modal.svelte';
  import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
  import { bodyCompEntries } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';

  let isNewEntryModalVisible = false;

  const showNewEntryModal = () => {
    isNewEntryModalVisible = true;
  };
</script>

<BodyCompNewEntryButton on:click={showNewEntryModal} />

<div class="body-comp-table">
  <BodyCompTableHeading />
  {#each $bodyCompEntries as entry}
    <BodyCompListItem {entry} />
  {/each}

  <BodyCompNewEntryModal bind:isVisible={isNewEntryModalVisible} />
</div>

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';

  .body-comp-table {
    @media (min-width: breakpoints.$tablet) {
      margin-top: 1rem;
    }
  }
</style>
