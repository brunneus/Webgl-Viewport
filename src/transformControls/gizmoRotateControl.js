import THREE from '../../lib/three.js';
import { GizmoRotateObject } from './gizmoRotateObject.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { GizmoControl } from './gizmoControl.js';

let ROTATE_FACTOR = .06;

class GizmoRotateControl extends GizmoControl {
	constructor() {
		super();

		let xRotate = new GizmoRotateObject(new THREE.Vector3(1, 0, 0), 0x00ff00, 6, "X");
		let yRotate = new GizmoRotateObject(new THREE.Vector3(0, 1, 0), 0xff0000, 6, "Y");
		let zRotate = new GizmoRotateObject(new THREE.Vector3(0, 0, 1), 0x0000ff, 6, "Z");

		xRotate.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
		yRotate.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

		this.add(yRotate);
		this.add(xRotate);
		this.add(zRotate);
	}

	transform(object, delta, environment, intersectionWithGizmoObject) {
		if (!object) return;
		
		let gizmoObject = intersectionWithGizmoObject.object.parent;
		
		let signal = Math.sign(delta.dot(gizmoObject.getAxisNormal()));
		let rotationAxis = gizmoObject.getAxisNormal();
		
		object.rotateOnAxis(rotationAxis, ROTATE_FACTOR * signal);
		this.rotateOnAxis(rotationAxis, ROTATE_FACTOR * signal);
	}
}

export { GizmoRotateControl };