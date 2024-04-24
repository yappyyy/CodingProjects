function Firework(colour,x,y){
    // Store the color, x and y coordinates of the firework
    var colour = colour;
    var x = x;
    var y = y;
     // Create an array to store particles
    var particles = [];
     // Flag to indicate if the firework is depleted
    this.depleted = false;
    // Create particles at different angles
    for(var i=0; i<360; i+=18){
        // Create a new Particle and add it to the particles array
        particles.push(new Particle(x,y,colour,i,firework_size));
    }
       // Function to draw the firework
    this.draw = function(){
        for(var i=0; i<particles.length; i++){  // Loop through all particles and draw them
            particles[i].draw(size); // Assuming 'size' is a variable defined elsewhere
        }
          // Check if the first particle's speed is less than or equal to 0
        if(particles[0].speed <= 0){
              // Set the 'depleted' flag to true to indicate that the firework is finished
            this.depleted = true;
        }
    }
}