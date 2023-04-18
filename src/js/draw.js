let selectedPart = ""
var allObjs = {};
var allObjNames = [];
var timer = 0;

jsonObjTes.parts.forEach(part => {
	if (part.name == jsonObjTes.root_name) {
		// add root obj to the first index
		allObjNames.unshift(part.name);
		allObjs[part.name] = part;
		}
		else {
		allObjNames.push(part.name);
		allObjs[part.name] = part;
		}
});
main(jsonObjTes)


function main(jsonObj) {
	
	
	

	allObjNames.forEach(part => {
		tree_controller.innerHTML += `<button onclick="selectPart(event)" name=${part}> ${part}</button>`
	});

	const canvas = document.getElementById("canvas");
	const gl = canvas.getContext("webgl");
	// Define the vertex and fragment shaders
	// SHADER -> TAR GANTI BUATAN KITA
	const vertexShaderSource = `
	attribute vec3 aVertexPosition; 
  attribute vec3 aBarycentric;
  attribute vec3 aNormal; 
  
  varying vec3 interpBary;
  varying vec3 normalInterp;
  varying vec3 vertPos;
  
	uniform mat4 uModelViewMatrix; 
	uniform mat4 uProjectionMatrix; 
  uniform mat4 uNormalMatrix; 
  
	attribute vec3 aVertexColor; 
	uniform vec4 uVertexColor;

  varying lowp vec4 vColor;

	void main(void) {
		vec4 newModelViewMatrix = uModelViewMatrix * vec4(aVertexPosition, 1.0);
    
    interpBary = aBarycentric;
		gl_Position = uProjectionMatrix * newModelViewMatrix;
    vec3 transformedNormal = vec3(uNormalMatrix * vec4(aNormal, 0.0));
    vec4 vertPos4 = uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vertPos = vec3(vertPos4) / vertPos4.w;
    normalInterp = vec3(uNormalMatrix * vec4(transformedNormal, 0.0));
    
		vColor = vec4(aVertexColor, 1.0);

  }

	`;
	const fragmentShaderSource = `

	precision mediump float;
  varying vec3 normalInterp;
  varying vec3 vertPos;
  varying lowp vec4 vColor;
  
  uniform vec3 uLightPos;
  uniform vec3 uAmbientColor;
  uniform vec3 uDiffuseColor;
  uniform vec3 uSpecColor;

  uniform float uAmbientCons;
  uniform float uDiffuseCons;
  uniform float uSpecCons;
  uniform float uShineCons;

  uniform bool uShading;

	void main(void) {
    if (uShading){
      vec3 normal = normalize(normalInterp);
      vec3 lightDir = normalize(uLightPos - vertPos);
      vec3 reflectDir = reflect(-lightDir, normal);
      vec3 viewDir = normalize(-vertPos);

      float lambertian = max(dot(lightDir,normal), 0.0);
      float specular = 0.0;

      if(lambertian > 0.0) {
        float specAngle = max(dot(reflectDir, viewDir), 0.0);
        specular = pow(specAngle, uShineCons);
      }

      gl_FragColor = vec4(
        uAmbientCons * uAmbientColor + 
        uDiffuseCons * lambertian * uDiffuseColor + 
        uSpecCons * specular * uSpecColor, 1.0
      );

    }else{
      gl_FragColor = vColor;
    }
	}
	`;

	const program = initShaders(gl, vertexShaderSource, fragmentShaderSource);
	
	// Draw the scene
	requestAnimationFrame(render);

	function render() {
		// Clear Canvas
		gl.clearColor(0.7, 0.7, 0.7, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
		drawObject(gl, program, allObjs[allObjNames[0]], allObjs, [0,0,0], allObjNames, [0,0,0]);
		
		requestAnimationFrame(render);
	}
}

function drawObject(gl, program, jsonObj, allObjs, parent_rotation, allObjNames, parent_translation) {	
	tx = slider_tx.value;
	ty = slider_ty.value;
	tz = slider_tz.value;
	sx = slider_sx.value;
	sy = slider_sy.value;
	sz = slider_sz.value;
	rx = slider_rx.value;
	ry = slider_ry.value;
	rz = slider_rz.value;
	yc = slider_yc.value;
	zc = slider_zc.value;
	part_tx = slider_part_tx.value;
	part_ty = slider_part_ty.value;
	part_tz = slider_part_tz.value;
	part_rx = slider_part_rx.value;
	part_ry = slider_part_ry.value;
	part_rz = slider_part_rz.value;
	animation_speed_interval = animation_speed.value;


	gl.useProgram(program);

	// LOAD OBJECT
	const model = loadObject(
		gl,
		jsonObj.vertices,
		jsonObj.indices,
		jsonObj.color
	);
	// PROJECTION
	var projectionMatrix = getProjection(projection_opt.value)
	const translateMatrix = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, -10, 1
	];
	projectionMatrix = multiply(translateMatrix, projectionMatrix)

	// var pass_rotation = parent_rotation
	
	var modelViewMatrix = jsonObj.modelViewMatrix? jsonObj.modelViewMatrix : m4();
	// CAMERA ANGLE
	var newProjection = rotationY(projectionMatrix, yc/180 * Math.PI);

	// CAMERA ZOOM
	modelViewMatrix = scale(modelViewMatrix, zc, zc, zc);

	// ROTASI
	var cameraMatrix = m4();
	// GENERAL ROTATION
	cameraMatrix = xRotate(cameraMatrix, rx /180 * Math.PI);
	cameraMatrix = yRotate(cameraMatrix, ry /180 * Math.PI);
	cameraMatrix = zRotate(cameraMatrix, rz /180 * Math.PI);

	// INHERIT DARI PARENT
	cameraMatrix = xRotate(cameraMatrix, parent_rotation[0] /180 * Math.PI);
	cameraMatrix = yRotate(cameraMatrix, parent_rotation[1] /180 * Math.PI);
	cameraMatrix = zRotate(cameraMatrix, parent_rotation[2] /180 * Math.PI);

	if (jsonObj.name == selectedPart){
		jsonObj["rotation"] = [part_rx, part_ry, part_rz]
	}
	
	var rot = [(parseInt(jsonObj["rotation"][0]) + parent_rotation[0]) % 360,
				(parseInt(jsonObj["rotation"][1]) + parent_rotation[1]) % 360,
				 (parseInt(jsonObj["rotation"][2]) + parent_rotation[2])% 360]
	
	cameraMatrix = translate(cameraMatrix, -jsonObj.rotate_coord[0], -jsonObj.rotate_coord[1], -jsonObj.rotate_coord[2]);
	cameraMatrix = xRotate(cameraMatrix, jsonObj["rotation"][0]/180 * Math.PI);
    cameraMatrix = yRotate(cameraMatrix, jsonObj["rotation"][1]/180 * Math.PI);
    cameraMatrix = zRotate(cameraMatrix, jsonObj["rotation"][2]/180 * Math.PI);
	cameraMatrix = translate(cameraMatrix, jsonObj.rotate_coord[0], jsonObj.rotate_coord[1], jsonObj.rotate_coord[2]);

	var viewMatrix = inverse(cameraMatrix);
	
	// ANIMASI
	if(play_animation){
		allObjNames.forEach((element) => {
			allObjs[element]["rotation"] = allObjs[element]["animation"][frame_counter];
			// console.log(allObjs[element]["rotation"]);
			slider_part_rx.value = allObjs[element]["animation"][frame_counter][0];
			slider_part_ry.value = allObjs[element]["animation"][frame_counter][1];
			slider_part_rz.value = allObjs[element]["animation"][frame_counter][2];
		}
		)
	}

	if(play_animation){
		animation_play.disabled = true;
		animation_pause.disabled = false;
	}else{
		animation_play.disabled = false;
		animation_pause.disabled = true;
	}

	// SCALING
	modelViewMatrix = scale(modelViewMatrix, sx, sy, sz);
	modelViewMatrix = multiply(modelViewMatrix, viewMatrix);

	// TRANSLASI GENERAL - INHERIT - SELF
	modelViewMatrix = translate(modelViewMatrix, tx, ty, tz);
	modelViewMatrix = translate(modelViewMatrix, parent_translation[0], parent_translation[1], parent_translation[2]);

	
	
	
	if (jsonObj.name == selectedPart){
		jsonObj["translation"] = [part_tx, part_ty, part_tz]
	}
	
	// var trans = [(parseInt(jsonObj["translation"][0]) + parent_translation[0]) % 6,
	// (parseInt(jsonObj["translation"][1]) + parent_translation[1]) % 6,
	// (parseInt(jsonObj["translation"][2]) + parent_translation[2])% 6]
	// console.log(trans)
	modelViewMatrix = translate(modelViewMatrix, jsonObj["translation"][0], jsonObj["translation"][1], jsonObj["translation"][2]);
	// // SAVE BUTTON
	// save_btn.onclick = () => saveObjectfunction(jsonObj, modelViewMatrix)
	
  	{
		const vertexPosition = gl.getAttribLocation(program, "aVertexPosition");
		gl.bindBuffer(gl.ARRAY_BUFFER, model.position);
		gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexPosition);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices);

		const aVertexColor = gl.getAttribLocation(program, "aVertexColor");
		gl.bindBuffer(gl.ARRAY_BUFFER, model.color);
		gl.vertexAttribPointer(aVertexColor, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(aVertexColor);
	}

	const uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
	gl.uniformMatrix4fv(uProjectionMatrix, false, newProjection);

	const uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
	gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

	var uShading = gl.getUniformLocation(program, "uShading");
	gl.uniform1i(uShading, shading_check.checked);
	{
		gl.drawElements(gl.TRIANGLES, model.ilength, gl.UNSIGNED_SHORT, 0);
	}
	
	jsonObj.children.forEach(element => {
		drawObject(gl, program, allObjs[element], allObjs, rot, allObjNames, jsonObj.translation)
	});
}

