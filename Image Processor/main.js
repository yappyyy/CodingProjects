// Global variables
var w = 160 // Width of the video feed
var h = 120; // Height of the video feed
var detector; // Object for face detection
var classifier = objectdetect.frontalface; // Classifier for face detection
var img; // Placeholder for image data
var faces; // Detected faces

var video; // Video feed from webcam
var snapshot; // Captured snapshot
var snapshotButton; // Button to take a snapshot
var gridWidth = 3; // Number of grid columns
var gridHeight = 5; // Number of grid rows
var cellWidth; // Width of each grid cell
var cellHeight; // Height of each grid cell

// Flags for displaying different processed images
var webcamImageDisplayed = false;
var greyscaleImageDisplayed = false;
var rgbImageDisplayed = false;
var segmentedImageDisplayed = false;
var rgbToCmyImageDisplayed = false;
var rgbToHsvImageDisplayed = false;
var cmySegmentationImageDisplayed = false;
var hsvSegmentationImageDisplayed = false;
var faceImageImageDisplayed = false;

// Variables for RGB sliders
var redSlider, greenSlider, blueSlider;
var redValue = 125;
var greenValue = 125;
var blueValue = 125;

// Variables for segmentation threshold sliders
var thresholdSlider1;
var thresholdSlider2;

// Variables for heart filter size slider
var sizeSlider1;
var heartSize = 10;

// Flags for different image processing effects
var applyGreyscale = false;
var applyBlur = false;
var applyCMY = false;
var pixelate = false; 
var applyHeartFilter = false;

// Array to hold particles for heart filter
var particles = [];
var heartSpawnRate = 30; // Rate of spawning particles for the heart filter

function setup() {
    createCanvas(480, 600); // Set canvas size
    pixelDensity(1); // Set pixel density
    video = createCapture(VIDEO); // Create video capture element
    video.size(w, h); // Set video size
    video.hide(); // Hide video element
    var scaleFactor = 1.1; // Scale factor for face detection
    detector = new objectdetect.detector(w, h, scaleFactor, classifier); // Create face detector
    faceImg = createImage(w, h); // Create placeholder for face image
    createSnapshotButton(); // Create button for taking snapshots
    calculateCellSize(); // Calculate size of grid cells based on canvas size
}

function keyPressed() {
    // Toggle image processing effects based on key presses
    if (key === '1') {
        applyGreyscale = !applyGreyscale;
        console.log("Key 1 pressed");
        console.log("Face detection Grey Scale");
    } else if (key === '2') {
        applyBlur = !applyBlur;
         console.log("Key 2 pressed");
        console.log("Face detection Blurred");
    } else if (key === '3') {
        applyCMY = !applyCMY;
         console.log("Key 3 pressed");
        console.log("Face detection CMY Filter");
    } else if (key === '4') {
        pixelate = !pixelate;
         console.log("Key 4 pressed");
        console.log("Pixelation effect toggled");
    } else if (key === '5') {
        applyHeartFilter = !applyHeartFilter;
         console.log("Key 5 pressed");
        console.log("Heart filter toggled");
    }
}

function draw() {
    drawWebcamImages(); // Draw webcam images and processed images
    detectFaces(); // Detect faces in the video feed
    // Process snapshot if available
    if (snapshot) {
        greyscale(); // Convert snapshot to greyscale
        RGBChannel(); // Display RGB channels separately
        segmentation(); // Perform segmentation
        rgbToCmy(); // Convert RGB image to CMY
        rgbToHsv(); // Convert RGB image to HSV
        cmySegmentation(); // Perform segmentation on CMY image
        hsvSegmentation(); // Perform segmentation on HSV image
    }
}

function createSnapshotButton() {
    // Create button for taking snapshots
    snapshotButton = createButton('Take Snapshot');
    snapshotButton.position(20, height + 20);
    snapshotButton.mousePressed(takeSnapshot);
}

