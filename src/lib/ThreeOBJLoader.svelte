<script>
	import * as THREE from 'three';
	import { browser } from '$app/environment';

	export let file;

	if (browser) {
		//////////////////////////
		const canvasSize = 1000;

		async function main() {
			const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
			const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
			const canvas = document.querySelector('#c');
			const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
			renderer.setClearColor(0x000000, 0);
			const fov = 45;
			const aspect = 2; // the canvas default
			const near = 0.1;
			const far = 50;
			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
			camera.position.set(4, 0, 0);

			const controls = new OrbitControls(camera, canvas);
			controls.target.set(0, 0, 0);
			controls.update();

			const scene = new THREE.Scene();

			{
				const skyColor = 0xb1e1ff; // light blue
				const groundColor = 0xb97a20; // brownish orange
				const intensity = 1;
				const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
				scene.add(light);
			}

			{
				const color = 0xffffff;
				const intensity = 1;
				const light = new THREE.DirectionalLight(color, intensity);
				light.position.set(0, 10, 0);
				light.target.position.set(-5, 0, 0);
				scene.add(light);
				scene.add(light.target);
			}

			{
				const objLoader = new OBJLoader();
				objLoader.load(file, (root) => {
					scene.add(root);
				});
			}

			function resizeRendererToDisplaySize(renderer) {
				const canvas = renderer.domElement;
				const width = canvasSize; // canvas.clientWidth;
				const height = canvasSize; // canvas.clientHeight;
				const needResize = canvas.width !== width || canvas.height !== height;
				if (needResize) {
					renderer.setSize(width, height, false);
				}
				return needResize;
			}

			function render() {
				if (resizeRendererToDisplaySize(renderer)) {
					const canvas = renderer.domElement;
					camera.aspect = canvasSize / canvasSize; //canvas.clientWidth / canvas.clientHeight;
					camera.updateProjectionMatrix();
				}

				renderer.render(scene, camera);

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		main();
	}
</script>

<canvas id="c" width="500" height="500"></canvas>
