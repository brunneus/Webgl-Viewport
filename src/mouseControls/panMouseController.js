import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper} from '../util/viewportHelper.js';

class PanMouseController extends BaseMouseController {
	constructor() {
		super();
	}

	onMouseDown(environment, event) {
		let planeNormal = environment.camera.gaze.negate();
		let closerIntersection = ViewportHelper.GetCloserIntersectionFromPoint(event.clientX, event.clientY, environment);
		let distance = 0;

		if (closerIntersection)
			distance = new THREE.Plane(planeNormal, 0).distanceToPoint(closerIntersection.point);

		this.plane = new THREE.Plane(planeNormal, -distance);

		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	}

	onMouseMove(environment, event) {
		let camera = environment.camera;

		let lastPoint = new THREE.Vector3(this.lastMouseX, this.lastMouseY, 0);
		let currentPoint = new THREE.Vector3(event.clientX, event.clientY, 0);

		let directionOfLastPoint = ViewportHelper.GetMouseProportionOnScreen(lastPoint, environment.width, environment.height);
		let directionOfCurrentPoint = ViewportHelper.GetMouseProportionOnScreen(currentPoint, environment.width, environment.height);

		directionOfLastPoint.unproject(camera).sub(camera.position).normalize();
		directionOfCurrentPoint.unproject(camera).sub(camera.position).normalize();

		lastPoint = new THREE.Ray(camera.position, directionOfLastPoint).intersectPlane(this.plane);
		currentPoint = new THREE.Ray(camera.position, directionOfCurrentPoint).intersectPlane(this.plane);

		let delta = lastPoint.sub(currentPoint);
		camera.position.add(delta);

		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	}
}

export { PanMouseController };