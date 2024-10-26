<script lang="ts">
  import type { IconImage } from '$lib/shared/types/icon-image.type';

  /**
   * The icon to display.
   */
  export let iconImage: IconImage;
</script>

<i class="far fa-{iconImage}"></i>
