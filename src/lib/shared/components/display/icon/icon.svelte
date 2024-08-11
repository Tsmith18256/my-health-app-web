<script context="module" lang="ts">
  /**
   * Enum containing all of the accepted icons that can be displayed in the app.
   */
  export const IconImage = {
    BodyComp: 'heartbeat',
    Exercise: 'running',
    HamburgerMenu: 'bars',
    Log: 'clipboard-list',
    LineChart: 'chart-line',
    Nutrition: 'apple-alt',
    Plus: 'plus',
    Settings: 'cog',
  } as const;

  export type IconImage = ObjectValues<typeof IconImage>;
</script>

<script lang="ts">
  import type { ObjectValues } from '$lib/shared/types/object-values';

  /**
   * The icon to display.
   */
  export let iconImage: IconImage;
</script>

<i class="far fa-{iconImage}" />
