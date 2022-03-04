<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;
	// Universal constants
	const TAU = Math.PI * 2;

	// Prepare canvas
	// const canvas = document.getElementById('canvas');
	// const pxWidth = window.innerWidth * window.devicePixelRatio;
	// const pxHeight = window.innerHeight * window.devicePixelRatio;
	// canvas.width = pxWidth;
	// canvas.height = pxHeight;
	// const ctx = canvas.getContext('2d');
	// ctx.globalCompositeOperation = 'source-over';

	// const smallestSide = Math.min(canvas.width, canvas.height);

	// Initialise pointer position to the center of the canvas
	// let mouseX = canvas.width * 0.5;
	// let mouseY = canvas.height * 0.5;

	const gradient = {
		stops: [
			[30, 0],
			[70, 0.25],
			[20, 0.6],
			[180, 1],
		],
		getColor(decimal) {
			let fromStop;
			let toStop;
			this.stops.sort((a, b) => a[1] - b[1]);
			this.stops.forEach((stop) => {
				if (stop[1] < decimal) fromStop = stop;
				if (toStop === undefined && stop[1] > decimal) toStop = stop;
			});
			return fromStop[0];
		},
	};

	// Fill canvas
	function clearCanvas(color = 'black') {
		const originalCompositeOperation = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = originalCompositeOperation;
	}

	const framenumber = 0;
	const fps = 60;
	const loopTime = 1000;
	const framesInLoop = loopTime / fps;
	// const colors = [
	//   ["#9d00ff", 3],
	//   ["#009eff", 2],
	//   ["#00ffe3", 1],
	//   ["white", 0],
	//   ["#fffa00", -1],
	//   ["#ff9400", -2],
	//   ["#ff0900", -3]
	//   // ['#00f0ff',2],
	//   // ['yellow',0],
	//   // ['#fa00ff',-2],
	// ].sort((a, b) => {
	//   return Math.abs(b[1]) - Math.abs(a[1]);
	// });
	const colorcount = 100;
	let hueFrom = 350;
	let hueTo = 180;
	let colorRange = hueTo - hueFrom;
	const spotColors = Array(colorcount)
		.fill('')
		.map((x, i) => {
			const hue = i * (colorRange / colorcount) + hueFrom;
			const sat = 100;
			const light = 70; //100 * (1 - Math.abs(i - colorcount * 0.5) * (2 / colorcount));
			const alpha = 1 - Math.abs(i - colorcount * 0.5) * (2 / colorcount);
			return [`hsla(${hue},${sat}%,${light}%,${alpha})`, i];
		});

	function drawArtwork(t = 0) {
		window.requestAnimationFrame(drawArtwork);
		// clearCanvas();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = 'screen';
		spotColors.forEach(([color, offset], i) => {
			points.forEach((point, j) => {
				drawRing(point, color, j * -40 + t + offset * 200, framenumber, framesInLoop);
			});
		});
		// drawRing("white", Math.floor(colors.length*0.5), t % loopTime, framenumber, framesInLoop);
	}
	let points;

	function drawRing(point, color, t, frame, framesInLoop) {
		ctx.beginPath();
		const x = point.x(t);
		const y = point.y(t);
		const spotRadius = 3;
		ctx.arc(x, y, spotRadius, 0, TAU);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		ctx.fill();
		// ctx.stroke();
	}

	// Pointer animation before interaction
	let pointerLoopRAF;
	function pointerLoop(t) {
		const radiusRatio = 0.5;
		const radius = canvas.width * radiusRatio;
		const rate = 0.0005;
		const x = canvas.width * radiusRatio * Math.cos(t * rate) + canvas.width * 0.5;
		const y = canvas.height * radiusRatio * Math.sin(t * rate) + canvas.height * 0.5;
		mouseX = x;
		mouseY = y;
		pointerLoopRAF = window.requestAnimationFrame(pointerLoop);
	}

	function handleInteraction(e) {
		// Stop the automated cursor animation
		window.cancelAnimationFrame(pointerLoopRAF);
		// Update global cursor coordinate variables
		const { x, y } = getMousePos(this, e);
		mouseX = x;
		mouseY = y;
	}

	function getMousePos(canvas, e) {
		let x;
		let y;
		if (
			e.type == 'touchstart' ||
			e.type == 'touchmove' ||
			e.type == 'touchend' ||
			e.type == 'touchcancel'
		) {
			x = e.pageX;
			y = e.pageY;
		} else if (
			e.type == 'mousedown' ||
			e.type == 'mouseup' ||
			e.type == 'mousemove' ||
			e.type == 'mouseover' ||
			e.type == 'mouseout' ||
			e.type == 'mouseenter' ||
			e.type == 'mouseleave'
		) {
			const rect = canvas.getBoundingClientRect();
			// subtract the element's left and top position
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
		}
		return { x, y };
	}

	function cross(a, b) {
		return a.x * b.y - a.y * b.x;
	}

	function easeInOutSine(t, b, c, d) {
		return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
	}
	function easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
		return (-c / 2) * (--t * (t - 2) - 1) + b;
	}

	function easeInOutQuint(t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
		return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
	}

	onMount(() => {
		// Prepare canvas
		// const canvas: HTMLCanvasElement = document.getElementById('canvas');
		const pxWidth = 500 * window.devicePixelRatio;
		const pxHeight = 500 * window.devicePixelRatio;
		canvas.width = pxWidth;
		canvas.height = pxHeight;
		ctx = canvas.getContext('2d', { alpha: 'transparent' });
		// Prepare art agents
		points = Array.from(Array(20), (element, index) => {
			const radius = canvas.height * 0.02 * (index + 1);
			return {
				x(t) {
					return canvas.width * 0.5 + Math.sin(t * 0.0004321) * radius;
				},
				y(t) {
					return canvas.height * 0.5 + Math.cos(t * 0.000534) * radius;
				},
			};
		});
		// Start the art
		// pointerLoop();
		// Interactions and Helper functions
		// canvas.addEventListener('touchmove', handleInteraction, false);
		// canvas.onmousemove = handleInteraction;
		drawArtwork();
	});
</script>

<canvas id="canvas" bind:this={canvas} width="500" height="500" />

<style>
	#canvas {
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
	}
</style>
