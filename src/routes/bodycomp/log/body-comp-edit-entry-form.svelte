<script lang="ts" module>
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';

  export interface IBodyCompEditEntryFormProps {
    /**
     * The body comp entry to edit. If this is provided, the modal will open in Edit mode; otherwise, it will open in New
     * Entry mode.
     */
    entryToEdit?: IBodyCompEntryV2;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';
  import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
  import {
    USER_AGE,
    USER_HEIGHT,
  } from '$lib/shared/constants/user-config.constants';
  import { formatDateIso } from '$lib/shared/utils/formatters/format-date.util';
  import { formatPercent } from '$lib/shared/utils/formatters/format-percent.util';

  let { entryToEdit }: IBodyCompEditEntryFormProps = $props();

  const isEditMode = $derived(!!entryToEdit);

  let date = $state(formatDateIso(dayjs(entryToEdit?.date)));
  let weight = $state(entryToEdit?.weight);
  let waist = $state(entryToEdit?.waistCircumference);
  let neck = $state(entryToEdit?.neckCircumference);
  let chest = $state(entryToEdit?.chestSkinfold);
  let ab = $state(entryToEdit?.abSkinfold);
  let thigh = $state(entryToEdit?.thighSkinfold);

  const bodyFat = $derived(
    calculateAveragedBodyFat({
      age: USER_AGE,
      height: USER_HEIGHT,
      neckCircumference: neck,
      waistCircumference: waist,
      chestSkinfold: chest,
      abSkinfold: ab,
      thighSkinfold: thigh,
      weight,
    }),
  );
  const formattedBodyFat = $derived(
    bodyFat && formatPercent(bodyFat.bodyFatPercent),
  );
  const leanMass = $derived(bodyFat?.leanMass);
  const fatMass = $derived(bodyFat?.fatMass);

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

<div class="flex flex-row gap-2">
  <button
    type="button"
    class="variant-filled-success btn"
    disabled={!date || !weight}
    onclick={submit}
  >
    {entryToEdit ? 'Save' : 'Submit'}
  </button>

  <button type="button" class="variant-filled-surface btn" onclick={cancel}>
    Cancel
  </button>

  {#if entryToEdit}
    <button
      type="button"
      class="variant-filled-error btn"
      onclick={deleteEntry}
    >
      Delete
    </button>
  {/if}
</div>
