import THREE from '../../lib/three.js';
import { GizmoObject } from './gizmoObject.js';

class GizmoScaleObject extends GizmoObject {
	constructor(normal, color, size, axisName) {
		super(normal, axisName);

		let start = this.position;
		let end = this.position.clone().add(normal.clone().multiplyScalar(size));
		let material = new THREE.MeshBasicMaterial({ color: color, depthTest: false });

		this.createAxis(start, end, material);
		this.createCube(end, material);
	}

	createAxis(startPosition, endPosition, material) {
		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push(startPosition);
		lineGeometry.vertices.push(endPosition);

		this.line = new THREE.Line(lineGeometry, material);
		this.line.renderOrder = 2;

		this.add(this.line);
	}

	createCube(position, material) {		
		var boxGeometry = new THREE.BoxGeometry(.5, .5, .5);

		this.box = new THREE.Mesh(boxGeometry, material);		
		this.box.position.copy(position);		
		this.box.renderOrder = 2;

		this.add(this.box);
	}
}

export { GizmoScaleObject };