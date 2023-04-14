const m4 = () => {
	let matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	return matrix;
};

const hexToRgb = (hex) => {
	// Mengubah format hex color menjadi RGB
	var r = parseInt(hex.substring(1, 3), 16) / 255;
	var g = parseInt(hex.substring(3, 5), 16) / 255;
	var b = parseInt(hex.substring(5, 7), 16) / 255;
	
	// Mengembalikan nilai RGB dengan skala 0 hingga 1 untuk setiap elemennya
	return [r, g, b];
}

const orthographic = (left, right, bottom, top, near, far) => {
	return [
		2 / (right - left),
		0,
		0,
		0,
		0,
		2 / (top - bottom),
		0,
		0,
		0,
		0,
		2 / (near - far),
		0,

		(left + right) / (left - right),
		(bottom + top) / (bottom - top),
		(near + far) / (near - far),
		1,
	];
};

const perspective = (angle, aspect, zMin, zMax) => {
	// angle = 45
	// (45 * Math.PI) / 180, 
	var top = Math.tan((angle) * Math.PI/360);
	var right = top * aspect;
	return [
	   1/right, 0 , 0, 0,
	   0, 1/top, 0, 0,
	   0, 0, (zMax+zMin)/(zMin-zMax), -1,
	   0, 0, (2*zMax*zMin)/(zMin-zMax), 0 
	   ];
}

const getProjection = (type) => {
	const camera = {
		fieldOfView: 60,
		aspectRatio: canvas.clientWidth / canvas.clientHeight,
		nearClipPlane: 1,
		farClipPlane: 100.0,
	};
	projectionMatrix = m4()
	switch(type) {
		case "oblique":
			projectionMatrix = oblique(
				10,10,100
			)
			break;
		case "orthographic":
			projectionMatrix = orthographic(
				-5,
				5,
				-5,
				5,
				camera.nearClipPlane,
				camera.farClipPlane
				);
			break;
		default:
			projectionMatrix = perspective(
				camera.fieldOfView,
				camera.aspectRatio,
				camera.nearClipPlane,
				camera.farClipPlane
			);
	}
	return projectionMatrix
}

const multiply = (a, b) => {
	let res = new Array(16).fill(0);
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			for (let k = 0; k < 4; k++) {
				res[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
			}
		}
	}
	return res;
};

const scale = (m, sx, sy, sz) => {
	const scaleMatrix = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
	var res = multiply(m, scaleMatrix);
	return res;
};

const rotationX = (n, a) => {
	var cosAngle = Math.cos(a);
	var sinAngle = Math.sin(a);
	var n_4 = n[4],
		n_5 = n[5],
		n_6 = n[6],
		n_7 = n[7],
		n_8 = n[8],
		n_9 = n[9],
		n_10 = n[10],
		n_11 = n[11];

	var matrix = n;
	matrix[4] = n_4 * cosAngle + n_8 * sinAngle;
	matrix[5] = n_5 * cosAngle + n_9 * sinAngle;
	matrix[6] = n_6 * cosAngle + n_10 * sinAngle;
	matrix[7] = n_7 * cosAngle + n_11 * sinAngle;
	matrix[8] = n_8 * cosAngle - n_4 * sinAngle;
	matrix[9] = n_9 * cosAngle - n_5 * sinAngle;
	matrix[10] = n_10 * cosAngle - n_6 * sinAngle;
	matrix[11] = n_11 * cosAngle - n_7 * sinAngle;

	return matrix;
};

