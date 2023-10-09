<script lang="ts">
  import type { IconImage, IconSize } from '$lib/components/shared/icon/icon.types';
  import { createEventDispatcher } from 'svelte';
  import Icon from '../../icon/icon.svelte';

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

<span {title} on:click on:keyup={onKeyUp} role="button" {tabindex}>
  <Icon {icon} {size} />
</span>
