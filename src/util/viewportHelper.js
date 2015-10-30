import THREE from '../../lib/three.js';

class ViewportHelper {

	constructor() {
		throw new TypeError('Cannot create an instance of ViewportHelper because it is mean to be static.');
	}

	static GetMouseDirectionOnWorld(x, y, camera, environment) {
		let mouseCoordinate = this.GetMouseProportionOnScreen(new THREE.Vector2(x, y), environment);
		return mouseCoordinate.unproject(camera);
	}

	static CreatePlaneAtPoint(point, planeNormal) {
		var planeAtOringin = new THREE.Plane(planeNormal, 0);
		var distancePointToPlane = planeAtOringin.distanceToPoint(point);
		return new THREE.Plane(planeNormal, -distancePointToPlane);
	}

	static FindDifferenceBetween2DPointsOnPlane(p1, p2, plane, environment) {
		p1 = this.ProjectPointOnPlane(p1, plane, environment);
		p2 = this.ProjectPointOnPlane(p2, plane, environment);

		return p1.sub(p2);
	}

	static ScreenToWorld(p1, environment, objectsTointersect) {
		if(!objectsTointersect)
			objectsTointersect = environment.scene.children;
		
		let intersection = this.GetCloserIntersectionFromPoint(p1.x, p1.y, environment, objectsTointersect);
		let plane;
		let planeNormal = environment.camera.gaze.negate();

		if (intersection)
			plane = this.CreatePlaneAtPoint(intersection.point, planeNormal);
		else
			plane = new THREE.Plane(planeNormal, 0);
			
		return this.ProjectPointOnPlane(p1, plane, environment);
	}

	static GetCloserIntersectionFromPoint(x, y, environment, objectsToIntersect) {
		let camera = environment.camera;
		let mouseCoordinate = this.GetMouseProportionOnScreen(new THREE.Vector2(x, y), environment);

		mouseCoordinate.unproject(camera);

		let dir = mouseCoordinate.sub(camera.position).normalize();
		let rayCaster = new THREE.Raycaster(camera.position, dir, camera.near, camera.far);
		let intersections = rayCaster.intersectObjects(objectsToIntersect, true);

		return intersections[0];
	}

	static ProjectPointOnPlane(point, plane, environment) {
		let camera = environment.camera;

		let direction = this.GetMouseProportionOnScreen(point, environment);
		direction.unproject(camera).sub(camera.position).normalize();

		return new THREE.Ray(camera.position, direction).intersectPlane(plane);
	}

	static GetMouseProportionOnScreen(screenCoordinate, environment) {
		let rectBounds = environment.renderer.domElement.getBoundingClientRect();
		let x = ((screenCoordinate.x - rectBounds.left) / environment.width) * 2 - 1;
		let y = -((screenCoordinate.y - rectBounds.top) / environment.height) * 2 + 1;
		let z = 0.5;

		return new THREE.Vector3(x, y, z);
	}
}

export { ViewportHelper };