<script lang="ts">
  import { page } from '$app/stores';
  import { HEADING_LEVELS, Heading } from '@tsmith18256/ty-ui';
</script>

<Heading level={HEADING_LEVELS.h1}
  >{$page.status}: {$page.error?.message}</Heading
>
