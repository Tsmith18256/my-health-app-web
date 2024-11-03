<script lang="ts" module>
  import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';

  export interface IBodyCompEditEntryFormProps {
    /**
     * The body comp entry to edit. If this is provided, the form will open in Edit mode; otherwise, it will open in New
     * Entry mode.
     */
    entryToEdit?: IBodyCompEntry;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
  import {
    USER_AGE,
    USER_HEIGHT,
  } from '$lib/shared/constants/user-config.constants';
  import { formatDateIso } from '$lib/shared/utils/formatters/format-date.util';
  import { formatPercent } from '$lib/shared/utils/formatters/format-percent.util';
  import {
    convertGsToLbs,
    convertInsToMms,
    convertLbsToGs,
    convertMmsToIns,
  } from '$lib/shared/utils/unit-converter/unit-converter.util';
  import { roundToDecimalPlaces } from '$lib/shared/utils/round-to-decimal-places';
    import { formatWeight } from '$lib/shared/utils/formatters/format-weight.util';

  let { entryToEdit }: IBodyCompEditEntryFormProps = $props();

  const isEditMode = $derived(!!entryToEdit);

  let date = $state(formatDateIso(dayjs(entryToEdit?.date)));
  let weight = $state(
    entryToEdit?.weight &&
      roundToDecimalPlaces(convertGsToLbs(entryToEdit.weight), 1),
  );
  let waist = $state(
    entryToEdit?.waistCircumference &&
      roundToDecimalPlaces(convertMmsToIns(entryToEdit.waistCircumference), 1),
  );
  let neck = $state(entryToEdit?.neckCircumference &&
    roundToDecimalPlaces(convertMmsToIns(entryToEdit.neckCircumference), 1)
  );
  let chest = $state(entryToEdit?.chestSkinfold);
  let ab = $state(entryToEdit?.abSkinfold);
  let thigh = $state(entryToEdit?.thighSkinfold);

  const bodyFat = $derived(
    calculateAveragedBodyFat({
      abSkinfold: ab,
      age: USER_AGE,
      chestSkinfold: chest,
      height: USER_HEIGHT,
      neckCircumference: neck && convertInsToMms(neck),
      thighSkinfold: thigh,
      waistCircumference: waist && convertInsToMms(waist),
      weight: weight && convertLbsToGs(weight),
    }),
  );
  const formattedBodyFat = $derived(
    bodyFat && formatPercent(bodyFat.bodyFatPercent),
  );
  const leanMass = $derived(bodyFat && formatWeight(bodyFat.leanMass));
  const fatMass = $derived(bodyFat && formatWeight(bodyFat.fatMass));
</script>

<h2 class="h2">{isEditMode ? 'Edit' : 'New'} Body Comp Entry</h2>

<form method="POST">
  <section>
    <label class="label mt-4">
      <span>Date</span>
      <input class="input mt-2" name="date" type="date" bind:value={date} />
    </label>

    <label class="label mt-4">
      <span>Weight (lbs)</span>
      <input
        class="input mt-2"
        name="weight"
        step="0.1"
        type="number"
        bind:value={weight}
      />
    </label>
  </section>

  <section class="pt-6">
    <h3 class="h3">Circumferences</h3>

    <label class="label mt-4">
      <span>Waist (in)</span>
      <input
        class="input mt-2"
        name="waist"
        step="0.1"
        type="number"
        bind:value={waist}
      />
    </label>

    <label class="label mt-4">
      <span>Neck (in)</span>
      <input
        class="input mt-2"
        name="neck"
        step="0.1"
        type="number"
        bind:value={neck}
      />
    </label>
  </section>

  <section class="pt-6">
    <h3 class="h3">Skinfold Sites</h3>

    <label class="label mt-4">
      <span>Chest (mm)</span>
      <input class="input mt-2" name="chest" type="number" bind:value={chest} />
    </label>

    <label class="label mt-4">
      <span>Ab (mm)</span>
      <input class="input mt-2" name="ab" type="number" bind:value={ab} />
    </label>

    <label class="label mt-4">
      <span>Thigh (mm)</span>
      <input class="input mt-2" name="thigh" type="number" bind:value={thigh} />
    </label>
  </section>

  {#if formattedBodyFat}
    <div class="body-fat-container flex flex-col mt-8">
      <span
        ><strong class="body-fat-label">Body Fat:</strong>
        {formattedBodyFat}</span
      >
      <span
        ><strong class="body-fat-label">Lean Body Mass:</strong>
        {leanMass}</span
      >
      <span
        ><strong class="body-fat-label">Body Fat Mass:</strong> {fatMass}</span
      >
    </div>
  {/if}

  <div class="mt-8 flex flex-row gap-2">
    <button
      type="submit"
      class="variant-filled-success btn"
      disabled={!date || !weight}
    >
      {entryToEdit ? 'Save' : 'Create'}
    </button>
  </div>
</form>
