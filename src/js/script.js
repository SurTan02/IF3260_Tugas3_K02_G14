const slider_tx = document.getElementById("txField");
const slider_ty = document.getElementById("tyField");
const slider_tz = document.getElementById("tzField");
const slider_rx = document.getElementById("rxField");
const slider_ry = document.getElementById("ryField");
const slider_rz = document.getElementById("rzField");
const slider_sx = document.getElementById("sxField");
const slider_sy = document.getElementById("syField");
const slider_yc = document.getElementById("yCamera");
const slider_sz = document.getElementById("szField");
const slider_zc = document.getElementById("zoomCamera");

const loader = document.getElementById("load");
const resetCamera = document.getElementById("resetbutton");
const save_btn = document.getElementById("savebutton");
const projection_opt = document.getElementById("projection-option");
const texture_opt = document.getElementById("texture-option");
const animation_check = document.getElementById("animation-state");
const shading_check = document.getElementById("shader-state");

var tx = 0;
var ty = 0;
var tz = 0;
var rx = 5.78;
var ry = 3.8;
var rz = 0;
var sx = 1;
var sy = 1;
var sz = 1;
var yc = 0;
var zc = 1;

slider_tx.oninput = function () {
	tx = this.value;
};

slider_ty.oninput = function () {
	ty = this.value;
};

slider_tz.oninput = function () {
	tz = this.value;
};

slider_rx.oninput = function () {
	rx = this.value;
};

slider_ry.oninput = function () {
	ry = this.value;
};

slider_rz.oninput = function () {
	rz = this.value;
};

slider_sx.oninput = function () {
	sx = this.value;
};

slider_sy.oninput = function () {
	sy = this.value;
};

slider_sz.oninput = function () {
	sz = this.value;
};

slider_yc.oninput = function () {
	yc = (this.value / 180) * Math.PI;
};

slider_zc.oninput = function () {
	zc = this.value;
};

loader.onchange = function (e) {
	resetValue();

	var file = e.target.files[0];
	if (!file) {
		console.log("FILE NOT FOUND");
	}

	var reader = new FileReader();
	reader.onload = function (event) {
		var jsonObj = JSON.parse(event.target.result);
		main(jsonObj);
	};
	reader.readAsText(file);
};

resetCamera.onclick = function (e) {
	resetValue();
};

function resetValue() {
	tx = 0;
	ty = 0;
	tz = 0;
	rx = 5.78;
	ry = 3.8;
	rz = 0;
	sx = 1;
	sy = 1;
	sz = 1;
	yc = 0;
	zc = 1;

	slider_tx.value = tx;
	slider_ty.value = ty;
	slider_ty.value = ty;
	slider_sx.value = sx;
	slider_sy.value = sy;
	slider_sz.value = sz;
	slider_rx.value = rx;
	slider_ry.value = ry;
	slider_rz.value = rz;
	slider_yc.value = yc;
	slider_zc.value = zc;
	projection_opt.value = "perspective";
	const selectedProjection = document.getElementById("perspective");
	selectedProjection.checked = true;
	const selectedTexture = document.getElementById("custom");
	selectedTexture.checked = true;
	shading_check.checked = false;
	animation_check.checked = false;
}

projection_opt.onchange = function () {
	const selectedProjection = document.querySelector(
		'input[name="projection-option"]:checked'
	).value;
	this.value = selectedProjection;
};

texture_opt.onchange = function () {
	const selectedTexture = document.querySelector(
		'input[name="texture-option"]:checked'
	).value;
	this.value = selectedTexture;
	console.log("aa", selectedTexture);
};
