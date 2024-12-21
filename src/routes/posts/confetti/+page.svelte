<script>
	import { onMount } from 'svelte';
	import SocialLink from '$lib/SocialLink.svelte';

	let mouseX;
	let mouseY;
	let numParticles = 150;
	let particles = [];

	let particleStyles = ['confetti', 'snow', 'snowcannon'];
	let particlesChoice = particleStyles[0];

	onMount(() => {
		const dustProto = {
			x: 400,
			y: 200,
			angle: 0,
			opacity: 1,
			velocity: 5,
			// t: 100,
			gravity: 1,
			rotate: 0,
			elem: undefined,
			destroy() {
				this.elem.remove();
			},
			reset() {
				this.opacity = 1;
				this.gravity = 1;
				switch (particlesChoice) {
					case 'confetti': {
						this.rotate = Math.random() * 360;
						this.setPosition(mouseX, mouseY);
						break;
					}
					case 'snow': {
						this.gravity = 0.4;
						let a = Math.random() * Math.PI * 2;
						let l = Math.random() * 200;
						let dx = l * Math.sin(a);
						let dy = (l / 2) * Math.cos(a) + 30;
						let cx = !!mouseX ? mouseX + dx : 200 + dx;
						let cy = !!mouseY ? mouseY + dy : 200 + dy;
						this.setPosition(cx, cy);
						break;
					}
					default: {
						this.setPosition(mouseX, mouseY);
						break;
					}
				}
			},
			tick(options = {}) {
				if (this.opacity < 0.02) {
					this.reset();
				}
				let minV = 1;

				// this.t--;
				switch (particlesChoice) {
					case 'snowcannon': {
						minV = 1;
						this.velocity =
							this.opacity === 1
								? (this.velocity = 12)
								: this.velocity < minV
								? minV
								: this.velocity - Math.random() * minV * 0.3;
						this.angle =
							this.angle < Math.PI / 2 || this.angle > Math.PI
								? (Math.PI * 3) / 4 + Math.random() * 0.2
								: this.angle - 0.001;
						this.opacity = ((this.opacity - 0.01) * 100) / 100;
						break;
					}
					case 'snow': {
						minV = 0.25;
						this.velocity =
							this.opacity === 1
								? 1
								: this.velocity < minV
								? minV
								: this.velocity - Math.random() * 0.01;
						// this.angle =
						// 	this.angle < -Math.PI / 2 || this.angle > Math.PI / 2
						// 		? -Math.PI / 2 + Math.random() * Math.PI
						// 		: this.angle - 0.001;
						this.angle =
							this.opacity === 1
								? Math.random() * Math.PI * 1 - Math.PI * 0.5
								: this.angle + Math.random() * 0.2 - 0.1;

						this.opacity = this.opacity - Math.random() * 0.02;
						break;
					}
					case 'confetti': {
						this.angle = this.angle + (Math.random() * 2 - 1) * 0.1;
						this.velocity = this.velocity < minV ? minV : this.velocity - 0.1;
						this.opacity = Math.floor((this.opacity - 0.01) * 100) / 100;
						break;
					}
					default: {
						break;
					}
				}

				// Calculate new position
				this.x = this.x + this.velocity * Math.sin(this.angle);
				this.y = this.y + this.velocity * Math.sin(this.angle + Math.PI / 2) + this.gravity;

				this.updateCSS();
				return true;
			},
			updateCSS() {
				this.elem.style.transform = `translateX(${Math.floor(this.x)}px) translateY(${Math.floor(
					this.y
				)}px) rotate(${this.rotate}deg)`;
				this.opacity = this.elem.style.opacity = this.opacity;
			},
			setPosition(x, y) {
				this.angle = Math.random() * 360;
				this.velocity = Math.random() * 3 + 3;
				this.tOG = this.t;
				this.x = !!x ? x : 200;
				this.y = !!y ? y : 200;
			},
			create() {
				if (document.querySelector('.confettiSpace')) {
					this.elem = document.createElement('div');
					this.elem.classList.add('dustposition');
					let particle = document.createElement('div');
					particle.classList.add('dust');
					this.elem.append(particle);
					document.querySelector('.confettiSpace').append(this.elem);
				}
			},
			start() {
				this.create();
				this.reset();
				this.tick();
			},
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

<form id="particlesOptions" action="">
	<fieldset>
		<legend>Choose your particles…</legend>

		{#each particleStyles as style}
			<div>
				<input
					bind:group={particlesChoice}
					id="choice-{style}"
					type="radio"
					name="choice"
					value={style}
				/>
				<label for="choice-{style}">{style}</label>
			</div>
		{/each}
	</fieldset>
</form>

<div
	class="confettiSpace card"
	data-particleschoice={particlesChoice}
	on:mousemove={handleMouseMove}
	role="application"
></div>

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
	label {
		text-transform: capitalize;
	}

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
		background-color: #061023;
	}
</style>
