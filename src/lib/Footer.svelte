<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import SocialNav from '$lib/SocialNav.svelte';
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<footer class="siteFooter">
	<div>
		<div class="bigM">
			<div class="square-box">
				<a href="/" title="home page" class="bigM__button logolink" aria-label="Stickling.com">
					<svg height="224" viewBox="92 0 224 224" width="224" xmlns="http://www.w3.org/2000/svg">
						<linearGradient id="stampGrad" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0" stop-color="#1d48b4" />
							<stop offset="0.5" stop-color="#00b6ed" />
							<stop offset="1" stop-color="#56ffd5" />
						</linearGradient>
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

		<div>
			<span>get in touch…</span>
			<SocialNav selection="contact" />
		</div>

		<div>
			<Nav />
		</div>

		<div>
			<div>
				<small>
					built with <a href="https://kit.svelte.dev">SvelteKit</a>
					<LogoSticker logokey="svelte" />
				</small>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.siteFooter {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: space-between;

		// @media (prefers-color-scheme: light) {
		// 	background: linear-gradient(-186deg, #fff0, 45%, #ffff 60%);
		// }
		// @media (prefers-color-scheme: dark) {
		background: linear-gradient(-186deg, #06102300, 45%, #061023ff 60%);
		// }

		padding: 5rem 2rem 3rem;
		margin-top: auto !important;

		> div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1.5em;

			@media screen and (max-width: 900px) {
				flex-direction: column;

				> * {
					margin-bottom: 1.5em;
				}
			}
		}
	}

	a {
		text-decoration: none;
	}
	.logolink {
		cursor: pointer;

		&:focus,
		&:hover {
			background: var(--pallette-active);
		}
	}
	.bigM {
		width: 3em;
	}

	.bigM svg {
		display: block;
		width: 80%;
		height: 80%;
	}

	.bigM__button {
		background: white;
		border-radius: 100%;
		border: 1px solid black;
		aspect-ratio: 1 / 1;
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media print {
		footer {
			display: none;
		}
	}
</style>
