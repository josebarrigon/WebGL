function main(){
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    if(!gl){
        console.log("Failed to get webgl context");
        return;
    }
    //specify the color to clear the canvas when calling the clear buffer
    gl.clearColor(1.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}