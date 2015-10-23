import THREE from '../../lib/three.js';
import { BaseMouseController } from './baseMouseController.js';
import { ViewportHelper} from '../util/viewportHelper.js';
import { TransformObjectControl } from '../transformControls/transformObjectControl.js'
import { SelectionHelper } from '../util/selectionHelper.js'
import { eTransformMode } from '../transformControls/eTransformMode.js'
import { eMouseButtons } from './eMouseButtons.js';

class TransformObjectMouseController extends BaseMouseController {
	constructor() {
		super();

		this.transformObjectControl = new TransformObjectControl();
		this.mouseMovePriority = 1;
	}

	onMouseDown(environment, event) {
		if (event.which == eMouseButtons.Left) {
			this.isMousePressed = true;
			this.lastMousePosition = new THREE.Vector3(event.clientX, event.clientY);
			this.intersection = this.transformObjectControl.getIntersection(event.clientX, event.clientY, environment);
		}
	}

	onMouseUp(environment, event) {
		let selectedObject = SelectionHelper.getSelectedObject();
		this.transformObjectControl.showCurrentControls(selectedObject, environment.scene, environment.camera);
		this.isMousePressed = false;
	}

	onMouseMove(environment, event) {
		let currentPosition = new THREE.Vector3(event.clientX, event.clientY);
		let selectedObject = SelectionHelper.getSelectedObject();

		if (selectedObject) {
			this.transformObjectControl.adjustSizeBasedOnSelectedObject(environment.camera, selectedObject);

			if (this.isMousePressed && this.intersection) {
				let intersectedAxis = this.intersection.object.parent;
				let intersectedAxisPoint = this.intersection.point;
				let intersectedAxisDirection = intersectedAxis.normal;

				this.transformObjectControl.transform(this.lastMousePosition, currentPosition, selectedObject, environment, intersectedAxisDirection, intersectedAxisPoint);
				event.cancelBubble = true;
			}
		}

		this.lastMousePosition = currentPosition;
	}

	onKeydown(environment, event) {
		let mKeyCode = 77;
		let sKeyCode = 83;
		let deleteKeyCode = 46;
		let selectedObject = SelectionHelper.getSelectedObject();

		if (event.keyCode === mKeyCode) {
			this.transformObjectControl.changeCurrentMode(eTransformMode.Move, environment.scene, selectedObject);
		}
		else if (event.keyCode === sKeyCode) {
			this.transformObjectControl.changeCurrentMode(eTransformMode.Scale, environment.scene, selectedObject);
		}
		else if (event.keyCode === deleteKeyCode) {
			environment.removeObject(selectedObject);
			this.transformObjectControl.removeCurrentControls(environment.scene);
			SelectionHelper.removeSelection(environment.scene);
		}

		this.transformObjectControl.adjustSizeBasedOnSelectedObject(environment.camera, selectedObject);
	}

	onMouseWheel(environment, event) {
		var camera = environment.camera;
		let selectedObject = SelectionHelper.getSelectedObject();

		if (selectedObject) {
			this.transformObjectControl.adjustSizeBasedOnSelectedObject(camera, selectedObject);
		}
	}
}

export { TransformObjectMouseController };