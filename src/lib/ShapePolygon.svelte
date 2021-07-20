<script>
	export let size = 100;
	let tipRadius = size / 2;
	export let pointCount = 6;
	export let chosenShape = 'polygon'; // 'polygon' | 'star' | 'buzzsaw';
	export let innerRadius = 0.5;
	export let polyStyle = 'fill:#0007;';
	export let randomness = 0;

	let coordinates = [];
	let pointsString = ``;

	$: {
		// Reset
		coordinates = [];
		// Compute coordinates for different shape choices
		switch (chosenShape) {
			case 'polygon': {
				const circleFraction = (2 * Math.PI) / pointCount;
				for (let i = 1; i < pointCount + 1; i++) {
					let x = Math.sin(circleFraction * i);
					let y = Math.cos(circleFraction * i);
					x = x * tipRadius + tipRadius;
					y = y * tipRadius + tipRadius;
					coordinates.push({ x, y });
				}
				break;
			}

			case 'star': {
				const circleFraction = (2 * Math.PI) / (pointCount * 2);
				let x;
				let y;
				let isTipOrValley = true;
				for (let i = 1; i < pointCount * 2 + 1; i++) {
					x = Math.sin(circleFraction * i);
					y = Math.cos(circleFraction * i);
					if (isTipOrValley) {
						// Tip coordinates
						x = x * tipRadius + tipRadius;
						y = y * tipRadius + tipRadius;
					} else {
						// Valley coordinates
						x = x * tipRadius * innerRadius + tipRadius;
						y = y * tipRadius * innerRadius + tipRadius;
					}
					coordinates.push({ x, y });
					isTipOrValley = !isTipOrValley;
				}
				break;
			}

			case 'buzzsaw': {
				const circleFraction = (2 * Math.PI) / pointCount;
				let x;
				let y;
				for (let i = 1; i < pointCount + 1; i++) {
					// Tip coordinates
					x = Math.sin(circleFraction * i);
					y = Math.cos(circleFraction * i);
					x = x * tipRadius + tipRadius;
					y = y * tipRadius + tipRadius;
					coordinates.push({ x, y });
					// Valley coordinates
					x = Math.sin(circleFraction * i);
					y = Math.cos(circleFraction * i);
					x = x * tipRadius * innerRadius + tipRadius;
					y = y * tipRadius * innerRadius + tipRadius;
					coordinates.push({ x, y });
				}
				break;
			}

			default: {
				throw new Error('Unrecognised shape choice.');
			}
		}
		//
		if (randomness) {
			coordinates = coordinates.map(({ x, y }) => {
				return {
					x: x + randomness * (Math.random() - 0.5),
					y: y + randomness * (Math.random() - 0.5)
				};
			});
		}
		// Convert coordinates to HTML svg-polygon-points attribute string.
		pointsString = coordinates.reduce(
			(acc, { x, y }) => (acc ? `${acc},${x} ${y}` : `${x} ${y}`),
			``
		);
	}
</script>

<svg viewBox="0 0 {size} {size}" height={size} width={size} style="width: 100%; height: 100%;">
	<polygon points={pointsString} style={polyStyle} vector-effect="non-scaling-stroke" />
</svg>
