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

	let daysRange = 30;
	let timeJump = 0; //daysRange * 2;
	let timeTravel = daysRange * timeJump;
	let datesArray = Array.from(new Array(daysRange), (x, i) => {
		var d = new Date();
		d.setDate(d.getDate() + i + timeTravel);
		return parseInt(
			d.toISOString().replaceAll('-', '').replaceAll('T', '').replaceAll(':', '').slice(0, 8)
		);
	});

	let sizes = [9, 10, 11, 12, 13];
</script>

<div class="p5 m5" />

<div class="m5">
	<div class="grid">
		{#each datesArray as date}
			<div>
				{date.toString().slice(6, 8)}/{date.toString().slice(4, 6)}/{date.toString().slice(0, 4)}
				<div class="artcontainer">
					<CanvasArt seed={date} renderSize={2 ** 9} diagnostics={false} />
				</div>
			</div>
		{/each}
	</div>

	<!-- <div class="group grid">
		{#each sizes as size}
			<div class="artcontainer">
				<CanvasArt seed={20260518} renderSize={2 ** size} diagnostics={true} />
			</div>
		{/each}
	</div> -->
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		align-content: flex-start;
	}

	.artcontainer {
		--artsize: 256px;
		width: var(--artsize);
		height: auto;
		// margin: 5em;
		display: flex;
		flex-direction: column;
	}

	.group {
		margin-bottom: 3em;
	}
	.grid .artcontainer {
		--size: 256px;
		/* --size: auto; */
		flex: 0 0 var(--size);
		width: var(--size);
		height: var(--size);
		height: auto;
		box-sizing: content-box;
		aspect-ratio: 1/1;
	}

	.halfs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
