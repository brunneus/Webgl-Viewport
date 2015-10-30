import THREE from '../../lib/three.js';

class GizmoObject extends THREE.Object3D {
	constructor(normal, axisName){
		super();
		
		this._normal = normal;
		this.axisName = axisName;
	}
	get normal(){
		var v4 = new THREE.Vector4(this._normal.x, this._normal.y, this._normal.z, 0);
		v4.applyMatrix4(this.matrixWorld);
		return new THREE.Vector3(v4.x, v4.y, v4.z).normalize();
	}
	
	set normal(value){		
		// this.normal = value;
	}
	
	getAxisNormal(){
		if (this.axisName === "X")
			return new THREE.Vector3(1, 0, 0);
		else if (this.axisName === "Y")
			return new THREE.Vector3(0, 1, 0);
			
		return new THREE.Vector3(0, 0, 1);
	}
}

export { GizmoObject };

