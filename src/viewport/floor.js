import THREE from '../../lib/three.js';

let gridLines = [];
let DISTANCE_GRID_FLOOR = 0.05;
let GRID_BLOCK_SIZE = 5;
let SECUNDARY_LINE_COLOR = 0x999999;
let PRIMARY_LINE_COLOR = 0x000000;

class Floor extends THREE.BoxGeometry {
	constructor(size) {
		super(size, .01, size);
		this.createLinesAlongAxis(size);
	}

	createLinesAlongAxis(floorSize) {
		let halfFloorSize = floorSize / 2;

		for (let i = -halfFloorSize; i < halfFloorSize; i += GRID_BLOCK_SIZE) {
			let lineGeometryAlongXAxis = new THREE.Geometry();
			let lineGeometryAlongZAxis = new THREE.Geometry();

			lineGeometryAlongZAxis.vertices.push(
				new THREE.Vector3(-halfFloorSize, DISTANCE_GRID_FLOOR, i),
				new THREE.Vector3(halfFloorSize, DISTANCE_GRID_FLOOR, i)
				);

			lineGeometryAlongXAxis.vertices.push(
				new THREE.Vector3(i, DISTANCE_GRID_FLOOR, halfFloorSize),
				new THREE.Vector3(i, DISTANCE_GRID_FLOOR, -halfFloorSize)
				);

			let material = new THREE.LineBasicMaterial({ color: i === 0 ? PRIMARY_LINE_COLOR : SECUNDARY_LINE_COLOR });

			gridLines.push(new THREE.Line(lineGeometryAlongXAxis, material));
			gridLines.push(new THREE.Line(lineGeometryAlongZAxis, material));
		}
	}

	addToScene(scene) {
		gridLines.forEach(function (line) {
			scene.add(line);
		})

		let mesh = new THREE.Mesh(this, new THREE.MeshBasicMaterial({ color: 0xe6e6e6 }));
		scene.add(mesh);
	}
}

export { Floor };