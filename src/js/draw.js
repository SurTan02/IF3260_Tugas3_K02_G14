let selectedPart = ""
var timer = 0;

var allObjs;
let baseObject 
let curtomTexture
let reflexTexture
let bumpTexture

main(jsonObjTes)

function main(loadedJson) {
	resetValue()
	slider_tx.value = loadedJson.translation[0];
	slider_ty.value = loadedJson.translation[1];
	slider_ty.value = loadedJson.translation[2];
	slider_sx.value = loadedJson.scaling[0];
	slider_sy.value = loadedJson.scaling[1];
	slider_sz.value = loadedJson.scaling[2];
	slider_rx.value = loadedJson.rotation[0];
	slider_ry.value = loadedJson.rotation[1];
	slider_rz.value = loadedJson.rotation[2];

	allObjs = {}
	loadedJson.parts.forEach(part => {
		if (part.name == loadedJson.root_name) {
			baseObject = part.name
		}
		allObjs[part.name] = part
	});

	tree_controller.innerHTML = `
		<button style="margin-left: 0px;" onclick="selectPart(event)" name=${allObjs[baseObject].name}> ${allObjs[baseObject].name}</button>
		<br>	
	`
	generateTree(allObjs[baseObject], 20)

	const canvas = document.getElementById("canvas");
	const gl = canvas.getContext("webgl");

	// Define the vertex and fragment shaders
	// SHADER -> TAR GANTI BUATAN KITA
	const vertexShaderSource = `
	attribute vec3 aVertexPosition; 
	attribute vec3 aNormal;
	attribute vec3 aVertexColor; 
	attribute vec2 aTextureCoord;
	
	uniform mat4 uModelViewMatrix; 
	uniform mat4 uProjectionMatrix; 
	uniform mat4 uNormalMatrix; 
	
	uniform vec4 uVertexColor;
	
	varying vec3 normalInterp;
	varying vec3 vertPos;

	varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;
	varying lowp vec4 vColor;
	varying highp vec2 vTextureCoord;
	
	uniform bool uShading;

	  void main(void) {
		vColor = vec4(aVertexColor, 1.0);

		
			vec4 vertPos4 = uModelViewMatrix * vec4(aVertexPosition, 1.0);
			gl_Position = uProjectionMatrix * vertPos4;

			vWorldPosition = (vertPos4).xyz;
			vWorldNormal = mat3(uModelViewMatrix) * aNormal;

			vTextureCoord = aTextureCoord;

			
		if (uShading){
			vertPos = vec3(vertPos4) / vertPos4.w;
			normalInterp = vec3(uNormalMatrix * vec4(aNormal, 0.0));
		}
  }

	`;
	const fragmentShaderSource = `
	
	precision mediump float;
	
	
	uniform vec3 uLightPos ;
	
	uniform bool uShading;
	
	varying lowp vec4 vColor;
	varying vec3 normalInterp;
	varying vec3 vertPos;

	uniform int textureVert;
	varying vec3 vWorldPosition;
	varying vec3 vWorldNormal;

    uniform sampler2D uSampler;
	uniform samplerCube uTexture;
	uniform sampler2D uBumpMap;

	uniform vec2 uTextureSize;

	varying highp vec2 vTextureCoord;
	void main(void) {
		if (textureVert == 0){
			gl_FragColor = vColor;
		} else if (textureVert == 1){
			gl_FragColor = texture2D(uSampler, vTextureCoord);
		} else if(textureVert == 2){
			
			vec3 worldNormal = normalize(vWorldNormal);
			vec3 eyeToSurfaceDir = normalize(vWorldPosition);
			vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
			gl_FragColor = textureCube(uTexture, direction);
			
		} else if (textureVert == 3) {
			vec4 baseColor = texture2D(uSampler, vTextureCoord);

			gl_FragColor = baseColor;

		}
		

		if (uShading && textureVert != 2){
			vec3 normal = normalize(normalInterp);
			vec3 lightDir = normalize(uLightPos - vertPos);
			float lambertian = max(dot(normal,lightDir), 0.0);
			gl_FragColor.rgb *= vec3(lambertian);
		}
	}
	`;

	if (!loadedJson.url) loadedJson.url = "../assets/imageMap/sheep2.jpg"
	curtomTexture = loadCustomTexture(gl, loadedJson.url)
	bumpTexture = loadCustomTexture(gl, "../assets/bumpMap/bump_normal.png")
	reflexTexture = loadTextureReflective(gl)
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
		
		drawObject(gl, program, allObjs[baseObject], allObjs, [0, 0, 0, [0,0,0]], [0,0,0]);
		save_btn.onclick = () => saveObjectfunction(loadedJson, allObjs)
		requestAnimationFrame(render);
	}
}

