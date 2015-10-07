import THREE from '../../lib/three.js';

class ViewportHelper {

	constructor() {
		throw new TypeError('Cannot create an instance of ViewportHelper because it is mean to be static.');
	}

	static GetMouseDirectionOnWorld(x, y, camera, environment) {
		let mouseCoordinate = this.GetMouseProportionOnScreen(new THREE.Vector2(x, y), environment.width, environment.height);
		return mouseCoordinate.unproject(camera);
	}

	static GetCloserIntersectionFromPoint(x, y, environment) {		
		let camera = environment.camera;
		let objectsToIntersect = environment.scene.children;
		let mouseCoordinate = this.GetMouseProportionOnScreen(new THREE.Vector2(x, y), environment.width, environment.height);

		mouseCoordinate.unproject(camera);

		let dir = mouseCoordinate.sub(camera.position).normalize();
		let rayCaster = new THREE.Raycaster(camera.position, dir, camera.near, camera.far);
		let intersections = rayCaster.intersectObjects(objectsToIntersect, true);
		
		return intersections[0];
	}	

	static GetMouseProportionOnScreen(screenCoordinate, width, height) {
		let x = (screenCoordinate.x / width) * 2 - 1;
		let y = -(screenCoordinate.y / height) * 2 + 1;
		let z = 0.5;

		return new THREE.Vector3(x, y, z);
	}
}

export { ViewportHelper };