<script lang="ts">
  import Button from '$lib/components/shared/button/button.svelte';
import TextInput from '$lib/components/shared/text-input/text-input.svelte';
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { calculateAveragedBodyFat } from '$lib/utils/body-comp/body-fat-calculator/body-fat-calculator.util';
  import { convertInsToCms, convertInsToMms, convertLbsToGs } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';

  // TODO: Add settings page for height and age.
  const age = 28;
  const heightInCm = convertInsToCms(70);

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
      heightInCm,
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

  const dispatch = createEventDispatcher<{ submit: IBodyCompEntry}>();

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
    }
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

<Button on:click={submit} disabled={!date || !weightInLb}>
  Submit
</Button>

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
</style>
