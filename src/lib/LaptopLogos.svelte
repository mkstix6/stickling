<script lang="ts">
	import { developmentLogos } from '$lib/sitedata';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	const laptopLogosJSON = developmentLogos.sort(({ order: a }, { order: b }) => a - b);

	const tl = gsap.timeline();
	const logosSelector = '.laptop__logolink';

	let logos_element;
	let laptopWidth;
	let observeTarget;
	let wasObserverd = false;

	const prepLaptop = () => {
		tl.set(logosSelector, {
			x: 'random([-2000,2000])',
			y: 'random(-600,600)',
			z: 10000,
			scale: 1.05,
			opacity: 0.1,
		});
		return true;
	};

	const animateLaptop = (entries, observer) => {
		const element = entries[0];
		if (!element.isIntersecting) {
			// do nothing
		} else {
			// Only animate once.
			observer.unobserve(observeTarget);
			wasObserverd = true;

			const flyDuration = 0.7;
			tl.to(logosSelector, {
				x: 0,
				y: 0,
				z: function (index, target, targets) {
					return index / 100;
				},
				duration: flyDuration,
				stagger: { amount: 1.8 },
				opacity: 1,
			}).to(
				logosSelector,
				{
					scale: 1,
					duration: 0.1,
					stagger: { amount: 2 },
					opacity: 1,
				},
				flyDuration + 0.01,
			);
		}
	};

	onMount(async () => {
		observeTarget = logos_element;
		// Grab the prefers reduced media query.
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		// Check if the media query matches or is not available.
		if (!mediaQuery || mediaQuery.matches) {
			// No animation
		} else {
			if (
				(!'IntersectionObserver') in window &&
				(!'IntersectionObserverEntry') in window &&
				(!'intersectionRatio') in window.IntersectionObserverEntry.prototype
			) {
				// Polyfill if required
			} else {
				prepLaptop();
				const observer = await new IntersectionObserver(animateLaptop, {
					root: null,
					rootMargin: '0px',
					threshold: 0.2,
				});
				observer.observe(observeTarget);
			}
		}

		// TODO On destroy function (below)
		// return () => {};
	});
</script>

<div class="aspectRatioBox">
	<div class="laptop" bind:clientWidth={laptopWidth} class:laptop--observed={wasObserverd}>
		<div class="laptop__screenglow" />
		<div class="laptop__base" />
		<div class="laptop__lidperspective">
			<div class="laptop__lid">
				<div class="laptop__logos" bind:this={logos_element}>
					{#each laptopLogosJSON as { name, image, link, rotation, scale, aspectratio }, i}
						<a
							class="laptop__logolink"
							href={link}
							title={name}
							style="z-index: {i}; translateZ({i}); position: absolute; {Math.random() > 0.5
								? 'top'
								: 'bottom'}: {Math.floor(Math.random() * 5) * 10 + 2}%; {Math.random() > 0.5
								? 'left'
								: 'right'}: {Math.floor(Math.random() * 5) * 10 + 2}%;"
						>
							<img
								class="laptop__logoimg"
								width={Math.floor(scale * 100 * aspectratio)}
								height={Math.floor(scale * 100)}
								src="/logos/stickers/{image}"
								alt={name}
								style="--logo-width: {Math.floor(
									scale * (laptopWidth * 0.15) * aspectratio,
								)}px; --logo-height: {Math.floor(
									scale * (laptopWidth * 0.15),
								)}px; transform: rotate({Math.floor((Math.random() - 0.5) * 30)}deg);"
								loading="lazy"
								decoding="async"
							/>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'sass:math';

	.aspectRatioBox {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		position: relative;
	}

	.laptop {
		--laptopwidth: 100%;
		--logo-width: 10vw;
		--logo-height: 10vw;

		border-bottom-color: transparent;
		margin: 3rem auto 7vw;
		$macBook2020DimensionRatio: math.div(21.24, 30.41);
		width: 100%;
		inset: 0;
		aspect-ratio: 1 / #{$macBook2020DimensionRatio};
		position: absolute;

		&::before {
			content: '';
			width: auto;
			height: 7vw;
			position: absolute;
			bottom: -7vw;
			left: -10vw;
			right: -10vw;
			z-index: 3;
			background: radial-gradient(
				farthest-side at center top,
				var(--card-backgroundcolor),
				transparent
			);
		}

		&::after {
			content: '';
			width: auto;
			height: 1px;
			position: absolute;
			bottom: -1px;
			left: -10vw;
			right: -10vw;
			z-index: 1;
		}

		&__logos {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			align-items: center;
			justify-content: center;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(10vw, 1fr));
		}

		&__logoimg {
			object-fit: contain;
			filter: drop-shadow(0 1px #0002);
			width: 10vw; /* fallback */
			height: 10vw; /* fallback */
			width: var(--logo-width);
			height: var(--logo-height);
		}

		&__logolink {
			display: block;
			z-index: 5;

			&:focus,
			&:hover {
				.laptop__logoimg {
					filter: brightness(1.1);
				}
			}
		}

		&__base {
			background: #dfdfe4;
			background: linear-gradient(
				to top,
				darken(#dfdfe4, 30%),
				darken(#dfdfe4, 10%) 1.25vw,
				#dfdfe4 1.25vw,
				#dfdfe4
			);
			height: 3vw;
			position: absolute;
			bottom: 0;
			left: 0.5vw;
			right: 0.5vw;
			border-radius: 0.1vw 0.1vw 2vw 2vw;
			border-bottom-left-radius: 3.5vw 2vw;
			border-bottom-right-radius: 3.5vw 2vw;
			z-index: 0;
		}

		&__lidperspective {
			perspective: 1000px;
			transform-style: preserve-3d;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		&__lid {
			perspective: 1000px;
			transform-style: preserve-3d;
			border-radius: 4vw;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #dfdfe4;
			box-shadow: inset 0 3vw 10vw -5vw #0007;
			transform: rotateX(45deg) translateY(-3vw) translateZ(-3vw);
			transform-style: preserve-3d;
			transform-origin: center 95%;
			transition: transform 1s;
			z-index: 1;
		}
		&--observed &__lid {
			transform: rotateX(-10deg) translateY(0) translateZ(0);
		}

		@keyframes screenglowmovement {
			0% {
				transform: rotate(0deg) transformZ(0);
			}
			100% {
				transform: rotate(359deg) transformZ(0);
			}
		}

		&__screenglow {
			position: absolute;
			top: 1rem;
			left: 1rem;
			right: 1rem;
			bottom: 1rem;
			border-radius: 4vw 4vw 0 0;
			z-index: 0;
			opacity: 0;
			transition: opacity 2s;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				transition: opacity 1s;
				border-radius: 4vw 4vw 0 0;
			}
			&::before {
				box-shadow: 0 -5vw 30vw -8vw var(--pallette3);
				animation: screenglowmovement 3.3s infinite;
				z-index: 0;
			}
			&::after {
				box-shadow: 0 -5vw 30vw -8vw var(--pallette1);
				animation: screenglowmovement 4s infinite;
				z-index: 1;
			}
		}

		&--observed &__screenglow {
			opacity: 1;
			transition-delay: 1.5s;
		}
	}
</style>
