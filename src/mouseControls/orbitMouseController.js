import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper } from './../util/viewportHelper.js';

const PRECISION = 0.000001;
const worldUpAxis = new THREE.Vector3(0, 1, 0);

class OrbitMouseController extends BaseMouseController {
	constructor() {
		super();
		this.moveStartX = 0;
		this.moveStartY = 0;
		this.smoothness = 0.003;
		this.target = new THREE.Vector3();
	}

	onMouseDown(environment, event) {
		this.moveStartX = event.clientX;
		this.moveStartY = event.clientY;

		let mouseIntersection = ViewportHelper.GetCloserIntersectionFromPoint(event.clientX, event.clientY, environment, environment.scene.children);

		if (mouseIntersection)
			this.target = mouseIntersection.point;
		else
			this.target = new THREE.Vector3();
			
		console.log(mouseIntersection);
	}

	onMouseMove(environment, event) {
		let dx = (this.moveStartX - event.clientX) * this.smoothness;
		let dy = (this.moveStartY - event.clientY) * this.smoothness;
		let camera = environment.camera;

		this.moveStartX = event.clientX;
		this.moveStartY = event.clientY;

		let xRotation = new THREE.Quaternion().setFromAxisAngle(environment.camera.rightAxis, -dy);
		let yRotation = new THREE.Quaternion().setFromAxisAngle(worldUpAxis, dx);

		camera.position.sub(this.target);

		camera.position.applyQuaternion(xRotation);
		camera.position.applyQuaternion(yRotation);
		this.lookAround(camera, xRotation, yRotation);

		camera.position.add(this.target);
		environment.bringLightToCameraPosition();
	}

	lookAround(camera, xRotation, yRotation) {
		let finalRotation = new THREE.Quaternion();

		finalRotation.multiplyQuaternions(xRotation, camera.quaternion);
		finalRotation.multiplyQuaternions(yRotation, finalRotation);

		camera.quaternion.copy(finalRotation);
	}
}

export { OrbitMouseController };