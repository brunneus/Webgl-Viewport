import THREE from '../../lib/three.js';
import { MoveAxisTransform } from './moveAxisTransform.js';
import { ScaleAxisTransform } from './scaleAxisTransform.js';
import { ViewportHelper} from '../util/viewportHelper.js'

class MoveObjectControl extends THREE.Object3D {
	constructor() {
		super();

		let xArrow = new MoveAxisTransform(new THREE.Vector3(1, 0, 0), 0x00ff00, 6);
		let yArrow = new MoveAxisTransform(new THREE.Vector3(0, 1, 0), 0xff0000, 6);
		let zArrow = new MoveAxisTransform(new THREE.Vector3(0, 0, 1), 0x0000ff, 6);

		xArrow.rotateArrow(new THREE.Vector3(0, 0, -1), Math.PI / 2);
		zArrow.rotateArrow(new THREE.Vector3(1, 0, 0), Math.PI / 2);

		this.add(xArrow);
		this.add(yArrow);
		this.add(zArrow);
	}

	moveObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint) {
		if (!object) return;

		let movePlaneNormal = this.findMovePlaneNormal(directionToMove);
		let movePlane = ViewportHelper.CreatePlaneAtPoint(intersectedAxisPoint, movePlaneNormal);
		let delta = ViewportHelper.FindDifferenceBetween2DPointsOnPlane(originPoint, targetPoint, movePlane, environment).multiply(directionToMove).negate();

		object.position.add(delta);
		this.position.add(delta);
	}

	findMovePlaneNormal(direction) {
		if (direction.equals(new THREE.Vector3(1, 0, 0)) || direction.equals(new THREE.Vector3(0, 1, 0)))
			return new THREE.Vector3(0, 0, 1);

		return new THREE.Vector3(0, 1, 0);
	}
}

export { MoveObjectControl };