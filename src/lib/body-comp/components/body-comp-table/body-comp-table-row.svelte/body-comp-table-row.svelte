<script lang="ts">
  import type { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
  import { formatDateShort } from '$lib/shared/utils/formatters/date-formatter/date-formatter.util';
  import { formatPercent } from '$lib/shared/utils/formatters/number-formatter/number-formatter.util';

  export let entry: BodyCompEntry;
  const bodyFatPercent = entry.getBodyFatPercent();
</script>

<tr class="cursor-pointer" on:click>
  <td>{formatDateShort(entry.date)}</td>
  <td>{entry.getFormattedWeight()}</td>
  <td>
    {#if bodyFatPercent}
      {formatPercent(bodyFatPercent, {
        decimalPlaces: 2,
      })}
    {/if}
  </td>
  <td class="display-none hidden lg:table-cell">
    {#if entry.waistCircumference}{entry.getFormattedWaistCircumference()}{/if}
  </td>
  <td class="display-none hidden lg:table-cell">
    {entry.getFormattedNeckCircumference()}
  </td>
  <td class="display-none hidden xl:table-cell">
    {entry.getFormattedChestSkinfold()}
  </td>
  <td class="display-none hidden xl:table-cell">
    {entry.getFormattedAbSkinfold()}
  </td>
  <td class="display-none hidden xl:table-cell">
    {entry.getFormattedThighSkinfold()}
  </td>
</tr>
