<script lang="ts" module>
  import type { PageData } from './$types';

  export interface IBodyCompLogEntryEditPageProps {
    data: PageData;
  }
</script>

<script lang="ts">
  import BodyCompEditEntryForm from '$lib/body-comp/components/body-comp-edit-entry-form.svelte';

  let { data }: IBodyCompLogEntryEditPageProps = $props();
</script>

<BodyCompEditEntryForm entryToEdit={data.entry} />
