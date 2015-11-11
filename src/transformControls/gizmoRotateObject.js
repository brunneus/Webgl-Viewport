import THREE from '../../lib/three.js';
import { GizmoObject } from './gizmoObject.js';

class GizmoRotateObject extends GizmoObject {
	constructor(normal, color, radius, axisName) {
		super(normal, axisName);
		
		var material = new THREE.LineBasicMaterial({ color: color, depthTest: false });
		var geometry = new THREE.CircleGeometry(radius, 50);
		geometry.vertices.shift();
		
		this.circle = new THREE.Line(geometry, material);
		this.circle.renderOrder = 2;
		
		this.add(this.circle);
	}
}

export { GizmoRotateObject };