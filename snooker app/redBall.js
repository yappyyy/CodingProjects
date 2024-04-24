// Global array for red balls
var redBalls = []; 
// Function to generate red balls based on the selected mode
function generateRedBalls() {
    // Clear existing red balls
    redBalls.forEach(ball => World.remove(engine.world, ball));
    redBalls = []; // Reset the array

    // Select the mode based on the current mode value
    switch (currentRedBallMode) {
    case BallModes.MODE1:
    // Offset for the new arrangement
    var xOffsetMode1 = 2 * ballRadius;
    // Number of rows and columns in the new arrangement
    var numRowsMode1 = 5;
    // Adjusted starting position for the new arrangement
    var startXMode1 = width / 2 + 300;  // Adjust this value as needed
    // Create a new arrangement of red balls for mode 1
    for (var row = 0; row < numRowsMode1; row++) {
        for (var col = 0; col <= row; col++) {
            var ballX = startXMode1 + row * 1.5 * ballRadius;
            var ballY = height / 2 + col * xOffsetMode1 - row * ballRadius;
            var redBall = Bodies.circle(
            ballX,
            ballY,
            ballRadius,
            { restitution: 1, friction: 0.2, render: { fillStyle: 'red' } }
            );

            redBalls.push(redBall);
            World.add(engine.world, redBall);
        }
    }
    break;

    case BallModes.MODE2:
    case BallModes.MODE3:
    case BallModes.MODE4:
    var numRedBalls = 15;
    var rangeFromEdge = 60; 
    // Random positions for red balls in mode 3, constrained to a range from the edges of the table
    for (var i = 0; i < numRedBalls; i++) {
        var ballX = Math.random() * (tableWidth - 2 * rangeFromEdge) + rangeFromEdge; // Constrained to a range from the left and right edges
        var ballY = Math.random() * (tableLength - 2 * rangeFromEdge) + rangeFromEdge; // Constrained to a range from the top and bottom edges
        var redBall = Bodies.circle(
        ballX,
        ballY,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: 'red' } }
        );
        redBalls.push(redBall);
        World.add(engine.world, redBall);
    }
    break;
    default:
    // Do nothing if the mode is not recognized
    console.log('Invalid red ball mode:', currentRedBallMode);
    }
}

function drawRedBalls() {
    fill(255, 0, 0);
    for (var i = 0; i < redBalls.length; i++) {
        drawVertices(redBalls[i].vertices);
        // Check for collisions with pockets and remove the red ball if needed
        removeRedBall(redBalls[i]);
    }
}
// Function to remove a red ball from the array and the Matter.js world when pocketed
function removeRedBall(redBall) {
    for (let i = 0; i < pockets.length; i++) {
        if (checkCollision(redBall, pockets[i])) {
            // Store information about the last pocketed colored ball
            lastPocketedBalls.push({ type: 'red', position: redBall.position, time: millis() });
            // Remove the red ball from the Matter.js world
            World.remove(engine.world, redBall);
            // Remove the red ball from the redBalls array
            const index = redBalls.indexOf(redBall);
                if (index !== -1) {
                redBalls.splice(index, 1);
                }
        // Log a message when a red ball is pocketed
        console.log('Red ball is pocketed!');
        // Break the loop since the ball can only be pocketed once
        break;
        }
    }
}