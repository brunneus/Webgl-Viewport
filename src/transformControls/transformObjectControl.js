import THREE from '../../lib/three.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { GizmoMoveControl } from './gizmoMoveControl.js'
import { GizmoScaleControl } from './gizmoScaleControl.js'
import { eTransformMode } from './eTransformMode.js'
import { SelectionHelper } from '../util/selectionHelper.js'
import { GizmoRotateControl } from './gizmoRotateControl.js';

class TransformObjectControl {
	constructor() {
		this.moveControl = new GizmoMoveControl();
		this.scaleControl = new GizmoScaleControl();
		this.rotateControl = new GizmoRotateControl();

		this.currentMode = eTransformMode.Move;
		this.currentControl = this.moveControl;
	}

	getIntersection(x, y, environment) {
		var intersection = ViewportHelper.GetCloserIntersectionFromPoint(x, y, environment, [this.currentControl]);
		return intersection;
	}

	showCurrentControls(object, scene, camera) {
		scene.remove(this.currentControl);

		if (object) {
			this.adjustSizeBasedOnSelectedObject(camera, object);
			this.attachCurrentControls(object, scene);
		}
	}

	removeCurrentControls(scene) {
		scene.remove(this.currentControl);
	}

	transform(object, delta, environment, intersectionWithGizmoObject) {
		this.currentControl.transform(object, delta, environment, intersectionWithGizmoObject)
		this.adjustSizeBasedOnSelectedObject(environment.camera, object);
	}

	changeCurrentMode(transformMode, scene, object) {
		if (this.currentMode === transformMode) return;

		scene.remove(this.currentControl);

		this.currentMode = transformMode;

		if (this.currentMode === eTransformMode.Move)
			this.currentControl = this.moveControl;
		else if (this.currentMode === eTransformMode.Scale)
			this.currentControl = this.scaleControl;
		else
			this.currentControl = this.rotateControl;

		this.attachCurrentControls(object, scene, object);
	}

	attachCurrentControls(object, scene) {
		if (object) {
			this.update(object);
			scene.add(this.currentControl);
		}
	}

	adjustSizeBasedOnSelectedObject(camera, selectedObject) {
		var cameraToSelectedObjectDistance = camera.position.distanceTo(selectedObject.position);
		var delta = new THREE.Vector3(cameraToSelectedObjectDistance, cameraToSelectedObjectDistance, cameraToSelectedObjectDistance);
		delta.multiplyScalar(0.04);

		this.currentControl.scale.copy(delta);
	}

	update(object) {
		this.currentControl.copyRotation(object.rotation);
		this.currentControl.position.copy(object.position);
	}
}

export { TransformObjectControl };