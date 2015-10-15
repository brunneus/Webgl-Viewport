import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper} from '../util/viewportHelper.js';
import { TransformObjectControl } from '../transformControls/transformObjectControl.js'
import { SelectionHelper } from '../util/selectionHelper.js'

class TransformObjectMouseController {
	constructor() {
		this.transformObjectControl = new TransformObjectControl();
	}

	onMouseDown(environment, event) {
		this.isMousePressed = true;
		this.lastMousePosition = new THREE.Vector3(event.clientX, event.clientY);
		this.intersection = this.transformObjectControl.getIntersection(event.clientX, event.clientY, environment);

		event.cancelBubble = this.intersection;
	}

	onMouseUp(environment, event) {
		var selectedObject = SelectionHelper.getSelectedObject();
		this.transformObjectControl.showCurrentControls(selectedObject, environment.scene);
		this.isMousePressed = false;
	}

	onMouseMove(environment, event) {
		var currentPosition = new THREE.Vector3(event.clientX, event.clientY);

		if (this.isMousePressed && this.intersection) {
			var selectedObject = SelectionHelper.getSelectedObject();
			var intersectedAxis = this.intersection.object.parent;
			var intersectedAxisPoint = this.intersection.point;
			var intersectedAxisDirection = intersectedAxis.normal;

			this.transformObjectControl.moveOject(this.lastMousePosition, currentPosition, selectedObject, environment, intersectedAxisDirection, intersectedAxisPoint);
			event.cancelBubble = true;
		}

		this.lastMousePosition = currentPosition;
	}

}

export { TransformObjectMouseController };