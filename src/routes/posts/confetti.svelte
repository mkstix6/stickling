<script>
	import { onMount } from 'svelte';
	import SocialLink from '$lib/SocialLink.svelte';

	let mouseX;
	let mouseY;
	let numParticles = 50;
	let particles = [];

	onMount(() => {
		const dustProto = {
			x: 400,
			y: 200,
			angle: 0,
			opacity: 1,
			velocity: 5,
			// t: 100,
			gravity: 1,
			elem: undefined,
			destroy() {
				this.elem.remove();
			},
			reset() {
				this.opacity = 1;
				this.setPosition(mouseX, mouseY);
			},
			tick() {
				if (this.opacity < 0.02) {
					this.reset();
				}
				// this.t--;
				const minV = 1;
				this.velocity = this.velocity < minV ? minV : this.velocity - 0.1;
				this.angle = this.angle + (Math.random() * 2 - 1) * 0.1;
				this.x = this.x + this.velocity * Math.sin(this.angle);
				this.y = this.y + this.velocity * Math.sin(this.angle + Math.PI / 2) + this.gravity;
				this.opacity = Math.floor((this.opacity - 0.01) * 100) / 100;
				this.updateCSS();
				return true;
			},
			updateCSS() {
				this.elem.style.transform = `translateX(${Math.floor(this.x)}px) translateY(${Math.floor(
					this.y
				)}px)`;
				this.opacity = this.elem.style.opacity = this.opacity;
			},
			setPosition(x, y) {
				this.angle = Math.random() * 360;
				this.velocity = Math.random() * 3 + 3;
				this.tOG = this.t;
				this.x = x;
				this.y = y;
			},
			create() {
				this.elem = document.createElement('div');
				this.elem.classList.add('dustposition');
				let particle = document.createElement('div');
				particle.classList.add('dust');
				this.elem.append(particle);
				document.querySelector('.confettiSpace').append(this.elem);
			},
			start(x = 200, y = 200) {
				this.create();
				this.setPosition(x, y);
				this.tick();
			}
		};

		function confettiFactory() {
			let dst = Object.create(dustProto);
			dst.start(mouseX, mouseY);
			return dst;
		}

		let particlesLeftToCreate = numParticles;
		while (particlesLeftToCreate) {
			particlesLeftToCreate--;
			setTimeout(() => {
				particles.push(confettiFactory());
			}, Math.random() * 3000);
		}

		function dustTick() {
			particles.forEach((particle) => {
				particle.tick();
			});
			window.requestAnimationFrame(dustTick);
		}
		dustTick();
	});

	function handleMouseMove(event) {
		mouseX = event.offsetX;
		mouseY = event.offsetY;
		// console.log(event, mouseX, mouseY);
	}
</script>

<h1 class="angletext">Confetti effect experiment</h1>
<div class="confettiSpace card" on:mousemove={handleMouseMove} />

<SocialLink href="https://codepen.io/mkstix6/pen/arZWbE" service="codepen"
	>This experiment is also visible on CodePen.</SocialLink
>

<style lang="scss">
	// @keyframes spinny {
	// 	0% {
	// 		background: cyan;
	// 		transform: rotate3D(0, 1, 0.5, 3.142rad);
	// 	}

	// 	100% {
	// 		background: yellow;
	// 		transform: rotate3D(0, 1, 0.5, 3.142rad);
	// 	}
	// }

	// .dust {
	// 	background: #ff0;
	// 	display: block;
	// 	width: 10px;
	// 	height: 10px;
	// 	position: absolute;
	// 	animation: spinny 0.4s infinite;
	// 	border-radius: 100%;
	// }

	.confettiSpace {
		position: relative;
		width: 100%;
		min-height: 300px;
		height: 80vh;
		max-height: 600px;
		perspective: 1000px;
		display: block;
		padding: 0;
		margin: 1rem 0 3rem 0;
	}
</style>
