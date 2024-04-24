function Fireworks(){
    // Create an array to store individual fireworks
    var fireworks = [];
    // Function to add a new firework to the array
    this.addFirework = function(){
        var f_colour = null;
        //change colour generation logic 
        var size = firework_size;
        var speed = firework_speed;
        // Generate random RGB values for the firework color
        var r = random(0,255);
        var g = random(0,255);
        var b = random(0,255);
        f_colour = color(r,g,b);// Create a color object based on the generated RGB values
        // Generate random x and y coordinates within a specified range
        var f_x = random(width*0.3,width*0.8);
        var f_y = random(height*0.3,height*0.8);
        // Create a new Firework object with the generated parameters
        var firework = new Firework(f_colour,f_x,f_y,size,speed);
        // Add the new firework to the 'fireworks' array
        fireworks.push(firework);
    }
      // Function to update and draw all fireworks
    this.update = function(){
        for(var i =0; i<fireworks.length; i++){
            fireworks[i].draw();
            // Check if the firework is depleted (finished)
            if(fireworks[i].depleted){
                // Remove the depleted firework from the array
                fireworks.splice(i,1);
            }
        }
    }
}