const rotationY = (n, a) => {
	var cosAngle = Math.cos(a);
	var sinAngle = Math.sin(a);
	var n_0 = n[0],
		n_1 = n[1],
		n_2 = n[2],
		n_3 = n[3],
		n_8 = n[8],
		n_9 = n[9],
		n_10 = n[10],
		n_11 = n[11];

	var matrix = n;
	matrix[0] = n_0 * cosAngle - n_8 * sinAngle;
	matrix[1] = n_1 * cosAngle - n_9 * sinAngle;
	matrix[2] = n_2 * cosAngle - n_10 * sinAngle;
	matrix[3] = n_3 * cosAngle - n_11 * sinAngle;
	matrix[8] = n_0 * sinAngle + n_8 * cosAngle;
	matrix[9] = n_1 * sinAngle + n_9 * cosAngle;
	matrix[10] = n_2 * sinAngle + n_10 * cosAngle;
	matrix[11] = n_3 * sinAngle + n_11 * cosAngle;

	return matrix;
};
const rotationZ = (n, a) => {
	var cosAngle = Math.cos(a);
	var sinAngle = Math.sin(a);
	var n_0 = n[0],
		n_1 = n[1],
		n_2 = n[2],
		n_3 = n[3],
		n_4 = n[4],
		n_5 = n[5],
		n_6 = n[6],
		n_7 = n[7];

	var matrix = n;
	matrix[0] = n_0 * cosAngle + n_4 * sinAngle;
	matrix[1] = n_1 * cosAngle + n_5 * sinAngle;
	matrix[2] = n_2 * cosAngle + n_6 * sinAngle;
	matrix[3] = n_3 * cosAngle + n_7 * sinAngle;
	matrix[4] = n_4 * cosAngle - n_0 * sinAngle;
	matrix[5] = n_5 * cosAngle - n_1 * sinAngle;
	matrix[6] = n_6 * cosAngle - n_2 * sinAngle;
	matrix[7] = n_7 * cosAngle - n_3 * sinAngle;

	return matrix;
};

const translate = (m, tx, ty, tz) => {
	const translateMatrix = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		tx, ty, tz, 1
	];
	var res = multiply(m, translateMatrix);
	return res;
};

const oblique = (width, height, depth) => {
	const mat = [
		2/width, 0, 0, 0,
		0, 2/height, 0, 0, 
		0, 0, 2/depth, 0,
		0, 0, 0, 1
	]

	const tetha = 75;
	const phi = 85;
	const cot_tetha = 1 / Math.tan(tetha/180*Math.PI);
	const cot_phi = 1 / Math.tan(phi/180*Math.PI);

	const mat2 = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		-cot_tetha, -cot_phi, 1, 0,
		0, 0, 0, 1
	]

	return multiply(mat, mat2);
}
const xRotation = (angleInRadians) => {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);

	return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

const yRotation = (angleInRadians) => {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);

	return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

const zRotation = (angleInRadians) => {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);

	return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

// const xRotate = (m, angleInRadians) => {
// 	return multiply(m, xRotation(angleInRadians));
// }
const createTranslationMatrix = (tx, ty, tz) => {
	return [
	  1, 0, 0, tx,
	  0, 1, 0, ty,
	  0, 0, 1, tz,
	  0, 0, 0, 1
	];
  }

  const multiplyMatrixAndVertex = (m, v) => {
	var result = [0, 0, 0, 0];
	result[0] = m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3];
	result[1] = m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7];
	result[2] = m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11];
	result[3] = m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15];
	return [result[0], result[1], result[2]];
  }

const xRotate = (m, angleInRadians) => {
	// var translateToOriginMatrix = translate(m, pivot[0], pivot[1], pivot[2])
	// var rotationMatrix = multiply(translateToOriginMatrix, xRotation(angleInRadians));
	// return translate(rotationMatrix, 0, 0, 0);

	return multiply(m, xRotation(angleInRadians));
  }
  



const yRotate = (m, angleInRadians) => {
	// var translateToOriginMatrix = translate(m, pivot[0], pivot[1], pivot[2])
	// var rotationMatrix = multiply(translateToOriginMatrix, xRotation(angleInRadians));
	// return translate(rotationMatrix, 0, 0, 0);
	return multiply(m, yRotation(angleInRadians));
}

const zRotate = (m, angleInRadians) => {
	return multiply(m, zRotation(angleInRadians));
}

