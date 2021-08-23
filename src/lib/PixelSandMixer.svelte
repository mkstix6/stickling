<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Vector2D = [number, number];
	type Coordinates2D = [number, number];

	class Grain {
		x = 0;
		y = 0;
		color;
		iterationsHasBeenSettled = 0;
		constructor(x = 0, y = 0, color = 'rgb(200, 0, 0)') {
			this.setCoordinates([x, y]);
			this.color = color;
		}
		setCoordinates([x, y]) {
			this.x = x;
			this.y = y;
		}
		getCoordinates(): Vector2D {
			return [this.x, this.y];
		}
		isSettled() {
			return this.iterationsHasBeenSettled > iterationsBeforeSettled;
		}
		incrementSettledCounter() {
			this.iterationsHasBeenSettled++;
		}
		resetSettledCounter() {
			this.iterationsHasBeenSettled = 0;
		}
		fall() {
			if (this.isSettled()) {
				return false;
			}
			let didFall = false;
			let targetCoordinates;
			let currentCoordinates = this.getCoordinates();
			// Try fall straight down, otherwise try diaginal down.
			targetCoordinates = sandField.down1(currentCoordinates);
			didFall = this.attemptFall(targetCoordinates);
			if (!didFall) {
				if (toggler()) {
					targetCoordinates = sandField.downLeft1(currentCoordinates);
					didFall = this.attemptFall(targetCoordinates);
				} else {
					targetCoordinates = sandField.downRight1(currentCoordinates);
					didFall = this.attemptFall(targetCoordinates);
				}
				if (!didFall) {
					if (toggler()) {
						targetCoordinates = sandField.downLeft2(currentCoordinates);
						didFall = this.attemptFall(targetCoordinates);
					} else {
						targetCoordinates = sandField.downRight2(currentCoordinates);
						didFall = this.attemptFall(targetCoordinates);
					}
				}
				if (!didFall) {
					this.incrementSettledCounter();
				}
			}
		}
		attemptFall(targetCoordinates) {
			if (targetCoordinates && sandField.getPoint(targetCoordinates) === 0) {
				let currentCoordinates = this.getCoordinates();
				this.setCoordinates(targetCoordinates);
				sandField.setPoint(currentCoordinates, 0);
				sandField.setPoint(targetCoordinates, 1);
				return true;
			} else {
				return false;
			}
		}
	}

	class BitMap {
		field = [];
		width;
		height;
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.field = new Array(width * height).fill(0);
		}
		validCoordinates([x, y]) {
			if (x < 0 || y < 0 || x > this.width || y > this.height) {
				return false;
			} else {
				return true;
			}
		}
		getBitMapState() {
			return this.field;
		}
		eraseBitMap() {
			for (let i = 0; i < this.field.length; i++) {
				this.field[i] = 0;
			}
		}
		coordinatesToFieldIndex([x, y]) {
			return x + y * this.width;
		}
		setPoint([x, y], value) {
			let fieldIndex = this.coordinatesToFieldIndex([x, y]);
			this.field[fieldIndex] = value;
		}
		getPoint([x, y]) {
			let fieldIndex = this.coordinatesToFieldIndex([x, y]);
			return this.field[fieldIndex];
		}
	}

	class GravityField extends BitMap {
		gravity: Vector2D = [0, 1];
		setGravity(vector: Vector2D = [0, 1]) {
			this.gravity = vector;
		}
		constructor(width = canvasWidth, height = canvasHeight) {
			super(width, height);
		}
		getFieldState() {
			return this.getBitMapState();
		}
		resetState() {
			this.setGravity();
			this.eraseBitMap();
		}
		rotateGravity(direction = 'CW') {
			switch (direction) {
				case 'CCW':
					this.gravity = rotateVector90CCW(this.gravity);
					break;
				default:
					this.gravity = rotateVector90CW(this.gravity);
					break;
			}
			updateCSSGravityCustomProperty(direction);
			consoleLogGravity(this.gravity);
		}
		down1(coordinates) {
			let [gx, gy] = this.gravity;
			let [fromX, fromY] = coordinates;
			let newCoordinates: Coordinates2D = [fromX + gx, fromY + gy];
			if (this.validCoordinates(newCoordinates)) {
				return newCoordinates;
			} else {
				return false;
			}
		}
		downLeft1(coordinates) {
			// "left" depends on gravity direction.
			let sidewaysVector = rotateVector90CW(this.gravity);
			return this.vectorMovement(coordinates, sidewaysVector);
		}
		downRight1(coordinates) {
			// "right" depends on gravity direction.
			let sidewaysVector = rotateVector90CCW(this.gravity);
			return this.vectorMovement(coordinates, sidewaysVector);
		}
		downLeft2(coordinates) {
			// "left" depends on gravity direction.
			let sidewaysVector = rotateVector90CW(this.gravity);
			sidewaysVector = combineVectors(sidewaysVector, sidewaysVector);
			return this.vectorMovement(coordinates, sidewaysVector);
		}
		downRight2(coordinates) {
			// "right" depends on gravity direction.
			let sidewaysVector = rotateVector90CCW(this.gravity);
			sidewaysVector = combineVectors(sidewaysVector, sidewaysVector);
			return this.vectorMovement(coordinates, sidewaysVector);
		}
		vectorMovement(coordinates: Coordinates2D, sidewaysVector: Vector2D = [0, 0]) {
			let [gx, gy] = combineVectors(this.gravity, sidewaysVector);
			let [fromX, fromY] = coordinates;
			let newCoordinates: Coordinates2D = [fromX + gx, fromY + gy];
			if (this.validCoordinates(newCoordinates)) {
				return newCoordinates;
			} else {
				return false;
			}
		}
	}

	let autoRotateInterval;
	let sandField;
	let pipList = [];
	let autoRotate = true;
	let colorPrefChoice;
	let sandSettings;
	let pipCount;
	let canvas;
	let ctx;
	let canvasWidth;
	let canvasHeight;
	let pixelCount;
	let sandFill;
	let currentRotationDegrees = 0;
	let simulationSpeed;
	let iterationsBeforeSettled;
	let documentElement;
	let componentDOMElement;

	// Sand preference memory
	let startTypes = ['messy', 'dune', 'organised'];
	let startType = startTypes[0];
	// Available sand presets
	const colorPrefs = {
		magicSand: {
			lightness: 50, // %
			saturation: 50, // %
			hueRotate: 180, // degrees
			hueRange: 100, // degrees
			hueReverse: false,
		},
		hotSand: {
			lightness: 60, // %
			saturation: 60, // %
			hueRotate: 10, // degrees
			hueRange: 40, // degrees
			hueReverse: true,
		},
		beachSand: {
			lightness: 80, // %
			saturation: 30, // %
			hueRotate: 40, // degrees
			hueRange: 15, // degrees
			hueReverse: true,
		},
		rainbowSand: {
			lightness: 60, // %
			saturation: 70, // %
			hueRotate: 0, // degrees
			hueRange: 350, // degrees
			hueReverse: false,
		},
	};

	const rotateVector90CW = ([x, y]: Vector2D): Vector2D => [-y, x];
	const rotateVector90CCW = ([x, y]: Vector2D): Vector2D =>
		rotateVector90CW(rotateVector90CW(rotateVector90CW([x, y])));

	nextSandColorPref();

	// Rotate sand bubble when pressing left or right keys
	function handleKeyboardEvents(event) {
		pipList.forEach((pip) => {
			pip.resetSettledCounter();
		});
		// console.log(event.keyCode);
		// Restart animation
		console.log(event.target);
		switch (event.keyCode) {
			case 38: {
				keyFlash('.key--up');
				nextSandColorPref();
				resetAndReinitialiseSand();
				resetAndReinitialiseSand();
				break;
			}
			case 37: {
				keyFlash('.key--left');
				stopAutoRotation();
				sandField.rotateGravity('CW');
				break;
			}
			case 40: {
				keyFlash('.key--down');
				resetAndReinitialiseSand();
				break;
			}
			case 39: {
				keyFlash('.key--right');
				stopAutoRotation();
				sandField.rotateGravity('CCW');
				break;
			}
		}
		startAnimation();
	}

	function keyFlash(selector) {
		let uiKey = componentDOMElement.querySelector(selector);
		uiKey.classList.add('flash');
		window.setTimeout(() => {
			uiKey.classList.remove('flash');
		}, 200);
	}

	function nextSandColorPref() {
		// Choose next sand pref
		if (colorPrefChoice === undefined) {
			colorPrefChoice = 0;
		} else {
			colorPrefChoice++;
		}
		let keys = Object.keys(colorPrefs);
		let prefKey = keys[colorPrefChoice % keys.length];
		sandSettings = colorPrefs[prefKey];
		console.log(`🎨 ${prefKey}`);
	}

	function resetAndReinitialiseSand() {
		// Erase sand
		pipList = [];
		// Add new sand
		globalSetGravity();
		if (sandField) {
			sandField.resetState();
		}
		addRandomPips();
		startAnimation();
	}

	function stopAutoRotation() {
		if (autoRotate === true) {
			clearInterval(autoRotateInterval);
			autoRotate = false;
			console.log('⏯ auto-rotate paused');
		}
	}

	function startAnimation() {
		console.log('▶️ sand');
		pipList.forEach((pip) => {
			pip.resetSettledCounter();
		});
		window.requestAnimationFrame(drawFrame);
	}

	function globalSetGravity(degrees = 0, setCSSGravityFlag = true) {
		// Round degrees to quarter
		currentRotationDegrees = Math.round((degrees % 360) / 90) * 90;

		let gravityVector;
		if ((currentRotationDegrees + 0) % 360 === 0) {
			gravityVector = [0, 1];
		} else if ((currentRotationDegrees + 270) % 360 === 0) {
			gravityVector = rotateVector90CW([0, 1]);
		} else if ((currentRotationDegrees + 180) % 360 === 0) {
			gravityVector = rotateVector90CW(rotateVector90CW([0, 1]));
		} else if ((currentRotationDegrees + 90) % 360 === 0) {
			gravityVector = rotateVector90CW(rotateVector90CW(rotateVector90CW([0, 1])));
		}

		sandField.setGravity(gravityVector);

		if (setCSSGravityFlag && documentElement.querySelector('.canvasContainer')) {
			// Prevent visible spinning back to 0degrees (gravity down) when changing prefs.
			documentElement.querySelector('.canvasContainer').style.transition = 'none';
			document.documentElement.style.setProperty('--gravity', `${currentRotationDegrees}deg`);
			window.setTimeout(() => {
				documentElement.querySelector('.canvasContainer').style.transition = 'inherit';
			}, 10);
		}
	}

	function addRandomPips() {
		for (let i = 0; i < pipCount; i++) {
			// Choose starting coordinates
			let x;
			let y;

			switch (startType) {
				case 'messy':
					x = Math.floor(Math.random() * canvasWidth);
					y = Math.floor(Math.random() * canvasHeight);
					break;
				case 'dune':
					x = i % canvasWidth;
					y = i % canvasWidth;
					break;
				case 'organised':
					x = i % canvasWidth;
					y = Math.ceil(Math.ceil(i / canvasWidth) * (1 / sandFill));
					break;

				default:
					break;
			}
			// Choose sand grain color
			const maxY = canvasHeight;
			const color = `hsl(${
				sandSettings.hueRotate +
				((sandSettings.hueReverse ? maxY - y : y) / maxY) * sandSettings.hueRange
			}, ${sandSettings.saturation}%, ${sandSettings.lightness}%)`;
			// Initialise sand grain
			const p = new Grain(x, y, color);
			// Add sand grain to list
			pipList.push(p);
		}
	}

	function drawFrame() {
		// Upfront
		let simulationSteps = simulationSpeed;
		while (simulationSteps) {
			iterateGrains();
			simulationSteps--;
		}
		// Draw
		clearCanvas(); // Clear previous frame to draw new frame.
		drawGrains();

		const allSettled = pipList.every((pip) => {
			return pip.isSettled();
		});
		if (!allSettled) {
			window.requestAnimationFrame(drawFrame);
		} else {
			console.log('⏸ sand');
		}
	}

	function iterateGrains() {
		pipList.forEach((pip) => {
			pip.fall();
		});
	}

	let toggleBool = false;
	function toggler() {
		toggleBool = !toggleBool;
		return toggleBool;
	}

	function combineVectors(a: Vector2D, b: Vector2D): Vector2D {
		let newVector: Vector2D = [0, 0];
		for (let i = 0; i < a.length; i++) {
			newVector[i] = a[i] + b[i];
		}
		return newVector;
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawGrains() {
		pipList.forEach((grain) => {
			drawPixel(grain.x, grain.y, grain.color);
		});
	}

	function drawPixel(x, y, color = 'rgb(200, 0, 0)') {
		const width = 1;
		const height = 1;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	function updateCSSGravityCustomProperty(direction = 'CW') {
		// FIXME gravity directions are bitmap coordinate centric but this isn't physics friendly
		if (direction === 'CCW') {
			currentRotationDegrees += 90;
		} else {
			currentRotationDegrees -= 90;
		}
		document.documentElement.style.setProperty('--gravity', `${currentRotationDegrees}deg`);
	}

	function consoleLogGravity(gravityVector) {
		let [x, y] = gravityVector;
		// FIXME gravity directions are bitmap coordinate centric but this isn't physics friendly
		if (y === 1) {
			console.log('Gravity ⬇️');
		} else if (x === -1) {
			console.log('Gravity ⬅️');
		} else if (y === -1) {
			console.log('Gravity ⬆️');
		} else if (x === 1) {
			console.log('Gravity ➡️');
		} else {
			console.warn('Gravity broken somehow');
		}
	}

	function getMotionControlsPermission() {
		DeviceMotionEvent.requestPermission().then((response) => {
			if (response == 'granted') {
				// Add a listener to get smartphone orientation
				// in the alpha-beta-gamma axes (units in degrees)
				let oldCartesianRotation = 0; // rounded to nearest 90°
				window.addEventListener('deviceorientation', (event) => {
					stopAutoRotation();

					// Expose each orientation angle in a more readable way
					let X = Math.floor(event.alpha);
					let Y = Math.floor(event.beta);
					let Z = Math.floor(event.gamma);
					let compass = Math.floor(event.webkitCompassHeading);
					let Roll = Math.floor((Math.atan2(Y, Z) * 180) / Math.PI);
					let Pitch = Math.floor((Math.atan2(-X, Math.sqrt(Y * Y + Z * Z)) * 180) / Math.PI);

					let rotation_degrees = X;
					if (Y > 0 && Math.abs(Y) > Math.abs(Z)) {
						rotation_degrees = 0;
					} else if (Z < 0 && Math.abs(Z) > Math.abs(Y)) {
						rotation_degrees = 90;
					} else if (Y < 0 && Math.abs(Y) > Math.abs(Z)) {
						rotation_degrees = 180;
					} else if (Z > 0 && Math.abs(Z) > Math.abs(Y)) {
						rotation_degrees = 270;
					}

					let cartesianRotation = (Math.round((rotation_degrees % 360) / 90) * 90) % 360;
					if (oldCartesianRotation !== cartesianRotation) {
						globalSetGravity(cartesianRotation, false);
						oldCartesianRotation = cartesianRotation;
						startAnimation();
					}
					// Style button
					let readoutElement = componentDOMElement.querySelector('.gyroreadout');
					readoutElement.innerHTML = `
      X: ${X}
      Y: ${Y}
      Z: ${Z}
   Roll: ${Roll}
  Pitch: ${Pitch}
Compass: ${compass}
 RotDeg: ${rotation_degrees}
        `;
					readoutElement.style.transform = `rotate(${rotation_degrees}deg)`;
					let buttonElement = componentDOMElement.querySelector('button');
					buttonElement.classList.add('gyro-active');
					buttonElement.style.transform = `rotate(${rotation_degrees}deg)`;
				});
			}
		});
	}

	onMount(() => {
		/**
		 * "BM" in variable names just short-hand for
		 *     BitMap (but they're just arrays here)
		 */
		documentElement = document;
		componentDOMElement = document.querySelector('.canvasComponent');
		canvas = documentElement.querySelector('canvas');
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		pixelCount = canvasWidth * canvasHeight;
		sandFill = 0.62;
		pipCount = pixelCount * sandFill;

		simulationSpeed = Math.ceil(canvasWidth / 64);
		iterationsBeforeSettled = Math.max(canvasWidth, 32);

		sandField = new GravityField(canvasWidth, canvasHeight);

		addRandomPips();
		startAnimation(); // Begin animation loop

		if (autoRotate === true) {
			autoRotateInterval = window.setInterval(() => {
				sandField.rotateGravity('CCW');
				console.log('🔄 auto-rotate');
				startAnimation();
			}, 4000);
		}

		// documentElement.addEventListener('keydown', handleKeyboardEvents, { passive: true });
		// componentDOMElement.addEventListener('click', handleKeyboardEvents, { passive: true });

		componentDOMElement.querySelector('canvas').addEventListener(
			'click',
			function (event) {
				nextSandColorPref();
				resetAndReinitialiseSand();
			},
			{ passive: true }
		);

		// Accelerometer code
		var px = 50; // Position x and y
		var py = 50;
		var vx = 0.0; // Velocity x and y
		var vy = 0.0;
		var updateRate = 1 / 60; // Sensor refresh rate
	});

	onDestroy(() => {
		// DESTROY
		// documentElement.removeEventListener('keydown', handleKeyboardEvents);
		// componentDOMElement.removeEventListener('click', handleKeyboardEvents);
		if (autoRotateInterval) {
			clearInterval(autoRotateInterval);
		}
		// globalSetGravity();
		if (sandField) {
			sandField.resetState();
		}
	});
</script>

<svelte:window on:keydown={handleKeyboardEvents} />

<div class="canvasComponent noUserSelect" on:click={handleKeyboardEvents}>
	<div class="canvasShadow noUserSelect" />
	<div class="canvasContainer noUserSelect">
		<canvas width="64" height="64" class="noUserSelect">PixelMixer…</canvas>
	</div>

	<div class="keyboardLayout">
		<button class="key key--up" title="Change colour"><span>🎨</span></button>
		<button class="key key--left" title="Rotate counter-clockwise"><span>↪️</span></button>
		<button class="key key--down" title="Refresh"><span>🌊</span></button>
		<button class="key key--right" title="Rotate clockwise"><span>↩️</span></button>
	</div>

	<button
		id="motionControlsPermsButton"
		style="height: 50px"
		on:click={getMotionControlsPermission}
	>
		<span class="icon--inactive"
			><svg
				height="64"
				viewBox="0 0 16.933333 16.933334"
				width="64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="m7.945819 16.892505c-1.2468601-.077873-2.5075399-.443208-3.563739-1.032746-.7428854-.414654-1.3708947-.896859-1.9705425-1.513042-1.027913-1.056257-1.74985531-2.345127-2.11734798-3.780061-.08556219-.334094-.18967871-.9213035-.21118437-1.1910664l-.01462254-.1834284h.52425338.52425411l.014712.151983c.037734.3898218.1582193.9521718.2957236 1.3802528.2669773.831161.7355646 1.700921 1.2806897 2.37713.6228105.772577 1.4365742 1.438986 2.3445324 1.919989l.245626.130125.4696299-.469282.46963-.469282 1.3313839 1.331043 1.3313833 1.331044-.1208165.01344c-.1219421.01357-.6398631.01599-.8335652.0039zm2.213969-.940082c-.3010759-.08451-.039056.165717-4.6625151-4.452679-2.6668647-2.6639426-4.3245823-4.3350606-4.3758677-4.4112387-.1142668-.1697292-.16680411-.3517875-.16680411-.5780336 0-.2077497.036874-.3562308.13054721-.5256755.049131-.088875.5999609-.6513239 2.4035647-2.4542673 2.5397863-2.53885732 2.4210033-2.429949 2.7295949-2.5026892.1701032-.0400935.3081488-.0400935.4782511 0 .3152193.074304.00962-.21657638 4.721542 4.4940675 4.252198 4.2510417 4.333162 4.3334823 4.407418 4.4878178.146873.305262.146717.617366-.000475.926544-.07049.148082-.148653.228915-2.403811 2.485993-1.282022 1.283114-2.37483 2.361271-2.428462 2.395904-.224953.145266-.586293.203505-.832994.134257zm.511243-9.6951059-4.2135655-4.2136041-2.2325772 2.232577-2.232578 2.232578 4.2135655 4.213605 4.2135662 4.213604 2.232577-2.232578 2.232577-2.232577zm5.09545 1.4621816c-.0061-.037471-.021-.1435971-.03324-.2358357-.169476-1.2769673-.70567-2.524953-1.533092-3.5682615-.255899-.3226692-.822039-.8922757-1.139314-1.1462927-.330473-.2645845-.855252-.6079232-1.189122-.7779888l-.287707-.1465498-.467084.4663757-.467085.4663757-1.3301408-1.3302644c-.7315769-.73164517-1.3239618-1.33644257-1.3164108-1.3439929.0270238-.02702381.9709558-.01086648 1.2841786.02198026 1.17018.12271325 2.288757.47671911 3.286776 1.04019544.957783.5407579 1.90891 1.3740758 2.574218 2.2553651.774797 1.026323 1.310163 2.2276977 1.548832 3.4756181.03374.1764139.126434.8228423.126434.8817229 0 .00532-.235409.00968-.52313.00968h-.523131z"
					stroke-width=".020963"
				/>
			</svg>
		</span>
		<span class="icon--active">
			<svg
				height="64"
				viewBox="0 0 16.933333 16.933334"
				width="64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g transform="matrix(1.1916722 0 0 1.1916722 -1.617488 -1.627488)">
					<path
						d="m8.4388214 4.7736495-1.6665649 3.3331298h1.0505819v4.1015577h1.2319661v-4.1015577h1.0505815c-.5554635-1.1110349-1.1112166-2.2221595-1.6665646-3.3331298z"
					/>
					<path
						d="m4.380457 14.982817c-.1531368-.27265-.1447975.089564-.1483777-6.4454148-.0020662-3.7694506.007409-6.1232926.0250113-6.2134227.0392178-.2008158.1308026-.3666998.2907826-.5266795.1469016-.1469017.2779672-.2258195.4640203-.2793984.097581-.0281.8847916-.036319 3.4350052-.035852 3.5911433.0006572 3.4301423-.00633 3.6997853.1604476.148628.091934.24624.1895451.338173.3381747.170355.275431.159945-.1463409.160849 6.5164198.000821 6.0126993-.000222 6.1282453-.05685 6.2898853-.111986.319709-.3328.540282-.655498.654828-.154559.05488-.26698.05676-3.4576176.05811-1.8138203.000774-3.3489252-.0096-3.4113364-.02302-.2617875-.05634-.5584702-.27067-.6839582-.494074zm7.216973-6.4939725.000031-5.9589078-3.15734-.0000002-3.1573423-.0000002-.0000286 5.9589109-.0000263 5.9589088 3.1573445.000003 3.1573357.000003z"
						stroke-width=".020963"
					/>
				</g>
			</svg>
		</span>
	</button>
	<pre>
    <div class="gyroreadout"></div>
  </pre>
</div>

<style>
	:root {
		--gravity: 0deg;
		--displaySize: min(512px, 90vw);
		--roundedness: 100%;
	}

	html {
		background: #eee;
		display: grid;
		place-items: center;
		min-height: 100vh;
		min-height: -webkit-fill-available;
		color: black;
	}
	@media (prefers-color-scheme: dark) {
		html {
			background: #111;
			color: white;
		}
	}

	.noUserSelect {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.canvasComponent {
		border-radius: var(--roundedness);
		width: var(--displaySize);
		height: var(--displaySize);
		position: relative;
		transition: transform 600ms; /* this value inherited as descendant's values manipulated by JS */
		transition-timing-function: cubic-bezier(0.355, 1.275, 0.775, 1.015);
	}

	.canvasComponent::before {
		content: '';
		/* canvasShadow */
		box-shadow: 0 3em 6em -4em #0009;
		border-radius: inherit;
		width: inherit;
		height: inherit;
		border-radius: inherit;
		position: absolute;
		top: 0;
		left: 0;
	}

	.canvasContainer {
		overflow: hidden;
		transform: rotate(var(--gravity)) translateZ(0);
		transform-origin: center;
		transition: inherit; /* Manipulated by JS on user interaction */
		will-change: transform;
		width: inherit;
		height: inherit;
		z-index: 1;
		position: relative;
		border-radius: inherit;
		background-color: #aaa1;
	}

	canvas {
		/* image-rendering: auto; */
		/* image-rendering: crisp-edges; */
		image-rendering: pixelated;
		width: 100%;
		height: 100%;
		z-index: 1;
		position: relative;
		will-change: transform;
		transform: rotate(0deg) translateZ(0);
		border-radius: inherit;
	}

	#motionControlsPermsButton {
		background-size: contain;
		width: 3rem;
		height: 3rem;
		margin: 0;
		padding: 0;
		border: none;
		background: #aaa1;
		border-radius: 100%;
		line-height: 1;
		will-change: transform;
		transition: transform 400ms;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 5;
	}
	#motionControlsPermsButton:focus,
	#motionControlsPermsButton:hover {
		background: #555a;
	}

	#motionControlsPermsButton svg {
		object-fit: contain;
		width: 2rem;
		height: 2rem;
	}

	@media (prefers-color-scheme: dark) {
		#motionControlsPermsButton svg {
			filter: invert(1);
		}
	}
	#motionControlsPermsButton.gyro-active {
		background-color: rgb(64, 213, 131);
	}
	.icon--active {
		display: none;
	}
	#motionControlsPermsButton.gyro-active .icon--active {
		display: block;
	}
	#motionControlsPermsButton.gyro-active .icon--inactive {
		display: none;
	}

	.gyroreadout {
		display: grid;
		display: none;
		place-items: center;
		position: absolute;
		top: 0;
		left: 0;
		background: #555a;
		border-radius: 100%;
	}

	.keyboardLayout {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0.2em;
		width: 6em;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	:root {
		--keyHighlightColor: hsla(90, 50%, 50%, 100%);
	}
	@keyframes keyFlash {
		0% {
			background-color: hsla(90, 50%, 50%, 0%);
		}
		5% {
			background-color: var(--keyHighlightColor);
		}
		100% {
			background-color: hsla(90, 50%, 50%, 0%);
		}
	}
	.key {
		--size: 2.3em;
		display: block;
		width: var(--size);
		height: calc(var(--size) * 0.75);
		/* border: 2px solid #fffc; */
		background-color: #7777;
		border-radius: 0.35em;
		border: none;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.key:hover,
	.key:focus {
		background-color: var(--keyHighlightColor);
	}

	.key span {
		filter: sepia(100%) hue-rotate(90deg) contrast(200%) brightness(90%);
	}
	.key.flash {
		animation: keyFlash 800ms 1;
	}
	.key--up {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
	}
	.key--left {
		grid-row: 2 / 3;
		grid-column: 1 / 2;
	}
	.key--down {
		grid-row: 2 / 3;
		grid-column: 2 / 3;
	}
	.key--right {
		grid-row: 2 / 3;
		grid-column: 3 / 4;
	}
</style>
