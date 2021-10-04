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

	let timeTravel = 190;
	let daysRange = 28;
	let datesArray = Array.from(new Array(daysRange), (x, i) => {
		var d = new Date();
		d.setDate(d.getDate() + i + timeTravel);
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
		<!-- {#each Array(12) as _, i} -->
		{#each datesArray as date}
			<div>
				{date.toString().slice(6, 8)}/{date.toString().slice(4, 6)}/{date.toString().slice(0, 4)}
				<div class="artcontainer">
					<CanvasArt seed={date} />
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		align-content: flex-start;
	}

	.grid .artcontainer {
		--size: 512px;
		/* --size: auto; */
		flex: 0 0 var(--size);
		width: var(--size);
		height: var(--size);
		height: auto;
		box-sizing: content-box;
		/* background: white; */
		aspect-ratio: 1/1;
		/* padding: calc(var(--size) / 16); */
	}

	.halfs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
