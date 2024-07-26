<script lang="ts">
  import DateInput from '$lib/shared/components/shared/inputs/date-input/date-input.svelte';
  import TextInput from '$lib/shared/components/shared/inputs/text-input/text-input.svelte';
  import { settings, userAge } from '$lib/shared/stores/settings/settings.store';
  import { BUTTON_APPEARANCES, Button } from '@tsmith18256/ty-ui';
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';
  import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
  import { formatDateIso } from '$lib/shared/utils/formatters/date-formatter/date-formatter.util';
  import { formatPercent } from '$lib/shared/utils/formatters/number-formatter/number-formatter.util';

  /**
   * The body comp entry to edit. If this is provided, the modal will open in Edit mode; otherwise, it will open in New
   * Entry mode.
   */
  export let entryToEdit: BodyCompEntry | undefined = undefined;
  $: isEditMode = !!entryToEdit;

  let age = $userAge;
  let heightInMm = $settings.heightInMm;

  let date = formatDateIso(entryToEdit?.date ?? dayjs());
  let weight = entryToEdit?.weight;
  let waist = entryToEdit?.waistCircumference;
  let neck = entryToEdit?.neckCircumference;
  let chest = entryToEdit?.chestSkinfold;
  let ab = entryToEdit?.abSkinfold;
  let thigh = entryToEdit?.thighSkinfold;

  let bodyFat = entryToEdit?.getBodyFatPercent();
  let formattedBodyFat = bodyFat && formatPercent(bodyFat);
  let leanMass = entryToEdit?.getLeanMass();
  let fatMass = entryToEdit?.getFatMass();

  const dispatch = createEventDispatcher<{ submit: BodyCompEntry; cancel: void; delete: void }>();

  const submit = () => {
    if (date && weight) {
      dispatch(
        'submit',
        new BodyCompEntry({
          date: dayjs(date),
          weight: weight,
          waistCircumference: waist,
          neckCircumference: neck,
          chestSkinfold: chest,
          abSkinfold: ab,
          thighSkinfold: thigh,
        }),
      );
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
    weight = undefined;
    waist = undefined;
    neck = undefined;
    chest = undefined;
    ab = undefined;
    thigh = undefined;
  };
</script>

<h2 class="heading">{isEditMode ? 'Edit' : 'New'} Body Comp Entry</h2>

<div class="fields-container">
  <DateInput id="dateField" label="Date" bind:value={date} />
  <TextInput id="weightField" label="Weight (lbs)" bind:value={weight} />
  <TextInput id="waistField" label="Waist (in)" bind:value={waist} />
  <TextInput id="neckField" label="Neck (in)" bind:value={neck} />
</div>

<h3 class="subheading">Skinfold Sites</h3>

<div class="fields-container">
  <TextInput id="chestField" label="Chest (mm)" bind:value={chest} />
  <TextInput id="abField" label="Ab (mm)" bind:value={ab} />
  <TextInput id="thighField" label="Thigh (mm)" bind:value={thigh} />
</div>

{#if formattedBodyFat}
  <div class="body-fat-container">
    <strong class="body-fat-label">Body Fat: {formattedBodyFat}</strong>
    <strong class="body-fat-label">Lean Body Mass: {leanMass}</strong>
    <strong class="body-fat-label">Body Fat Mass: {fatMass}</strong>
  </div>
{/if}

<!-- TODO: MHA-36 - Use ButtonGroup-->
<div class="buttons-container" class:buttons-container-new={!isEditMode} class:buttons-container-edit={isEditMode}>
  <Button label={entryToEdit ? 'Save' : 'Submit'} disabled={!date || !weight} on:click={submit} />

  <Button label="Cancel" appearance={BUTTON_APPEARANCES.negative} on:click={cancel} />

  {#if entryToEdit}
    <Button label="Delete" appearance={BUTTON_APPEARANCES.danger} on:click={deleteEntry} />
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
