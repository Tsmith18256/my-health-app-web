<script lang="ts">
  import { isMobileWidth } from '$lib/utils/shared/breakpoint/breakpoint.util';
  import { Button, FloatingActionButton, ICON_IMAGES } from '@tsmith18256/ty-ui';

  const icon = ICON_IMAGES.plus;

  let innerWidth: number;
  $: isMobile = isMobileWidth(innerWidth);
</script>

{#if isMobile}
  <FloatingActionButton {icon} on:click />
{:else}
  <Button label='New Entry' {icon} on:click />
{/if}

<svelte:window bind:innerWidth />
