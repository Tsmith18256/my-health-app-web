<script lang="ts">
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import TextInput from '$lib/components/shared/text-input/text-input.svelte';

  let age: number | undefined;
  let heightInIn: number | undefined;
</script>

<div class="container">
  <h2 class="heading">Settings</h2>

  <div class="fields-container">
    <TextInput id="ageField" label="Age" bind:value={age} />
    <TextInput id="heightField" label="Height (in)" bind:value={heightInIn} />
  </div>

  <div class="button-container">
    <Button disabled={!age || !heightInIn}>
      Save Settings
    </Button>
  </div>
</div>

<style lang="scss">
  .button-container {
    margin-top: 1rem;
  }

  .container {
    padding: 2rem;
  }

  // TODO: create a shared component for this.
  .fields-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  // TODO: create a heading component.
  .heading {
    margin-bottom: 2rem;
  }
</style>
