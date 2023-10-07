<script lang="ts">
  import type { IconImage } from '$lib/components/shared/icon/icon.types';
  import { TEST_IDS } from '$lib/constants/test-ids.constants';
  import { ICON_SIZE } from '../../icon/icon.constants';
  import Icon from '../../icon/icon.svelte';

  export let icon: IconImage;
</script>

<button class="button" on:click|stopPropagation data-testid={TEST_IDS.floatingActionButton}>
  <Icon icon={icon} size={ICON_SIZE.extraLarge} />
</button>

<style lang="scss">
  @use '$lib/styles/variables/colors';

  .button {
    position: fixed;
    bottom: 6rem;
    right: 1rem;

    $size: 5rem;

    width: $size;
    height: $size;

    background-color: colors.$secondary;
    border: none;
    border-radius: 50%;
  }
</style>
