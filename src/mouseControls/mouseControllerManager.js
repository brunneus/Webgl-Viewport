import { ViewportMouseController } from './viewportMouseController.js';
import { TransformObjectMouseController } from './transformObjectMouseController.js'
import { eMouseControllers } from './eMouseControllers.js'

let instance = null;
let availableControllers = [];

class MouseControllerManager {
	constructor() {
        if (!instance) {
            instance = this;
			let viewportMouseController = new ViewportMouseController();
			let transformObjectMouseController = new TransformObjectMouseController();
			
            this.currentControllers = [viewportMouseController, transformObjectMouseController];
			
			availableControllers[eMouseControllers.ViewportMouseController] = viewportMouseController;
			availableControllers[eMouseControllers.TransformObjectMouseController] = transformObjectMouseController;
        }

        return instance;
    }

	onMouseUp(environment, event) {	
		var sortedByMouseUpPriority = this.currentControllers.sort(function(c1, c2) { return c2.mouseUpPriority - c1.mouseUpPriority});
			
		sortedByMouseUpPriority.some(function (controller) {
			controller.onMouseUp(environment, event);
			
			if (event.cancelBubble) return true;
		});
		
		event.preventDefault();
	}

	onMouseMove(environment, event) {
		var sortedByMouseMovePriority = this.currentControllers.sort(function(c1, c2) { return c2.mouseMovePriority - c1.mouseMovePriority});
		
		sortedByMouseMovePriority.some(function (controller) {
			controller.onMouseMove(environment, event);
			
			if (event.cancelBubble) return true;
		});	
	
		event.preventDefault();
	}

	onMouseDown(environment, event) {
		var sortedByMouseDownPriority = this.currentControllers.sort(function(c1, c2) { return c2.mouseDownPriority - c1.mouseDownPriority});
		
		sortedByMouseDownPriority.some(function (controller) {
			controller.onMouseDown(environment, event);
			
			if (event.cancelBubble) return true;
		});
		
		event.preventDefault();
	}

	onMouseWheel(environment, event) {
		var sortedByMouseWheelPriority = this.currentControllers.sort(function(c1, c2) { return c2.mouseWheelPriority - c1.mouseWheelPriority});
		
		sortedByMouseWheelPriority.some(function (controller) {
			controller.onMouseWheel(environment, event);
			
			if (event.cancelBubble) return true;
		});	
		
		event.preventDefault();
	}

	onKeydown(environment, event) {		
		this.currentControllers.forEach(function (controller) {
			controller.onKeydown(environment, event);
			
			if (event.cancelBubble) return;
		});	
				
		event.preventDefault();		
	}
	
	getController(mouseController){
		return availableControllers[mouseController];
	}
}

export { MouseControllerManager };