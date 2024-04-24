// Function to convert snapshot to greyscale and increase brightness by 20%
function greyscale() {
    if (snapshot) {
        // Create a new image object for the greyscaled snapshot
        var greyscaleSnapshot = createImage(cellWidth, cellHeight);

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Load pixels of the greyscaled snapshot
        greyscaleSnapshot.loadPixels();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                // Get the pixel index
                var pixelIndex = (x + y * snapshot.width) * 4;

                // Calculate the average of RGB values
                var ave = (snapshot.pixels[pixelIndex] + snapshot.pixels[pixelIndex + 1] + snapshot.pixels[pixelIndex + 2]) / 3;

                // Increase brightness by 20%
                ave *= 1.2;

                // Ensure brightness doesn't exceed 255 (prevention)
                ave = min(255, ave);

                // Set RGB values to the adjusted value to increase brightness
                greyscaleSnapshot.pixels[pixelIndex] = ave;
                greyscaleSnapshot.pixels[pixelIndex + 1] = ave;
                greyscaleSnapshot.pixels[pixelIndex + 2] = ave;
                greyscaleSnapshot.pixels[pixelIndex + 3] = snapshot.pixels[pixelIndex + 3]; // Copy alpha value
            }
        }

        // Update the pixels of the greyscaled snapshot
        greyscaleSnapshot.updatePixels();

        // Display the greyscaled snapshot in the second cell
        image(greyscaleSnapshot, cellWidth, 0, cellWidth, cellHeight);
        
        // Display the text "greyscale Image" at the center of the second cell
        textAlign(CENTER, CENTER);
        text("Greyscale Image", cellWidth + cellWidth / 2, cellHeight / 5); 
        
        if (!greyscaleImageDisplayed) {
            console.log("Greyscale and Brightness + 20% image displayed");
            greyscaleImageDisplayed = true;
        }
    }
}