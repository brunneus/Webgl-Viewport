import THREE from '../../lib/three.js';

let selectedObject;

class SelectionHelper {
	constructor() {

	}
	
	static getSelectedObject(){
		return selectedObject
	} 

	static selectObject(object, scene) {
		scene.remove(this.selectedObject);

		if (object) {
			this.selectedObject = new THREE.BoxHelper(object);
			scene.add(this.selectedObject);
		}

		selectedObject = object;
	}
}

export { SelectionHelper };