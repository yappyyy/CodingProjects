// declare global variable 
var bigScale; //start my own code // Scale factor for the ridge plot
var spectrumWidth; // Width of the spectrum area
var ridgeColour = '#FD5DA8'; // Color for the ridge plot
var angle;  // Angle for rotating the ridge plot
function RidgePlots(){ // Define the RidgePlots class
    var startX;
    var startY;
    var endY;
    var speed = 2.0;  // Speed of the waves
    var output = [];
    var gui;
    this.name = "Ridge Plots"; 
    // Name for this visualization
    this.setup = function(){
         // Initialize global variables
        bigScale = 70;
        spectrumWidth = (width/5) * 3;
        angle = 3.141;
        //Create GUI
        gui = createGui('RidgePlot Application');
        //slider range and GUI controls
        gui.setPosition(width - 200, 0);
        sliderRange(30,255,1);
        gui.addGlobals('bigScale');
        sliderRange(0,255,1);
        gui.addGlobals('spectrumWidth');
        sliderRange(0,255,1);
        gui.addGlobals('ridgeColour');
        sliderRange(2.5,4.2,0.001);
        gui.addGlobals('angle');
    }
    this.setup(); //end my own code
    // Function to handle resizing of the window
    this.onResize = function(){
        startX = width/5;
        endY = height/5;
        startY = height - endY;
        gui.setPosition(width - 200, 0);
    };
    this.onResize();
     // Function to draw the ridge plot
    this.draw = function (){ // start my own code
        background(0);
        stroke(255);
        strokeWeight(1);
         // Rotate the coordinate system by the specified angle
        translate(width, height); 
        rotate(angle); //end my own code
        //add a new wave to the ridge plot at a certain timing
        if(frameCount % 10==0){
            addWave();
        }
        for(var i = output.length -1; i >= 0; i--){  // Loop through the output waves and draw the ridge plots
            var wave = output[i];
            colorMode(HSB,100); //my own code 
            fill(ridgeColour); // my own code
            beginShape();
            for(var j = 0; j <wave.length; j++){
                wave[j].y -= speed;
                vertex(wave[j].x, wave[j].y);
            }
            endShape();
            if(wave[0].y < endY){
                output.splice(i,1); //remove wave that go beyond endY value
            }
        }
        //switch back to RGB mode for other visualisation to use
        colorMode(RGB); 
        resetMatrix(); // my own code
    }
    // Function to add a wave to the ridge plot
    function addWave(){
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale = 3;
        for(var i = 0; i < w.length; i++){
            if(i%20 == 0){
                var x = map(i,0,1024,startX,startX+spectrumWidth);
                
                if(i<1024*0.25 || i > 1024 * 0.75){
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    var o = {x:x, y: startY + y};
                    outputWave.push(o);
                }else{
                    var y = map(w[i],-1,1,-bigScale,bigScale);
                    var o = {x:x, y: startY + y};
                    outputWave.push(o);
                }
            }
        }
        output.push(outputWave); //add output wave to the output array
    }
    this.isMouseInGUI = function(){ //check whether mouse is in GUI
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._panel.clientWidth;
        gui_x = parseInt(gui_x,10);
        gui_y = parseInt(gui_y,10);
        gui_height = parseInt(gui_height,10);
        gui_width = parseInt(gui_width,10);
        if(mouseX>gui_x && mouseX<gui_x+gui_width){
            if(mouseY>gui_y && mouseY<gui_y+gui_height){
                inGUI=true;
            }
        }
        return inGUI;
    }
    this.unSelectVisual = function(){
         console.log("unselect gui for ridge app");
         gui.hide();//hide GUI panel
     }
     
     this.selectVisual = function(){
         console.log("select gui for ridge app");
         gui.show();//show GUI
     }
}