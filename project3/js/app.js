/*
 * Project 3
 * Modified by: Kay Lee (KL)
 *
 * app.js
*/
//Define the horizontal perimeters for player
var X_LEFT = 0;
var X_RIGHT = 400;

//Define the vertical perimeters for player
var Y_UP = 40;
var Y_DOWN = 420;

//Define the size of player steps
var X_STEP = 70;
var Y_STEP = 82;

//Define the initial position for player
var X_POSITION_PLAYER = 200;
var Y_POSITION_PLAYER = 420;
var X_POSITION_ENEMY =-100;


//Initialize score and the game indicator
var score=0;
var gameOn=Boolean(true);

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;

    // Set the random speeds of enemy 
    var eSpeed = [170, 110, 150, 180, 130, 190, 100, 200, 80, 50];
    var randomSpeed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
    this.speed = randomSpeed;

    // Set image of the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //repositions bugs to the beginning when they reach up the right side of the screen
    if (this.x > X_RIGHT) {
        this.x = X_POSITION_ENEMY;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset the enemy location
Enemy.prototype.reset = function(){
    this.x=X_POSITION_ENEMY;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //resets game on enemies/player collisions    
    for(var e = 0, enemiesCount = allEnemies.length; e < enemiesCount; e++) {
        if(player.x <= (allEnemies[e].x + 70) && allEnemies[e].x <= (player.x + 50) && player.y <= (allEnemies[e].y + 70) && allEnemies[e].y <= (player.y + 60)) {
            player.reset();               
            }
    }
};

Player.prototype.reset = function(){
    this.x = X_POSITION_PLAYER;
    this.y = Y_POSITION_PLAYER;
};

//increment score when reaching to the top of the screen without collision
Player.prototype.resetOnScore = function () {
    this.x = X_POSITION_PLAYER;
    this.y = Y_POSITION_PLAYER;

    if (gameOn)
        score++;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput=function(key){

  switch(key){
    case 'left':
        if (this.x > X_LEFT) {
             this.x -=X_STEP;
        }
        break;
    case 'right':
        if (this.x < X_RIGHT) {
            this.x +=X_STEP;
        }

        if (this.x > X_RIGHT) {
            this.x = X_RIGHT;
        }
        break;
    case 'up':
        if (this.y > Y_UP) {
            this.y -=Y_STEP;
        }
        else {
            player.resetOnScore();
        }
        break;
    case 'down':
        if (this.y < Y_DOWN) {
            this.y +=Y_STEP;
        }
        break;
    default:
        return;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];

var enymy1 = new Enemy(-100,50);
allEnemies.push(enymy1);

var enymy2 = new Enemy(-100,150);
allEnemies.push(enymy2);

var enymy3 = new Enemy(-100,240);
allEnemies.push(enymy3);

var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
