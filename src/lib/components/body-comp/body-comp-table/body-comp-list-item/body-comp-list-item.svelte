<script lang="ts">
  import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
  import { formatBodyCompEntry } from '$lib/utils/body-comp/format-body-comp-entry/format-body-comp-entry.util';
  import { isMobileWidth } from '$lib/utils/shared/breakpoint/breakpoint.util';

  export let entry: IBodyCompEntry;

  $: formatted = formatBodyCompEntry(entry);

  let innerWidth: number;
  $: isMobile = isMobileWidth(innerWidth);
</script>

<!-- TODO: Fix these without linter ignores -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="item-container" on:click role='listitem'>
  <span class="date-label">{formatted.date}</span>

  <span class="weight-label">{formatted.weight} lbs</span>

  <span class="body-fat-label">
    {#if formatted.bodyFat}
      {formatted.bodyFat}
      {#if isMobile}BF{/if}
    {/if}
  </span>

  <span class="small-desktop-label">
    {#if formatted.waistCirc}{formatted.waistCirc}"{/if}
  </span>

  <span class="small-desktop-label">
    {#if formatted.neckCirc}{formatted.neckCirc}"{/if}
  </span>

  <span class="large-desktop-label">
    {#if formatted.chestSkinfold}{formatted.chestSkinfold} mm{/if}
  </span>

  <span class="large-desktop-label">
    {#if formatted.abSkinfold}{formatted.abSkinfold} mm{/if}
  </span>

  <span class="large-desktop-label">
    {#if formatted.thighSkinfold}{formatted.thighSkinfold} mm{/if}
  </span>
</div>

<svelte:window bind:innerWidth />

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';
  @use '$lib/styles/variables/colors';

  .item-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    align-items: center;

    height: 4.5rem;
    padding: 0.9rem 1rem;

    border-bottom: 1px solid colors.$border;

    cursor: pointer;

    &:hover {
      background-color: #00000022;
    }

    @media (min-width: breakpoints.$tablet) {
      grid-template-columns: 1fr 1fr 1fr;

      height: 3rem;
    }

    @media (min-width: breakpoints.$desktop-small) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    @media (min-width: breakpoints.$desktop-large) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }

  .date-label {
    grid-row-start: 1;
    grid-row-end: span 2;
    font-size: 1.5rem;

    @media (min-width: breakpoints.$tablet) {
      font-weight: normal;
      font-size: 1rem;
    }
  }

  .weight-label {
    grid-row-start: 1;
    grid-row-end: span 1;
    justify-self: end;

    font-weight: bold;
    font-size: 1.3rem;

    @media (min-width: breakpoints.$tablet) {
      grid-row-start: initial;
      grid-row-end: initial;
      justify-self: initial;

      font-size: 1rem;
    }
  }

  .body-fat-label {
    grid-row-start: 2;
    grid-row-end: span 1;
    justify-self: end;

    font-size: 0.9rem;

    @media (min-width: breakpoints.$tablet) {
      grid-row-start: initial;
      grid-row-end: initial;
      justify-self: initial;

      font-size: 1rem;
    }
  }

  .small-desktop-label {
    display: none;

    @media (min-width: breakpoints.$desktop-small) {
      display: initial;
    }
  }

  .large-desktop-label {
    display: none;

    @media (min-width: breakpoints.$desktop-large) {
      display: initial;
    }
  }
</style>
