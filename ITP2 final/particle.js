function Particle(x,y,colour,angle,speed,size){
    // Particle attributes
    this.x = x; // X-coordinate
    this.y = y; // Y-coordinate
    this.angle = angle; // Angle of motion
    this.speed = speed; // Speed of the particle
    this.colour = colour; // Particle color
    this.age = 255; // Age of the particle
     // Function to draw the particle
    this.draw = function(size){
        // Update particle attributes
        this.update();
        // Calculate color based on age
        var r = red(this.colour)-(255-this.age);
        var g = green(this.colour)-(255-this.age);
        var b = blue(this.colour)-(255-this.age);
        // Create a color with adjusted RGB values
        var c = color(r,g,b);
        fill(c);
        this.age -= 0.1; // Decrease the age of the particle
         // Call the drawStar method to draw the particle shape
        this.drawStar(this.x,this.y,5,10,5);
    }
     // Function to update particle attributes
    this.update = function(){
        this.speed -= firework_speed; // Decrease the speed of the particle
         // Update the particle's position using trigonometry and noise
       this.x+=cos(this.angle)*this.speed+noise(frameCount);
       this.y+=sin(this.angle)*this.speed+noise(frameCount);
    }
    
    // Function to draw a star-like shape (used for the particle)
    this.drawStar = function(x,y,radius1,radius2,npoints){
         let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
            let sx = x + cos(a) * radius2;
            let sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);    
    }
    
    endShape(CLOSE);
    }
}