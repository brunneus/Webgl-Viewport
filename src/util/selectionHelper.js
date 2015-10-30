import THREE from '../../lib/three.js';

let selectedObject;
let selectionBox;

class SelectionHelper {
	constructor() {

	}
	
	static getSelectedObject(){
		return selectedObject
	}
	
	static removeSelection(scene){
		scene.remove(selectionBox);
		selectedObject = null;
	}

	static selectObject(object, scene) {
		scene.remove(selectionBox);

		if (object) {
			selectionBox = new THREE.BoxHelper(object, 0xffffff);
			selectionBox.renderOrder = 1;		
			selectionBox.material.depthTest = false;
			scene.add(selectionBox);
		}

		selectedObject = object;
	}
}

export { SelectionHelper };