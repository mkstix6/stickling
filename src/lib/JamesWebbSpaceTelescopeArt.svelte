<script>
	import * as THREE from 'three';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let canvasElement;
	let endAnimationFlag = false;

	const TAU = Math.PI * 2;

	function getIsometricCoords([px, py]) {
		const origin = [0, 0];
		const [ox, oy] = origin;
		const gridSeparation = 1.8; //Math.round(canvas.height * 0.01)
		const dy = Math.sin((TAU * 60) / 360) * gridSeparation;
		let x;
		let y;

		x = gridSeparation * px;
		if (!!(py % 2)) {
			x = x + gridSeparation * 0.5;
		}
		y = dy * py;

		const useAlternativeOrientation = true;
		if (useAlternativeOrientation) {
			// Rotate angles by 30°
			const rotate = TAU / 12;
			[x, y] = [
				x * Math.cos(rotate) - y * Math.sin(rotate),
				x * Math.sin(rotate) + y * Math.cos(rotate),
			];
		}

		// Translate to our chosen grid origin
		x = x + ox;
		y = y + oy;

		return [x, y];
	}

	async function main() {
		endAnimationFlag = false;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
		// const canvas = document.querySelector('#c');
		const canvas = canvasElement;
		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		// const renderer = new THREE.WebGLRenderer();
		// renderer.setSize(window.innerWidth, window.innerHeight);
		// renderer.setSize(500, 500);
		// document.body.appendChild(renderer.domElement);
		// camera.position.z = 5;
		// lights
		const settings = {
			ambientIntensity: 1,
		};
		let ambientLight = new THREE.AmbientLight(0xffffff, settings.ambientIntensity);
		scene.add(ambientLight);

		{
			let pointLight = new THREE.PointLight(0x4466ff, 0.5);
			pointLight.position.z = 2500;
			scene.add(pointLight);
		}

		{
			const pointLight2 = new THREE.PointLight(0xffffff, 1);
			camera.add(pointLight2);
		}

		{
			const pointLight3 = new THREE.PointLight(0xffffff, 0.5);
			pointLight3.position.x = -1000;
			pointLight3.position.z = 1000;
			scene.add(pointLight3);
		}

		const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 6);
		let material;
		if (false) {
			material = new THREE.MeshBasicMaterial({ color: 0xff6f00 });
		} else {
			material = new THREE.MeshStandardMaterial({
				color: 0xffcc00, //'#999',// 0x888888,
				roughness: 0.5,
				metalness: 1.0,

				// normalMap: normalMap,
				// normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?

				// aoMap: aoMap,
				// aoMapIntensity: 1,

				// displacementMap: displacementMap,
				// displacementScale: settings.displacementScale,
				// displacementBias: - 0.428408, // from original model

				// envMap: reflectionCube,
				envMapIntensity: 1.0, // settings.envMapIntensity,

				// side: THREE.DoubleSide
			});
		}

		//////////////////////

		const gridCoordinates = [
			[-1, -2],
			[0, -2],
			[1, -2],
			[-2, -1],
			[-1, -1],
			[0, -1],
			[1, -1],
			[-2, 0],
			[-1, 0],
			[1, 0],
			[2, 0],
			[-2, 1],
			[-1, 1],
			[0, 1],
			[1, 1],
			[-1, 2],
			[0, 2],
			[1, 2],
		]
			.map(getIsometricCoords)
			.map(([x, y]) => {
				return { x, y, z: 0 };
			});

		function createMirror({ x, y, z }) {
			const mirror = new THREE.Mesh(geometry, material);
			mirror.position.x = x;
			mirror.position.y = y;
			mirror.position.z = z;
			mirror.rotation.x = TAU * 0.25;
			mirror.rotation.y = (TAU * 1) / 12;
			scene.add(mirror);
			return mirror;
		}
		const mirrors = gridCoordinates.map(createMirror);
		camera.position.z = 6.3;

		let sphere;
		{
			sphere = new THREE.Mesh(
				new THREE.SphereGeometry(100, 20, 20),
				new THREE.MeshNormalMaterial()
			);
			scene.add(sphere);
		}

		async function animate() {
			if (endAnimationFlag) return;

			requestAnimationFrame(animate);

			// mirrors.forEach((mirror) => {
			//   mirror.rotation.x += 0.01 * Math.random();
			// });

			// cylinder.rotation.x += 0.02;
			// cylinder.rotation.y += 0.01;
			// cylinder.rotation.z += 0.012345;

			const time = Date.now() * 0.0005;

			// sphere.position.x = Math.sin(time * 0.7) * 20;
			sphere.position.y = Math.cos(time * 0.5) * 20;
			sphere.position.z = 10; //Math.cos(time * 0.3) * 10;

			for (let i = 1, l = scene.children.length; i < l; i++) {
				// scene.children[i].lookAt(sphere.position);
				scene.children[i].rotation.x = (Math.sin(time) - 1) * 0.5 + TAU * (0.25 + 0.0625);
			}
			// camera.position.x = Math.sin(time) * 10;
			// camera.position.y = Math.sin(time) * 10;
			// camera.position.z = Math.sin(time) * 10;
			// camera.lookAt(scene.position);
			renderer.render(scene, camera);
		}

		animate();
	}
	if (browser) {
	}

	onMount(() => {
		if (browser) {
			main();
		}
	});

	onDestroy(() => {
		endAnimationFlag = true;
		// document.querySelector('#c')[0].remove();
	});
</script>

<canvas bind:this={canvasElement} id="c" width="500" height="500">Loading…</canvas>

<style>
	canvas#c {
		display: block;
		width: min(400px, 90vw);
		height: min(400px, 90vw);
		margin-left: auto;
		margin-right: auto;
	}
</style>
