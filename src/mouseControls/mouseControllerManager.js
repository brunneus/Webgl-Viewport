import { ViewportMouseController } from './viewportMouseController.js';

let instance = null;

class MouseControllerManager {
	constructor() {
        if (!instance) {
            instance = this;
            this.current = new ViewportMouseController();
        }

        return instance;
    }

	onMouseUp(environment, event) {
		this.current.onMouseUp(environment, event);
	}

	onMouseMove(environment, event) {
		this.current.onMouseMove(environment, event);
	}

	onMouseDown(environment, event) {
		this.current.onMouseDown(environment, event);
	}

	onMouseWheel(environment, event) {
		this.current.onMouseWheel(environment, event);
	}
}

export { MouseControllerManager };