function takeSnapshot() {
    // Capture snapshot from video feed
    snapshot = video.get();
    // Resize snapshot to fit grid cell size
    snapshot.resize(cellWidth, cellHeight);
    // Log message indicating snapshot is taken
    console.log("Snapshot taken");
    // Create RGB sliders
    redSlider = createSlider(0, 255, redValue);
    redSlider.position(10, height - 255);
    greenSlider = createSlider(0, 255, greenValue);
    greenSlider.position(170, height - 255);
    blueSlider = createSlider(0, 255, blueValue);
    blueSlider.position(340, height - 255);
    // Create segmentation threshold sliders
    thresholdSlider1 = createSlider(0, 255, 0);
    thresholdSlider1.position(170, height - 15);
    thresholdSlider2 = createSlider(0, 255, 0);
    thresholdSlider2.position(330, height - 15);
    // Create heart filter size slider
    sizeSlider1 = createSlider(5, 15, heartSize);
    sizeSlider1.position(0, height - 15);
    // Update heartSize when the slider value changes
    sizeSlider1.input(function() {
        heartSize = sizeSlider1.value();
    });
}

function drawWebcamImages() {
    let x = 0;
    let y = 0;
    // Display snapshot if available, otherwise display live video feed
    if (snapshot) {
        image(snapshot, x, y, cellWidth, cellHeight);
        image(snapshot, 0, cellHeight * 3);
        if (!webcamImageDisplayed) {
            console.log("Webcam image displayed");
            webcamImageDisplayed = true;
        }
        // Display labels for webcam images
        textAlign(CENTER, CENTER);
        text("Webcam Image", 80 , cellHeight / 5); 
        text("Webcam Image", 80 , cellHeight * 3.2); 
    } else {
        image(video, x, y, cellWidth, cellHeight);
    }
    // Display face detection overlay in the bottom left cell
    let overlayX = 0;
    let overlayY = cellHeight * 4;
    detectFaces(overlayX, overlayY);
}


// Commentary start 
//Overall, the segmentation for each channel will emphasise different features of the image dependent on the intensity of the corresponding colour channel. As a result, the segmented images for the red, green, and blue channels are likely to have distinct properties and highlight different features within the image.
//Because each colour channel contains unique information about many features of the webcam snapshot. By segmenting depending on each channel separately, you may efficiently isolate and emphasise distinct colour components in the image. This results in different segmentation outputs for each channel since they emphasise distinct colour properties in the picture.
//CMY and HSV segmentation may provide distinct viewpoints on colour segmentation than RGB channel segmentation, altering noise levels, clarity, and segmentation effectiveness.
//CMY segmentation may generate additional noise if the CMY colour space does not adequately represent the image's colour distribution. HSV segmentation may display different noise than RGB segmentation because to the differing representation of colour information in the HSV colour space.
//Furthermore, Yes, using a different colour space may enhance segmentation results, especially if the chosen colour space better matches the image's properties. For example, YCbCr Colour Space: YCbCr is widely used in image and video compression and may provide better segmentation results, particularly in cases with high brightness variations.
//One major issue I found was implementing face detection; my application was unable to identify my face, despite several attempts to troubleshoot it. Finally, I went back to view Dr Theodoros' lecture video on face detection; after reimplementing it, I was successful and was able to use face detection in my application.
//I was on track to successfully complete the coursework since I had created a gantt chart before beginning. I wanted to keep track of the tasks I needed to do within the time frame of the coursework. So that I have enough time to create a quality application with well-written commentary without interfering with my other modules, which I am also taking concurrently.
//Finally, my extension, applyHeartFilter, generates eye-catching heart-shaped particles that float and fade away softly on the canvas. It adds a humorous and creative element to the image processing and face detection application. Users may also adjust the size of the hearts using a graphic user interface (GUI) slider, which alters the heart size based on the value on the slider. This inventive feature gives the application a livelier and more interactive element, encouraging users to engage with it in a more playful way. It is distinct from conventional image processing apps and presents a fresh method of visual improvement thanks to the fusion of real-time face detection and creative particle effects.
//Commentary end 




