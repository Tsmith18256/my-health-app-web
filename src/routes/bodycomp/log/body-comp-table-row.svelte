<script lang="ts">
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';
  import { formatDateShort } from '$lib/shared/utils/formatters/format-date.util';
  import { formatPercent } from '$lib/shared/utils/formatters/format-percent.util';
  import { formatWeight } from '$lib/shared/utils/formatters/format-weight.util';
  import dayjs from 'dayjs';
  import {
    formatLength,
    LengthUnit,
  } from '$lib/shared/utils/formatters/format-length.util';
  import { calculateAveragedBodyFat } from '$lib/body-comp/utils/body-fat-calculator/body-fat-calculator.util';
  import {
    USER_AGE,
    USER_HEIGHT,
  } from '$lib/shared/constants/user-config.constants';

  export let entry: IBodyCompEntryV2;

  $: bodyFatData = calculateAveragedBodyFat({
    abSkinfold: entry.abSkinfold,
    age: USER_AGE,
    chestSkinfold: entry.chestSkinfold,
    height: USER_HEIGHT,
    neckCircumference: entry.neckCircumference,
    thighSkinfold: entry.thighSkinfold,
    waistCircumference: entry.waistCircumference,
    weight: entry.weight,
  });
</script>

<tr class="cursor-pointer" on:click>
  <td>{formatDateShort(dayjs(entry.date))}</td>
  <td>{formatWeight(entry.weight)}</td>
  <td>
    {#if bodyFatData}
      {formatPercent(bodyFatData.bodyFatPercent, {
        decimalPlaces: 2,
      })}
    {/if}
  </td>
  <td class="display-none hidden lg:table-cell">
    {#if entry.waistCircumference}{formatLength(entry.waistCircumference)}{/if}
  </td>
  <td class="display-none hidden lg:table-cell">
    {#if entry.neckCircumference}{formatLength(entry.neckCircumference)}{/if}
  </td>
  <td class="display-none hidden xl:table-cell">
    {#if entry.chestSkinfold}{formatLength(entry.chestSkinfold, {
        unit: LengthUnit.Millimetres,
      })}{/if}
  </td>
  <td class="display-none hidden xl:table-cell">
    {#if entry.abSkinfold}{formatLength(entry.abSkinfold, {
        unit: LengthUnit.Millimetres,
      })}{/if}
  </td>
  <td class="display-none hidden xl:table-cell">
    {#if entry.thighSkinfold}{formatLength(entry.thighSkinfold, {
        unit: LengthUnit.Millimetres,
      })}{/if}
  </td>
</tr>
