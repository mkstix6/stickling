<script>
	import SocialIcon from '$lib/SocialIcon.svelte';

	export let href;
	export let service;
</script>

<div>
	<a {href}>
		<span class="icon">
			<SocialIcon {service} />
		</span>
		<span class="slotContent">
			<slot />
		</span>
	</a>
</div>

<style lang="scss">
	a {
		display: inline-block;
		display: inline-flex;
		align-items: center;
		background-color: var(--card-backgroundcolor);
		@media (prefers-color-scheme: dark) {
			background-image: radial-gradient(circle at left center, #ffff, 3em, #fff0 3em, #fff0);
		}
		@media (prefers-color-scheme: light) {
			background-image: radial-gradient(
				circle at left center,
				var(--pallette2),
				3em,
				#fff0 3em,
				#fff0
			);
		}
		border-radius: 0.75em;
		text-decoration: none;
		padding: 0.75em 1em;

		&:hover {
			background-image: radial-gradient(
				circle at left center,
				var(--pallette-active),
				3em,
				#fff0 3em,
				#fff0
			);
		}
	}
	.icon {
		font-size: 1.25em;
		color: var(--card-backgroundcolor);
		display: flex;
		align-items: center;
		position: relative;
		left: -0.05em;
	}
	.slotContent {
		margin-left: 1.75em;
	}

	a:hover .icon {
		// color: inherit;
	}
</style>
