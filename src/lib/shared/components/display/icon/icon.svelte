<script lang="ts" module>
  import type { IconImage } from '$lib/shared/types/icon-image.type';

  export interface IIconProps {
    /**
     * The icon to display.
     */
    iconImage: IconImage;
  }
</script>

<script lang="ts">
  let { iconImage }: IIconProps = $props();
</script>

<i class="far fa-{iconImage}"></i>
