/*
The Game Project finale
*/
// declaration 
var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;
var isleft;
var isRight;
var isPlummeting;
var isFalling;
var collectables;
var canyons;
var trees_x;
var treePos_y;
var clouds;
var cloudPos_y;
var mountain;
var mountainPos_y;
var cameraPosX;
var newgameChar_x;
var game_score;
var lives;
var flagpole;
var platforms;
var onPlatform;
var enemies;
var enemyContact;
var jumpSound;
var collectSound;
var fallSound;
var soundReady;
var soundLoadCounter;
//loading the sound
function preload(){
    soundReady = false;
    soundLoadCounter = 0;
    soundFormats("mp3");
    jumpSound = loadSound("assets/jump.mp3",soundLoaded);
    collectSound = loadSound("assets/collect.mp3",soundLoaded);
    fallSound = loadSound("assets/fall.mp3",soundLoaded);
    loseSound = loadSound("assets/lose.mp3",soundLoaded);
    winSound = loadSound("assets/win.mp3",soundLoaded);
}
//check if all the sound is loaded
function soundLoaded(){
    soundLoadCounter++;
    if(soundLoadCounter == 5){
        soundReady = true;
    }
}
function setup()
{   
    //intialisation 
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}
// start game
function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    gameChar_width = 40;
    //intialing the game character movement
    isLeft =false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    onPlatform = false;
    enemyContact = false;
    //implementing the scrolling of the game character
    cameraPosX = 0;
    //creating new pos_x for game charaacter to implement scrolling
    newgameChar_x = gameChar_x;
    //intialing game score
    game_score = 0;
    //collectable object in array
    collectables =[{x_pos: 950, y_pos: floorPos_y,size: 30, isFound: false},
                   {x_pos: 1300, y_pos: floorPos_y-120,size: 30, isFound: false},
                   {x_pos: 1900, y_pos: floorPos_y,size: 30, isFound: false},
                   {x_pos: 2220, y_pos: floorPos_y-260,size: 30, isFound: false},
                   {x_pos: 2450, y_pos: floorPos_y-340,size: 30, isFound: false},
                   {x_pos: 2830, y_pos: floorPos_y-100,size: 30, isFound: false},
                   {x_pos: 2620, y_pos: floorPos_y,size: 30, isFound: false}];
    //canyon object in array
    canyons = [{x_pos: 600, width: 180,y_pos:floorPos_y}, 
               {x_pos: 1100, width: 400,y_pos:floorPos_y}, 
               {x_pos: 2000, width: 600,y_pos:floorPos_y},
               {x_pos: 2780, width: 100,y_pos:floorPos_y}];
    //tree array
    trees_x =[300,500,850,1060,1600,1780,1960,2650,2940];
    treePos_y = floorPos_y;
    //clouds array
    clouds = [100,400,700,1000,1300,1600,2000,2300,2600,2900,3200];
    cloudPos_y = [100,125,125,100,125,100,125,100,125,100,125];
    //mountain array
    mountain= [180,380,700,630,1150,1200,1400,1450,2150,2200,2250,2370,2420,2470,2805,3150];
    mountainPos_y = floorPos_y; 
    //intialising flagpole
    flagpole = {isReached: false, x_pos: 3100}
    //platform array 
    platforms = [];
    platforms.push(createPlatform(650,floorPos_y-70,70));
    platforms.push(createPlatform(1150,floorPos_y-60,60));
    platforms.push(createPlatform(1270,floorPos_y-120,60));
    platforms.push(createPlatform(1400,floorPos_y-60,60));
    platforms.push(createPlatform(2040,floorPos_y-80,60));
    platforms.push(createPlatform(2150,floorPos_y-160,150));
    platforms.push(createPlatform(2370,floorPos_y-230,150));
    //enemies array
    enemies = [];
    enemies.push(createEnemy(880,floorPos_y-20,20));
    enemies.push(createEnemy(1000,floorPos_y-20,20));
    enemies.push(createEnemy(1600,floorPos_y-20,20));
    enemies.push(createEnemy(1700,floorPos_y-20,20));
    enemies.push(createEnemy(1800,floorPos_y-20,20));
    enemies.push(createEnemy(2200,floorPos_y-180,20));
    enemies.push(createEnemy(2420,floorPos_y-250,20));
    enemies.push(createEnemy(2650,floorPos_y-20,20));
    enemies.push(createEnemy(2940,floorPos_y-20,20));
}
function draw()
{   
    //check if sound is loaded
    if(!soundReady){
        return;
    }
    //side scrolling 
    cameraPosX = newgameChar_x - width/2;
	///////////DRAWING CODE/////////
    //fill the sky blue
	background(135,206,235);
	noStroke();
	fill(91,139,50);
    //green floor
	rect(0, floorPos_y, width, height - floorPos_y); 
    push();
    translate(-cameraPosX, 0);
    //draw tree
    drawTrees();
    //draw clouds
    drawClouds();
    //draw mountain
    drawMountains();
    //draw platform
    drawPlatform();
    //canyon drawing
    for(var i =0; i <canyons.length; i++){
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    //check if character is on platform
    checkIfOnPlatform();
    //collectable drawing
    for(var i =0; i <collectables.length; i++){
        if(!collectables[i].isFound){
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
    //draw enemies
    drawEnemies();
    checkIfEnemiesContactChar();
    //draw flagpole
    renderFlagpole();
    pop();
    drawLives();
    //gameover declaration
    if(checkGameOver() == true){
        drawGameOver();
        return;
    }
    //check if there is enemy contact
    if(enemyContact == true){
        if(lives > 0){
            startGame();
        }
        return;
    }
	//the game character design
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(14,174,174);
        rect(gameChar_x-10,gameChar_y-55,10,15);
        fill(169,125,100);
        rect(gameChar_x-9,gameChar_y-67,8,12);
        fill(73,70,151);
        rect(gameChar_x-10,gameChar_y-42,8,15);
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(14,174,174);
        rect(gameChar_x-5,gameChar_y-55,10,15);
        fill(169,125,100);
        rect(gameChar_x-3,gameChar_y-67,8,12);
        fill(73,70,151);
        rect(gameChar_x-3,gameChar_y-42,8,15);
	}
	else if(isLeft)
	{
		// add your walking left code
        fill(14,174,174);
        rect(gameChar_x-10,gameChar_y-30,10,15);
        fill(169,125,100);
        rect(gameChar_x-9,gameChar_y-42,8,12);
        fill(73,70,151);
        rect(gameChar_x-10,gameChar_y-15,8,15);
	}
	else if(isRight)
	{
		// add your walking right code
        fill(14,174,174);
        rect(gameChar_x-5,gameChar_y-30,10,15);
        fill(169,125,100);
        rect(gameChar_x-3,gameChar_y-42,8,12);
        fill(73,70,151);
        rect(gameChar_x-3,gameChar_y-15,8,15);
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(14,174,174);
        rect(gameChar_x-10,gameChar_y-35,20,15);
        fill(169,125,100);
        rect(gameChar_x-6,gameChar_y-47,12,12);
        fill(73,70,151);
        rect(gameChar_x-10,gameChar_y-20,8,15);
        rect(gameChar_x+2,gameChar_y-20,8,15);
	}
	else
	{
		// add your standing front facing code
        fill(14,174,174);
        rect(gameChar_x-10,gameChar_y-30,20,15);
        fill(169,125,100);
        rect(gameChar_x-6,gameChar_y-42,12,12);
        fill(73,70,151);
        rect(gameChar_x-10,gameChar_y-15,8,15);
        rect(gameChar_x+2,gameChar_y-15,8,15);
	}
    //drawing the score on the the top left
    fill(0,0,0);
    noStroke();
    textSize(20);
    text("Score: " + game_score, 20, 20);
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    //character movement
    if(isPlummeting==true){
        gameChar_y +=2;
        checkPlayerDie();
        return;
    }
    if(isLeft == true){
      newgameChar_x -= 3; 
    }
    if(isRight == true){
       newgameChar_x += 3;
    }
    if(gameChar_y<floorPos_y){
        isFalling = true;
    }
    else{
        isFalling = false;
    }  
    if(flagpole.isReached == false){
        checkFlagpole();
    }
}
function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    if(keyCode == 37 || key == 'a'){
        console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39 || key == 'd'){
        console.log("right arrow");
        isRight =true;
    }
    else if(keyCode == 38 || key == 'w'){
        if(gameChar_y>=floorPos_y || onPlatform){
            console.log("up arrow");
            gameChar_y -= 155;
            jumpSound.play();
        }
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(keyCode == 37 || key == 'a'){
        console.log("left arrow");
        isLeft = false;
    }else if(keyCode == 39 || key == 'd'){
        console.log("right arrow");
        isRight = false;
    }
}
//drawing clouds using for loop
function drawClouds(){
    for(var i = 0; i < clouds.length; i++){
        fill(255);
        ellipse(clouds[i],cloudPos_y[i],80,80);
        ellipse(clouds[i]-40,cloudPos_y[i],60,60);
        ellipse(clouds[i]+40,cloudPos_y[i],60,60);     
    }
}
//drawing mountain using for loop
function drawMountains(){
    for(var i =0; i <mountain.length; i++){
        fill(192,192,192);
        triangle(mountain[i],mountainPos_y,mountain[i]+50,mountainPos_y,mountain[i]+25,mountainPos_y-200);
    }
}
//drawing trees using for loop
function drawTrees(){
    for(var i =0; i < trees_x.length; i++){
        fill(118,92,72);
        rect(trees_x[i]-25,-100 + treePos_y,50,100);
        fill(0,170,0);
        rect(trees_x[i]-75,-100 + treePos_y,150,50);
        rect(trees_x[i]-25,-150 + treePos_y,50,50);   
        }
}

function drawCollectable(collectables){ //collectables as the argument 
    checkCollectable(collectables);       
}

function drawCanyon(canyons){ //canyons as the argument
    checkCanyon(canyons);
}
// check if game character collect the collectable
function checkCollectable(t_collectable){
    if(dist(newgameChar_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos) < t_collectable.size){
        t_collectable.isFound = true;
        game_score += 0.5; 
        collectSound.play();
        }
    if(t_collectable.isFound == false){
            fill(255,215,0);
            ellipse(t_collectable.x_pos,t_collectable.y_pos-15,30);
            fill(220,20,60);
            rect(t_collectable.x_pos-5,t_collectable.y_pos-25,10,20);
        }
}
// check if game character falls in canyon and restarts game if true
function checkCanyon(t_canyon){
    if(checkGameOver()){
        return;
    } 
    if(gameChar_y == floorPos_y && ((newgameChar_x-gameChar_width/2) > t_canyon.x_pos) && (newgameChar_x+gameChar_width/2 < t_canyon.x_pos+t_canyon.width)){
        isPlummeting = true;
        isFalling = true;
        lives--;
        fallSound.play();
    }else if(gameChar_y == floorPos_y){
        isPlummeting = false;
        isFalling = false;
    }
        
    if(isPlummeting == true){
        gameChar_y += 1;
        isRight = false;
        isLeft = false;
    }
    noStroke();
    fill(165,42,42);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,height-floorPos_y,40);
    fill(210,105,30);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,40);
    fill(255,127,80);
    rect(t_canyon.x_pos,floorPos_y+30,t_canyon.width,40);
    fill(87,91,95);
    rect(t_canyon.x_pos,floorPos_y+70,t_canyon.width,40);
}
//flag pole design 
function renderFlagpole(){
    push();
    strokeWeight(5);
    stroke(50);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255,0,0);
    noStroke();
    if(flagpole.isReached){
       rect(flagpole.x_pos,floorPos_y - 250, 50, 50); 
    }
    else{
        rect(flagpole.x_pos,floorPos_y - 50, 50, 50);
    }
    pop();
}
//check if game character reaches the flag pole
function checkFlagpole(){
    var d = abs(newgameChar_x - flagpole.x_pos);
    
    if(d<15){
        flagpole.isReached = true;
    }
}
//draw platform
function drawPlatform(){
    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }
}
//creating the Platform
function createPlatform(x,y,length){
    var p = new Platform(x,y,length);
    return p;
}
//using factory pattern to create platform
function Platform(x,y,length){
    this.x = x;
    this.y = y;
    this.length = length;
    //platform drawing
    this.draw = function(){
        fill(128,0,128);
        rect(this.x,this.y,this.length,10);
    }
//check if game character is in contact with the platform
this.checkContact = function(gameChar_x,gameChar_y){
    if(gameChar_x + 20 > this.x && gameChar_x < this.x + 20 + this.length){
        var d = this.y - gameChar_y;
        if(d >= 0 && d < 1){
            isFalling = false;
            return true;
        }
    }
    return false;
}
}
//check if game character is on the platform
function checkIfOnPlatform(){
    if(isFalling){
        var isContact = false;
        onPlatform = false;
        for(var i = 0; i < platforms.length; i++){
            isContact = platforms[i].checkContact(newgameChar_x,gameChar_y);
            if(isContact){
                onPlatform = true;
                break;
            }
        }
        if(!isContact){
            gameChar_y += 5;
        }
    }
}
//drawing the health bar on the top right
function drawLives(){
    fill(255,0,0);
    for(var i =0; i<lives; i++){
        rect(40*i+900,10,30,30);
    }
}
//enemy constructor function
function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.inc = 1;
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX > this.x + this.range){
            this.inc = -0.6; //speed of the enemy
        }else if(this.currentX < this.x){
            this.inc = 0.6; //speed of the enemy
        }
    }
    this.draw = function(){
        this.update();
        //enemy drawing
        fill(62,6,6);
        rect(this.currentX,this.y,20,20);
        fill(234,169,46);
        rect(this.currentX+2,this.y+2,6,6);
        rect(this.currentX+12,this.y+2,6,6);
        fill(186,72,10);
        rect(this.currentX+2,this.y+10,16,5);
    }
    // using d to check the distance between game character and the enemy
    this.checkContact = function(gameChar_x,gameChar_y){
        var d = dist(gameChar_x,gameChar_y,this.currentX,this.y);
        if(d<21){
            return true;
        }
        return false;
    }
}
//creating enemy 
function createEnemy(x,y,range){
    var e = new Enemy(x,y,range);
    return e;
}
//draw enemy
function drawEnemies(){
    for(i in enemies){
        enemies[i].draw();
    }
}
//check if the game character is in contact with the enemy
function checkIfEnemiesContactChar(){
    if(checkGameOver()){
        return;
    }
    for(var i = 0; i < enemies.length; i++){
        var isContact = enemies[i].checkContact(newgameChar_x,gameChar_y);
        if(isContact){
            fallSound.play();
            enemyContact = true;
            lives--;
            break;
        }
    }
}
//if the player either falls in canyon or hits enemey game will reset
function checkPlayerDie(){
    if(gameChar_y > height || enemyContact){
        if(lives>0){
            startGame();
        }
    }        
}
//if player have 0 lifes or reaches the flag pole the game ends
function checkGameOver(){
    var gameOver = false;
    if(lives < 1 || flagpole.isReached){
        gameOver = true;
       }
    return gameOver;
}
//drawing the game over line text 
function drawGameOver(){
    fill(0);
    text("Game Over", 250, height/2-100);
    if(lives>0){
        text("Winner!", 300,height/2);
        winSound.play()
        duration(1.0);
    }else{
        text("Loser!",300,height/2);
        loseSound.play();
        duration(1.0);
    }
}


