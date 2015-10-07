import THREE from '../../lib/three.js';
import { ViewportCamera } from './viewportCamera.js';
import { MouseControllerManager } from '../mouseControls/mouseControllerManager.js';
import { Floor } from './floor.js';

class Environment {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.near = 0.1;
		this.far = 1000;
		this.fov = 60;

		this.initialize();
		this.addDefaultEntities();
	}

	initialize() {
		let aspectRatio = this.width / this.height;
		this.scene = new THREE.Scene();

		this.camera = new ViewportCamera(this.fov, aspectRatio, this.near, this.far);
		this.camera.position.x = 15;
		this.camera.position.y = 15;
		this.camera.position.z = 15;
		this.camera.lookAt(new THREE.Vector3());

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(this.width, this.height);
		this.renderer.shadowMapEnabled = true;
		this.renderer.shadowMapSoft = true;
		this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

		this.initializeControls();
		this.disableContextMenu();
		this.render();
	}

	initializeControls() {
		var mouseControllerManager = new MouseControllerManager();

		this.renderer.domElement.addEventListener('mousedown', (event) => {
			mouseControllerManager.onMouseDown(this, event);
		});

		this.renderer.domElement.addEventListener('mouseup', (event) => {
			mouseControllerManager.onMouseUp(this, event);
		});

		this.renderer.domElement.addEventListener('mousemove', (event) => {
			mouseControllerManager.onMouseMove(this, event);
		});

		this.renderer.domElement.addEventListener('mousewheel', (event) => {
			mouseControllerManager.onMouseWheel(this, event);
		});
	}

	disableContextMenu() {
		this.renderer.domElement.oncontextmenu = function (event) { return false; }
	}

	render() {
		requestAnimationFrame(() => { this.render() });
		this.renderer.render(this.scene, this.camera);
	}

	getContainer() {
		return this.renderer.domElement;
	}

	resize(width, height) {
		this.width = width;
		this.height = height;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.width, this.height);
	}

	addDefaultEntities() {
		this.addFloor();
	}

	addFloor() {
		var floor = new Floor(100);
		floor.addToScene(this.scene);
	}
}

export { Environment };