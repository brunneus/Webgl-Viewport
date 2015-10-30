import THREE from '../../lib/three.js';

class BaseAxisTransform extends THREE.Object3D {
	constructor(normal, color, size) {
		super();
		
		this.normal = normal;
		this.color = color;
		this.size = size;

		this.axisMaterial = new THREE.MeshBasicMaterial({ color: color, depthTest: false });

		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push(this.position);
		lineGeometry.vertices.push(this.position.clone().add(normal.clone().multiplyScalar(size)));

		this.line = new THREE.Line(lineGeometry, this.axisMaterial);
		this.line.renderOrder = 2;

		this.add(this.line);
	}

	getNormal() {
		var normalAsVector4 = new THREE.Vector4(this.normal.x, this.normal.y, this.normal.z, 0);
		var rotation = new THREE.Matrix4();
		this.matrixWorld.extractRotation(rotation);
		
		var adjustedWithWorldMatrix = normalAsVector4.applyMatrix4(this.matrixWorld);
		return new THREE.Vector3(adjustedWithWorldMatrix.x, adjustedWithWorldMatrix.y, adjustedWithWorldMatrix.z).normalize();
	}
}

export { BaseAxisTransform };