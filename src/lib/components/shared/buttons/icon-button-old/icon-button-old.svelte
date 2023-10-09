<script lang="ts">
  import { ICON_SIZE } from '$lib/components/shared/icon/icon.constants';
  import Icon from '$lib/components/shared/icon/icon.svelte';
  import type { IconImage } from '$lib/components/shared/icon/icon.types';
  import Button from '../button/button.svelte';

  export let icon: IconImage;
  export let disabled = false;
</script>

<Button bind:disabled on:click>
  <span class="icon">
    <Icon icon={icon} />
  </span>
  <slot />
</Button>

<style>
  .icon {
    padding-right: 0.25rem;
  }
</style>
