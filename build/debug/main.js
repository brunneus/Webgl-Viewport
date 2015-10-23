
var width = window.innerWidth;
var height = window.innerHeight;
var scene = new VIEWPORT.Environment(width, height);
document.body.appendChild(scene.getContainer());

window.onresize = function () {
	scene.resize(window.innerWidth, window.innerHeight);
}

$('#add-cube-button').click(function () {
	scene.createBox(10, 10, 10);
})

$('#add-cylinder-button').click(function () {
	scene.createCylinder(5, 5, 10);
})

$('#add-cone-button').click(function () {
	scene.createCone(15,5);
})

$('#add-torus-button').click(function () {
	scene.createTorus(10, 4, 20,50);
})

$('#add-sphere-button').click(function () {
	scene.createSphere(10);
})