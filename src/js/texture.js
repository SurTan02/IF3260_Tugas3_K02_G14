function loadCustomTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      pixel
    );
  
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
        
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture
  }
  
function isPowerOf2(value) {
return (value & (value - 1)) === 0;
}

function loadTextureReflective(gl) {
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

const faceInfos = [
{
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg',
},
{
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg',
},
{
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg',
},
{
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg',
},
{
    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg',
},
{
    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
    url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg',
},
];

faceInfos.forEach((face) => {
    const {target, url} = face;

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 512;
    const height = 512;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    gl.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        srcFormat,
        srcType,
        null
    );

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, srcFormat, srcType, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    };
    image.src = url;
});  
gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
return texture
}