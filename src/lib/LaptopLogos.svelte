<script lang="ts">
	import { developmentLogos } from '$lib/sitedata.js';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const laptopLogosJSON = developmentLogos.sort(({ order: a }, { order: b }) => a - b);

	const tl = gsap.timeline();
	const logosSelector = '.laptop__logolink';
	let laptopWidth;
	let observeTarget;
	let laptopWasObserverd = false;

	// gsap.registerPlugin(ScrollTrigger);

	const prepLaptop = () => {
		// console.log('prep timeline', tl);
		// console.log('prepping laptop');

		// FIXME consider whether this is worth it; items hidden without JS seems bad.
		// Unhide the logos hidden by CSS to avoid flash at page load.
		const logosContainer = document.querySelector('.laptop__logos') as HTMLElement;
		logosContainer.style.opacity = '1';

		// tl.set(logosSelector, {
		// 	x: 'random([-2000,2000])', // ARRAY: randomly select a value from array
		// 	y: 'random(-300,300)', // ARGUMENTS: randomly select a value within the range
		// 	scale: 1.1,
		// 	opacity: 1
		// });
		tl.set(logosSelector, {
			x: 'random([-2000,2000])',
			y: 'random(-600,600)',
			z: 10000,
			scale: 1.05
		});
	};

	const animateLaptop = (entries, observer) => {
		// console.log('animate: timeline', { tl, gsap, observer, logosSelector });
		const element = entries[0];
		// console.log('animate: element', element);
		// console.log('animate: element.isIntersecting', element.isIntersecting);
		if (!element.isIntersecting) {
			// do nothing
		} else {
			// Only animate once.
			observer.unobserve(observeTarget);

			// console.log('animating laptop');
			/**
			 * Animate the Laptop with development logos on it
			 */
			// tl.to(logosSelector, {
			// 	// scrollTrigger: {
			// 	// 	trigger: '.laptop',
			// 	// 	start: 'center center'
			// 	// },
			// 	defaults: { stagger: { amount: 2 } },
			// 	keyframes: [
			// 		{
			// 			x: 0,
			// 			y: 0,
			// 			duration: 'random(0.4, 0.8)',
			// 			ease: 'power4.out(0.3,0.3)',
			// 			scale: 1.2 // ⚠️ use 1.2 if we want the scale down keyframe
			// 		},
			// 		{
			// 			scale: 1,
			// 			duration: 'random(0.1, 0.3)',
			// 			delay: -2.5
			// 		}
			// 	]
			// });
			// Position the items off screen randomly.

			// document.querySelector('.laptop').classList.add('laptop--observed');
			laptopWasObserverd = true;

			// gsap.set(logosSelector, {
			// 	x: 'random([-2000,2000])',
			// 	y: 'random(-600,600)',
			// 	z: 2000,
			// 	scale: 1.05
			// });

			const flyDuration = 0.7;
			tl.to(logosSelector, {
				x: 0,
				y: 0,
				z: function (index, target, targets) {
					//function-based value
					return index / 100;
				},
				duration: flyDuration,
				stagger: { amount: 1.8 }
			}).to(
				logosSelector,
				{
					scale: 1,
					duration: 0.1,
					stagger: { amount: 2 }
				},
				flyDuration + 0.01
			);
		}
	};

	onMount(() => {
		observeTarget = document.querySelector('.laptop__logos');

		// Grab the prefers reduced media query.
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		// Check if the media query matches or is not available.
		if (!mediaQuery || mediaQuery.matches) {
			// No animation
		} else {
			prepLaptop();
			const observer = new IntersectionObserver(animateLaptop, {
				root: null,
				rootMargin: '0px',
				threshold: 0.2
			});
			observer.observe(observeTarget);
		}

		// TODO return unobserve code here so observer is removed when component is destroyed (e.g. between page navigations)
	});
</script>

<div class="laptop" bind:clientWidth={laptopWidth} class:laptop--observed={laptopWasObserverd}>
	<div class="laptop__screenglow" />
	<div class="laptop__base" />
	<div class="laptop__lidperspective">
		<div class="laptop__lid">
			<div class="laptop__logos">
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
								scale * (laptopWidth * 0.15) * aspectratio
							)}px; --logo-height: {Math.floor(
								scale * (laptopWidth * 0.15)
							)}px; transform: rotate({Math.floor((Math.random() - 0.5) * 30)}deg);"
							loading="lazy"
							decoding="async"
						/>
						<!-- style="display: block;transform: rotate({rotation}deg) scale({scale * 1.5});" -->
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "sass:math";

	.laptop {
		--laptopwidth: 80vw;
		--logo-width: 10vw;
		--logo-height: 10vw;

		@media screen and (min-width: 1000px) {
			--laptopwidth: 50vw;
			--logo-width: 8vw;
			--logo-height: 8vw;
		}
		// border: 1px solid var(--pallette3);
		border-bottom-color: transparent;
		margin: 3rem auto 7vw;
		$macBook2020DimensionRatio: math.div(21.24, 30.41);
		// $macBook2013DimensionRatio: 21.9/31.4;
		width: var(--laptopwidth);
		height: calc(var(--laptopwidth) * #{$macBook2020DimensionRatio});

		position: relative;

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
			// background: linear-gradient(to right, transparent, var(--pallette3), transparent);
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
			// opacity: 0;
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
			will-change: transform;
			// position: absolute;

			&:focus,
			&:hover {
				.laptop__logoimg {
					filter: brightness(1.1);
					// drop-shadow(0 4px 5px #0004)
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
			// width: 100%;
			height: 3vw;
			position: absolute;
			bottom: 0;
			left: 0.5vw;
			right: 0.5vw;
			border-radius: 0.1vw 0.1vw 2vw 2vw;
			border-bottom-left-radius: 3.5vw 2vw;
			border-bottom-right-radius: 3.5vw 2vw;
			z-index: 0;
			// transform: translateZ(-100px);
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
			// border-radius: 4vw 4vw 0 0;
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
			will-change: transform;
		}
		&--observed &__lid {
			transform: rotateX(-10deg) translateY(0) translateZ(0);
		}

		// @keyframes screenglowmovement {
		// 	0% {
		// 		opacity: 0.2;
		// 	}
		// 	25% {
		// 		opacity: 1;
		// 	}
		// 	50% {
		// 		opacity: 0.5;
		// 	}
		// 	75% {
		// 		opacity: 0.8;
		// 	}
		// 	100% {
		// 		opacity: 0.2;
		// 	}
		// }
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
			// box-shadow: 0 -5vw 15vw -8vw var(--pallette3);
			border-radius: 4vw 4vw 0 0;
			z-index: 0;
			// animation: screenglowmovement 3s infinite;
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
				// animation: screenglowmovement 3s infinite;
				border-radius: 4vw 4vw 0 0;
				// will-change: transform;
			}
			&::before {
				box-shadow: 0 -5vw 30vw -8vw var(--pallette3);
				animation: screenglowmovement 3.3s infinite;
				z-index: 0;
				// animation-duration: 4.2s;
			}
			&::after {
				box-shadow: 0 -5vw 30vw -8vw var(--pallette1);
				animation: screenglowmovement 4s infinite;
				z-index: 1;
				// animation-duration: 5.2s;
			}
		}

		&--observed &__screenglow {
			opacity: 1;
			transition-delay: 1.5s;
		}
	}
</style>