function initShaders(gl, vertexShaderSource, fragmentShaderSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.log("Unable to init shader program");
  } 
  
	return program;
}

function loadShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);;
  if (!success){
    var error = gl.getShaderInfoLog(shader);
    console.error("Shader compilation failed:", error);
  }

	return shader;
}

// Initialize object
function loadObject(gl, vertices, indices, color) {
	// Vertices's positions
	const vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(
		gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(indices),
		gl.STATIC_DRAW
	);

	if (!color) {
		const temp = [];
		for (var i = 0; i < vertices.length; i++) {
			temp.push(1, 0.9, 0.1);
		}
		color = temp;
	}

	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
	

  var bary = []
  var normal = []
  indices.forEach(function(d,i){
    if(i%3 == 0){
      var setOfThreeIndices = indices.slice(i, i+3);
      const v1Idx = setOfThreeIndices[0];
      const v2Idx = setOfThreeIndices[1];
      const v3Idx = setOfThreeIndices[2];
      let v1 = [
        vertices[v2Idx*3 + 0] - vertices[v1Idx*3 + 0],
        vertices[v2Idx*3 + 1] - vertices[v1Idx*3 + 0],
        vertices[v2Idx*3 + 2] - vertices[v1Idx*3 + 0]
      ];
      let v2 = [
        vertices[v3Idx*3 + 0] - vertices[v1Idx*3 + 0],
        vertices[v3Idx*3 + 0] - vertices[v1Idx*3 + 0],
        vertices[v3Idx*3 + 0] - vertices[v1Idx*3 + 0]
      ];
      let n = [0, 0, 0];
      n[0] = v1[1] * v2[2] - v1[2] * v2[1];
      n[1] = v1[2] * v2[0] - v1[0] * v2[2];
      n[2] = v1[0] * v2[1] - v1[1] * v2[0];

      normal.push(n[0],n[1],n[2]);
      bary.push(1,0,0);
    } else if(i % 3 == 1){
        bary.push(0,1,0);
    } else if(i % 3 == 2){
        bary.push(0,0,1);
    }
  });
 
  const barycentricBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, barycentricBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bary), gl.STATIC_DRAW);
  
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
	
  return {
		position: vertexBuffer,
		indices: indexBuffer,
		color: colorBuffer,
    barycentric : barycentricBuffer,
    normal : normalBuffer,
		vlength: vertices.length,
		ilength: indices.length,
	};
}

