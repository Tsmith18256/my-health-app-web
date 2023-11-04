<script lang="ts">
  import {
    Button,
    HEADING_LEVELS,
    Heading,
    ToggleButtons,
    type IToggleButton,
    TextInput,
    TEXT_INPUT_TYPES,
  } from '@tsmith18256/ty-ui';
  import { MEASUREMENT_SYSTEMS } from '$lib/constants/measurement-systems.constants';
  import { settings, updateSettings } from '$lib/stores/shared/settings/settings.store';
  import { convertInsToMms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import dayjs from 'dayjs';
  import { get } from 'svelte/store';

  let birthday = get(settings).birthday.format('YYYY-MM-DD');

  let heightInIn = Math.round(convertMmsToIns(get(settings).heightInMm) * 10) / 10;
  let { bodyweightSystem, heightSystem, circumferenceSystem } = get(settings);

  $: areValuesSameAsSaved =
    birthday === $settings.birthday.format('YYYY-MM-DD') &&
    Math.round(convertInsToMms(heightInIn)) === $settings.heightInMm &&
    bodyweightSystem === $settings.bodyweightSystem &&
    heightSystem === $settings.heightSystem &&
    circumferenceSystem === $settings.circumferenceSystem;

  $: isButtonDisabled = !birthday || !heightInIn || areValuesSameAsSaved;

  const save = () => {
    if (birthday && heightInIn) {
      updateSettings({
        birthday: dayjs(birthday),
        heightInMm: Math.round(convertInsToMms(heightInIn)),
        bodyweightSystem,
        heightSystem,
        circumferenceSystem,
      });
    }
  };

  const measurementSystemToggles: IToggleButton[] = [
    {
      label: 'Imperial',
      value: MEASUREMENT_SYSTEMS.imperial,
    },
    {
      label: 'Metric',
      value: MEASUREMENT_SYSTEMS.metric,
    },
  ];
</script>

<div class="container">
  <Heading level={HEADING_LEVELS.h2}>Settings</Heading>

  <div class="fields-container">
    <TextInput id="birthdayField" type={TEXT_INPUT_TYPES.date} label="Birthday" bind:value={birthday} />
    <TextInput id="heightField" type={TEXT_INPUT_TYPES.number} label="Height (in)" step={0.1} bind:value={heightInIn} />
  </div>

  <Heading level={HEADING_LEVELS.h3}>Measurement systems</Heading>

  <div class="fields-container">
    <Heading level={HEADING_LEVELS.h4}>Bodyweight</Heading>
    <ToggleButtons
      groupName="bodyweightToggles"
      toggleButtons={measurementSystemToggles}
      bind:value={bodyweightSystem}
    />

    <Heading level={HEADING_LEVELS.h4}>Height</Heading>
    <ToggleButtons groupName="heightToggles" toggleButtons={measurementSystemToggles} bind:value={heightSystem} />

    <Heading level={HEADING_LEVELS.h4}>Circumferences</Heading>
    <ToggleButtons
      groupName="circumferenceToggles"
      toggleButtons={measurementSystemToggles}
      bind:value={circumferenceSystem}
    />
  </div>

  <div class="button-container">
    <Button label="Save Settings" disabled={isButtonDisabled} on:click={save} />
  </div>
</div>

<style>
  .button-container {
    margin-top: 1rem;
  }

  .container {
    max-width: 30rem;
  }

  /* TODO: create a shared component for this. */
  .fields-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
