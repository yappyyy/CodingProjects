// Import Matter.js components
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
// Initialize the physics engine
var engine;
// Define table dimensions and ball properties
var tableWidth = 1200; 
var tableLength = 600; 
var ballRadius = tableWidth / 36 / 2;  // Set balls diameter to be equal to table width / 36
// Define different modes for ball positions
var BallModes = {
  MODE1: 'mode1',
  MODE2: 'mode2',
  MODE3: 'mode3',
  MODE4: 'mode4'  
};
// Initialize current modes for red and colored balls
var currentRedBallMode = BallModes.MODE1;
var currentColourBallMode = BallModes.MODE1;
// Setup function runs once at the beginning
function setup() {
    // Create canvas and initialize Matter.js engine
    createCanvas(1200, 600);
    engine = Engine.create();
    engine.world.gravity.y = 0;
    // Call setup function from table.js to create walls
    setupWalls();
    pockets = []; // Array to store pocket bodies
    tableColor = color(0, 128, 0); // Green color for the table
    // Check if 'C' key is pressed and generate the cue ball accordingly
    if (keyIsPressed && (key === 'c' || key === 'C')) {
        generateCueBall();
    }
    // Generate red and colored balls, and create pockets
    generateRedBalls();
    generateColourBalls();
    // Call function from pocket.js to create pockets
    generatePockets();
}
// Draw function runs continuously in a loop
function draw() {
    background(255); // Set background to white
    Engine.update(engine);
    // Call draw functions from table.js to draw table, walls, and the line with the semicircle ("D")
    drawTable();
    drawWalls();
    drawSnookerD(); 
    // Call draw function from pocket.js to draw pockets
    drawPockets();
    drawRedBalls();
    drawColourBalls();
    // Display selected mode instructions
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    // Display mode selection instructions if the cue ball is not spawned
    if (!cueBallSpawned) {
        text("Press '1' for Mode 1 (starting positions)", width / 2, height / 2);
        text("Press '2' for Mode 2 (random positions (reds only))", width / 2, height / 2 + 50);
        text("Press '3' for Mode 3 (random positions (reds and coloured balls)", width / 2, height / 2 + 100);
        text("Press '4' for Mode 4 (Fun Extension)", width / 2, height / 2 + 150);
        text("Hover where you want to spawn the cue ball and press 'c'", width / 2, height / 2 + 200);
    }
    // Generate cue ball when 'C' key is pressed
    if (keyIsPressed && (key === 'c' || key === 'C')) {
        generateCueBall();
    }
    // Draw cue ball and cue stick if the cue ball is spawned
    if (cueBallSpawned) {
        drawCueBall();
        if (cueStick.isVisible) {
            drawCueStick();
        }
        // Check for collisions with red balls, colored balls, or cushions
        checkCueBallCollisions();
        handleCueBallInPockets();
    }
    // Update and display explosion particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();

        // Remove particles that are too faded out
        if (particles[i].lifespan <= 0) {
            particles.splice(i, 1);
        }
    }
}
// Function to draw a shape based on a set of vertices using p5.js
function drawVertices(vertices) {
    // Begin drawing the shape
    beginShape();
    // Iterate through the vertices and draw each vertex
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    // End the shape, connecting the last and first vertices to close it
    endShape(CLOSE);
}

//Commentary:
//To start, I combined mouse and keyboard operations for the cue ball feature, which makes it easier for users to manipulate the cue ball's position. The cue ball position is determined by the mouse position when the 'c' key is pressed.
//Secondly, I used the mouse operation to build the cue stick so that users could interact with it in the snooker application in a natural and easy way. The physical motion of pulling back and striking a cue ball in a game of snooker is quite like the drag-and-release contact with the mouse. Making use of the cue stick, keep the mouse button pressed. Move the mouse while holding the mouse button to point the cue stick in the desired direction. The power of the shot is determined by the length of the cue stick. Move the mouse away from the cue ball to lengthen the cue stick, and vice versa.
//To continue, I utilised the 'keyPressed' function to pick the mode. Changing modes is as simple as pressing the '1', '2', '3', or '4' keys. Modes 1-4 cause the creation of red and coloured balls in various configurations.
//Following that, the pocketing mechanism detects collisions between balls and pockets and responds accordingly. The handleCueBallInPockets() function determines whether the cue ball is pocketed and, if so, allows the user to reset the cue ball. whereas the resetColourBalls() function is intended to handle the return of a pocketed coloured ball to its original place. The removeColourBall() function checks for consecutive pocketing of coloured balls and warns the user of the error. Lastly when a red ball is pocketed, the removeRedBall() function removes it from both the redBalls array and the Matter.js world.
//In addition, I used Matter.js to develop physics for the snooker application. By setting restitution and friction qualities, this determines how balls interact with one other, cushions, and pockets, resulting in a realistic and compelling physics-based experience.
//Finally, for my extension's mode4, I decided to include an explosion element when a coloured ball is pocketed. As this adds an exciting and unpredictable element to the game of snooker that no one has seen before. When a coloured ball is pocketed, an explosion happens at the midpoint between the pocket and the pocketed coloured ball's position. The explosion effect is created by spawning a burst of particle objects at a predefined location; each particle has a colourful gradient, is shaped like a star, and has a fading effect. This adds a distinct and visually appealing element to the explosion effect, as well as to the general aesthetics of the application, making it more engaging and interesting for the player. Furthermore, the explosion applies directional forces to neighboring balls within a given radius. The explosive force causes impacted balls to migrate out from the centre of the explosion, providing a dynamic and visually appealing effect. The explosion feature provides a new spice to the game of snooker.
