
var width = window.innerWidth;
var height = window.innerHeight;
var scene = new VIEWPORT.Environment(width, height);
document.body.appendChild(scene.getContainer());
scene.createBox(10, 10, 10);
scene.createBox(10, 10, 10);
window.onresize = function () {
	scene.resize(window.innerWidth, window.innerHeight);
}

$('#add-cube-button').click(function () {
	scene.createBox(1, 1, 1);
})