import THREE from '../../lib/three.js'

let worldUp = new THREE.Vector3(0, 1, 0);

class ViewportCamera extends THREE.PerspectiveCamera {
	constructor(fov, aspectRatio, near, far) {
		super(fov, aspectRatio, near, far);
	}

	get gaze() {
		let cameraLocalSpaceDirection = new THREE.Vector3(0, 0, -1);

		cameraLocalSpaceDirection.applyQuaternion(this.quaternion)
								 .normalize();

		return cameraLocalSpaceDirection;
	}

	get rightAxis() {
		let right = new THREE.Vector3();

		right.crossVectors(worldUp, this.gaze)
			 .normalize();

		return right;
	}

	get upAxis() {
		let up = new THREE.Vector3();

		up.crossVectors(this.gaze, this.rightAxis)
	      .normalize();

		return up;
	}
}

export { ViewportCamera };