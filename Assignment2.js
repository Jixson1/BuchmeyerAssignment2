"use strict";

// declare global variables
let gl; 
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }


    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    colors = [];

    // And, add our vertices point into our array of points
    points = [];

    //Time to draw some stuff

    //Colors
    let black = vec3(.1, .1, .1);
    let grey = vec3(.15, .15, .15)

    let purple = vec3(vec3(.5, 0, .95));
    let light_purple = vec3(.5, 0, 1);
    let dark_purple = vec3(.4, 0, .95);
    let darkest_purple = vec3(.4, 0, .9);
    
    //Background

    drawSolidRectangle(vec2(.95, .95), vec2(.95, -.95), vec2(-.95, -.95), vec2(-.95, .95), grey);

    //Outline

    drawSolidTriangle(vec2(-.875, 0), vec2(0, -.875), vec2(.875, 0), black);

    drawSolidRectangle(vec2(-.875, .4), vec2(.875, .4), vec2(.875, 0), vec2(-.875, 0), black);

    drawSolidTriangle(vec2(-.875, .4), vec2(-.4, .875), vec2(.075, .4), black);

    drawSolidTriangle(vec2(.875, .4), vec2(.4, .875), vec2(-.075, .4), black);

    //Base shape

    drawSolidTriangle(vec2(-.8, 0), vec2(0, -.8), vec2(.8, 0), purple);

    drawSolidRectangle(vec2(-.8, .4), vec2(.8, .4), vec2(.8, 0), vec2(-.8, 0), purple);

    drawSolidTriangle(vec2(-.8, .4), vec2(-.4, .8), vec2(0, .4), purple);

    drawSolidTriangle(vec2(.8, .4), vec2(.4, .8), vec2(0, .4), purple);~

    //Center

    drawSolidTriangle(vec2(-.4, 0), vec2(0, .4), vec2(0, 0), dark_purple);

    drawSolidTriangle(vec2(.4, 0), vec2(0, .4), vec2(0, 0), light_purple);

    drawSolidTriangle(vec2(0, -.4), vec2(-.4, 0), vec2(0, 0), darkest_purple);

    //Quadrant 1
    drawSolidTriangle(vec2(0, .4), vec2(.4, .8), vec2(.4, .4), dark_purple);

    drawSolidTriangle(vec2(.8, .4), vec2(.4, .8), vec2(.4, .4), light_purple);

    drawSolidTriangle(vec2(.4, 0), vec2(.4, .4), vec2(0, .4), darkest_purple);

    drawSolidTriangle(vec2(.4, 0), vec2(.8, .4), vec2(.8, 0), dark_purple);

    //Quadrant 2

    drawSolidTriangle(vec2(-.4, .4), vec2(-.4, .8), vec2(0, .4), light_purple);

    drawSolidTriangle(vec2(-.8, .4), vec2(-.8, 0), vec2(-.4, 0), light_purple);

    drawSolidTriangle(vec2(-.4, .4), vec2(-.8, .4), vec2(-.4, 0), dark_purple);

    drawSolidTriangle(vec2(-.4, .4), vec2(0, .4), vec2(-.4, 0), darkest_purple);

    //Quadrant 3

    drawSolidTriangle(vec2(0, -.4), vec2(-.4, -.4), vec2(-.4, 0), dark_purple);

    //Quadrant 4

    drawSolidTriangle(vec2(0, -.4), vec2(.4, 0), vec2(.4, -.4), light_purple);

    drawSolidTriangle(vec2(.4, 0), vec2(.8, 0), vec2(.4, -.4), darkest_purple);

    drawSolidTriangle(vec2(0, -.4), vec2(0, -.8), vec2(.4, -.4), dark_purple);


    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .1, .1, .1, 1 );

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );


    render();

};



//Draw me some triangles
function drawSolidTriangle(pt0, pt1, pt2, color) {

    points.push(pt0);
    points.push(pt1);
    points.push(pt2);

    colors.push(color);
    colors.push(color);
    colors.push(color);
}

//Draw me some rectangles
function drawSolidRectangle(pt0, pt1, pt2, pt3, color) {

    points.push(pt0);
    points.push(pt1);
    points.push(pt2);
    points.push(pt0);
    points.push(pt2);
    points.push(pt3);

    colors.push(color);
    colors.push(color);
    colors.push(color);
    colors.push(color);
    colors.push(color);
    colors.push(color);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}