<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import SocialNav from '$lib/SocialNav.svelte';
	// import ThemeSwitch from '$lib/ThemeSwitch.svelte';
</script>

<a class="skip-to-content-link" href="#main">Skip to main</a>

<header class="siteHeader">
	<div class="bigM">
		<div class="square-box pos-rel">
			<a href="/" title="home page" class="bigM__button logolink">
				<svg viewBox="70 -20 260 260" height="200" width="200" xmlns="http://www.w3.org/2000/svg">
					<linearGradient id="stampGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0" stop-color="#1d48b4" />
						<stop offset="0.5" stop-color="#00b6ed" />
						<stop offset="1" stop-color="#56ffd5" />
					</linearGradient>
					<path
						id="bigMStroke"
						d="m92.675712 212.753678 74.496027-210.09070058 35.503973 108.49999958 110-108.49999958-53.549459 216.99999958-31.818736-32.286241-41.456622 25.376942-31.523393-30.227054z"
						stroke="white"
						stroke-width="35"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<g fill="url(#stampGrad)" fill-rule="evenodd">
						<path
							id="bigM"
							d="m92.675712 212.753678 74.496027-210.09070058 35.503973 108.49999958 110-108.49999958-53.549459 216.99999958-31.818736-32.286241-41.456622 25.376942-31.523393-30.227054z"
						/>
					</g>
				</svg>
			</a>
		</div>
	</div>

	<div class="navcontainer">
		<Nav />
		<div class="no-mobile">
			<SocialNav />
		</div>
		<!-- <ThemeSwitch /> -->
	</div>
</header>

<style lang="scss">
	.bigM {
		width: 10vw;
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 10;
		filter: drop-shadow(0 1px #0002);
	}

	.bigM svg {
		display: block;
		width: 80%;
		height: 80%;
	}

	.bigM__button {
		// background: white;
		border-radius: 100%;
		aspect-ratio: 1 / 1;
		width: 100%;
		height: 100%;
		// position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 1px #0002);
		// background: var(--pallettemax);
	}

	.navcontainer {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		padding-left: 15vw;
	}
	.siteHeader {
		background: var(--headerBGcolor);
		padding: 0.5rem;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			width: 0;
			height: 0;
			border: 0px solid transparent;
			border-color: var(--headerBGcolor) transparent transparent transparent;
			border-top-width: 10.5vw;
			border-bottom-width: 0;
			border-left-width: 0;
			border-right-width: 100vw;
			z-index: 0;
		}
	}

	.logolink {
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		&:focus,
		&:hover {
			background: var(--pallette-active);
		}
	}

	.no-mobile {
		@media screen and (max-width: 500px) {
			display: none !important;
		}
	}
</style>
