// Global array to store colored balls
var colourBalls = [];
// Array to keep track of the last pocketed balls
var lastPocketedBalls = [];
// Array to store the original positions of colored balls for resetting
var originalColourBallPositions = [];
// Flag to indicate whether colored balls are currently being reset
var resettingColourBalls = false;
// Function to generate colored balls based on the current mode
function generateColourBalls() {
    // Clear the existing colored balls and their original positions
    colourBalls.forEach(ball => World.remove(engine.world, ball));
    colourBalls = [];
    originalColourBallPositions = [];

    // Define the positions, colors, and fillStyles for the colored balls based on the current mode
    switch (currentColourBallMode) {
    case BallModes.MODE1:
    case BallModes.MODE2:
    var ballsDataMode1 = [
    { x: tableWidth - 600, y: tableLength - 300, color: 'blue', fillStyle: 'blue' },
    { x: tableWidth - 100, y: tableLength - 300, color: 'black', fillStyle: 'black' },
    { x: tableWidth - 360, y: tableLength - 300, color: 'pink', fillStyle: 'pink' },
    { x: tableWidth - 850, y: tableLength - 300, color: 'brown', fillStyle: 'brown' },
    { x: tableWidth - 850, y: tableLength - 400, color: 'darkgreen', fillStyle: 'darkgreen' },
    { x: tableWidth - 850, y: tableLength - 200, color: 'yellow', fillStyle: 'yellow' }
    ];

    // Create new instances of the colored balls and store their original positions
    ballsDataMode1.forEach(data => {
    var colourBall = Bodies.circle(data.x, data.y, ballRadius, { restitution: 1, friction: 0.2, render: { fillStyle: data.fillStyle } });
    originalColourBallPositions.push({ x: data.x, y: data.y });
    colourBalls.push(colourBall);
    World.add(engine.world, colourBall);
    });
    break;

    case BallModes.MODE3:
    case BallModes.MODE4:
    var numColourBalls = 6;
    var ballsDataMode1 = [
    { color: 'blue', fillStyle: 'blue' },
    { color: 'black', fillStyle: 'black' },
    { color: 'pink', fillStyle: 'pink' },
    { color: 'brown', fillStyle: 'brown' },
    { color: 'darkgreen', fillStyle: 'darkgreen' },
    { color: 'yellow', fillStyle: 'yellow' }
    ];

    // Random positions for colored balls in mode 3, constrained to tableWidth and tableLength
    for (var i = 0; i < numColourBalls; i++) {
        var randomIndex = Math.floor(Math.random() * ballsDataMode1.length);
        var randomData = ballsDataMode1.splice(randomIndex, 1)[0];
        var rangeFromEdge = 60; // Set the desired range from the edges
        var ballX = Math.random() * (tableWidth - 2 * rangeFromEdge) + rangeFromEdge; // Constrained to a range from the left and right edges
        var ballY = Math.random() * (tableLength - 2 * rangeFromEdge) + rangeFromEdge; // Constrained to a range from the top and bottom edges

        var colourBall = Bodies.circle(
        ballX,
        ballY,
        ballRadius,
        { restitution: 1, friction: 0.2, render: { fillStyle: randomData.fillStyle } }
        );

        originalColourBallPositions.push({ x: ballX, y: ballY });
        colourBalls.push(colourBall);
        World.add(engine.world, colourBall);
    }
    break;
    default:
    // Do nothing if the mode is not recognized
    console.log('Invalid color ball mode:', currentColourBallMode);
    }
}
// Function to remove a colored ball if it collides with a pocket
function removeColourBall(colourBall) {
    // Check if the colored ball is not pocketed
    if (!colourBall.isPocketed) {
        // Iterate through the pockets and check for collisions
        for (let i = 0; i < pockets.length; i++) {
            if (checkCollision(colourBall, pockets[i])) {
                // Store information about the last pocketed colored ball
                lastPocketedBalls.push({ type: 'colored', position: colourBall.position, time: millis() });
                // Check for consecutive colored balls in the same pocket
                if (lastPocketedBalls.length >= 2) {
                    var lastBallType = lastPocketedBalls[lastPocketedBalls.length - 1].type;
                    var secondLastBallType = lastPocketedBalls[lastPocketedBalls.length - 2].type;
                    if (lastBallType === 'colored' && secondLastBallType === 'colored') {
                        // Notify the user of the mistake
                        alert('Two consecutive colored balls are pocketed! Mistake!');
                        // You can display this message to the user in a more user-friendly way, for example, using an alert.
                    }
                }
                // Trigger an explosion only in Mode 4
                if (currentColourBallMode === BallModes.MODE4) {
                    var explosionX = (colourBall.position.x + pockets[i].position.x) / 2;
                    var explosionY = (colourBall.position.y + pockets[i].position.y) / 2;
                    explode(explosionX, explosionY);
                    // Apply forces to nearby balls only in Mode 4
                    applyExplosionForces(colourBall.position, 150); // Adjust the explosion radius as needed
                }
                // Remove the colored ball from the Matter.js world
                World.remove(engine.world, colourBall);
                // Reset the colored ball to its original position
                resetColourBalls(colourBall);
                // Optionally, you can perform any other actions when a colored ball is pocketed
                console.log('Colour ball is pocketed!');
                // Break the loop since the ball can only be pocketed once
                break;
            }
        }
    }
}
// Function to reset a colored ball to its original position
function resetColourBalls(colourBall) {
    // Check if the ball is not currently resetting
     if (!colourBall.isResetting) {
        colourBall.isResetting = true;
        // Find the index of the pocketed ball
        var index = colourBalls.indexOf(colourBall);
        // Check if the index is valid
        if (index !== -1) {
            // Check if the ball is pocketed before resetting
            if (!colourBall.isPocketed) {
                // Create a new instance of the colored ball
                var newColourBall = Bodies.circle(originalColourBallPositions[index].x, originalColourBallPositions[index].y, ballRadius, { restitution: 1, friction: 0.2, render: { fillStyle: colourBall.render.fillStyle } });
                // Replace the existing ball with the new instance
                World.remove(engine.world, colourBall);
                colourBalls[index] = newColourBall;
                World.add(engine.world, newColourBall);
            }
        }
    // Wait for the next afterUpdate event to unset the isResetting flag
    Matter.Events.on(engine, 'afterUpdate', function resetCallback() {
        // Unset the isResetting flag
        colourBall.isResetting = false;

        // Reset the isPocketed flag to allow the ball to be pocketed again
        colourBall.isPocketed = false;

        // Remove the event listener
        Matter.Events.off(engine, 'afterUpdate', resetCallback);
        });
    }
}

function drawColourBalls() {
    for (var i = 0; i < colourBalls.length; i++) {
        fill(colourBalls[i].render.fillStyle);
        drawVertices(colourBalls[i].vertices);
        // Check for collisions with pockets and remove the colored ball if needed
        removeColourBall(colourBalls[i]);
    }
}

