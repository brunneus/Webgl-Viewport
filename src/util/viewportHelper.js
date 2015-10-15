import THREE from '../../lib/three.js';

class ViewportHelper {

	constructor() {
		throw new TypeError('Cannot create an instance of ViewportHelper because it is mean to be static.');
	}

	static GetMouseDirectionOnWorld(x, y, camera, environment) {
		let mouseCoordinate = this.GetMouseProportionOnScreen(new THREE.Vector2(x, y), environment.width, environment.height);
		return mouseCoordinate.unproject(camera);
	}

	static GetCloserIntersectionFromPoint(x, y, environment, objectsToIntersect) {
		let camera = environment.camera;
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

	static CreatePlaneAtPoint(point, planeNormal) {
		var planeAtOringin = new THREE.Plane(planeNormal, 0);
		var distancePointToPlane = planeAtOringin.distanceToPoint(point);
		return new THREE.Plane(planeNormal, -distancePointToPlane);
	}

	static FindDifferenceBetween2DPointsOnPlane(p1, p2, plane, environment) {
		let  camera = environment.camera;
		
		let directionOfP1 = this.GetMouseProportionOnScreen(p1, environment.width, environment.height);
		let directionOfP2 = this.GetMouseProportionOnScreen(p2, environment.width, environment.height);

		directionOfP1.unproject(camera).sub(camera.position).normalize();
		directionOfP2.unproject(camera).sub(camera.position).normalize();

		p1 = new THREE.Ray(camera.position, directionOfP1).intersectPlane(plane);
		p2 = new THREE.Ray(camera.position, directionOfP2).intersectPlane(plane);

		return p1.sub(p2);
	}
}

export { ViewportHelper };