function drawObject(gl, program, currentObject, allObjs, parent_rotation, parent_translation) {	
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
		currentObject.vertices,
		currentObject.indices,
		currentObject.color
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
	var modelViewMatrix = currentObject.modelViewMatrix? currentObject.modelViewMatrix : m4();
	
	var cameraMatrix = m4();
	// CAMERA ANGLE
	var newProjection = rotationY(projectionMatrix, yc/180 * Math.PI);
	// CAMERA ZOOM
	cameraMatrix = scale(modelViewMatrix, (2 - zc), (2 - zc), (2 - zc));
	
	// ROTASI
	// GENERAL ROTATION
	cameraMatrix = xRotate(cameraMatrix, rx /180 * Math.PI);
	cameraMatrix = yRotate(cameraMatrix, ry /180 * Math.PI);
	cameraMatrix = zRotate(cameraMatrix, rz /180 * Math.PI);

	// ROTATION INHERIT FROM PARENT
	cameraMatrix = translate(cameraMatrix, -parent_rotation[3][0], -parent_rotation[3][1], -parent_rotation[3][2]);
	cameraMatrix = xRotate(cameraMatrix, parent_rotation[0] /180 * Math.PI);
	cameraMatrix = yRotate(cameraMatrix, parent_rotation[1] /180 * Math.PI);
	cameraMatrix = zRotate(cameraMatrix, parent_rotation[2] /180 * Math.PI);
	cameraMatrix = translate(cameraMatrix, parent_rotation[3][0], parent_rotation[3][1], parent_rotation[3][2]);

	if (currentObject.name == selectedPart && !play_animation){
		currentObject["rotation"] = [part_rx, part_ry, part_rz]
	}
	
	var pass_rotation = [
		(parseInt(currentObject["rotation"][0]) + parent_rotation[0]) % 360,
		(parseInt(currentObject["rotation"][1]) + parent_rotation[1]) % 360,
		(parseInt(currentObject["rotation"][2]) + parent_rotation[2]) % 360,	
		currentObject["rotate_coord"]
	]
	
	// SELF ROTATION
	cameraMatrix = translate(cameraMatrix, -currentObject["rotate_coord"][0], -currentObject["rotate_coord"][1], -currentObject["rotate_coord"][2]);
	cameraMatrix = xRotate(cameraMatrix, currentObject["rotation"][0]/180 * Math.PI);
    cameraMatrix = yRotate(cameraMatrix, currentObject["rotation"][1]/180 * Math.PI);
    cameraMatrix = zRotate(cameraMatrix, currentObject["rotation"][2]/180 * Math.PI);
	cameraMatrix = translate(cameraMatrix, currentObject["rotate_coord"][0], currentObject["rotate_coord"][1], currentObject["rotate_coord"][2]);

	var viewMatrix = inverse(cameraMatrix);
	
	// ANIMASI
	if(play_animation){
		selectedPart = "";

		Object.keys(allObjs).forEach((element) => {
			if (allObjs[element]["animation"][frame_counter] == null){
				allObjs[element]["animation"][frame_counter] = [0,0,0]
			}
			allObjs[element]["translation"] = [0,0,0];
			allObjs[element]["rotation"] = allObjs[element]["animation"][frame_counter];
			slider_part_tx.value = 0;
			slider_part_ty.value = 0;
			slider_part_tz.value = 0;
			slider_part_rx.value = allObjs[element]["animation"][frame_counter][0];
			slider_part_ry.value = allObjs[element]["animation"][frame_counter][1];
			slider_part_rz.value = allObjs[element]["animation"][frame_counter][2];
		})
		animation_play.disabled = true;
		animation_pause.disabled = false;
	} else{
		animation_play.disabled = false;
		animation_pause.disabled = true;
	}

	// GENERAL SCALING
	modelViewMatrix = scale(modelViewMatrix, sx, sy, sz);
	modelViewMatrix = multiply(modelViewMatrix, viewMatrix);

	// GENERAL TRANSLATION - INHERIT FROM PARENT
	modelViewMatrix = translate(modelViewMatrix, tx, ty, tz);
	modelViewMatrix = translate(modelViewMatrix, parent_translation[0], parent_translation[1], parent_translation[2]);

	

	// SELF TRANSLATION
	if (currentObject.name == selectedPart){
		currentObject["translation"] = [part_tx, part_ty, part_tz]
	}

	var pass_translation = [
		(parseFloat(currentObject["translation"][0]) + parent_translation[0]),
		(parseFloat(currentObject["translation"][1]) + parent_translation[1]),
		(parseFloat(currentObject["translation"][2]) + parent_translation[2]) 
	]
	
	modelViewMatrix = translate(modelViewMatrix, currentObject["translation"][0], currentObject["translation"][1], currentObject["translation"][2]);
	
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

		const aNormal = gl.getAttribLocation(program, "aNormal");
		gl.enableVertexAttribArray(aNormal);
		gl.bindBuffer(gl.ARRAY_BUFFER, model.normal);
		gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);

		const textureVert = gl.getUniformLocation(program, "textureVert");
		gl.uniform1i(textureVert, parseInt(texture_opt.value));
		
		const aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
		gl.enableVertexAttribArray(aTextureCoord);
		gl.bindBuffer(gl.ARRAY_BUFFER, model.texture_coord);
		gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);

		const uSampler =  gl.getUniformLocation(program, "uSampler");
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, curtomTexture);
		gl.uniform1i(uSampler, 0);

		var uTexture = gl.getUniformLocation(program, "uTexture");
		gl.uniform1i(uTexture, 1);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, reflexTexture);
	}

	const uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
	gl.uniformMatrix4fv(uProjectionMatrix, false, newProjection);

	const uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
	gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

	//Light Position
	var uLightPos = gl.getUniformLocation(program, "uLightPos");
	gl.uniform3fv(uLightPos, [1, 2 , 5])

	const uNormalMatrix = gl.getUniformLocation(program, "uNormalMatrix");
	var normalModelViewMatrix = transpose(inverse(modelViewMatrix));
	gl.uniformMatrix4fv(uNormalMatrix, false, normalModelViewMatrix);

	var uShading = gl.getUniformLocation(program, "uShading");
	gl.uniform1i(uShading, shading_check.checked);
	
	{
		gl.drawElements(gl.TRIANGLES, model.ilength, gl.UNSIGNED_SHORT, 0);
	}

	currentObject.children.forEach(part => {
		drawObject(gl, program, allObjs[part], allObjs, pass_rotation, pass_translation)
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
	
  
	const normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	var normals = calculateNormals(vertices,indices)
 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	
	let textureCoordinates = [
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	];

	const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  	return {
		position: vertexBuffer,
		indices: indexBuffer,
		color: colorBuffer,
    	normal : normalBuffer,
		texture_coord: textureCoordBuffer,
		vlength: vertices.length,
		ilength: indices.length,
	};
}

function calculateNormals(vertices, indices) {
	const vertexNormals = [];
  
	for (let i = 0; i < vertices.length; i += 3) {
	  vertexNormals.push(0, 0, 0);
	}
  
	for (let i = 0; i < indices.length; i += 3) {
	  const a = indices[i] * 3;
	  const b = indices[i + 1] * 3;
	  const c = indices[i + 2] * 3;
  
	  const v1 = [vertices[b] - vertices[a], vertices[b + 1] - vertices[a + 1], vertices[b + 2] - vertices[a + 2]];
	  const v2 = [vertices[c] - vertices[a], vertices[c + 1] - vertices[a + 1], vertices[c + 2] - vertices[a + 2]];
	  const normal = [
		v1[1] * v2[2] - v1[2] * v2[1],
		v1[2] * v2[0] - v1[0] * v2[2],
		v1[0] * v2[1] - v1[1] * v2[0],
	  ];
  
	  vertexNormals[a] += normal[0];
	  vertexNormals[a + 1] += normal[1];
	  vertexNormals[a + 2] += normal[2];
	  vertexNormals[b] += normal[0];
	  vertexNormals[b + 1] += normal[1];
	  vertexNormals[b + 2] += normal[2];
	  vertexNormals[c] += normal[0];
	  vertexNormals[c + 1] += normal[1];
	  vertexNormals[c + 2] += normal[2];
	}
  
	for (let i = 0; i < vertexNormals.length; i += 3) {
	  const normal = [vertexNormals[i], vertexNormals[i + 1], vertexNormals[i + 2]];
	  const magnitude = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  
	  if (magnitude > 0) {
		vertexNormals[i] /= magnitude;
		vertexNormals[i + 1] /= magnitude;
		vertexNormals[i + 2] /= magnitude;
	  }
	}
  
	return vertexNormals;
  }  

function saveObjectfunction (loadedJson, allObjs) {

	var arr = []
	Object.keys(allObjs).forEach(part => {
		arr.push(allObjs[part])
	});

	loadedJson.translation[0] = slider_tx.value
	loadedJson.translation[1] = slider_ty.value
	loadedJson.translation[2] = slider_ty.value
	loadedJson.scaling[0] = slider_sx.value
	loadedJson.scaling[1] = slider_sy.value
	loadedJson.scaling[2] = slider_sz.value
	loadedJson.rotation[0] = slider_rx.value
	loadedJson.rotation[1] = slider_ry.value
	loadedJson.rotation[2] = slider_rz.value

	var newJson = JSON.stringify({...loadedJson, parts : arr})
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
		if(play_animation && animation_loop.checked){
			if(frame_counter >= allObjs[baseObject]["animation"].length -1){
				animation_loop_dir = false;
			}else if(frame_counter <= 0){
				animation_loop_dir = true;
			}
		
			if(animation_loop_dir){
				frame_counter = frame_counter + 1;
			}else{
				frame_counter = frame_counter - 1;
			}
		}

		if(play_animation && !animation_loop.checked){
			if(animation_reverse.checked){
				if(frame_counter <= 0){
					frame_counter = allObjs[baseObject]["animation"].length -1;
					play_animation = false;
				}else{
					frame_counter = frame_counter - 1;
				}
			}else{
				if(frame_counter >= allObjs[baseObject]["animation"].length -1){
					frame_counter = 0;
					play_animation = false;
				}else{
					frame_counter = frame_counter + 1;
				}
			}
		}
	}
}

function generateTree(obj, indent){
	obj.children.forEach(part => {
		tree_controller.innerHTML += `
			<button style="margin-left: ${indent}px;" onclick="selectPart(event)" name=${allObjs[part].name}> ${allObjs[part].name}</button>
			<br>	
		`
		generateTree(allObjs[part], indent + 20)
	});
}

var animation_loop_dir = true;
setInterval(animationFrame , 50);

