
class BaseMouseController {
	constructor() {
		this.mouseUpPriority = 0;
		this.mouseDownPriority = 0;
		this.mouseMovePriority = 0;
	}

	onMouseUp(environment, event) {

	}

	onMouseMove(environment, event) {

	}

	onMouseDown(environment, event) {

	}

	onMouseWheel(environment, event) {

	}
	
	onKeydown(environment, event){
		
	}
}

export { BaseMouseController };