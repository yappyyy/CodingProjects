// Define the cue ball
var cueBall;
var cueBallSpawned = false; // Flag to track if the cue ball is spawned
var ballRadius = tableWidth / 36 / 2;  // Set balls diameter to be equal to table width / 36
// Function to generate the cue ball
function generateCueBall() {
    // Check if the cue ball is already spawned
    if (!cueBallSpawned) {
        // Calculate the position for the cue ball within the D-shaped area
        var dCenterX = width / 2 - 250;
        var dCenterY = height / 2;
        // Ensure the cue ball is generated within the D-shaped area
        var cueBallX = constrain(mouseX, dCenterX - 100, dCenterX + 100);
        var cueBallY = constrain(mouseY, dCenterY - 100, dCenterY + 100);
        cueBall = Bodies.circle(cueBallX, cueBallY, ballRadius, { restitution: 1, friction: 0.2 });
        World.add(engine.world, [cueBall]);
        // Update the flag to indicate that the cue ball has been spawned
        cueBallSpawned = true;
    }
}
// Function to handle the cue ball in pockets
function handleCueBallInPockets() {
    // Check if the cue ball is in the pockets
    for (let i = 0; i < pockets.length; i++) {
        if (checkCollision(cueBall, pockets[i])) {
            // Reset the cue ball spawned flag
            cueBallSpawned = false;
            // Remove the cue ball from the Matter.js world
            World.remove(engine.world, cueBall);
            // Log a message to indicate that the cue ball is pocketed
            console.log('Cue ball is pocketed!');
            // Optionally, you can perform any other actions when the cue ball is pocketed
            // Alert the user that the cue ball has been pocketed
            alert('Cue ball has been pocketed!');
            return true; // Indicate that the cue ball is in a pocket
        }
    }
    return false; // Indicate that the cue ball is not in a pocket
}

// Function to draw the cue ball
function drawCueBall() {
    fill(255);
    drawVertices(cueBall.vertices);
}
// Function to check the cue ball Collisions
function checkCueBallCollisions() {
    // Check for collisions with red balls
    if (redBalls.some(ball => checkCollision(cueBall, ball))) {
        console.log('Cue-Red Impact');
        // You can display a message or perform other actions specific to this collision type
    }
    // Check for collisions with colored balls
    if (colourBalls.some(ball => checkCollision(cueBall, ball))) {
        console.log('Cue-Colour Impact');
    }
    // Check for collisions with cushions
    if (walls.some(cushion => checkCollision(cueBall, cushion))) {
        console.log('Cue-Cushion Impact');
    }
}

function checkCollision(bodyA, bodyB) {
    // Use Matter.js SAT (Separating Axis Theorem) to check for collisions
    return Matter.SAT.collides(bodyA, bodyB).collided;
}

function checkCollisionPointCircle(px, py, circle) {
    // Check if a point (px, py) is inside a circle
    const dx = px - circle.position.x;
    const dy = py - circle.position.y;
    const distanceSquared = dx * dx + dy * dy;
    return distanceSquared <= circle.circleRadius * circle.circleRadius;
}