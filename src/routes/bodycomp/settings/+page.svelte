<script lang="ts">
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import TextInput from '$lib/components/shared/text-input/text-input.svelte';
  import { settings, updateSettings } from '$lib/stores/shared/settings/settings.store';
  import { convertInsToMms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import { get } from 'svelte/store';

  let age = get(settings).age;
  let heightInIn = Math.round(convertMmsToIns(get(settings).heightInMm) * 10) / 10;

  $: areValuesSameAsSaved = age === $settings.age && Math.round(convertInsToMms(heightInIn)) === $settings.heightInMm;
  $: isButtonDisabled = !age || !heightInIn || areValuesSameAsSaved;

  const save = () => {
    if (age && heightInIn) {
      updateSettings({ age, heightInMm: Math.round(convertInsToMms(heightInIn)) });
    }
  };
</script>

<div class="container">
  <h2 class="heading">Settings</h2>

  <div class="fields-container">
    <TextInput id="ageField" label="Age" bind:value={age} />
    <TextInput id="heightField" label="Height (in)" bind:value={heightInIn} />
  </div>

  <div class="button-container">
    <Button disabled={isButtonDisabled} on:click={save}>
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
