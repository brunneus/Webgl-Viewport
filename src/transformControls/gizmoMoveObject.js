import THREE from '../../lib/three.js';
import { GizmoObject } from './gizmoObject.js';

const ARROW_RADIUS_TOP = 0.01;
const ARROW_RADIUS_BOTTOM = 0.2;
const ARROW_HEIGHT = 0.6;

class GizmoMoveObject extends GizmoObject {
	constructor(normal, color, size, axisName) {
		super(normal, axisName);
				
		let start = this.position;
		let end = this.position.clone().add(normal.clone().multiplyScalar(size));
		let material = new THREE.MeshBasicMaterial({ color: color, depthTest: false });

		this.createAxis(start, end, material);
		this.createArrow(end, material);
	}

	createAxis(startPosition, endPosition, material) {
		let lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push(startPosition);
		lineGeometry.vertices.push(endPosition);

		let line = new THREE.Line(lineGeometry, material);
		line.renderOrder = 2;

		this.add(line);
	}

	createArrow(position, material) {

		let arrowGeometry = new THREE.CylinderGeometry(ARROW_RADIUS_TOP, ARROW_RADIUS_BOTTOM, ARROW_HEIGHT);
		let arrow = new THREE.Mesh(arrowGeometry, material);
		arrow.position.copy(position);
		arrow.renderOrder = 2;

		let vectorI = new THREE.Vector3(1, 0, 0);
		let vectorK = new THREE.Vector3(0, 0, 1);

		if (this.getAxisNormal().equals(vectorI))
			arrow.rotateOnAxis(vectorK.negate(), Math.PI / 2);
		else if (this.getAxisNormal().equals(vectorK))
			arrow.rotateOnAxis(vectorI, Math.PI / 2);

		this.add(arrow);
	}
}

export { GizmoMoveObject };