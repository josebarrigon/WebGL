function main(){
    var canvas = document.getElementById('example');

    var ctx = canvas.getContext('2d');

    if(!ctx){
        console.log("error");
        return;
    }

    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';

    ctx.fillRect(120, 10, 150, 150);
}