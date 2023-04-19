const slider_tx = document.getElementById("txField");
const slider_ty = document.getElementById("tyField");
const slider_tz = document.getElementById("tzField");
const slider_rx = document.getElementById("rxField");
const slider_ry = document.getElementById("ryField");
const slider_rz = document.getElementById("rzField");
const slider_part_tx = document.getElementById("part-tx");
const slider_part_ty = document.getElementById("part-ty");
const slider_part_tz = document.getElementById("part-tz");
const slider_part_rx = document.getElementById("part-rx");
const slider_part_ry = document.getElementById("part-ry");
const slider_part_rz = document.getElementById("part-rz");
const slider_sx = document.getElementById("sxField");
const slider_sy = document.getElementById("syField");
const slider_yc = document.getElementById("yCamera");
const slider_sz = document.getElementById("szField");
const slider_zc = document.getElementById("zoomCamera");
let tree_controller = document.getElementById("tree-controller");

const loader = document.getElementById("load");
const resetCamera = document.getElementById("resetbutton");
const save_btn = document.getElementById("savebutton");
const projection_opt = document.getElementById("projection-option");
const texture_opt = document.getElementById("texture-option");
const animation_play = document.getElementById("animation-state-play");
const animation_pause = document.getElementById("animation-state-pause");
const animation_replay = document.getElementById("animation-state-replay");
const animation_speed = document.getElementById("animation-speed");
const animation_reverse = document.getElementById("animation-reverse");
const animation_loop = document.getElementById("animation-loop");
const shading_check = document.getElementById("shader-state");

var tx = 0;
var ty = 0;
var tz = 0;
var rx = 5.78;
var ry = 3.8;
var rz = 0;
var part_tx = 0;
var part_ty = 0;
var part_tz = 0;
var part_rx = 5.78;
var part_ry = 3.8;
var part_rz = 0;
var sx = 1;
var sy = 1;
var sz = 1;
var yc = 0;
var zc = 1;
var frame_counter = 0;
var play_animation = false;
var animation_speed_interval = 10;

loader.onchange = function (e) {
	resetValue();
	
	var file = e.target.files[0];
	if (!file) {
		console.log("FILE NOT FOUND");
	}

	var reader = new FileReader();
	reader.onload = function (event) {
		var selectedObj = JSON.parse(event.target.result)
		main(selectedObj)
	};
	reader.readAsText(file)
};

animation_reverse.onchange = function () {
	if(!play_animation && (frame_counter == 0 || frame_counter == allObjs[baseObject]["animation"].length -1)){
		if(animation_reverse.checked){
			frame_counter = allObjs[baseObject]["animation"].length -1;
		}else{
			frame_counter = 0
		}
	}
}

animation_play.onclick = function () {
	play_animation = true;
}

animation_pause.onclick = function () {
	play_animation = false;
}

animation_replay.onclick = function () {
	play_animation = false;
	if(animation_reverse.checked){
		frame_counter =allObjs[baseObject]["animation"].length -1;
	}else{
		frame_counter = 0
	}
	play_animation = true;
}

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
	animation_play.checked = false;
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
