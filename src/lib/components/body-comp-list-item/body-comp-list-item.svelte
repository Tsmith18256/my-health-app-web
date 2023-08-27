<script lang="ts">
	export let date: string;
	export let weight: string;
	export let bodyFat: string | undefined;
</script>

<div class="item-container">
	<strong>{date}</strong>

	<div class="right-side-container">
		<span>{weight} lbs</span>
		{#if bodyFat}
			<span>13.9% BF</span>
		{/if}
	</div>
</div>

<style>
	.item-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 5rem;
		padding: 0 1rem;

		border-bottom: 1px solid #ddd;
	}

	.right-side-container {
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: space-between;
    gap: 0.25rem;
	}
</style>
