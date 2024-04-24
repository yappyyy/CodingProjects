//global variable (start my own code)
var lineColor = '#9146FF'; // define the line color inside the three rings
var ellipseSpeed; //defining the speed of the ellipse
var firework_frequency; // defining the frequency of fireworks
var firework_size; //define size of firework
var firework_speed; //define speed of firework
function ThreeRings(){
    this.name ="Three Ring";
    //definiation 
    var gui; 
    var fft = new p5.FFT();
    var fourier = new p5.FFT();
    this.setup = function(){
        ellipseSpeed = 1; // Initialize the ellipseSpeed
        firework_frequency = 10; // Initialize the firework frequency
        firework_size = 5; // Initial size of the fireworks
        firework_speed = 0.1; //Initial speed of the fireworks
        //setup function to intialize the gui function 
        gui = createGui('Rings Application');
        gui.setPosition(width-200,0);
        //slider range and GUI controls
        sliderRange(0,255,1);
        gui.addGlobals('lineColor');
        sliderRange(1,100,1);
        gui.addGlobals('ellipseSpeed');
        sliderRange(1,15,1);
        gui.addGlobals('firework_frequency'); // Add control for firework frequency
        sliderRange(5, 15, 1); // Define the size range you want
        gui.addGlobals('firework_size'); // Add the control to the GUI
        sliderRange(0.1, 0.4, 0.1); // Define the speed range you want
        gui.addGlobals('firework_speed'); // Add the control to the GUI
        gui.hide();  //to hide the GUI from the other visualization
        //fireworrk setup
        background(0);
        frameRate(60);
        beatDetect = new BeatDetect();
        fireworks = new Fireworks(); 
    }
    this.setup();
      // Function to handle resizing of the window   
    this.onResize = function(){
       gui.setPosition(width-200,0); //this is to resize the gui when the windows is resized
    }
    this.onResize();
    
    this.draw = function(){
        //main drawing code
        colorMode(HSB, 100);//set colormode to RGB
        //analyze the audio using fourier transform
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        var h = fourier.getEnergy(2000, 8000); 
        //maping the background color based on the high frequency energy
        var backgroundColor = map(h, 0, 255, 0, 100); //adpated code from p5.js.org
        background(backgroundColor);
        //drawing the left ring based on the bass energy
        this.leftRings(b);
        //drawing the ring ring based on the treble energy
        this.ringRings(t);
        //switch back to RGB mode for other visualisation to use
        colorMode(RGB);
        var spectrum = fourier.analyze();
        // Check for beat and randomize fireworks based on frequency
        if (beatDetect.detectBeat(spectrum) && random(1) < firework_frequency / 75) {
                fireworks.addFirework();
            }
        fireworks.update(); 
    };//(end my own code)

            
    this.leftRings = function(energy){ //(start my own code)
        var spectrum = fft.analyze();
        for(var i = 0; i < spectrum.length*3; i+= 50){
            var c1= map(i, 0, spectrum.length, 0, 255);
            var d1 = map(spectrum[i], 0, 255, 0, height * 0.75);
            noStroke();
            fill(c1, 255, 15);
            //drawing the first ellipse
            var x1 = map(i, 0, spectrum.length, width / 6, width / 3);
            var y1 = height / 2 + map(energy, 0, 255, -d1/4, d1/4);
            //modifying the position due to the speed
            x1 += ellipseSpeed; //adpated code from p5.js.org
            y1 += ellipseSpeed; //adpated code from p5.js.org
            ellipse(x1, y1, d1 / 2, d1 / 2);
            //drawing the second ellipse
            var x2 = map(i, 0, spectrum.length, width / 6, 0);
            var y2 = height / 2 + map(energy, 0, 255, -d1/4, d1/4);
            ellipse(x2, y2, d1 / 2, d1 / 2);
            //drawing the line inbetween
            stroke(lineColor);
            noFill();
            line(x1, y1, x2, y2);
        }
    }//(end my own code)
          			           
    this.ringRings = function(energy){//(start my own code)
        var spectrum = fft.analyze();
        for(var i = 0; i <spectrum.length * 3; i+= 50){
            var c2 = map(i, 0, spectrum.length, 0, 255);
            var d2 = map(spectrum[i], 0, 255, 0, height * 0.75);
            noStroke();    
            fill(c2, 255, 30);
            //drawing the first ellipse
            var x3 = map(i, 0, spectrum.length, width * 5 / 6, width * 2 / 3);
            var y3 = height / 2 + map(energy, 0, 255, -d2/4, d2/4);
            //modifying the position due to the speed
            x3 -= ellipseSpeed; //adpated code from p5.js.org
            y3 -= ellipseSpeed; //adpated code from p5.js.org
            ellipse(x3, y3, d2 / 2, d2 / 2);
            //drawing the second ellipse
            var x4 = map(i, 0, spectrum.length, width * 5 / 6, width);
            var y4 = height / 2 + map(energy, 0, 255, -d2/4, d2/4);
            ellipse(x4, y4, d2 / 2, d2 / 2); 
            //drawing the line inbetween
            stroke(lineColor);
            noFill();
            line(x3, y3, x4, y4); 
        }
    }//(end my own code)
    this.isMouseInGUI = function(){ //to check whether the mouse is inside the GUI
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
         console.log("unselect gui for ring app"); //function to hide the GUI
         gui.hide();
        
     }
     
     this.selectVisual = function(){
         console.log("select gui for ring app"); //function to show the GUI
         gui.show();
     }
        
}