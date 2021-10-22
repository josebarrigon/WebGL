var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = 10.0;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n' +
'void main() {\n' +
' gl_FragColor = u_FragColor;\n' + // Set the color
'}\n'

function main(){
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

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    
    if(a_Position < 0 ){
        console.log("Failded to get storage a_position");
        return;
    }
    
    if(u_FragColor < 0 ){
        console.log("Failded to get storage u_FragColor");
        return;
    }

    canvas.onmousedown = function(ev) {click(ev,gl,canvas,a_Position,u_FragColor);};

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = []; // The array for a mouse press
var g_colors = []; // The array to store the color of a point

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();
    
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

    // Store the coordinates to g_points array
    g_points.push([x, y]);

    //Store the colors in g_colors
    if(x >= 0.0 && y >= 0.0) { 
        g_colors.push([1.0, 0.0, 0.0, 1.0]); //Red
    }
    else if(x < 0.0 && y < 0.0) { // Third quadrant
        g_colors.push([0.0, 1.0, 0.0, 1.0]); // Green
    }
    else { // Others
        g_colors.push([1.0, 1.0, 1.0, 1.0]); // White
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
   
    var len = g_points.length;
    for(var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgba = g_colors[i];

        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);
        
        // Draw a point
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}