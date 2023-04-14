


main(jsonObjTes)

function main(jsonObj) {
	

	var allObjs = {};
	var allObjNames = [];
	jsonObj.parts.forEach(part => {
		if (part.name == jsonObj.root_name) {
			// add root obj to the first index
			allObjNames.unshift(part.name);
			allObjs[part.name] = part;
		  }
		  else {
			allObjNames.push(part.name);
			allObjs[part.name] = part;
		  }
		
	});
	// GATAU KALAU DI SCRIPT SLIDENRYA GA SESUAI, JADI LETAK DISINi
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

		// PROJECTION
		var projectionMatrix = getProjection(projection_opt.value)

		const translateMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, -10, 1
		];
		projectionMatrix = multiply(translateMatrix, projectionMatrix)
		
		
		drawObject(gl, program, allObjs[allObjNames[0]], projectionMatrix, allObjs);
		
		requestAnimationFrame(render);
	}
}

function drawObject(gl, program, jsonObj, projectionMatrix, allObjs) {	
	gl.useProgram(program);

	// LOAD OBJECT
	const model = loadObject(
		gl,
		jsonObj.vertices,
		jsonObj.indices,
		jsonObj.color
	);

	var modelViewMatrix = jsonObj.modelViewMatrix? jsonObj.modelViewMatrix : m4();
	// CAMERA ANGLE
	ChangedprojectionMatrix = rotationY(projectionMatrix, yc);

	// CAMERA ZOOM
	modelViewMatrix = scale(modelViewMatrix, zc, zc, zc);

	// ROTASI
	var cameraMatrix = m4();
	cameraMatrix = xRotate(cameraMatrix, rx/180 * Math.PI);
	cameraMatrix = yRotate(cameraMatrix, ry/180 * Math.PI);
	cameraMatrix = zRotate(cameraMatrix, rz/180 * Math.PI);

	if (jsonObj.name == "left-arm"){
		var x_part = (part_rx/100) * jsonObj["x_rotate"][2] - jsonObj["x_rotate"][1] 
		var y_part = (part_ry/100) * jsonObj["y_rotate"][2] - jsonObj["y_rotate"][1] 
		// console.log((y_part ))
		// cameraMatrix = translate(cameraMatrix, jsonObj["rotate_coord"][0],jsonObj["rotate_coord"][1], jsonObj["rotate_coord"][2])
		cameraMatrix = xRotate(cameraMatrix,  x_part/180 * Math.PI);
    	cameraMatrix = yRotate(cameraMatrix, y_part/180 * Math.PI);
    	cameraMatrix = zRotate(cameraMatrix, part_rz/180 * Math.PI);
		// cameraMatrix = translate(cameraMatrix, -jsonObj["rotate_coord"][0],-jsonObj["rotate_coord"][1], -jsonObj["rotate_coord"][2])
	}

	var viewMatrix = inverse(cameraMatrix);
	
	// ANIMASI
	if(animation_check.checked){
		rx >= 360 ? rx = 0 : rx = parseFloat(rx) + 0.5
		slider_rx.value = rx;
	}

	// SCALING
	modelViewMatrix = scale(modelViewMatrix, sx, sy, sz);
	modelViewMatrix = multiply(modelViewMatrix, viewMatrix);

	// TRANSLASI
	modelViewMatrix = translate(modelViewMatrix, tx, ty, tz);
	
	
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
    
	//

	const uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
	gl.uniformMatrix4fv(uProjectionMatrix, false, ChangedprojectionMatrix);

	const uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
	gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

	var uShading = gl.getUniformLocation(program, "uShading");
	gl.uniform1i(uShading, shading_check.checked);
	{
		gl.drawElements(gl.TRIANGLES, model.ilength, gl.UNSIGNED_SHORT, 0);
	}
	
	jsonObj.children.forEach(element => {
		drawObject(gl, program, allObjs[element], projectionMatrix, allObjs)
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

