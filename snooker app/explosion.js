// Array to store particle objects
var particles = [];
// Function to create an explosion effect at a specified position
function explode(x, y) {
    console.log('Explosion at:', x, y);
    // Create a specified number of particle objects at the explosion position
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y));
    }
}
// Function to apply explosion forces to nearby balls based on a specified position and radius
function applyExplosionForces(explosionPosition, explosionRadius) {
    // Apply forces to nearby balls based on the explosion
    var explosionForceMagnitude = 0.04; 
    // Apply forces to nearby red balls
    redBalls.forEach(redBall => {
    var distance = dist(explosionPosition.x, explosionPosition.y, redBall.position.x, redBall.position.y);
        if (distance < explosionRadius) {
            var angle = atan2(redBall.position.y - explosionPosition.y, redBall.position.x - explosionPosition.x);
            var forceX = explosionForceMagnitude * cos(angle);
            var forceY = explosionForceMagnitude * sin(angle);

            // Apply force to the red ball
            Body.applyForce(redBall, redBall.position, { x: forceX, y: forceY });
        }
    });
    // Apply forces to nearby colored balls
    colourBalls.forEach(colourBall => {
        var distance = dist(explosionPosition.x, explosionPosition.y, colourBall.position.x, colourBall.position.y);
        if (distance < explosionRadius) {
            var angle = atan2(colourBall.position.y - explosionPosition.y, colourBall.position.x - explosionPosition.x);
            var forceX = explosionForceMagnitude * cos(angle);
            var forceY = explosionForceMagnitude * sin(angle);
            // Apply force to the colored ball
            Body.applyForce(colourBall, colourBall.position, { x: forceX, y: forceY });
        }
    });
}
// Particle class definition
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().mult(random(2, 5));
        this.acceleration = createVector(0, 0.1);
        this.lifespan = 255;
        // Define a colorful gradient for the particle
        this.colors = [
            color(255, 0, 0),
            color(255, 165, 0),
            color(255, 255, 0),
            color(0, 255, 0),
            color(0, 0, 255),
            color(128, 0, 128)
        ];
    }
    // Function to update particle position and decrease lifespan
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 5;
    }
    // Function to display the particle on the canvas
    display() {
        noStroke();
        // Map color based on lifespan
        var alpha = map(this.lifespan, 0, 255, 0, 1);
        var colIdx = floor(alpha * (this.colors.length - 1));
        var col1 = this.colors[colIdx];
        var col2 = this.colors[colIdx + 1];
        // Interpolate between two colors based on lifespan
        var col = lerpColor(col1, col2, alpha % 1);
        fill(col.levels[0], col.levels[1], col.levels[2], this.lifespan);
        // Draw a star shape
        this.drawStar(this.position.x, this.position.y, 5, 10, 5);
    }
    // Function to draw a star shape
drawStar(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
        var sx = x + cos(a) * radius2;
        var sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    }
}

