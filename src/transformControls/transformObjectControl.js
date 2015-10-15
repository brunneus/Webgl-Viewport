import THREE from '../../lib/three.js';
import { ViewportHelper} from '../util/viewportHelper.js'
import { MoveObjectControl } from './moveObjectControl.js'

let xAxisEndPosition;
let yAxisEndPosition;
let zAxisEndPosition;

let lines = [];
let moveArrows = [];

class TransformObjectControl {
	constructor() {
		this.moveObjectControl = new MoveObjectControl();
	}

	transform() {

	}

	getIntersection(x, y, environment) {
		var intersection = ViewportHelper.GetCloserIntersectionFromPoint(x, y, environment, [this.moveObjectControl]);
		return intersection;
	}

	showCurrentControls(object, scene) {
		scene.remove(this.moveObjectControl);

		if (object) {
			this.moveObjectControl.position.copy(object.position);
			scene.add(this.moveObjectControl);
		}
	}

	moveOject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint) {
		this.moveObjectControl.moveOject(originPoint, targetPoint, object, environment, directionToMove, intersectedAxisPoint);
	}
}

export { TransformObjectControl };