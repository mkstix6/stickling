<script>
	export let src = '';
	export let ccw = false;
	export let width = 100;
	export let height = 100;
	export let alt = '';
	export let frame = false;
</script>

<div class="imgcontainer" class:ccw class:frame>
	<img {src} {width} {height} {alt} />
</div>

<style>
	.imgcontainer {
		--imgrotation: 15deg;
		perspective: 1000px;
	}
	.imgcontainer img {
		transform: rotateY(calc(-1 * var(--imgrotation)));
	}
	.imgcontainer.ccw img {
		transform: rotateY(var(--imgrotation));
	}
	.imgcontainer img:focus,
	.imgcontainer img:hover {
		transform: rotateY(0deg);
	}

	.imgcontainer.frame img {
		border-radius: 4px;
		border: 1px solid #fff2;
	}

	img {
		max-width: 100%;
		width: 100%;
		height: auto;
		display: block;
		transition: transform 600ms;
	}
</style>
