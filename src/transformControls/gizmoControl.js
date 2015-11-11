import THREE from '../../lib/three.js';

class GizmoControl extends THREE.Object3D {

	copyRotation(rotation) {
		this.rotation.copy(rotation);
		this.updateMatrixWorld(true);
	}

	transform(object, delta, environment, intersectionWithGizmoObject) {
		
	}
}

export { GizmoControl };

