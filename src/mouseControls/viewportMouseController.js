/* global THREE */
import THREE from '../../lib/three.js';
import { OrbitMouseController } from './orbitMouseController.js';
import { ZoomMouseController } from './zoomMouseController.js';
import { PanMouseController } from './panMouseController.js';
import { TransformObjectMouseController } from './transformObjectMouseController.js'
import { SelectionHelper } from '../util/selectionHelper.js'
import { eMouseButtons } from './eMouseButtons.js';
import { BaseMouseController } from './baseMouseController.js';

let mouseDownPosition = new THREE.Vector2();

class ViewportMouseController extends BaseMouseController  {
	constructor() {
		super();
		this.orbitMouseController = new OrbitMouseController();
		this.zoomMouseController = new ZoomMouseController();
		this.panMouseController = new PanMouseController();
		
		this.mouseUpPriority = 1;
		this.mouseWheelPriority = 1;
	}

	onMouseUp(environment, event) {
		var mouseUpPosition = new THREE.Vector2(event.clientX, event.clientY);

		if (mouseUpPosition.distanceTo(this.mouseDownPosition) == 0 && event.which == eMouseButtons.Left) {
			environment.selectObjectUnderMouse(event);
		}
	}

	onMouseDown(environment, event) {
		this.mouseDownPosition = new THREE.Vector2(event.clientX, event.clientY);

		if (event.which == eMouseButtons.Left) {			
			this.panMouseController.onMouseDown(environment, event);
		}
		else if (event.which == eMouseButtons.Middle) {
			this.orbitMouseController.onMouseDown(environment, event);
		}
	}

	onMouseMove(environment, event) {
		if (event.which == eMouseButtons.Left) {
			this.panMouseController.onMouseMove(environment, event);
		}
		else if (event.which == eMouseButtons.Middle) {
			this.orbitMouseController.onMouseMove(environment, event);
		}
	}

	onMouseWheel(environment, event) {
		this.zoomMouseController.onMouseWheel(environment, event);
	}
}

export { ViewportMouseController };