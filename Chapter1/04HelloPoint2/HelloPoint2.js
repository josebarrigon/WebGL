// HelloPoint2.js
// Vertex shader program
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'attribute float a_PointSize; \n' +
'void main() {\n' +
' gl_Position = a_Position;\n' +
' gl_PointSize = a_PointSize;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1);\n' + // Set the color
'}\n'

var canvas = document.getElementById('webgl');

// Get the rendering context for WebGL
var gl = getWebGLContext(canvas);
if (!gl) {
console.log('Failed to get the rendering context for WebGL');
return;
}

// Initialize shaders
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
console.log('Failed to initialize shaders.');
return;
}
//Get the storage location of attribute variable
var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');

if(a_Position < 0 ){
    console.log("Failded to get storage a_position");
    return;
}
if(a_PointSize < 0 ){
    console.log("Failded to get storage a_pointsize");
    return;
}
// Pass vertex position to attribute variable
gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
//Pass object size to attribute variable
gl.vertexAttrib1f(a_PointSize, 5.0);
// Set the color for clearing <canvas>
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// Clear <canvas>
gl.clear(gl.COLOR_BUFFER_BIT);
// Draw a point
gl.drawArrays(gl.POINTS, 0, 1);

