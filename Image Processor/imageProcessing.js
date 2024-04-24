function rgbToCmy() {
   if (snapshot) {
        // Create a new image object for the converted snapshot
        var cmySnapshot = createImage(cellWidth, cellHeight);

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Load pixels of the cmySnapshot
        cmySnapshot.loadPixels();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                // Get the pixel index
                var pixelIndex = (x + y * snapshot.width) * 4;

                // Get RGB values
                var red = snapshot.pixels[pixelIndex];
                var green = snapshot.pixels[pixelIndex + 1];
                var blue = snapshot.pixels[pixelIndex + 2];

                // Calculate CMY values
                var cyan = 255 - red;
                var magenta = 255 - green;
                var yellow = 255 - blue;

                // Set CMY values to the converted image
                cmySnapshot.pixels[pixelIndex] = cyan; // Cyan
                cmySnapshot.pixels[pixelIndex + 1] = magenta; // Magenta
                cmySnapshot.pixels[pixelIndex + 2] = yellow; // Yellow
                cmySnapshot.pixels[pixelIndex + 3] = snapshot.pixels[pixelIndex + 3]; // Alpha (transparency)
            }
        }

        // Update the pixels of the cmySnapshot
        cmySnapshot.updatePixels();

        // Display the rgbToCmySnapshot 
        image(cmySnapshot, cellWidth * 1, cellHeight * 3);
        
        // Display the text "greyscale Image" at the center of the second cell
        textAlign(CENTER, CENTER);
        text("RGB To CMY", cellWidth + cellWidth / 2, cellHeight * 3.2); 
        
        if (!rgbToCmyImageDisplayed) {
            console.log("RGB To CMY image displayed(colour space 1)");
            rgbToCmyImageDisplayed = true;
        }
    }
}

function rgbToHsv() {
   if (snapshot) {
        // Create a new image object for the converted snapshot
        var hsvSnapshot = createImage(cellWidth, cellHeight);

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Load pixels of the cmySnapshot
        hsvSnapshot.loadPixels();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                // Get the pixel index
                var pixelIndex = (x + y * snapshot.width) * 4;

                // Get RGB values
                var red = snapshot.pixels[pixelIndex];
                var green = snapshot.pixels[pixelIndex + 1];
                var blue = snapshot.pixels[pixelIndex + 2];

                // Find maximum and minimum of RGB
                var maxRGB = Math.max(red, green, blue);
                var minRGB = Math.min(red, green, blue);

                // Calculate Value (V)
                var value = maxRGB;

                // Calculate Saturation (S)
                var saturation = (maxRGB - minRGB) / maxRGB;

                // Calculate Hue (H)
                var hue;
                if (saturation == 0) {
                    hue = 0; // undefined (monochrome)
                } else {
                    var delta = maxRGB - minRGB;
                    var deltaRed = ((maxRGB - red) / delta) || 0;
                    var deltaGreen = ((maxRGB - green) / delta) || 0;
                    var deltaBlue = ((maxRGB - blue) / delta) || 0;

                    if (red == maxRGB) {
                        hue = deltaBlue - deltaGreen;
                    } else if (green == maxRGB) {
                        hue = 2 + deltaRed - deltaBlue;
                    } else {
                        hue = 4 + deltaGreen - deltaRed;
                    }
                    hue /= 6;
                    if (hue < 0) hue++;
                }

                // Convert hue to degrees
                hue *= 360;

                // Set HSV values to the converted image
                hsvSnapshot.pixels[pixelIndex] = hue; // Hue
                hsvSnapshot.pixels[pixelIndex + 1] = saturation * 255; // Saturation
                hsvSnapshot.pixels[pixelIndex + 2] = value * 255; // Value
                hsvSnapshot.pixels[pixelIndex + 3] = snapshot.pixels[pixelIndex + 3]; // Alpha (transparency)

                
            }
        }

        // Update the pixels of the cmySnapshot
        hsvSnapshot.updatePixels();

        // Display the rgbToCmySnapshot 
        image(hsvSnapshot, cellWidth * 2, cellHeight * 3);
        
        // Display the text "greyscale Image" at the center of the second cell
        textAlign(CENTER, CENTER);
        text("RGB To HSV", cellWidth + 1.5* cellWidth, cellHeight * 3.2); 
        
        if (!rgbToHsvImageDisplayed) {
            console.log("RGB To HSV image displayed(colour space 2)");
            rgbToHsvImageDisplayed = true;
        }
    }
}

