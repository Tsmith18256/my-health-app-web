<script lang="ts">
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';

  import { formatDateIso } from '$lib/shared/utils/formatters/format-date.util';
  import { formatPercent } from '$lib/shared/utils/formatters/format-percent.util';
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';
  import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
  import {
    USER_AGE,
    USER_HEIGHT,
  } from '$lib/shared/constants/user-config.constants';

  /**
   * The body comp entry to edit. If this is provided, the modal will open in Edit mode; otherwise, it will open in New
   * Entry mode.
   */
  export let entryToEdit: IBodyCompEntryV2 | undefined = undefined;
  $: isEditMode = !!entryToEdit;

  let date = formatDateIso(dayjs(entryToEdit?.date));
  let weight = entryToEdit?.weight;
  let waist = entryToEdit?.waistCircumference;
  let neck = entryToEdit?.neckCircumference;
  let chest = entryToEdit?.chestSkinfold;
  let ab = entryToEdit?.abSkinfold;
  let thigh = entryToEdit?.thighSkinfold;

  // eslint-disable-next-line no-warning-comments
  // TODO: Now that the body fat percentage is coming off the class, this doesn't work because it doesn't update as the
  // form is being edited.
  const bodyFat = calculateAveragedBodyFat({
    age: USER_AGE,
    height: USER_HEIGHT,
    neckCircumference: neck,
    waistCircumference: waist,
    chestSkinfold: chest,
    abSkinfold: ab,
    thighSkinfold: thigh,
    weight,
  });
  const formattedBodyFat = bodyFat && formatPercent(bodyFat.bodyFatPercent);
  const leanMass = bodyFat?.leanMass;
  const fatMass = bodyFat?.fatMass;

  const dispatch = createEventDispatcher<{
    submit: IBodyCompEntryV2;
    cancel: void;
    delete: void;
  }>();

  const submit = () => {
    if (date && weight) {
      dispatch('submit', {
        id: entryToEdit?.id,
        abSkinfold: ab,
        chestSkinfold: chest,
        date,
        neckCircumference: neck,
        thighSkinfold: thigh,
        waistCircumference: waist,
        weight,
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
    weight = undefined;
    waist = undefined;
    neck = undefined;
    chest = undefined;
    ab = undefined;
    thigh = undefined;
  };
</script>

<h2 class="h2">{isEditMode ? 'Edit' : 'New'} Body Comp Entry</h2>

<label class="label">
  <span>Date</span>
  <input class="input" type="date" bind:value={date} />
</label>

<label class="label">
  <span>Weight (lbs)</span>
  <input class="input" type="number" bind:value={weight} />
</label>

<label class="label">
  <span>Waist (in)</span>
  <input class="input" type="number" bind:value={waist} />
</label>

<label class="label">
  <span>Neck (in)</span>
  <input class="input" type="number" bind:value={neck} />
</label>

<h3 class="h3">Skinfold Sites</h3>

<label class="label">
  <span>Chest (mm)</span>
  <input class="input" type="number" step="1" bind:value={chest} />
</label>

<label class="label">
  <span>Ab (mm)</span>
  <input class="input" type="number" step="1" bind:value={ab} />
</label>

<label class="label">
  <span>Thigh (mm)</span>
  <input class="input" type="number" step="1" bind:value={thigh} />
</label>

{#if formattedBodyFat}
  <div class="body-fat-container">
    <strong class="body-fat-label">Body Fat: {formattedBodyFat}</strong>
    <strong class="body-fat-label">Lean Body Mass: {leanMass}</strong>
    <strong class="body-fat-label">Body Fat Mass: {fatMass}</strong>
  </div>
{/if}

<!-- TODO: MHA-36 - Use ButtonGroup-->
<div class="flex flex-row gap-2">
  <button
    type="button"
    class="variant-filled-success btn"
    disabled={!date || !weight}
    on:click={submit}
  >
    {entryToEdit ? 'Save' : 'Submit'}
  </button>

  <button type="button" class="variant-filled-surface btn" on:click={cancel}>
    Cancel
  </button>

  {#if entryToEdit}
    <button
      type="button"
      class="variant-filled-error btn"
      on:click={deleteEntry}
    >
      Delete
    </button>
  {/if}
</div>