const inverse = (m) => {
	var m00 = m[0 * 4 + 0];
	var m01 = m[0 * 4 + 1];
	var m02 = m[0 * 4 + 2];
	var m03 = m[0 * 4 + 3];
	var m10 = m[1 * 4 + 0];
	var m11 = m[1 * 4 + 1];
	var m12 = m[1 * 4 + 2];
	var m13 = m[1 * 4 + 3];
	var m20 = m[2 * 4 + 0];
	var m21 = m[2 * 4 + 1];
	var m22 = m[2 * 4 + 2];
	var m23 = m[2 * 4 + 3];
	var m30 = m[3 * 4 + 0];
	var m31 = m[3 * 4 + 1];
	var m32 = m[3 * 4 + 2];
	var m33 = m[3 * 4 + 3];
	var tmp_0 = m22 * m33;
	var tmp_1 = m32 * m23;
	var tmp_2 = m12 * m33;
	var tmp_3 = m32 * m13;
	var tmp_4 = m12 * m23;
	var tmp_5 = m22 * m13;
	var tmp_6 = m02 * m33;
	var tmp_7 = m32 * m03;
	var tmp_8 = m02 * m23;
	var tmp_9 = m22 * m03;
	var tmp_10 = m02 * m13;
	var tmp_11 = m12 * m03;
	var tmp_12 = m20 * m31;
	var tmp_13 = m30 * m21;
	var tmp_14 = m10 * m31;
	var tmp_15 = m30 * m11;
	var tmp_16 = m10 * m21;
	var tmp_17 = m20 * m11;
	var tmp_18 = m00 * m31;
	var tmp_19 = m30 * m01;
	var tmp_20 = m00 * m21;
	var tmp_21 = m20 * m01;
	var tmp_22 = m00 * m11;
	var tmp_23 = m10 * m01;

	var t0 =
		tmp_0 * m11 +
		tmp_3 * m21 +
		tmp_4 * m31 -
		(tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
	var t1 =
		tmp_1 * m01 +
		tmp_6 * m21 +
		tmp_9 * m31 -
		(tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
	var t2 =
		tmp_2 * m01 +
		tmp_7 * m11 +
		tmp_10 * m31 -
		(tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
	var t3 =
		tmp_5 * m01 +
		tmp_8 * m11 +
		tmp_11 * m21 -
		(tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

	var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

	return [
		d * t0,
		d * t1,
		d * t2,
		d * t3,
		d *
			(tmp_1 * m10 +
				tmp_2 * m20 +
				tmp_5 * m30 -
				(tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
		d *
			(tmp_0 * m00 +
				tmp_7 * m20 +
				tmp_8 * m30 -
				(tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
		d *
			(tmp_3 * m00 +
				tmp_6 * m10 +
				tmp_11 * m30 -
				(tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
		d *
			(tmp_4 * m00 +
				tmp_9 * m10 +
				tmp_10 * m20 -
				(tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
		d *
			(tmp_12 * m13 +
				tmp_15 * m23 +
				tmp_16 * m33 -
				(tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
		d *
			(tmp_13 * m03 +
				tmp_18 * m23 +
				tmp_21 * m33 -
				(tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
		d *
			(tmp_14 * m03 +
				tmp_19 * m13 +
				tmp_22 * m33 -
				(tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
		d *
			(tmp_17 * m03 +
				tmp_20 * m13 +
				tmp_23 * m23 -
				(tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
		d *
			(tmp_14 * m22 +
				tmp_17 * m32 +
				tmp_13 * m12 -
				(tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
		d *
			(tmp_20 * m32 +
				tmp_12 * m02 +
				tmp_19 * m22 -
				(tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
		d *
			(tmp_18 * m12 +
				tmp_23 * m32 +
				tmp_15 * m02 -
				(tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
		d *
			(tmp_22 * m22 +
				tmp_16 * m02 +
				tmp_21 * m12 -
				(tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
	];
}

const normalizeVector = (v) =>{
	var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
	if (length > 0.00001){
		return [v[0] / length, v[1] / length, v[2] / length];
	}else{
		return [0, 0, 0];
	}
}

const transpose = (m) => {
	return [
		m[0], m[4], m[8], m[12],
		m[1], m[5], m[9], m[13],
		m[2], m[6], m[10], m[14],
		m[3], m[7], m[11], m[15],
	]
}