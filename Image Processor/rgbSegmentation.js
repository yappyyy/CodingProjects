function RGBChannel() {
    if (snapshot) {
        // Create image objects for Red, Green, and Blue channels
        var redImg = createImage(snapshot.width, snapshot.height);
        redImg.loadPixels();
        var greenImg = createImage(snapshot.width, snapshot.height);
        greenImg.loadPixels();
        var blueImg = createImage(snapshot.width, snapshot.height);
        blueImg.loadPixels();

        // Load pixels of the snapshot
        snapshot.loadPixels();

        // Loop through each pixel in the snapshot
        for (var y = 0; y < snapshot.height; y++) {
            for (var x = 0; x < snapshot.width; x++) {
                var pixelIndex = (x + y * snapshot.width) * 4;
                var pixelRed = snapshot.pixels[pixelIndex];
                var pixelGreen = snapshot.pixels[pixelIndex + 1];
                var pixelBlue = snapshot.pixels[pixelIndex + 2];

                // Red channel only
                redImg.pixels[pixelIndex] = pixelRed;
                redImg.pixels[pixelIndex + 1] = 0;
                redImg.pixels[pixelIndex + 2] = 0;
                redImg.pixels[pixelIndex + 3] = 255;

                // Green channel only
                greenImg.pixels[pixelIndex] = 0;
                greenImg.pixels[pixelIndex + 1] = pixelGreen;
                greenImg.pixels[pixelIndex + 2] = 0;
                greenImg.pixels[pixelIndex + 3] = 255;

                // Blue channel only
                blueImg.pixels[pixelIndex] = 0;
                blueImg.pixels[pixelIndex + 1] = 0;
                blueImg.pixels[pixelIndex + 2] = pixelBlue;
                blueImg.pixels[pixelIndex + 3] = 255;
            }
        }

        // Update pixels of Red, Green, and Blue channel images
        redImg.updatePixels();
        greenImg.updatePixels();
        blueImg.updatePixels();

        // Display redImg below the snapshot (row 2, column 1)
        image(redImg, 0, cellHeight);
        // Display greenImg in cell 2 (row 2, column 2)
        image(greenImg, cellWidth, cellHeight);
        // Display blueImg in cell 3 (row 2, column 3)
        image(blueImg, cellWidth * 2, cellHeight);


        // Display text labels
        textAlign(CENTER, CENTER);
        fill(255); // Set text color to white
        textSize(12); // Set text size
        text("Red Channel", cellWidth / 2, cellHeight *1.2); // Text for red channel
        text("Green Channel", cellWidth * 1.5, cellHeight *1.2); // Text for green channel
        text("Blue Channel", cellWidth * 2.5, cellHeight *1.2); // Text for blue channel
        
        // Log message indicating RGB channel images are displayed
        if (!rgbImageDisplayed) {
            console.log("RGB channel images displayed");
            rgbImageDisplayed = true;
        }
    }
}

function segmentation() {
  if (snapshot) {
    // Create image objects for Red, Green, and Blue channels
    var redImg = createImage(snapshot.width, snapshot.height);
    redImg.loadPixels();
    var greenImg = createImage(snapshot.width, snapshot.height);
    greenImg.loadPixels();
    var blueImg = createImage(snapshot.width, snapshot.height);
    blueImg.loadPixels();

    // Load pixels of the snapshot
    snapshot.loadPixels();

    // Get slider values
    redValue = redSlider.value();
    greenValue = greenSlider.value();
    blueValue = blueSlider.value();

    // Loop through each pixel in the snapshot
    for (var y = 0; y < snapshot.height; y++) {
        for (var x = 0; x < snapshot.width; x++) {
            var pixelIndex = (x + y * snapshot.width) * 4;
            var pixelRed = snapshot.pixels[pixelIndex];
            var pixelGreen = snapshot.pixels[pixelIndex + 1];
            var pixelBlue = snapshot.pixels[pixelIndex + 2];



            // Red channel only
            if(redSlider.value()>pixelRed){
                pixelRed = 0;
            }
            redImg.pixels[pixelIndex] = pixelRed;
            redImg.pixels[pixelIndex + 1] = 0;
            redImg.pixels[pixelIndex + 2] = 0;
            redImg.pixels[pixelIndex + 3] = 255;

            // Green channel only
            if(greenSlider.value()>pixelGreen){
                pixelGreen = 0;
            }   
            greenImg.pixels[pixelIndex] = 0;
            greenImg.pixels[pixelIndex + 1] = pixelGreen;
            greenImg.pixels[pixelIndex + 2] = 0;
            greenImg.pixels[pixelIndex + 3] = 255;

            // Blue channel only
            if(blueSlider.value()>pixelBlue){
                pixelBlue = 0;
            }
            blueImg.pixels[pixelIndex] = 0;
            blueImg.pixels[pixelIndex + 1] = 0;
            blueImg.pixels[pixelIndex + 2] = pixelBlue;
            blueImg.pixels[pixelIndex + 3] = 255;
        }
    }

    // Update pixels of Red, Green, and Blue channel images
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();
     // Display redImg in row 3, column 1
    image(redImg, 0, cellHeight * 2);
    // Display greenImg in row 3, column 2
    image(greenImg, cellWidth, cellHeight * 2);
    // Display blueImg in row 3, column 3
    image(blueImg, cellWidth * 2, cellHeight * 2);


    // Display text labels
    textAlign(CENTER, CENTER);
    fill(255); // Set text color to white
    textSize(12); // Set text size
    text("Red Channel Segmented", cellWidth / 2, cellHeight *2.2); // Text for red channel
    text("Green Channel Segmented", cellWidth * 1.5, cellHeight *2.2); // Text for green channel
    text("Blue Channel Segmented", cellWidth * 2.5, cellHeight *2.2); // Text for blue channel

    // Log message indicating segmented images are displayed
    if (!segmentedImageDisplayed) {
        console.log("Segmented Image displayed");
        segmentedImageDisplayed = true;
    }
  }
}
