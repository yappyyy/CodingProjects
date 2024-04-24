// Array to store pocket bodies
var pockets;
function generatePockets() {
    // Calculate the pocket radius based on 1.5 times the red ball diameter
    var pocketRadius = 1.5 * redBalls[0].circleRadius;
    // Define positions for six pockets on the snooker table
    var pocketPositions = [
        { x: tableWidth-1160, y: tableLength-570},              // Top-left pocket
        { x: tableWidth-1160, y: tableLength-40},           // bottom-left pocket
        { x: tableWidth-600, y: tableLength-570},              //Top-Middle pocket
        { x: tableWidth-600, y: tableLength-40},              //Bottom-Middle pocket
        { x: tableWidth-40, y: tableLength-570},              // Top-Right pocket
        { x: tableWidth-40, y: tableLength-40},              // bottom-Right pocket
    ];
    // Create circular bodies for each pocket and add them to the world
    for (var i = 0; i < pocketPositions.length; i++) {
        var pocket = Bodies.circle(pocketPositions[i].x, pocketPositions[i].y, pocketRadius, { isStatic: true });
        pockets.push(pocket);
        World.add(engine.world, pocket);
    }
}

function drawPockets() {
    noStroke();
    // Set the fill color for circular pockets
    fill(0);
    // Draw the circular pockets with yellow border
    for (var i = 0; i < pockets.length; i++) {
        // Draw yellow border
        fill(255, 255, 0); // Yellow color for the border
        ellipse(pockets[i].position.x, pockets[i].position.y, pockets[i].circleRadius * 2 + 10); // Increased size for the border
        // Draw the circular pocket
        fill(0);
        ellipse(pockets[i].position.x, pockets[i].position.y, pockets[i].circleRadius * 2);
    }
}