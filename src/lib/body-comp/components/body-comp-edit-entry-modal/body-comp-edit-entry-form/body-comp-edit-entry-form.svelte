<script lang="ts">
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

  let date = formatDateIso(entryToEdit?.date ?? dayjs());
  let weight = entryToEdit?.weight;
  let waist = entryToEdit?.waistCircumference;
  let neck = entryToEdit?.neckCircumference;
  let chest = entryToEdit?.chestSkinfold;
  let ab = entryToEdit?.abSkinfold;
  let thigh = entryToEdit?.thighSkinfold;

  // TODO: Now that the body fat percentage is coming off the class, this doesn't work because it doesn't update as the
  // form is being edited.
  let bodyFat = entryToEdit?.getBodyFatPercent();
  let formattedBodyFat = bodyFat && formatPercent(bodyFat);
  let leanMass = entryToEdit?.getLeanMass();
  let fatMass = entryToEdit?.getFatMass();

  const dispatch = createEventDispatcher<{
    submit: BodyCompEntry;
    cancel: void;
    delete: void;
  }>();

  const submit = () => {
    if (date && weight) {
      dispatch(
        'submit',
        new BodyCompEntry({
          id: entryToEdit?.id,
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
<div
  class="flex flex-row gap-2">
  <button type="button" class="btn variant-filled-success" disabled={!date || !weight} on:click={submit}>
    {entryToEdit ? 'Save' : 'Submit'}
  </button>

  <button type="button" class="btn variant-filled-surface" on:click={cancel}>
    Cancel
  </button>

  {#if entryToEdit}
    <button type="button" class="btn variant-filled-error" on:click={deleteEntry}>
      Delete
    </button>
  {/if}
</div>
