function detectFaces(overlayX, overlayY) {
    // Draw face detection overlay in the bottom left cell
    image(video, overlayX, overlayY, w, h); // Display the live video feed
    faceImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Copy the video frame
    faces = detector.detect(faceImg.canvas); // Detect faces
   


    push(); // Save the current drawing style
    strokeWeight(2);
    stroke(255);
    noFill();

    for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        if (face[4] > 4) {
            // Draw rectangles around detected faces
            rect(overlayX + face[0], overlayY + face[1], face[2], face[3]);
            
            // Apply greyscale filter only if the boolean variable is true
            if (applyGreyscale) {
                // Create a temporary image to hold the face region
                var faceRegion = createImage(face[2], face[3]);
                // Copy the face region from the video feed to the temporary image
                faceRegion.copy(video, face[0], face[1], face[2], face[3], 0, 0, face[2], face[3]);
                // Apply greyscale filter to the temporary image
                faceRegion.filter(GRAY);
                // Display the greyscaled face region
                image(faceRegion, overlayX + face[0], overlayY + face[1]);
            }

            // Apply blur filter only if the boolean variable is true
            if (applyBlur) {
                // Create a temporary image to hold the face region
                var faceRegionBlur = createImage(face[2], face[3]);
                // Copy the face region from the video feed to the temporary image
                faceRegionBlur.copy(video, face[0], face[1], face[2], face[3], 0, 0, face[2], face[3]);
                // Apply blur filter to the temporary image
                faceRegionBlur.filter(BLUR, 5); // Adjust the blur radius as needed
                // Display the blurred face region
                image(faceRegionBlur, overlayX + face[0], overlayY + face[1]);
            }
            
            // Apply CMY filter only if the boolean variable is true
            if (applyCMY) {
                // Create a temporary image to hold the face region
                var faceRegionCMY = createImage(face[2], face[3]);
                // Copy the face region from the video feed to the temporary image
                faceRegionCMY.copy(video, face[0], face[1], face[2], face[3], 0, 0, face[2], face[3]);
                // Apply CMY filter to the temporary image
                applyCMYFilter(faceRegionCMY);
                // Display the CMY face region
                image(faceRegionCMY, overlayX + face[0], overlayY + face[1]);
            }
            
            // Apply pixelation effect only if the boolean variable is true
            if (pixelate) {
                var blockSize = 10; // Adjust block size for more noticeable pixelation
                var faceRegion = faceImg.get(face[0], face[1], face[2], face[3]); // Get the region of interest
                pixelateFace(faceRegion, blockSize); // Apply pixelation effect to the face region
                image(faceRegion, overlayX + face[0], overlayY + face[1]); // Display the pixelated face region
            }
            
             if (applyHeartFilter) { // Only execute if key '5' is pressed
                // Ensure particles are created only at the specified location
                 let particleX = random(0, 160);
                let particleY = random(480, 700);

                // Add new particle at the specified location
                let newParticle = new Particle(particleX, particleY);
                particles.push(newParticle);

                // Update and display particles
                for (let particle of particles) {
                    particle.update();
                    particle.display();
                }

                // Remove dead particles
                particles = particles.filter(particle => !particle.isDead());
                }
         }
    }
    pop(); // Restore the previous drawing style
}

class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().mult(random(1, 2)); // Random velocity
        this.alpha = 255; // Initial alpha value
        this.color = color(random(100, 255), random(100, 200), random(100, 200)); // Random heart color
    }

    update() {
        // Update the particle's position
        this.position.add(this.velocity);

        // Limit the particle's movement to stay within the specified range
        this.position.x = constrain(this.position.x, 0, 160);
        this.position.y = constrain(this.position.y, 480, 700);

        // Decrease the particle's alpha to simulate fading
        this.alpha -= 15;
    }

    display() {
        noStroke();
        // Display the HeartSize value
        textSize(12); // Set text size
        text("HeartSize: " + heartSize, 50, height - 15);
       // Get the value of the heart size from the slider
        let size = sizeSlider1.value(); // Use the updated size
        let alphaValue = this.alpha; // Use the updated alpha value
        fill(this.color); // Set fill color to the random heart color
        beginShape();
        vertex(this.position.x, this.position.y - size / 2);
        bezierVertex(
            this.position.x + size * 0.4,
            this.position.y - size * 0.8,
            this.position.x + size * 0.8,
            this.position.y - size * 0.3,
            this.position.x,
            this.position.y + size * 0.5
        );
        bezierVertex(
            this.position.x - size * 0.8,
            this.position.y - size * 0.3,
            this.position.x - size * 0.4,
            this.position.y - size * 0.8,
            this.position.x,
            this.position.y - size / 2
        );
        endShape(CLOSE);
    }

    isDead() {
        return this.alpha <= 0;
    }
}

function pixelateFace(img, blockSize) {
    // Loop through the image in blockSize x blockSize blocks and replace each block with a representative color
    img.loadPixels();
    for (var y = 0; y < img.height; y += blockSize) {
        for (var x = 0; x < img.width; x += blockSize) {
            // Get the color of the top-left pixel in the block
            var loc = (x + y * img.width) * 4;
            var avgR = img.pixels[loc];
            var avgG = img.pixels[loc + 1];
            var avgB = img.pixels[loc + 2];
            // Set the color of the entire block to the representative color
            for (var j = y; j < y + blockSize && j < img.height; j++) {
                for (var i = x; i < x + blockSize && i < img.width; i++) {
                    var blockLoc = (i + j * img.width) * 4;
                    img.pixels[blockLoc] = avgR;
                    img.pixels[blockLoc + 1] = avgG;
                    img.pixels[blockLoc + 2] = avgB;
                }
            }
        }
    }
    img.updatePixels();
}

// Function to apply CMY filter
function applyCMYFilter(img) {
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
        var c = color(255 - red(img.pixels[i]), 255 - green(img.pixels[i + 1]), 255 - blue(img.pixels[i + 2]));
        img.pixels[i] = red(c);
        img.pixels[i + 1] = green(c);
        img.pixels[i + 2] = blue(c);
    }
    img.updatePixels();
}