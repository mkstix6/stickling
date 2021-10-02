<script>
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';

	function hueAdjust(hue) {
		let lightness = 50;
		let hueDarkenMidPoint = 60;
		let hueDarkenRange = 50;
		let hueRangeDarkenLower = hueDarkenMidPoint - hueDarkenRange / 2;
		let hueRangeDarkenUpper = hueDarkenMidPoint + hueDarkenRange / 2;
		let hueDarkenByMax = 3;
		if (hue > hueRangeDarkenLower && hue < hueRangeDarkenUpper) {
			let hueAdjustDecimal =
				(hue - hueRangeDarkenLower) / (hueRangeDarkenUpper - hueRangeDarkenLower);
			let hueAdjustValue = Math.sin(hueAdjustDecimal * Math.PI);
			lightness = lightness - hueAdjustValue * hueDarkenByMax;
		}
		return [hue, 100, lightness];
	}

	let datesArray = Array.from(new Array(60), (x, i) => {
		var d = new Date();
		d.setDate(d.getDate() + i);
		return parseInt(
			d.toISOString().replaceAll('-', '').replaceAll('T', '').replaceAll(':', '').slice(0, 8)
		);
	});
</script>

<div class="p5 m5" />
<div class="m5">
	<!-- <div>
		{#each Array(360) as _, i}
			<span
				style="background: hsl({hueAdjust(i)[0]},{hueAdjust(i)[1]}%,{hueAdjust(
					i
				)[2]}%); border-radius: 2em;"
				>{i}
			</span>
		{/each}
	</div> -->

	<div class="grid">
		<!-- {#each Array(64) as _, i} -->
		{#each datesArray as date}
			<CanvasArt seed={date} />
		{/each}
	</div>
</div>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-content: flex-start;
	}

	.grid > * {
		flex: 0 0 256px;
	}

	.halfs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
