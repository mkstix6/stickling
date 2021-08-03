<script context="module">
	// Sortable.mount(new Swap());
</script>

<script>
	import { onMount, onDestroy } from 'svelte';
	import Sortable, { Swap } from 'sortablejs';

	function readNumbersFromBoard() {
		return [...document.querySelectorAll('.board .hex')].map((x) => parseInt(x.innerHTML));
	}

	let sortableInstance;

	onDestroy(() => {
		sortableInstance?.destroy();
	});

	onMount(async () => {
		// window.Sortable = Sortable;
		// window.Sortable = require('sortablejs').Sortable;
		// console.log('sortableInstance.options.swap', sortableInstance?.options?.swap);
		// if (!Sortable.options.swap) {
		try {
			Sortable.mount(new Swap());
		} catch (error) {
			// FIXME fix try code above for repeat visits to this component using Sortable Swap.
			window.location.reload();
		}
		// }

		// Initialise drag and drop library
		sortableInstance = new Sortable(document.querySelector('.board > div'), {
			swap: true, // Enable swap mode
			swapClass: 'sortable-swap-highlight', // Class name for swap item (if swap mode is enabled)
			animation: 150,
			onEnd: function () {
				window.setTimeout(function () {
					// Re-render board to update totals;
					const numbers = readNumbersFromBoard();
					renderBoard(numbers);
				}, 100);
			},
		});
		// debugger;
		// Render app starting default setup
		renderBoard(tileNumbers);
		document.getElementById('buttonRandomise').addEventListener(
			'click',
			(event) => {
				randomBoard();
			},
			{ passive: true }
		);
	});

	const lineSumTarget = 38;
	const reduceSum = (acc, curr) => acc + curr;

	function shuffle(array) {
		const arrayCopy = [...array];
		arrayCopy.sort(() => Math.random() - 0.5);
		return arrayCopy;
	}

	function randomBoard() {
		renderBoard(shuffle(tileNumbers));
		return true;
	}

	// Create a hue scale
	// hueWheelGap of 120 returns blue as the highest value in the scale and red being the lowest value (no magenta).
	// TODO implement hueShift (default of 0)
	// TODO implement reverseScale (default of false)
	function createHueScale(minValue = 0, maxValue = 360, hueWheelGap = 120) {
		const minHue = 0;
		const maxHue = 360 - hueWheelGap;
		const hueRange = maxHue - minHue;
		const valueRange = maxValue - minValue;
		//
		return function (value) {
			const valueDecimal = (value - minValue) / valueRange;
			const hueDegrees = valueDecimal * hueRange + minHue;
			return hueDegrees;
		};
	}

	const totalMin = 1 + 2 + 3;
	const totalMax = 19 + 18 + 17 + 17 + 15;
	const totalRange = totalMax - totalMin;
	const getHue = createHueScale(totalMin, totalMax, 60);

	function renderBoard(attempt) {
		const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s] = attempt;
		const lineTotals = [
			[a, b, c],
			[d, e, f, g],
			[h, i, j, l, k],
			[m, n, o, p],
			[q, r, s],
			[h, d, a],
			[m, i, e, b],
			[q, n, j, f, c],
			[r, o, k, g],
			[s, p, l],
			[h, m, q],
			[d, i, n, r],
			[a, e, j, o, s],
			[b, f, k, p],
			[c, g, l],
		];
		const hexReverseTotals = [
			[lineTotals[0], lineTotals[5], lineTotals[12]],
			[lineTotals[0], lineTotals[6], lineTotals[13]],
			[lineTotals[0], lineTotals[7], lineTotals[14]],
			[lineTotals[1], lineTotals[5], lineTotals[11]],
			[lineTotals[1], lineTotals[6], lineTotals[12]],
			[lineTotals[1], lineTotals[7], lineTotals[13]],
			[lineTotals[1], lineTotals[8], lineTotals[14]],
			[lineTotals[2], lineTotals[5], lineTotals[10]],
			[lineTotals[2], lineTotals[6], lineTotals[11]],
			[lineTotals[2], lineTotals[7], lineTotals[12]],
			[lineTotals[2], lineTotals[8], lineTotals[13]],
			[lineTotals[2], lineTotals[9], lineTotals[14]],
			[lineTotals[3], lineTotals[6], lineTotals[10]],
			[lineTotals[3], lineTotals[7], lineTotals[11]],
			[lineTotals[3], lineTotals[8], lineTotals[12]],
			[lineTotals[3], lineTotals[9], lineTotals[13]],
			[lineTotals[4], lineTotals[7], lineTotals[10]],
			[lineTotals[4], lineTotals[8], lineTotals[11]],
			[lineTotals[4], lineTotals[9], lineTotals[12]],
		];

		// Render attempt to hexagon elements
		let hexagons = [...document.querySelectorAll('.board .hex')];
		for (let i = 0; i < hexagons.length; i++) {
			const hexElement = hexagons[i];
			hexElement.innerHTML = `${attempt[i]}`;
			const connectedLinesTotals = hexReverseTotals[i].map((x) => x.reduce(reduceSum));

			const hue1 = getHue(connectedLinesTotals[0]);
			const hue2 = getHue(connectedLinesTotals[1]);
			const hue3 = getHue(connectedLinesTotals[2]);
			const color1 = `hsl(${hue1}, ${connectedLinesTotals[0] === 38 ? `90%` : `70%`}, ${
				connectedLinesTotals[0] === 38 ? `50%` : `80%`
			})`;
			const color2 = `hsl(${hue2}, ${connectedLinesTotals[1] === 38 ? `90%` : `70%`}, ${
				connectedLinesTotals[1] === 38 ? `50%` : `80%`
			})`;
			const color3 = `hsl(${hue3}, ${connectedLinesTotals[2] === 38 ? `90%` : `70%`}, ${
				connectedLinesTotals[2] === 38 ? `50%` : `80%`
			})`;
			const blurDeg = 15;
			const gradient = `repeating-conic-gradient(${color1} ${60 + blurDeg}deg,${color1} ${
				120 - blurDeg
			}deg, ${color3} ${120 + blurDeg}deg, ${color3} ${180 - blurDeg}deg, ${color2} ${
				180 + blurDeg
			}deg, ${color2} ${240 - blurDeg}deg, ${color1} ${240 + blurDeg}deg)`;
			hexElement.style.background = gradient;
		}

		let totalsUI = [...document.querySelectorAll('.board .lineTotal')];
		for (let i = 0; i < totalsUI.length; i++) {
			const element = totalsUI[i];
			const total = lineTotals[i].reduce(reduceSum, 0);
			element.innerHTML = total;
			element.classList.add(total === lineSumTarget ? 'validRow' : 'invalidRow');
			element.classList.remove(total !== lineSumTarget ? 'validRow' : 'invalidRow');
			// Set totals color feedback styles
			const totalMin = 1 + 2 + 3;
			const totalMax = 19 + 18 + 17 + 16 + 15;
			const totalRange = totalMax - totalMin;
			const hue = ((total - totalMin) / totalMax) * 360;
			element.style.backgroundColor = `hsl(${hue}, ${total === 38 ? `100%` : `15%`},  ${
				total === 38 ? `50%` : `30%`
			})`;
		}
	}

	// Start, render default board.
	const tileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

	const solution = [9, 14, 15, 11, 6, 8, 13, 18, 1, 5, 4, 10, 17, 7, 2, 12, 3, 19, 16];
