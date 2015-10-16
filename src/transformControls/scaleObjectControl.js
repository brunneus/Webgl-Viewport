import THREE from '../../lib/three.js';
import { MoveAxisTransform } from './moveAxisTransform.js';
import { ScaleAxisTransform } from './scaleAxisTransform.js';
import { ViewportHelper} from '../util/viewportHelper.js'

class ScaleObjectControl extends THREE.Object3D {
	constructor() {
		super();

		let xScale = new ScaleAxisTransform(new THREE.Vector3(1, 0, 0), 0x00ff00, 10);
		let yScale = new ScaleAxisTransform(new THREE.Vector3(0, 1, 0), 0xff0000, 10);
		let zScale = new ScaleAxisTransform(new THREE.Vector3(0, 0, 1), 0x0000ff, 10);

		this.add(xScale);
		this.add(yScale);
		this.add(zScale);
	}

	scaleObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint) {
		if (!object) return;

		let movePlaneNormal = this.findMovePlaneNormal(directionToMove);
		let movePlane = ViewportHelper.CreatePlaneAtPoint(intersectedAxisPoint, movePlaneNormal);
		let delta = ViewportHelper.FindDifferenceBetween2DPointsOnPlane(originPoint, targetPoint, movePlane, environment).multiply(directionToMove).negate();

		object.scale.add(delta);
	}

	findMovePlaneNormal(direction) {
		if (direction.equals(new THREE.Vector3(1, 0, 0)) || direction.equals(new THREE.Vector3(0, 1, 0)))
			return new THREE.Vector3(0, 0, 1);

		return new THREE.Vector3(0, 1, 0);
	}
}

export { ScaleObjectControl };