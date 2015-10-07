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