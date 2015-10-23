import THREE from '../../lib/three.js';
import { BaseAxisTransform } from './baseAxisTransform.js'

class ScaleAxisTransform extends BaseAxisTransform {
	constructor(normal, color, size) {
		super(normal, color, size);

		var material = this.axisMaterial;
		
		var boxGeometry = new THREE.BoxGeometry(.5, .5, .5);

		this.box = new THREE.Mesh(boxGeometry, material);		
		this.box.position.copy(this.line.geometry.vertices[1]);		
		this.box.renderOrder = 2;

		this.add(this.box);
	}
}

export { ScaleAxisTransform };