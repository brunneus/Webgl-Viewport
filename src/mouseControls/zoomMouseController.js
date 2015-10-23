import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper} from '../util/viewportHelper.js';

const ZOOM_FACTOR = -0.08;
const ZOOM_DEFAULT_FACTOR = -3;

class ZoomMouseController extends BaseMouseController {
	constructor() {
		super();
	}

	onMouseWheel(environment, event) {
		var camera = environment.camera;
		var intersection = ViewportHelper.GetCloserIntersectionFromPoint(event.clientX, event.clientY, environment, environment.getObjectsOnScene());
		var worldPosition = new THREE.Vector3(0, 0, 0);
		var factor = 0;

		if (intersection) {
			worldPosition = intersection.point;
			factor = (intersection.distance * Math.sign(event.wheelDelta)) * ZOOM_FACTOR;
		}
		else {
			worldPosition = ViewportHelper.GetMouseDirectionOnWorld(event.clientX, event.clientY, camera, environment);
			factor = ZOOM_DEFAULT_FACTOR * Math.sign(event.wheelDelta);
		}

		var zoomDirection = camera.position.clone().sub(worldPosition).normalize();
		zoomDirection.multiplyScalar(factor);

		camera.position.add(zoomDirection);
		camera.updateMatrixWorld();
		environment.bringLightToCameraPosition();
	}
}

export { ZoomMouseController };