// Global array for walls
var walls = [];
// Function to draw the table
function drawTable() {
    fill(tableColor);
    noStroke();
    rectMode(CENTER);
    var cornerRadius = 30; 
    rect(width / 2, height / 2, tableWidth, tableLength, cornerRadius);
}
// Function to draw the "D" shape on the snooker table
function drawSnookerD() {
    stroke(255); // White color for the line
    strokeWeight(2);
    line(width / 2 - 250, height / 2 - 280, width / 2 - 250, height / 2 + 280); 
    // Draw the curved part of the "D"
    noFill();
    arc(width / 2 - 250, height / 2, 200, 200, HALF_PI, -HALF_PI);
}
// Function to set up the walls including outer rails and inner cushions
function setupWalls() {
    var canvasCenterX = width / 2;
    var canvasCenterY = height / 2;
    var railThickness = 20; 
    var cornerRadius = 30; 
    // Bottom rail with rounded corners
    var wall1 = Bodies.rectangle(
        canvasCenterX,
        canvasCenterY + tableLength / 2 - railThickness / 2,
        tableWidth - 2 * cornerRadius,
        railThickness,
        { isStatic: true, chamfer: { radius: cornerRadius } }
    );
    // Top rail with rounded corners
    var wall2 = Bodies.rectangle(
        canvasCenterX,
        canvasCenterY - tableLength / 2 + railThickness / 2,
        tableWidth - 2 * cornerRadius,
        railThickness,
        { isStatic: true, chamfer: { radius: cornerRadius } }
    );
    // Left rail with rounded corners
    var wall3 = Bodies.rectangle(
        canvasCenterX - tableWidth / 2 + railThickness / 2,
        canvasCenterY,
        railThickness,
        tableLength - 2 * cornerRadius,
        { isStatic: true, chamfer: { radius: cornerRadius } }
    );
    // Right rail with rounded corners
    var wall4 = Bodies.rectangle(
        canvasCenterX + tableWidth / 2 - railThickness / 2,
        canvasCenterY,
        railThickness,
        tableLength - 2 * cornerRadius,
        { isStatic: true, chamfer: { radius: cornerRadius } }
    );
    // Add rails to the walls array
    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);
    // Add rails to the Matter.js world
    World.add(engine.world, [wall1, wall2, wall3, wall4]);
    // Inner cushions
    var innerCushionThickness = 10; 
    var innerCushionCornerRadius = 15; 
    var innerCushion1 = Bodies.rectangle(
        canvasCenterX,
        canvasCenterY + tableLength / 2 - railThickness - innerCushionThickness / 2,
        tableWidth - 2 * cornerRadius,
        innerCushionThickness,
        { isStatic: true, chamfer: { radius: innerCushionCornerRadius } }
    );
    var innerCushion2 = Bodies.rectangle(
        canvasCenterX,
        canvasCenterY - tableLength / 2 + railThickness + innerCushionThickness / 2,
        tableWidth - 2 * cornerRadius,
        innerCushionThickness,
        { isStatic: true, chamfer: { radius: innerCushionCornerRadius } }
    );
    var innerCushion3 = Bodies.rectangle(
        canvasCenterX - tableWidth / 2 + railThickness + innerCushionThickness / 2,
        canvasCenterY,
        innerCushionThickness,
        tableLength - 2 * cornerRadius,
        { isStatic: true, chamfer: { radius: innerCushionCornerRadius } }
    );
    var innerCushion4 = Bodies.rectangle(
        canvasCenterX + tableWidth / 2 - railThickness - innerCushionThickness / 2,
        canvasCenterY,
        innerCushionThickness,
        tableLength - 2 * cornerRadius,
        { isStatic: true, chamfer: { radius: innerCushionCornerRadius } }
    );
    // Add inner cushions to the walls array
    walls.push(innerCushion1, innerCushion2, innerCushion3, innerCushion4);

    // Add inner cushions to the Matter.js world
    World.add(engine.world, [innerCushion1, innerCushion2, innerCushion3, innerCushion4]);
}
// Function to draw the walls on the canvas
function drawWalls(){
    fill(51, 34, 17);
    for(var i = 0; i < walls.length; i++){
        drawVertices(walls[i].vertices);
    }
    // Draw inner cushions with darker green color
    fill(0, 80, 0); // Dark green color for inner cushions
    for (var i = 4; i < walls.length; i++) {
        drawVertices(walls[i].vertices);
    }
}