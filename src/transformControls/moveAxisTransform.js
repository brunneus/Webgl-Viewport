import THREE from '../../lib/three.js';
import { BaseAxisTransform } from './baseAxisTransform.js'

let ARROW_RADIUS_TOP = 0.01;
let ARROW_RADIUS_BOTTOM = 0.2;
let ARROW_HEIGHT = 0.6;

class MoveAxisTransform extends BaseAxisTransform {
	constructor(normal, color, size) {
		super(normal, color, size);

		var material = this.axisMaterial;

		var arrowGeometry = new THREE.CylinderGeometry(ARROW_RADIUS_TOP, ARROW_RADIUS_BOTTOM, ARROW_HEIGHT);

		this.arrow = new THREE.Mesh(arrowGeometry, material);
		this.arrow.position.copy(this.line.geometry.vertices[1]);

		this.arrow.renderOrder = 2;

		this.add(this.arrow);
	}

	rotateArrow(axis, angle) {
		this.arrow.rotateOnAxis(axis, angle);
	}
}

export { MoveAxisTransform };