</script>

<header>
	<!-- <h1>Hex38</h1> -->
	<!-- <p>Switch the hexagons until every line adds up to 38</p> -->

	<div class="controls">
		<button id="buttonRandomise">Shuffle board</button>
	</div>
</header>

<div class="board">
	<div>
		<div class="hex">1</div>
		<div class="hex">2</div>
		<div class="hex">3</div>
		<div class="hex">4</div>
		<div class="hex">5</div>
		<div class="hex">6</div>
		<div class="hex">7</div>
		<div class="hex">8</div>
		<div class="hex">9</div>
		<div class="hex">10</div>
		<div class="hex">11</div>
		<div class="hex">12</div>
		<div class="hex">13</div>
		<div class="hex">14</div>
		<div class="hex">15</div>
		<div class="hex">16</div>
		<div class="hex">17</div>
		<div class="hex">18</div>
		<div class="hex">19</div>
	</div>
	<div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
		<div class="lineTotal">00</div>
	</div>
</div>

<footer>
	<h2>Key</h2>
	<div class="key">
		<!-- <div class="keyGradient"></div> -->
		<div class="keyLabels">
			<div>Line-total too high</div>
			<div>Line-total 38</div>
			<div>Line-total too low</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.controls {
		margin: 1.5rem 0;
	}

	button {
		background: hsl(140, 50%, 50%);
		border: 1px solid #0004;
		border-radius: 0.2em;
		box-shadow: 0 0.3em 0 hsl(140, 50%, 30%);
		font-size: 1rem;
		color: white;
		cursor: pointer;
		height: 2.5em;
		position: relative;
		top: 0;
		transform: translateY(0em);
		transition: transform 100ms, box-shadow 70ms;
		line-height: 1;
		padding: 0 1em;
		margin-bottom: 0.3em;

		&:hover {
			filter: brightness(110%);
		}

		&:active {
			filter: brightness(90%);
			box-shadow: 0 0.1em 0 hsl(140, 50%, 30%);
			transform: translateY(0.2em);
		}
	}

	header,
	footer {
		text-align: center;
		margin-bottom: 1rem;
		color: white;
		padding: 2vw;
	}

	.key {
		color: black;
		display: inline-flex;
		align-items: stretch;
		border: 1px solid black;
		border-radius: 0.2rem;
		$perfectColor: hsl(133.89, 89.8%, 50%);
		background: linear-gradient(
			to bottom,
			// hsl(310, 70.59%, 80%),
			hsl(254, 70.59%, 80%),
			hsl(217, 70.59%, 80%),
			$perfectColor,
			hsl(67, 70.59%, 80%),
			hsl(0, 70.59%, 80%)
		);
		min-height: 5rem;
		padding: 0.5rem;
	}

	// .keyGradient {
	//   height: 5rem;
	//   width: 1rem;
	//   border: 1px solid white;
	//   border-radius: 0.2rem;
	//   $perfectColor: hsl(133.89, 89.8%, 50%);
	//   background: linear-gradient(to bottom, hsl(290, 50%, 50%), hsl(230, 50%, 50%), $perfectColor, hsl(67.5, 70.59%, 80%), hsl(0, 70.59%, 80%));
	// }

	.keyLabels {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;
	}

	// Start Hex 38 puzzle styles
	:root {
		--boardSize: 90vw;
		--gap: 0.3vw;
		--vgap: calc(var(--gap) * 1.155);
		--halfGap: calc(var(--gap) / 2);
		--hexWidth: calc(var(--boardSize) * 0.158);
		--hexHeight: calc(var(--hexWidth) * 8 / 7);
		--overlap: calc(var(--hexWidth) * 0.292 - var(--vgap));

		@media (orientation: landscape) {
			--boardSize: 90vh;
		}
	}

	.board {
		$color: #222;
		box-sizing: border-box;
		position: relative;
		background: $color;
		width: var(--boardSize);
		height: calc(var(--boardSize) * 7 / 8 + var(--boardSize) * 0.045);
		border: calc(var(--hexWidth) * 0.6) solid #{$color};
		--bevel: calc(var(--hexWidth) * 0.5);
		--bevelX: calc(var(--hexWidth) * 1.36);
		--Ax: calc(var(--bevelX) - (var(--bevel) * 0.3));
		--Ay: calc(var(--bevel) * 0.65);
		--Bx: calc(var(--bevelX) + (var(--bevel) * 0.8));
		clip-path: polygon(
			0 calc(50% - var(--bevel) / 2),
			var(--Ax) var(--Ay),
			var(--Bx) 0,
			calc(100% - var(--Bx)) 0,
			calc(100% - var(--Ax)) var(--Ay),
			100% calc(50% - var(--bevel) / 2),
			100% calc(50% + var(--bevel) / 2),
			calc(100% - var(--Ax)) calc(100% - var(--Ay)),
			calc(100% - var(--Bx)) 100%,
			calc(var(--Bx)) 100%,
			calc(var(--Ax)) calc(100% - var(--Ay)),
			0 calc(50% + var(--bevel) / 2)
		);
	}

	.hex {
		$color: #375;
		font-size: calc(var(--hexWidth) / 3);
		color: #0009;
		text-shadow: 0 1px 0 transparentize(lighten($color, 20%), 0.7),
			0 -1px 0 transparentize(darken($color, 20%), 0.7);
		width: var(--hexWidth);
		height: var(--hexHeight);
		$fraction: 25%;
		clip-path: polygon(
			0 $fraction,
			0 (100% - $fraction),
			50% 100%,
			100% (100% - $fraction),
			100% $fraction,
			50% 0
		);
		background: $color;
		position: absolute;
		display: grid;
		place-items: center;

		&:hover {
			filter: brightness(1.1);
			cursor: grab;
		}
		&:active {
			cursor: grabbing;
		}

		&:nth-child(1) {
			top: 0;
			left: calc(var(--hexWidth) + var(--gap));
		}
		&:nth-child(2) {
			top: 0;
			left: calc(var(--hexWidth) + var(--gap) + var(--hexWidth) + var(--gap));
		}
		&:nth-child(3) {
			top: 0;
			left: calc(var(--hexWidth) + var(--gap) + var(--hexWidth) * 2 + var(--gap) * 2);
		}
		&:nth-child(4) {
			top: calc(var(--hexHeight) - var(--overlap));
			left: calc(var(--hexWidth) / 2 + var(--halfGap));
		}
		&:nth-child(5) {
			top: calc(var(--hexHeight) - var(--overlap));
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 1 + var(--gap) * 1);
		}
		&:nth-child(6) {
			top: calc(var(--hexHeight) - var(--overlap));
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 2 + var(--gap) * 2);
		}
		&:nth-child(7) {
			top: calc(var(--hexHeight) - var(--overlap));
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 3 + var(--gap) * 3);
		}
		&:nth-child(8) {
			top: calc(var(--hexHeight) * 2 - var(--overlap) * 2);
			left: 0;
		}
		&:nth-child(9) {
			top: calc(var(--hexHeight) * 2 - var(--overlap) * 2);
			left: calc(var(--hexWidth) + var(--gap));
		}
		&:nth-child(10) {
			top: calc(var(--hexHeight) * 2 - var(--overlap) * 2);
			left: calc(var(--hexWidth) * 2 + var(--gap) * 2);
		}
		&:nth-child(11) {
			top: calc(var(--hexHeight) * 2 - var(--overlap) * 2);
			left: calc(var(--hexWidth) * 3 + var(--gap) * 3);
		}
		&:nth-child(12) {
			top: calc(var(--hexHeight) * 2 - var(--overlap) * 2);
			left: calc(var(--hexWidth) * 4 + var(--gap) * 4);
		}
		&:nth-child(13) {
			top: calc(var(--hexHeight) * 3 - var(--overlap) * 3);
			left: calc(var(--hexWidth) / 2 + var(--halfGap));
		}
		&:nth-child(14) {
			top: calc(var(--hexHeight) * 3 - var(--overlap) * 3);
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 1 + var(--gap) * 1);
		}
		&:nth-child(15) {
			top: calc(var(--hexHeight) * 3 - var(--overlap) * 3);
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 2 + var(--gap) * 2);
		}
		&:nth-child(16) {
			top: calc(var(--hexHeight) * 3 - var(--overlap) * 3);
			left: calc(var(--hexWidth) / 2 + var(--halfGap) + var(--hexWidth) * 3 + var(--gap) * 3);
		}
		&:nth-child(17) {
			top: calc(var(--hexHeight) * 4 - var(--overlap) * 4);
			left: calc(var(--hexWidth) * 1 + var(--gap) * 1);
		}
		&:nth-child(18) {
			top: calc(var(--hexHeight) * 4 - var(--overlap) * 4);
			left: calc(var(--hexWidth) * 2 + var(--gap) * 2);
		}
		&:nth-child(19) {
			top: calc(var(--hexHeight) * 4 - var(--overlap) * 4);
			left: calc(var(--hexWidth) * 3 + var(--gap) * 3);
		}

		// color: transparent !important;
		// text-shadow: none !important;
	}

	.lineTotal {
		width: calc(var(--hexWidth) / 2);
		height: calc(var(--hexWidth) / 2);
		position: absolute;
		font-size: calc(var(--hexWidth) / 7);
		white-space: nowrap;
		background: #0002;
		display: flex;
		align-items: center;
		text-align: center;
		padding: 0.25em;
		// opacity: 0.6;
		color: rgba(white, 0.7);

		&::before {
			content: '→';
			display: inline-block;
			font-size: 0.8em;
		}

		&.validRow {
			// color: #5b5;
			color: black;
		}
		&.invalidRow {
			// color: #b55;
		}

		&:nth-last-child(n + 11) {
			clip-path: polygon(0 0, 80% 50%, 0 100%);
			&::before {
				transform: rotate(180deg);
				display: inline-block;
			}
		}
		&:nth-child(n + 6):nth-last-child(n + 6) {
			clip-path: polygon(0 8%, 89% 60%, 0 100%);
			&::before {
				transform: rotate(300deg);
				display: inline-block;
			}
		}
		&:nth-child(n + 11) {
			clip-path: polygon(0 0, 88% 50%, 0 100%);
			&::before {
				transform: rotate(60deg);
				display: inline-block;
			}
		}

		&:nth-child(1) {
			top: calc(var(--hexHeight) * 0.25);
			left: calc(var(--hexWidth) * 4 + var(--gap) * 4);
		}
		&:nth-child(2) {
			top: calc(var(--hexHeight) * 1.25 - var(--overlap));
			left: calc(var(--hexWidth) * 4.5 + var(--gap) * 4.5);
		}
		&:nth-child(3) {
			top: calc(var(--hexHeight) * 2.25 - var(--overlap) * 2);
			left: calc(var(--hexWidth) * 5 + var(--gap) * 5);
		}
		&:nth-child(4) {
			top: calc(var(--hexHeight) * 3.25 - var(--overlap) * 3);
			left: calc(var(--hexWidth) * 4.5 + var(--gap) * 4.5);
		}
		&:nth-child(5) {
			top: calc(var(--hexHeight) * 4.25 - var(--overlap) * 4);
			left: calc(var(--hexWidth) * 4 + var(--gap) * 4);
		}

		&:nth-child(6) {
			top: calc(var(--hexHeight) * 2.95 - var(--overlap) * 3);
			left: calc(var(--hexWidth) * 0 + var(--gap) * -0.5);
		}
		&:nth-child(7) {
			top: calc(var(--hexHeight) * 3.95 - var(--overlap) * 4);
			left: calc(var(--hexWidth) * 0.5 + var(--gap) * 0);
		}
		&:nth-child(8) {
			top: calc(var(--hexHeight) * 4.95 - var(--overlap) * 5);
			left: calc(var(--hexWidth) * 1 + var(--gap) * 0.5);
		}
		&:nth-child(9) {
			top: calc(var(--hexHeight) * 4.95 - var(--overlap) * 5);
			left: calc(var(--hexWidth) * 2 + var(--gap) * 1.5);
		}
		&:nth-child(10) {
			top: calc(var(--hexHeight) * 4.95 - var(--overlap) * 5);
			left: calc(var(--hexWidth) * 3 + var(--gap) * 2.5);
		}

		&:nth-child(11) {
			top: calc(var(--hexHeight) * 1.75 - var(--overlap) * 2 - var(--vgap));
			left: calc(var(--hexWidth) * 0 - var(--gap) * 0.5);
		}
		&:nth-child(12) {
			top: calc(var(--hexHeight) * 0.75 - var(--overlap) * 1 - var(--vgap));
			left: calc(var(--hexWidth) * 0.5 + var(--gap) * 0);
		}
		&:nth-child(13) {
			top: calc(var(--hexHeight) * -0.25 - var(--vgap));
			left: calc(var(--hexWidth) * 1 + var(--gap) * 0.5);
		}
		&:nth-child(14) {
			top: calc(var(--hexHeight) * -0.25 - var(--vgap));
			left: calc(var(--hexWidth) * 2 + var(--gap) * 1.5);
		}
		&:nth-child(15) {
			top: calc(var(--hexHeight) * -0.25 - var(--vgap));
			left: calc(var(--hexWidth) * 3 + var(--gap) * 2.5);
		}
	}
</style>
