import THREE from '../../lib/three.js';
import { GizmoControl } from './gizmoControl.js';
import { GizmoScaleObject } from './gizmoScaleObject.js';
import { ViewportHelper} from '../util/viewportHelper.js'

let SCALE_FACTOR = .6;

class GizmoScaleControl extends GizmoControl {
	constructor() {
		super();

		var xAxis = new GizmoScaleObject(new THREE.Vector3(1, 0, 0), 0x0000ff, 6, "X");
		var yAxis = new GizmoScaleObject(new THREE.Vector3(0, 1, 0), 0xff0000, 6, "Y");
		var zAxis = new GizmoScaleObject(new THREE.Vector3(0, 0, 1), 0x00ff00, 6, "Z");

		this.add(xAxis);
		this.add(yAxis);
		this.add(zAxis);
	}

	transform(object, delta, environment, intersectionWithGizmoObject) {
		if (!object) return;

		let gizmoObject = intersectionWithGizmoObject.object.parent;
		let gizmoIntersectedNormal = gizmoObject.normal;
		let signal = Math.sign(gizmoIntersectedNormal.dot(delta));
		let scaleAxis = gizmoObject.getAxisNormal();

		scaleAxis.multiplyScalar(delta.length() * signal * SCALE_FACTOR);
		object.scale.add(scaleAxis);
	}
}

export { GizmoScaleControl };