function saveObjectfunction (jsonObj, modelViewMatrix) {

	var newJson = JSON.stringify({...jsonObj, "modelViewMatrix": modelViewMatrix})
	const blob = new Blob([newJson], {type: 'application/json'});
  	const url = URL.createObjectURL(blob);
  	const link = document.createElement('a');
  	link.href = url;
  	link.download = 'objects.json';
  	link.click();
  	URL.revokeObjectURL(url);
}

function selectPart(e) {
	selectedPart = e.target.name
	slider_part_tx.value = allObjs[selectedPart].translation[0];
	slider_part_ty.value = allObjs[selectedPart].translation[1];
	slider_part_tz.value = allObjs[selectedPart].translation[2];

	slider_part_rx.value = allObjs[selectedPart].rotation[0];
	slider_part_ry.value = allObjs[selectedPart].rotation[1];
	slider_part_rz.value = allObjs[selectedPart].rotation[2];

}


function animationFrame(){
	timer++;
	if(timer >= (20 - animation_speed_interval)){
		timer = 0;
		if(play_animation){
			if(frame_counter >= allObjs[allObjNames[0]]["animation"].length -1){
				frame_counter = 0;
				play_animation = false;
			}else{
				frame_counter = frame_counter + 1;
			}
		}
	}
}

setInterval(animationFrame, 50);

