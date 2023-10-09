<script lang="ts">
  import { BUTTON_TYPE } from '$lib/components/shared/buttons/button/button.constants';
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import TextInput from '$lib/components/shared/inputs/text-input/text-input.svelte';
  import { settings, userAge } from '$lib/stores/shared/settings/settings.store';
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { calculateAveragedBodyFat } from '$lib/utils/body-comp/body-fat-calculator/body-fat-calculator.util';
  import { convertInsToCms, convertInsToMms, convertLbsToGs, convertMmsToCms } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';

  let age = $userAge;
  let heightInMm = $settings.heightInMm;

  // TODO: add date picker
  const date = dayjs();
  let weightInLb: number | undefined;
  let waistInIn: number | undefined;
  let neckInIn: number | undefined;
  let chestInMm: number | undefined;
  let abInMm: number | undefined;
  let thighInMm: number | undefined;

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

  const dispatch = createEventDispatcher<{ submit: IBodyCompEntry, cancel: void }>();

  const submit = () => {
    if (date && weightInLb) {
      dispatch('submit', {
        date,
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

  const reset = () => {
    weightInLb = undefined;
    waistInIn = undefined;
    neckInIn = undefined;
    chestInMm = undefined;
    abInMm = undefined;
    thighInMm = undefined;
  };
</script>

<h2 class="heading">New Body Comp Entry</h2>

<div class="fields-container">
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

<div class="buttons-container">
  <Button disabled={!date || !weightInLb} on:click={submit}>
    Submit
  </Button>

  <Button type={BUTTON_TYPE.negative} on:click={cancel}>
    Cancel
  </Button>
</div>

<style lang="scss">
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
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
