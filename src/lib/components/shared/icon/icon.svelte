<script lang="ts">
  import type { IconImage, IconSize } from '$lib/components/shared/icon/icon.constants';

  export let icon: IconImage;
  export let size: IconSize;
</script>

<i class="far {icon} {size}" />

<style lang="scss">
  .extra-small {
    font-size: 0.5rem;
  }

  .small {
    font-size: 0.75rem;
  }

  .medium {
    font-size: 1rem;
  }

  .large {
    font-size: 1.5rem;
  }

  .extra-large {
    font-size: 2rem;;
  }
</style>
