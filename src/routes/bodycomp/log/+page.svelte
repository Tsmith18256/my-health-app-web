<script lang="ts">
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompNewEntryButton from '$lib/components/body-comp/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompNewEntryModal from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-modal.svelte';
  import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
  import { bodyCompEntries } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';
  import { convertGsToLbs, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import type { ComponentProps } from 'svelte';

  let isNewEntryModalVisible = false;

  $: formattedEntries = $bodyCompEntries.map<ComponentProps<BodyCompListItem>>(entry => ({
    date: entry.date.format('MMMM D, YYYY'),
    weight: convertGsToLbs(entry.weightInG).toFixed(1),
    waistCirc: entry.waistCircInMm !== undefined ? convertMmsToIns(entry.waistCircInMm).toFixed(1) : undefined,
    neckCirc: entry.neckCircInMm !== undefined ? convertMmsToIns(entry.neckCircInMm).toFixed(1) : undefined,
    chestSkinfold: entry.chestSkinfoldInMm?.toString(),
    abSkinfold: entry.abSkinfoldInMm?.toString(),
    thighSkinfold: entry.thighSkinfoldInMm?.toString()
  }));

  const showNewEntryModal = () => {
    isNewEntryModalVisible = true;
  };
</script>

<BodyCompNewEntryButton on:click={showNewEntryModal} />

<div class="body-comp-table">
  <BodyCompTableHeading />
  {#each formattedEntries as entry}
    <BodyCompListItem {...entry} />
  {/each}

  <BodyCompNewEntryModal bind:isVisible={isNewEntryModalVisible} />
</div>

<style>
  .body-comp-table {
    margin-top: 1rem;
  }
</style>
