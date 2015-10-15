import THREE from '../../lib/three.js';

let ARROW_RADIUS_TOP = 0.01;
let ARROW_RADIUS_BOTTOM = 0.2;
let ARROW_HEIGHT = 0.6;

class MoveArrow extends THREE.Object3D {
	constructor(normal, color, size) {
		super();
		this.normal = normal;
		this.color = color;
		this.size = size;

		var material = new THREE.MeshBasicMaterial({ color: color, depthTest: false });

		var lineGeometry = new THREE.Geometry();
		var arrowGeometry = new THREE.CylinderGeometry(ARROW_RADIUS_TOP, ARROW_RADIUS_BOTTOM, ARROW_HEIGHT);

		lineGeometry.vertices.push(this.position);
		lineGeometry.vertices.push(this.position.clone().add(normal.clone().multiplyScalar(size)));

		this.arrow = new THREE.Mesh(arrowGeometry, material);
		this.line = new THREE.Line(lineGeometry, material);
		this.arrow.position.copy(lineGeometry.vertices[1]);

		this.line.renderOrder = 2;
		this.arrow.renderOrder = 2;

		this.add(this.arrow);
		this.add(this.line);
	}

	rotateArrow(axis, angle) {
		this.arrow.rotateOnAxis(axis, angle);
	}

	getNormal() {
		return this.normal();
	}
}

export { MoveArrow };