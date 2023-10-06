<script lang="ts">
  import TextInput from '$lib/components/shared/text-input/text-input.svelte';
  import { calculateAveragedBodyFat } from '$lib/utils/body-comp/body-fat-calculator/body-fat-calculator.util';
  import { convertInsToCms } from '$lib/utils/shared/unit-converter/unit-converter.util';

  // TODO: Add settings page for height and age.
  const age = 28;
  const heightInCm = convertInsToCms(70);

  let weightInLbs: number | undefined;
  let waistInIn: number | undefined;
  let neckInIn: number | undefined;
  let chestInMm: number | undefined;
  let abInMm: number | undefined;
  let thighInMm: number | undefined;

  $: waistInCm = waistInIn && convertInsToCms(waistInIn);
  $: neckInCm = neckInIn && convertInsToCms(neckInIn);

  let bodyFat: number | undefined;
  $: leanBodyMass = weightInLbs && bodyFat && (weightInLbs * (1 - bodyFat)).toFixed(1);
  $: bodyFatMass = weightInLbs && bodyFat && (weightInLbs * bodyFat).toFixed(1);

  $: formattedBodyFat =
    bodyFat &&
    bodyFat.toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  $: if (weightInLbs && waistInCm && neckInCm && chestInMm && abInMm && thighInMm) {
    bodyFat = calculateAveragedBodyFat({
      age,
      heightInCm,
      neckInCm,
      waistInCm,
      chestInMm,
      abInMm,
      thighInMm,
    });
  } else {
    bodyFat = undefined;
    leanBodyMass = undefined;
    bodyFatMass = undefined;
  }
</script>

<h2 class="heading">New Body Comp Entry</h2>

<div class="fields-container">
  <TextInput id="weightField" label="Weight (lbs)" bind:value={weightInLbs} />
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
