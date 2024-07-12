<script lang="ts">
  import DateInput from '$lib/shared/components/shared/inputs/date-input/date-input.svelte';
  import TextInput from '$lib/shared/components/shared/inputs/text-input/text-input.svelte';
  import { settings, userAge } from '$lib/shared/stores/settings/settings.store';
  import type { IBodyCompEntry, INewBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.types';
  import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
  import { convertGsToLbs, convertInsToCms, convertInsToMms, convertLbsToGs, convertMmsToCms, convertMmsToIns } from '$lib/shared/utils/unit-converter/unit-converter.util';
  import { BUTTON_APPEARANCES, Button, ButtonGroup } from '@tsmith18256/ty-ui';
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';

  /**
   * The body comp entry to edit. If this is provided, the modal will open in Edit mode; otherwise, it will open in New
   * Entry mode.
   */
  export let entryToEdit: IBodyCompEntry | undefined = undefined;
  $: isEditMode = !!entryToEdit;

  let age = $userAge;
  let heightInMm = $settings.heightInMm;

  let date = entryToEdit?.date ? entryToEdit.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
  let weightInLb = entryToEdit && convertGsToLbs(entryToEdit.weightInG);
  let waistInIn = entryToEdit?.waistCircInMm && convertMmsToIns(entryToEdit.waistCircInMm);
  let neckInIn = entryToEdit?.neckCircInMm && convertMmsToIns(entryToEdit.neckCircInMm);
  let chestInMm = entryToEdit?.chestSkinfoldInMm;
  let abInMm = entryToEdit?.abSkinfoldInMm;
  let thighInMm = entryToEdit?.thighSkinfoldInMm;

  let bodyFat: number | undefined;
  $: leanBodyMass = weightInLb && bodyFat && (weightInLb * (1 - bodyFat)).toFixed(1);
  $: bodyFatMass = weightInLb && bodyFat && (weightInLb * bodyFat).toFixed(1);

  $: formattedBodyFat =
    bodyFat &&
    bodyFat.toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  $: if (weightInLb && waistInIn && neckInIn && chestInMm && abInMm && thighInMm) {
    bodyFat = calculateAveragedBodyFat({
      age,
      heightInCm: convertMmsToCms(heightInMm),
      neckInCm: convertInsToCms(neckInIn),
      waistInCm: convertInsToCms(waistInIn),
      chestInMm,
      abInMm,
      thighInMm,
    });
  } else {
    bodyFat = undefined;
    leanBodyMass = undefined;
    bodyFatMass = undefined;
  }

  const dispatch = createEventDispatcher<{ submit: INewBodyCompEntry | IBodyCompEntry, cancel: void, delete: void }>();

  const submit = () => {
    if (date && weightInLb) {
      dispatch('submit', {
        id: entryToEdit ? entryToEdit.id : undefined,
        date: dayjs(date),
        weightInG: convertLbsToGs(weightInLb),
        waistCircInMm: waistInIn && convertInsToMms(waistInIn),
        neckCircInMm: neckInIn && convertInsToMms(neckInIn),
        chestSkinfoldInMm: chestInMm,
        abSkinfoldInMm: abInMm,
        thighSkinfoldInMm: thighInMm
      });
      reset();
    }
  };

  const cancel = () => {
    dispatch('cancel');
    reset();
  };

  const deleteEntry = () => {
    dispatch('delete');
    reset();
  };

  const reset = () => {
    weightInLb = undefined;
    waistInIn = undefined;
    neckInIn = undefined;
    chestInMm = undefined;
    abInMm = undefined;
    thighInMm = undefined;
  };
</script>

<h2 class="heading">{isEditMode ? 'Edit' : 'New'} Body Comp Entry</h2>

<div class="fields-container">
  <DateInput id="dateField" label="Date" bind:value={date} />
  <TextInput id="weightField" label="Weight (lbs)" bind:value={weightInLb} />
  <TextInput id="waistField" label="Waist (in)" bind:value={waistInIn} />
  <TextInput id="neckField" label="Neck (in)" bind:value={neckInIn} />
</div>

<h3 class="subheading">Skinfold Sites</h3>

<div class="fields-container">
  <TextInput id="chestField" label="Chest (mm)" bind:value={chestInMm} />
  <TextInput id="abField" label="Ab (mm)" bind:value={abInMm} />
  <TextInput id="thighField" label="Thigh (mm)" bind:value={thighInMm} />
</div>

{#if formattedBodyFat}
  <div class="body-fat-container">
    <strong class="body-fat-label">Body Fat: {formattedBodyFat}</strong>
    <strong class="body-fat-label">Lean Body Mass: {leanBodyMass}</strong>
    <strong class="body-fat-label">Body Fat Mass: {bodyFatMass}</strong>
  </div>
{/if}

<!-- TODO: MHA-36 - Use ButtonGroup-->
<div class="buttons-container" class:buttons-container-new={!isEditMode} class:buttons-container-edit={isEditMode}>
  <Button label={entryToEdit ? 'Save' : 'Submit'} disabled={!date || !weightInLb} on:click={submit} />

  <Button label='Cancel' appearance={BUTTON_APPEARANCES.negative} on:click={cancel} />

  {#if entryToEdit}
    <Button label='Delete' appearance={BUTTON_APPEARANCES.danger} on:click={deleteEntry} />
  {/if}
</div>

<style lang="scss">
  @use '$lib/shared/styles/variables/breakpoints';

  .heading {
    margin-bottom: 2rem;
  }

  .subheading {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .fields-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    max-width: 20rem;
  }

  .body-fat-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    margin-top: 2rem;
  }

  .body-fat-label {
    display: block;
  }

  .buttons-container {
    display: flex;
    flex: 1;
    gap: 0.5rem;

    margin-top: 1rem;

    &-new {
      max-width: 24rem;
    }

    &-edit {
      max-width: 36rem;
    }
  }
</style>