function cmySegmentation() {
    if (snapshot) {
        // Create a new image object for the converted snapshot
        var cmySegmentationSnapshot = createImage(cellWidth, cellHeight);

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Load pixels of the cmySnapshot
        cmySegmentationSnapshot.loadPixels();

        // Get slider value for segmentation threshold
        var threshold = thresholdSlider1.value();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                // Get the pixel index
                var pixelIndex = (x + y * snapshot.width) * 4;

                // Get RGB values
                var red = snapshot.pixels[pixelIndex];
                var green = snapshot.pixels[pixelIndex + 1];
                var blue = snapshot.pixels[pixelIndex + 2];

                // Calculate CMY values
                var cyan = 255 - red;
                var magenta = 255 - green;
                var yellow = 255 - blue;

                // Apply segmentation threshold to all CMY channels
                if (cyan < threshold) {
                    cyan = 0;
                }
                if (magenta < threshold) {
                    magenta = 0;
                }
                if (yellow < threshold) {
                    yellow = 0;
                }

                // Set CMY values to the converted image
                cmySegmentationSnapshot.pixels[pixelIndex] = cyan; // Cyan
                cmySegmentationSnapshot.pixels[pixelIndex + 1] = magenta; // Magenta
                cmySegmentationSnapshot.pixels[pixelIndex + 2] = yellow; // Yellow
                cmySegmentationSnapshot.pixels[pixelIndex + 3] = snapshot.pixels[pixelIndex + 3]; // Alpha (transparency)
            }
        }

        // Update the pixels of the cmySnapshot
        cmySegmentationSnapshot.updatePixels();

        // Display the rgbToCmySnapshot 
        image(cmySegmentationSnapshot, cellWidth * 1, cellHeight * 4);
        
        // Display the text "CMY Segmented" at the center of the cell
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(12);
        text("CMY Segmented", cellWidth + cellWidth / 2, cellHeight * 4.2); 

        // Display the threshold value
        text("Threshold: " + threshold, cellWidth +70, height - 20);

        if (!cmySegmentationImageDisplayed) {
            console.log("CMY Segmentation image displayed(colour space 1)");
            cmySegmentationImageDisplayed = true;
        }
    }
}

function hsvSegmentation() {
    if (snapshot) {
        // Create a new image object for the converted snapshot
        var hsvSegmentationSnapshot = createImage(cellWidth, cellHeight);

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Load pixels of the hsvSnapshot
        hsvSegmentationSnapshot.loadPixels();

        // Get slider value for segmentation threshold
        var threshold = thresholdSlider2.value();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                // Get the pixel index
                var pixelIndex = (x + y * snapshot.width) * 4;

                // Get RGB values
                var red = snapshot.pixels[pixelIndex];
                var green = snapshot.pixels[pixelIndex + 1];
                var blue = snapshot.pixels[pixelIndex + 2];

                // Find maximum and minimum of RGB
                var maxRGB = Math.max(red, green, blue);
                var minRGB = Math.min(red, green, blue);

                // Calculate Value (V)
                var value = maxRGB;

                // Calculate Saturation (S)
                var saturation = (maxRGB - minRGB) / maxRGB;

                // Calculate Hue (H)
                var hue;
                if (saturation == 0) {
                    hue = 0; // undefined (monochrome)
                } else {
                    var delta = maxRGB - minRGB;
                    var deltaRed = ((maxRGB - red) / delta) || 0;
                    var deltaGreen = ((maxRGB - green) / delta) || 0;
                    var deltaBlue = ((maxRGB - blue) / delta) || 0;

                    if (red == maxRGB) {
                        hue = deltaBlue - deltaGreen;
                    } else if (green == maxRGB) {
                        hue = 2 + deltaRed - deltaBlue;
                    } else {
                        hue = 4 + deltaGreen - deltaRed;
                    }
                    hue /= 6;
                    if (hue < 0) hue++;
                }

                // Convert hue to degrees
                hue *= 360;

                // Apply segmentation threshold
                if (value < threshold) {
                    hue = 0;
                    saturation = 0;
                    value = 0;
                }

                // Set HSV values to the converted image
                hsvSegmentationSnapshot.pixels[pixelIndex] = hue; // Hue
                hsvSegmentationSnapshot.pixels[pixelIndex + 1] = saturation * 255; // Saturation
                hsvSegmentationSnapshot.pixels[pixelIndex + 2] = value * 255; // Value
                hsvSegmentationSnapshot.pixels[pixelIndex + 3] = snapshot.pixels[pixelIndex + 3]; // Alpha (transparency)
            }
        }

        // Update the pixels of the hsvSnapshot
        hsvSegmentationSnapshot.updatePixels();

        // Display the rgbToHsvSnapshot 
        image(hsvSegmentationSnapshot, cellWidth * 2, cellHeight * 4);
        
        // Display the text "HSV Segmented" at the center of the cell
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(12);
        text("HSV Segmented", cellWidth +240, cellHeight * 4.2); 
        // Display the threshold value
        textAlign(LEFT, BOTTOM);
        fill(255);
        text("Threshold: " + threshold, cellWidth +200, height - 20);

        if (!hsvSegmentationImageDisplayed) {
            console.log("HSV Segmented image displayed(colour space 2)");
            hsvSegmentationImageDisplayed = true;
        }
    }
}