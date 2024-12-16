<script>
	let elem;
	let rect;

	let dx, dy, scale, elwidth, elheight;
	$: degx = Math.floor(-dy / 18);
	$: degy = Math.floor(dx / 12);
	$: pxx = Math.floor(-dx / 30);
	$: pxy = Math.floor(-dy / 30);

	function handleMousemove(event) {
		rect = elem.getBoundingClientRect();
		if (!elwidth) {
			elwidth = rect.width;
		}
		if (!elheight) {
			elheight = rect.height;
		}
		dx = rect.left + elwidth / 2 - event.clientX;
		dy = rect.top + elheight / 2 - event.clientY;
		scale = 1.05;
	}

	function resetTransform() {
		dx = 0;
		dy = 0;
		scale = 1;
	}
</script>

<div class="perspective">
	<div
		bind:this={elem}
		class="magnetic"
		on:mousemove={handleMousemove}
		on:mouseout={resetTransform}
		on:blur={resetTransform}
		style="transform: scale({scale}) rotateX({degx}deg) rotateY({degy}deg) translateX({pxx}px) translateY({pxy}px);"
		role="presentation"
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.perspective {
		perspective: 1000px;
	}

	.magnetic {
		transition: transform 500ms;
		transition-timing-function: ease-out;
		transform: scale(1);
		position: relative;
		z-index: 0;

		&:focus,
		&:hover {
			transition: transform 250ms;
			transition-timing-function: ease-out;
			transform: scale(1.05);
			z-index: 2;
		}
	}
</style>
