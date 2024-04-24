// Variable to track the dragged red ball
var draggedRedBall = null;
// Variable to track the dragged colored ball
var draggedColourBalls = null;
// Function triggered when a key is pressed
function keyPressed() {
    // Handle different key presses to change ball modes
    if (key === '1') {
    // Set modes to Mode 1 and regenerate balls accordingly
    currentRedBallMode = BallModes.MODE1;
    currentColourBallMode = BallModes.MODE1;
    generateRedBalls();
    generateColourBalls();
    console.log('Mode 1 selected. starting positions');
    } else if (key === '2') {
    // Set modes to Mode 2 and regenerate balls accordingly
    currentRedBallMode = BallModes.MODE2;
    currentColourBallMode = BallModes.MODE2;
    generateRedBalls();
    generateColourBalls();
    console.log('Mode 2 selected.random positions (reds balls only),');
    } else if (key === '3') {
    // Set modes to Mode 3 and regenerate balls accordingly
    currentRedBallMode = BallModes.MODE3;
    currentColourBallMode = BallModes.MODE3;
    generateRedBalls();
    generateColourBalls();
    console.log('Mode 3 selected.random positions (reds and colour balls)');
    } else if (key === '4') {
    // Set modes to Mode 4 and regenerate balls accordingly
    currentRedBallMode = BallModes.MODE4;
    currentColourBallMode = BallModes.MODE4;
    generateRedBalls();
    generateColourBalls();
    console.log('Mode 4 selected. Fun extension');
    }
    // Log cue ball status and pressed key
    console.log('Cue ball spawned:', cueBallSpawned);
    console.log('Key pressed:', key);
    // Generate cue ball if not spawned and 'c' or 'C' key is pressed
    if (!cueBallSpawned && (key === 'c' || key === 'C')) {
    console.log('Generating cue ball...');
    generateCueBall();
    }
}

function mousePressed() {
    if (cueBallSpawned) {
        // You can set a flag or perform any action when the mouse is pressed
        cueStick.isVisible = true;
    }
    // Check for red balls
    for (let i = 0; i < redBalls.length; i++) {
        if (checkCollisionPointCircle(mouseX, mouseY, redBalls[i])) {
            draggedRedBall = redBalls[i];
            break; // Exit the loop once a red ball is found
        }
    }
    // Check for colored balls
    for (let i = 0; i < colourBalls.length; i++) {
        if (checkCollisionPointCircle(mouseX, mouseY, colourBalls[i])) {
            draggedColourBalls = colourBalls[i];
            break;
        }
    }
}

function mouseDragged() {
    // Check if cueBall is defined and cue stick is visible
    if (cueBall && cueStick.isVisible) {
        // Calculate the angle between the cue ball and the mouse position
        var angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);

        // Calculate the distance between the cue ball and the mouse
        var distance = dist(mouseX, mouseY, cueBall.position.x, cueBall.position.y);

        // Move the cue stick away from the cue ball based on the distance
        cueStick.length = constrain(distance * 0.5, 50, 300);

        // Optionally, you can add other visual effects or animations for the cue stick during dragging
        cueStick.scaleFactor = map(distance, 0, width, 1, 2);
        cueStick.color = color(255, 0, 0);  // Change the color to red during dragging
    }
    // If a red ball is being dragged, update its position
    if (draggedRedBall) {
        draggedRedBall.position.x = mouseX;
        draggedRedBall.position.y = mouseY;
    }
    // If a colored ball is being dragged, update its position
    if (draggedColourBalls) {
        draggedColourBalls.position.x = mouseX;
        draggedColourBalls.position.y = mouseY;
    }
}

function mouseReleased() {
     // Check if cueBall is defined
    if (cueBall && cueStick.isVisible) {
        // Calculate the angle between the cue ball and the mouse position
        var angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
        // Calculate the force magnitude (you can adjust this value)
        var forceMagnitude = 0.05;
        // Apply force to the cue ball in the direction of the cue stick
        Body.applyForce(cueBall, cueBall.position, {
            x: -forceMagnitude * cos(angle),  // Negate the x-component
            y: -forceMagnitude * sin(angle)   // Negate the y-component
        });
        // Reset the flag or perform any other actions
        cueStick.isVisible = false;
    }
    // If a red ball is being dragged, check for collisions with pockets and handle pocketing
    if (draggedRedBall) {
        for (let i = 0; i < pockets.length; i++) {
            if (checkCollision(draggedRedBall, pockets[i])) {
                // Remove the red ball from the Matter.js world
                World.remove(engine.world, draggedRedBall);
                // Remove the red ball from the redBalls array
                const index = redBalls.indexOf(draggedRedBall);
                if (index !== -1) {
                    redBalls.splice(index, 1);
                }
                // Break the loop since the ball can only be pocketed once
                break;
            }
        }
        // Reset the draggedRedBall variable
        draggedRedBall = null;
    }
    if (draggedColourBalls) {
    // Reset the draggedColourBalls variable
    draggedColourBalls = null;
     }
}

