import THREE from '../../lib/three.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { MoveObjectControl } from './moveObjectControl.js'
import { ScaleObjectControl } from './scaleObjectControl.js'
import { eTransformMode } from './eTransformMode.js'

class TransformObjectControl {
	constructor() {
		this.moveObjectControl = new MoveObjectControl();
		this.scaleObjectControl = new ScaleObjectControl();
		
		this.currentMode = eTransformMode.Move;
		this.currentControl = this.moveObjectControl;
		
		this.currentMode = eTransformMode.Scale;
		this.currentControl = this.scaleObjectControl;
	}

	getIntersection(x, y, environment) {
		var intersection = ViewportHelper.GetCloserIntersectionFromPoint(x, y, environment, [this.currentControl]);
		return intersection;
	}

	showCurrentControls(object, scene) {
		scene.remove(this.currentControl);

		if (object) {
			this.currentControl.position.copy(object.position);
			scene.add(this.currentControl);
		}
	}

	transform(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint) {
		if (this.currentMode == eTransformMode.Move) {
			this.moveObjectControl.moveObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint);
		}
		else {
			this.scaleObjectControl.scaleObject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint);
		}
	}

	changeCurrentMode(transformMode, scene, object) {
		if (this.currentMode === transformMode) return;

		this.currentMode = transformMode;

		if (this.currentMode === eTransformMode.Move)
			this.currentControl = this.moveObjectControl;
		else
			this.currentControl = this.scaleObjectControl;
		
		this.showCurrentControls(scene, object);
	}
}

export { TransformObjectControl };