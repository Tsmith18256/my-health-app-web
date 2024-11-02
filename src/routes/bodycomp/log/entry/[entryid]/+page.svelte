<script lang="ts" module>
  import type { PageData } from './$types';

  export interface IBodyCompLogEntryPageProps {
    data: PageData;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import { formatDateLong } from '$lib/shared/utils/formatters/format-date.util';
  import { formatLength } from '$lib/shared/utils/formatters/format-length.util';
  import { formatWeight } from '$lib/shared/utils/formatters/format-weight.util';

  let { data }: IBodyCompLogEntryPageProps = $props();

  const entry = $derived(data.entry);
</script>

<h1 class="h1">{formatDateLong(dayjs(entry.date))}</h1>
<div class="h3 mt-12">{formatWeight(entry.weight)}</div>

{#if entry.waistCircumference || entry.neckCircumference}
  <h3 class="h4">Circumferences</h3>

  {#if entry.waistCircumference}
    <div>
      <strong>Waist</strong>
      {formatLength(entry.waistCircumference)}
    </div>
  {/if}

  {#if entry.neckCircumference}
    <div>
      <strong>Neck</strong>
      {formatLength(entry.neckCircumference)}
    </div>
  {/if}
{/if}

{#if entry.chestSkinfold || entry.abSkinfold || entry.thighSkinfold}
  <h3 class="h4">Skinfold Sites</h3>

  {#if entry.chestSkinfold}
    <div>
      <strong>Chest</strong>
      {formatLength(entry.chestSkinfold)}
    </div>
  {/if}

  {#if entry.abSkinfold}
    <div>
      <strong>Ab</strong>
      {formatLength(entry.abSkinfold)}
    </div>
  {/if}

  {#if entry.thighSkinfold}
    <div>
      <strong>Thigh</strong>
      {formatLength(entry.thighSkinfold)}
    </div>
  {/if}
{/if}
