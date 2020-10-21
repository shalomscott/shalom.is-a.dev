<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let navEl;
	let showNav = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				showNav = entries[entries.length - 1].isIntersecting;
			},
			{ threshold: 0.25 }
		);
		observer.observe(navEl);
	});
</script>

<style>
	nav {
		display: flex;
		height: 2em;
		align-items: center;
	}
</style>

<nav bind:this={navEl}>
	{#if showNav}
		{#each [['/', 'Home'], ['/about', 'About Me'], ['/notes', 'Notes']] as [url, text], index}
			<a
				href={url}
				in:fly={{ y: -30, delay: 60 * index, duration: 200 }}>{text}</a>
		{/each}
	{/if}
</nav>
