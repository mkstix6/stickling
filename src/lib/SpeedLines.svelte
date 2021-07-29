<script>
	customElements.define(
		'speed-lines',
		class extends HTMLElement {
			constructor() {
				super();
				let profile = document.getElementById('zprofiletemplate');
				let myprofile = profile.content;
				const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(
					myprofile.cloneNode(true)
				);
			}
		}
	);

	// Set up canvas
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	ctx.canvas.width = document.documentElement.clientWidth;
	ctx.canvas.height = document.documentElement.clientHeight;
	// Default styles
	const zipRGB = [255, 255, 255];
	//
	let zipAngleRadians = 1;
	const faderEffecIntensity = 0.9;
	const canvasWidth = ctx.canvas.width;
	const canvasHeight = ctx.canvas.height;
	const numberOfZips = Math.ceil((canvasWidth * canvasHeight) / 20000);
	const minSize = 10;
	const maxSize = 100;
	const minSpeed = 50;
	const maxSpeed = 100;
	const emogiAlignment = Math.PI * -0.75;

	// Use mouse position to change direction
	window.addEventListener('mousemove', function (event) {
		let opposite = event.clientX - canvasWidth / 2;
		let adjacent = event.clientY - canvasHeight / 2;
		zipAngleRadians = Math.atan2(opposite, adjacent);
		// --characterRotation
		document
			.querySelector('.character')
			.style.setProperty('--characterRotation', zipAngleRadians + emogiAlignment);
	});

	class SpeedLinesCanvas {
		xOffset = Math.random() * canvasWidth;
		x = Math.random() * canvasWidth;
		y = Math.random() * canvasHeight;
		constructor(ctx) {
			this.ctx = ctx;
			this.size = Math.random() * (maxSize - minSize) + minSize;
			this.speed = -(((this.size * (this.size / 10)) / maxSize) * (maxSpeed - minSpeed) + minSpeed);
			this.angleRad = Math.PI / 4; //Math.PI/1.1;
			this.length = this.size * 30;
			this.tickX = Math.sin(this.angleRad) * this.speed; //this.speed;
			this.tickY = Math.cos(this.angleRad) * this.speed; //0;
			let alpha = (maxSize - this.size) / maxSize;
			let [r, g, b] = zipRGB;
			this.color = `rgba(${r},${g},${b},${alpha})`;
		}
		nextTick() {
			// this.setPosition(-(iteration + this.xOffset) % canvasWidth, this.y)
			this.tickX = Math.sin(this.angleRad) * this.speed;
			this.tickY = Math.cos(this.angleRad) * this.speed;
			this.x += this.tickX;
			this.y += this.tickY;
			if (this.x > canvasWidth + this.length) {
				this.x = 0;
				this.y = Math.random() * canvasHeight * 2 - canvasHeight;
			}
			if (this.x < 0 - this.length) {
				this.x = canvasWidth;
				this.y = Math.random() * canvasHeight * 2 - canvasHeight;
			}
			if (this.y > canvasHeight + this.length) {
				this.y = 0;
				this.x = Math.random() * canvasWidth * 2 - canvasWidth;
			}
			if (this.y < 0 - this.length) {
				this.y = canvasHeight;
				this.x = Math.random() * canvasWidth * 2 - canvasWidth;
			}
		}
		draw(iteration) {
			this.nextTick();
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.moveTo(this.x, this.y);
			let endX = this.x + Math.sin(this.angleRad) * this.length;
			let endY = this.y + Math.cos(this.angleRad) * this.length;
			let bezierXa = this.x + Math.sin(this.angleRad + Math.PI / 8) * this.size;
			let bezierYa = this.y + Math.cos(this.angleRad + Math.PI / 8) * this.size;
			let bezierXb = this.x + Math.sin(this.angleRad - Math.PI / 8) * this.size;
			let bezierYb = this.y + Math.cos(this.angleRad - Math.PI / 8) * this.size;
			this.ctx.quadraticCurveTo(bezierXa, bezierYa, endX, endY);
			this.ctx.quadraticCurveTo(
				bezierXb,
				bezierYb,
				this.x, // back to start
				this.y // back to start
			);
			this.ctx.closePath();
			this.ctx.strokeStyle = this.color;
			this.ctx.fillStyle = this.color;
			this.ctx.stroke();
			this.ctx.fill();
		}
		position() {
			return { x: this.x, y: this.y };
		}
		setPosition(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	let zippers = Array.from(Array(numberOfZips), (x) => {
		return new SpeedLinesCanvas(ctx);
	});

	function render(timestamp) {
		// Blur effect.
		ctx.globalAlpha = faderEffecIntensity;
		ctx.globalCompositeOperation = 'copy';
		ctx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
		ctx.globalAlpha = 1.0;
		ctx.globalCompositeOperation = 'source-over';
		// Draw zippers for this frame.
		zippers.forEach((zip) => {
			zip.angleRad = zipAngleRadians;
			zip.draw(timestamp);
		});
		// Call next frame…
		window.requestAnimationFrame(render);
	}

	// Start rendering
	window.requestAnimationFrame(render);
</script>

<template id="zprofiletemplate">
	<canvas id="canvas" />
	<div class="character" style="transform: rotate(calc(var(--characterRotation) * -1rad));">
		<div class="character-icon">🚀</div>
	</div>
</template>
