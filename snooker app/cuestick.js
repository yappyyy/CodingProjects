// Object to represent the cue stick
var cueStick = {
    isVisible: false, // Flag indicating whether the cue stick is visible
    length: 300 // Length of the cue stick
};
// State variable for cue stick animation
var cueStickAnimationState = 'ready'; // Animation state: 'ready', 'striking', etc.
// Distance the cue stick moves during a strike
var cueStrikeDistance = 100; 
// Function to draw the cue stick on the canvas
function drawCueStick() {
    // Check if the cue stick is currently visible
    if (cueStick.isVisible) {
        stroke(150, 75, 0);
        strokeWeight(15);
        // Calculate the angle between the cue ball and the mouse position
        var angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
        // Draw the cue stick at the center of the cue ball with rotation
        push();
        translate(cueBall.position.x, cueBall.position.y);
        rotate(angle);
        line(0, 0, cueStick.length, 0);
        pop();
    }
}