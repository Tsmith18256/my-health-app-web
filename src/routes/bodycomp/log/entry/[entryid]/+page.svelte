<script lang="ts" module>
  import type { PageData } from './$types';

  export interface IBodyCompLogEntryPageProps {
    data: PageData;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import { goto } from '$app/navigation';
  import { formatDateLong } from '$lib/shared/utils/formatters/format-date.util';
  import {
    formatLength,
    LengthUnit,
  } from '$lib/shared/utils/formatters/format-length.util';
  import { formatWeight } from '$lib/shared/utils/formatters/format-weight.util';
  import { getBodyCompLogEntryEditRoute } from '$lib/shared/utils/get-route';

  let { data }: IBodyCompLogEntryPageProps = $props();

  const entry = $derived(data.entry);

  const deleteEntry = () => {
    console.log('TODO');
  };

  const editEntry = () => {
    // TODO: Fix type def on ID
    goto(getBodyCompLogEntryEditRoute(entry.id!));
  };
</script>

<h1 class="h1">{formatDateLong(dayjs(entry.date))}</h1>

<div class="flex flex-row gap-2">
  <button
    type="button"
    class="variant-filled-secondary btn"
    onclick={editEntry}
  >
    Edit Entry
  </button>

  <button type="button" class="variant-filled-error btn" onclick={deleteEntry}>
    Delete Entry
  </button>
</div>

<div class="h3 mt-12">{formatWeight(entry.weight)}</div>

{#if entry.waistCircumference || entry.neckCircumference}
  <section>
    <h2 class="h2">Circumferences</h2>

    {#if entry.waistCircumference}
      <div>
        <strong>Waist:</strong>
        {formatLength(entry.waistCircumference)}
      </div>
    {/if}

    {#if entry.neckCircumference}
      <div>
        <strong>Neck:</strong>
        {formatLength(entry.neckCircumference)}
      </div>
    {/if}
  </section>
{/if}

{#if entry.chestSkinfold || entry.abSkinfold || entry.thighSkinfold}
  <section>
    <h2 class="h2">Skinfold Sites</h2>

    {#if entry.chestSkinfold}
      <div>
        <strong>Chest:</strong>
        {formatLength(entry.chestSkinfold, { unit: LengthUnit.Millimetres })}
      </div>
    {/if}

    {#if entry.abSkinfold}
      <div>
        <strong>Ab:</strong>
        {formatLength(entry.abSkinfold, { unit: LengthUnit.Millimetres })}
      </div>
    {/if}

    {#if entry.thighSkinfold}
      <div>
        <strong>Thigh:</strong>
        {formatLength(entry.thighSkinfold, { unit: LengthUnit.Millimetres })}
      </div>
    {/if}
  </section>
{/if}
