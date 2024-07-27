<script lang="ts">
  import { Icon, type IconImage, type IconSize } from '@tsmith18256/ty-ui';
  import { createEventDispatcher } from 'svelte';

  export let icon: IconImage;
  export let size: IconSize | undefined = undefined;
  export let title: string | undefined = undefined;
  export let tabindex: number;

  const dispatch = createEventDispatcher<{ click: void }>();

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch('click');
    }
  };
</script>

<span
  class="button"
  {title}
  on:click
  on:keyup={onKeyUp}
  role="button"
  {tabindex}
>
  <Icon {icon} {size} />
</span>

<style lang="scss">
  .button {
    padding: 0.75rem;
  }
</style>
