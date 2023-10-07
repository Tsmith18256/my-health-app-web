<script lang="ts">
  import { BUTTON_TYPE } from '$lib/components/shared/buttons/button/button.constants';
  import type { ButtonType } from '$lib/components/shared/buttons/button/button.types';
  import { TEST_IDS } from '$lib/constants/test-ids.constants';

  export let type: ButtonType = BUTTON_TYPE.primary;
  export let disabled = false;
</script>

<button
  class="button"
  class:type-primary={type === BUTTON_TYPE.primary}
  class:type-negative={type === BUTTON_TYPE.negative}
  {disabled}
  on:click|stopPropagation
  data-testid={TEST_IDS.button}
>
  <slot />
</button>

<style lang="scss">
  @use '$lib/styles/variables/colors';

  .button {
    padding: 1rem;

    background-color: colors.$secondary;
    border: none;
    border-radius: 0.25rem;

    font-weight: bold;

    &[disabled] {
      opacity: 0.5;
    }
  }

  .type-primary {
    background-color: colors.$secondary;
  }

  .type-negative {
    background-color: colors.$border;
  }
</style>
