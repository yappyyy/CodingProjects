//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
var blockMidHighLowApp;
var ridgePlotApp;
var threeRingsApp;
function preload(){
	sound = loadSound('assets/stomper_reggae_bit.mp3');
    fontRegular = loadFont('assets/neon.ttf'); //add font into the visualisation
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();
     textFont(fontRegular);   
	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations(); 
     ridgePlotApp = new RidgePlots();
     vis.add(ridgePlotApp);
     blockMidHighLowApp = new BlockMidHighLow();
     vis.add(blockMidHighLowApp); 
     threeRingsApp = new ThreeRings();   
     vis.add(threeRingsApp);   
}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
