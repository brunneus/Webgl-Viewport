import THREE from '../../lib/three.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { MoveObjectControl } from './moveObjectControl.js'
import { ScaleObjectControl } from './scaleObjectControl.js'
import { eTransformMode } from './eTransformMode.js'
import { SelectionHelper } from '../util/selectionHelper.js'

class TransformObjectControl {
	constructor() {
		this.moveObjectControl = new MoveObjectControl();
		this.scaleObjectControl = new ScaleObjectControl();

		this.currentMode = eTransformMode.Move;
		this.currentControl = this.moveObjectControl;
	}

	getIntersection(x, y, environment) {
		var intersection = ViewportHelper.GetCloserIntersectionFromPoint(x, y, environment, [this.currentControl]);
		return intersection;
	}

	showCurrentControls(object, scene, camera) {
		scene.remove(this.currentControl);
		
		if(object){
			this.adjustSizeBasedOnSelectedObject(camera, object);
			this.attachCurrentControls(object, scene);			
		}
	}
	
	removeCurrentControls(scene){
		scene.remove(this.currentControl);
	}

	transform(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint) {
		if (this.currentMode == eTransformMode.Move) 
			this.moveObjectControl.moveObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint);		
		else 
			this.scaleObjectControl.scaleObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint);		
		
		this.adjustSizeBasedOnSelectedObject(environment.camera, object);
	}

	changeCurrentMode(transformMode, scene, object) {
		if (this.currentMode === transformMode) return;

		scene.remove(this.currentControl);

		this.currentMode = transformMode;

		if (this.currentMode === eTransformMode.Move)
			this.currentControl = this.moveObjectControl;
		else
			this.currentControl = this.scaleObjectControl;

		this.attachCurrentControls(object, scene, object);
	}

	attachCurrentControls(object, scene) {
		if (object) {
			this.currentControl.position.copy(object.position);
			scene.add(this.currentControl);
		}
	}

	adjustSizeBasedOnSelectedObject(camera, selectedObject) {
		var cameraToSelectedObjectDistance = camera.position.distanceTo(selectedObject.position);
		var delta = new THREE.Vector3(cameraToSelectedObjectDistance, cameraToSelectedObjectDistance, cameraToSelectedObjectDistance);
		delta.multiplyScalar(0.04);
		
		this.currentControl.scale.x = delta.x;
		this.currentControl.scale.y = delta.y;
		this.currentControl.scale.z = delta.z;
	}
}

export { TransformObjectControl };