//defining global variable
var rotateThresh; // rotation threshold for the blocks
var progThresh;     // progress threshold for the noiseline
var seedThresh; // seed threshold for noise line
var slideColour = '#000000'; // background color 
var spiralX; // X-coordinate of the spiral
var spiralY; // Y-coordinate of the spiral
var xSpeed;  // Horizontal speed of the spiral
var ySpeed;  // Vertical speed of the spiral
var spiralColor;
function BlockMidHighLow(){ // Define a constructor function for the BlockMidHighLow class
    this.name = "Block Mid High Low";
    var rot = 0; // angle for the rotation
    var noiseStep = 0.01; // stepsize for noise genertation 
    var prog = 0; // progess of the noiseline
    var gui;
    this.setup = function(){
        //initalise the values for the threshold 
        rotateThresh = 67;
        progThresh = 180;
        seedThresh = 140;
        spiralColor = color(255, 0, 0); // Initialize with red color (for example)
        //create GUI and position of GUI
        gui = createGui('Block Application');
        gui.setPosition(width-200,0);
        //slider range and GUI controls
        sliderRange(0.001,1,0.001);
        gui.addGlobals('noiseStep');
        sliderRange(0,255,1);
        gui.addGlobals('slideColour');
        gui.addGlobals('rotateThresh');
        gui.addGlobals('progThresh');
        sliderRange(140,255,1);
        gui.addGlobals('seedThresh');
        gui.hide(); //hide GUI initially
        spiralX = random(width);
        spiralY = random(height);
        xSpeed = random(1, 5);
        ySpeed = random(1, 5);
    }
    this.setup(); // Call the setup function to initialize the application
    
    this.onResize = function(){
        gui.setPosition(width-200,0); //adjust the position of the GUI when the window is resized
    }
    this.onResize();  // Call the onResize function to set the initial GUI position
    
    this.draw = function(){
        background(slideColour); //Set the background color
        fourier.analyze(); // analyze the audio spectrum
        var b = fourier.getEnergy("bass"); //get bass energy
        var t = fourier.getEnergy("treble"); // get treble energy
        rotatingBlocks(b); // draw rotating block //start of my own code
        spiralX += xSpeed;
        spiralY += ySpeed;
        fill(255);
        textSize(20);
        text("Click to change spiral color", spiralX +100, spiralY + 60);
        // Move the spiral based on user interaction
        if (mouseIsPressed) {
            // Check if the mouse is inside the spiral
            if (dist(mouseX, mouseY, spiralX, spiralY) < 50) {
             // Change the color of the spiral when the mouse is pressed inside it
                  spiralColor = color(random(255), random(255), random(255));
                }
        }

          // Check for collision with screen edges
          if (spiralX < 0 || spiralX > width) {
            xSpeed *= -1;
              changeSpiralColor(); // Call the function to change color
          }
          if (spiralY < 0 || spiralY > height) {
            ySpeed *= -1;
            changeSpiralColor(); // Call the function to change color
          }

          // Call the noiseSpiral function with the updated coordinates
          noiseSpiral(spiralX, spiralY, spiralColor);
            } //end of my own code
 
    function rotatingBlocks(energy){
        if(energy < rotateThresh){
            rot += 0.01; //Increment of the rotation angle
        }
        var r = map(energy, 0, 255, 20, 100); // r = length of the block // map energy from 0 to 255
        push();
        rectMode(CENTER);
        translate(width/2, height/2);
        rotate(rot); //rotate the origin
        fill(random(255),random(255),random(255));
        var incr = width / (10-1);  //calculate the spacing between the blocks
        //draw the rows of the squares
        for(var i = 0; i < 10; i++){ //start of my own code
            ellipse(i* incr - width/2, 0, r+100); //draw outer ellispe
            rect(i* incr- width/2,0,r+50,r);   // draw middle rectangle
            rect(i* incr- width/2,0,r-10,r);    // draw inner rectangle
            ellipse(i* incr - width/2, 45, r-40); //draw top ellipse
        }
        pop();
    }
    
    function noiseSpiral(x, y,color) { // Function to draw a noise-based spiral
      // Draw the spiral at the specified coordinates
      push();
      translate(x, y);
      fill(color); // Set the fill color
      strokeWeight(color); // Remove the stroke (outline) of the shape
      var angle = 0;
      beginShape();
      for (var i = 0; i < 200; i++) {
        var radius = map(i, 0, 199, 0, 100);
        angle += 0.1;
        var x = radius * cos(angle);
        var y = radius * sin(angle);
        vertex(x, y);
        }
      endShape(CLOSE);
      pop();
    }
    function changeSpiralColor() {      // Function to change the color of the spiral
        spiralColor = color(random(255), random(255), random(255)); // Change to a random color
    } //end of my own code
        this.isMouseInGUI = function(){  // Function to check if the mouse is in the GUI
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
         console.log("unselect gui for block app");
         gui.hide(); //hide GUI panel
     }
     
     this.selectVisual = function(){
         console.log("select gui for block app");
         gui.show(); //show GUI 
     }
}