/* global THREE */
import THREE from '../../lib/three.js';
import { OrbitMouseController } from './orbitMouseController.js';
import { ZoomMouseController } from './zoomMouseController.js';
import { PanMouseController } from './panMouseController.js';
import { eMouseButtons } from './eMouseButtons.js';

let mouseDownPosition = new THREE.Vector2();

class ViewportMouseController {
	constructor() {
		this.orbitMouseController = new OrbitMouseController();
		this.zoomMouseController = new ZoomMouseController();
		this.panMouseController = new PanMouseController();
	}

	onMouseUp(environment, event) {
		var mouseUpPosition = new THREE.Vector2(event.clientX, event.clientY);

		if (mouseUpPosition.distanceTo(this.mouseDownPosition) == 0) {
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

		event.preventDefault();
	}

	onMouseMove(environment, event) {
		if (event.which == eMouseButtons.Left) {
			this.panMouseController.onMouseMove(environment, event);
		}
		else if (event.which == eMouseButtons.Middle) {
			this.orbitMouseController.onMouseMove(environment, event);
		}
	}

	onMouseWheel(environemnt, event) {
		this.zoomMouseController.onMouseWheel(environemnt, event);
		event.preventDefault();
	}
}

export { ViewportMouseController };