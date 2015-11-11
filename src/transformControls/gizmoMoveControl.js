import { GizmoControl } from './gizmoControl.js';
import { GizmoMoveObject } from './gizmoMoveObject.js';
import THREE from '../../lib/three.js';
import { ViewportHelper} from '../util/viewportHelper.js'

class GizmoMoveControl extends GizmoControl {
	constructor() {
		super();

		var xAxis = new GizmoMoveObject(new THREE.Vector3(1, 0, 0), 0x0000ff, 6, "X");
		var yAxis = new GizmoMoveObject(new THREE.Vector3(0, 1, 0), 0xff0000, 6, "Y");
		var zAxis = new GizmoMoveObject(new THREE.Vector3(0, 0, 1), 0x00ff00, 6, "Z");

		this.add(yAxis);
		this.add(xAxis);
		this.add(zAxis);
	}

	transform(object, delta, environment, intersectionWithGizmoObject) {
		if (!object) return;
		
		console.log(delta);

		let gizmoObject = intersectionWithGizmoObject.object.parent;
		let gizmoIntersectedNormal = gizmoObject.normal;
		let deltaLength = delta.length(); 
		let deltaNormalized = delta.normalize();		
		let signal = Math.sign(gizmoIntersectedNormal.dot(deltaNormalized));
		
		gizmoIntersectedNormal.multiplyScalar(deltaLength * signal);
		
		console.log(gizmoIntersectedNormal);

		object.position.add(gizmoIntersectedNormal);
		this.position.add(gizmoIntersectedNormal);
	}

	findMovePlaneNormal(gizmoObject) {
		var xAxis = this.children[0];
		var yAxis = this.children[1];
		var zAxis = this.children[2];

		if (gizmoObject.axisName === "X")
			return new THREE.Vector3().crossVectors(xAxis.getNormal(), yAxis.getNormal());

		if (gizmoObject.axisName === "Y")
			return new THREE.Vector3().crossVectors(yAxis.getNormal(), zAxis.getNormal());

		return new THREE.Vector3().crossVectors(zAxis.getNormal(), yAxis.getNormal());
	}
}

export { GizmoMoveControl };