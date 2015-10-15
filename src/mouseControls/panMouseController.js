import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper} from '../util/viewportHelper.js';

class PanMouseController extends BaseMouseController {
	constructor() {
		super();
	}

	onMouseDown(environment, event) {
		let planeNormal = environment.camera.gaze.negate();
		let closerIntersection = ViewportHelper.GetCloserIntersectionFromPoint(event.clientX, event.clientY, environment, environment.scene.children);

		if (closerIntersection)
			this.plane = ViewportHelper.CreatePlaneAtPoint(closerIntersection.point, planeNormal);
		else
			this.plane = new THREE.Plane(planeNormal, 0);

		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	}

	onMouseMove(environment, event) {
		let camera = environment.camera;
		let lastPoint = new THREE.Vector3(this.lastMouseX, this.lastMouseY, 0);
		let currentPoint = new THREE.Vector3(event.clientX, event.clientY, 0);		
		let delta = ViewportHelper.FindDifferenceOf2DPointsOnPlane(lastPoint, currentPoint, this.plane, environment);
		camera.position.add(delta);

		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	}
}

export { PanMouseController };