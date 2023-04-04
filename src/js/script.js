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
const slider_ar = document.getElementById("ambientField");
const slider_dr = document.getElementById("diffuseField");
const slider_sr = document.getElementById("specularField");
const slider_sh = document.getElementById("shininessField");
const slider_lx = document.getElementById("lxField");
const slider_ly = document.getElementById("lyField");
const slider_lz = document.getElementById("lzField");

const loader = document.getElementById("load");
const resetCamera = document.getElementById("resetbutton");
const save_btn = document.getElementById("savebutton");
const projection_opt = document.getElementById("projection-option");
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
var ar = 1.0;
var dr = 1.0;
var sr = 1.0;
var sh = 0.0;
var lx = 1.0;
var ly = 1.0;
var lz = 1.0;

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

slider_ar.oninput = function () {
	ar = this.value;
};
slider_dr.oninput = function () {
	dr = this.value;
};
slider_sr.oninput = function () {
	sr = this.value;
};
slider_sh.oninput = function () {
	sh = this.value;
};
slider_lx.oninput = function () {
	lx = this.value;
};
slider_ly.oninput = function () {
	ly = this.value;
};
slider_lz.oninput = function () {
	lz = this.value;
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
	ar = 1.0;
	dr = 1.0;
	sr = 1.0;
	sh = 0.0;
	lx = 1.0;
	ly = 1.0;
	lz = 1.0;

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
	slider_ar.value = ar;
	slider_dr.value = dr;
	slider_sr.value = sr;
	slider_sh.value = sh;
	slider_lx.value = lx;
	slider_ly.value = ly;
	slider_lz.value = lz;
	projection_opt.value = "perspective";
	const selectedProjection = document.getElementById("perspective");
	selectedProjection.checked = true;
	shading_check.checked = false;
	animation_check.checked = false;
}

projection_opt.onchange = function () {
	const selectedProjection = document.querySelector(
		'input[name="projection-option"]:checked'
	).value;
	this.value = selectedProjection;
};
