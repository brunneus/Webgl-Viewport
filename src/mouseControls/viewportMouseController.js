import { OrbitMouseController } from './orbitMouseController.js';
import { ZoomMouseController } from './zoomMouseController.js';
import { PanMouseController } from './panMouseController.js';
import { eMouseButtons } from './eMouseButtons.js';

class ViewportMouseController{
	constructor(){
		this.orbitMouseController = new OrbitMouseController();
		this.zoomMouseController = new ZoomMouseController();
		this.panMouseController = new PanMouseController();
	}
	
	onMouseDown(environment, event){
		if (event.which == eMouseButtons.Left) {
			this.panMouseController.onMouseDown(environment, event);
		}
		else if (event.which == eMouseButtons.Middle) {
			this.orbitMouseController.onMouseDown(environment, event);
		}
	}
	
	onMouseMove(environment, event){
		if (event.which == eMouseButtons.Left) {
			this.panMouseController.onMouseMove(environment, event);
		}
		else if (event.which == eMouseButtons.Middle) {
			this.orbitMouseController.onMouseMove(environment, event);
		}		
	}
	
	onMouseWheel(environemnt, event){
		this.zoomMouseController.onMouseWheel(environemnt, event);
	}
}

export { ViewportMouseController };