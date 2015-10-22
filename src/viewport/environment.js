import THREE from '../../lib/three.js';
import { ViewportCamera } from './viewportCamera.js';
import { MouseControllerManager } from '../mouseControls/mouseControllerManager.js';
import { Floor } from './floor.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { SelectionHelper } from '../util/selectionHelper.js'

let addedObjects = [];

class Environment {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.near = 0.1;
		this.far = 10000;
		this.fov = 60;

		this.initialize();
		this.addFloor();
		this.addLight();
	}

	initialize() {
		let aspectRatio = this.width / this.height;
		this.scene = new THREE.Scene();

		this.camera = new ViewportCamera(this.fov, aspectRatio, this.near, this.far);
		this.camera.position.x = 25;
		this.camera.position.y = 25;
		this.camera.position.z = 25;
		this.camera.lookAt(new THREE.Vector3());

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(this.width, this.height);
		this.renderer.shadowMapEnabled = true;
		this.renderer.shadowMapSoft = true;
		this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
		this.renderer.setClearColor(0xc6c6c6);
		this.renderer.domElement.setAttribute("tabindex", 0);
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

		this.renderer.domElement.addEventListener('keydown', (event) => {
			mouseControllerManager.onKeydown(this, event);
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

	addFloor() {
		var size = 100;
		var step = 5;

		var gridHelper = new THREE.GridHelper(size, step);
		gridHelper.setColors(0x000000, 0x999999);

		this.scene.add(gridHelper);
	}	

	addLight() {
		this.light = new THREE.DirectionalLight(0xffffff, 1, 0);
		this.scene.add(this.light);
		this.bringLightToCameraPosition();
	}

	createBox(width, height, depth) {
		var boxGeometry = new THREE.BoxGeometry(width, height, depth);
		this.addGeometryOnScene(boxGeometry, height);
	}

	createCylinder(radiusTop, radiusBottom, height) {
		var cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 50);
		this.addGeometryOnScene(cylinderGeometry, height);
	}
	
	createCone(height, width){
		var coneGeometry = new THREE.CylinderGeometry(0, width, height, 50);
		this.addGeometryOnScene(coneGeometry, height);
	}
	
	createTorus(radius, tune, radialSegments, tubeSegments ){
		var torusGeometry = new THREE.TorusGeometry(radius, tune, radialSegments, tubeSegments);
		this.addGeometryOnScene(torusGeometry, radius * 2);
	}
	
	createSphere(radius){
		var sphereGeometry = new THREE.SphereGeometry(radius, 100, 100);
		this.addGeometryOnScene(sphereGeometry, radius * 2);
	}
	
	addGeometryOnScene(geometry, geometryHeight){
		var material = new THREE.MeshPhongMaterial({ color: 0x999999 });
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.y = geometryHeight / 2;
		
		this.scene.add(mesh);
		addedObjects.push(mesh);
	}
	
	bringLightToCameraPosition(){
		this.light.position.copy(this.camera.position);
	}

	getObjectsOnScene() {
		return addedObjects;
	}

	selectObjectUnderMouse(event) {
		var intersect = ViewportHelper.GetCloserIntersectionFromPoint(event.clientX, event.clientY, this, addedObjects);

		if (intersect) {
			SelectionHelper.selectObject(intersect.object, this.scene);
		}
		else {
			SelectionHelper.selectObject(null, this.scene);
		}
	}
}

export { Environment };