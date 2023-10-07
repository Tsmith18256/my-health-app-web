<script lang="ts">
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
  import BodyCompNewEntryButton from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-button/body-comp-new-entry-button.svelte';
  import BodyCompNewEntryModal from '$lib/components/body-comp/body-comp-new-entry-modal/body-comp-new-entry-modal.svelte';
  import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
  import { bodyCompEntries } from '$lib/stores/body-comp/body-comp-entries/body-comp-entries.store';
  import { calculateAveragedBodyFat } from '$lib/utils/body-comp/body-fat-calculator/body-fat-calculator.util';
  import {
    convertGsToLbs,
    convertInsToCms,
    convertMmsToCms,
    convertMmsToIns,
  } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import type { ComponentProps } from 'svelte';

  let isNewEntryModalVisible = false;

  $: formattedEntries = $bodyCompEntries.map<ComponentProps<BodyCompListItem>>(entry => {
    const { date, weightInG, waistCircInMm, neckCircInMm, chestSkinfoldInMm, abSkinfoldInMm, thighSkinfoldInMm } =
      entry;
    const canCalculateBodyFat =
      waistCircInMm && neckCircInMm && chestSkinfoldInMm && abSkinfoldInMm && thighSkinfoldInMm;

    const bodyFat =
      canCalculateBodyFat &&
      calculateAveragedBodyFat({
        age: 28,
        heightInCm: convertInsToCms(70),
        neckInCm: convertMmsToCms(neckCircInMm),
        waistInCm: convertMmsToCms(waistCircInMm),
        chestInMm: chestSkinfoldInMm,
        abInMm: abSkinfoldInMm,
        thighInMm: thighSkinfoldInMm,
      });

    return {
      date: date.format('MMMM D, YYYY'),
      weight: convertGsToLbs(weightInG).toFixed(1),
      bodyFat: bodyFat?.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      waistCirc: waistCircInMm !== undefined ? convertMmsToIns(waistCircInMm).toFixed(1) : undefined,
      neckCirc: neckCircInMm !== undefined ? convertMmsToIns(neckCircInMm).toFixed(1) : undefined,
      chestSkinfold: chestSkinfoldInMm?.toString(),
      abSkinfold: abSkinfoldInMm?.toString(),
      thighSkinfold: thighSkinfoldInMm?.toString(),
    };
  });

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
