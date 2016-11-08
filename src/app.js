"use strict";

/* Classes and Libraries */
const Game = require('./game');
const Vector = require('./vector');
const Camera = require('./camera');
const Player = require('./player');
const BulletPool = require('./bullet_pool');
const Target = require('./target');
const Tilemap = require('./tilemap');
/* Global variables */
var canvas = document.getElementById('screen');

var game = new Game(canvas, update, render);
//Level 1
var background = require('../assets/background.json');
var midground = require('../assets/midground.json');
var frontground = require('../assets/frontground.json');
//Level 2
var background2 = require('../assets/background2.json');
var midground2 = require('../assets/midground2.json');
var frontground2 = require('../assets/frontground2.json');
//Level 3
var background3 = require('../assets/background3.json');
var midground3 = require('../assets/midground3.json');
var frontground3 = require('../assets/frontground3.json');

var level = 0;
var state = {
  Level1: 0,
  Level2: 1,
  Level3: 2,
  gameOver: 3
}
var now = state.Level1;
var bb = new Image();
bb.src = './assets/background_1.png';

var input = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire:false
}
var camera = new Camera(canvas);
var bullets = new BulletPool(10);
var missiles = [];
var enemy1 = new Target('enemy1',{x:200,y:200},100);
var enemy2 = new Target('enemy2',{x:100,y:300},20);
var enemy3 = new Target('enemy3',{x:300,y:100},30);
var enemy4 = new Target('enemy4',{x:250,y:410},240);
var enemy5 = new Target('enemy5',{x:160,y:320},210);
var boss = new Target('boss',{x:100,y:300},1500);


var player = new Player(bullets, missiles);
var reticule = {
  x: 0,
  y: 0
}

var back_tilemap = [];
back_tilemap.push(new Tilemap(background, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(midground, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(frontground, {
  onload: function(){
    checkMap();
  }
}));

//Level 2
back_tilemap.push(new Tilemap(background2, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(midground2, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(frontground2, {
  onload: function(){
    checkMap();
  }
}));

//Level 3
back_tilemap.push(new Tilemap(background3, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(midground3, {
  onload: function(){
    checkMap();
  }
}));
back_tilemap.push(new Tilemap(frontground3, {
  onload: function(){
    checkMap();
  }
}));


var mapCount = 9;
function checkMap(){
  mapCount --;
  if(mapCount == 0) masterLoop(performance.now());
}
/**
 * @function onkeydown
 * Handles keydown events
 */
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = true;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = true;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = true;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = true;
      event.preventDefault();
      break;
  }
}

/**
 * @function onkeyup
 * Handles keydown events
 */
window.onkeyup = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = false;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = false;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = false;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = false;
      event.preventDefault();
      break;
  }
}
window.onmousemove = function(event) {
  event.preventDefault();
  reticule.x = event.offsetX;
  reticule.y = event.offsetY;
}

/**
 * @function onmousedown
 * Handles mouse left-click events
 */
window.onmousedown = function(event) {
  event.preventDefault();
    if(event.button == 0) {
    reticule.x = event.offsetX;
    reticule.y = event.offsetY;
    var direction = Vector.subtract(
      reticule,
      camera.toScreenCoordinates(player.position)
    );
    if(now < state.gameOver)
    {player.fireBullet(direction);}
    else if(now == state.gameOver){
      playe.init();
      now = state.Level1;
      level = 0;
    }
    else {
      player.level();
      level ++;
      now -= 3;
    }
  }
}
/**
 * @function oncontextmenu
 * Handles mouse right-click events
 */
canvas.oncontextmenu = function(event) {
  event.preventDefault();
  reticule.x = event.offsetX;
  reticule.y = event.offsetY;
  player.fireMissile();
}
/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function animate(){
   now = state.gameOver;
 }
function update(elapsedTime) {
  if(now > state.Level3){
    console.log("Congratulations");
  }
  if(player.hp <= 0){
    console.log("Game over");
    setTimeout(animate, 200);
  }
  if(player.position.y >= 1024){
    if(now == state.Level1){
      now = state.Level2;

    }
    if(now == state.Level2){

      now = state.Level3;

    }
    if(now == state.Level3){
      console.log("Completed");

    }
  }

  // update the player
  player.update(elapsedTime, input);

  // update the camera
  camera.update(player.position);
  enemy1.update(elapsedTime);
  enemy2.update(elapsedTime);
  enemy3.update(elapsedTime);
  enemy4.update(elapsedTime);
  enemy5.update(elapsedTime);
  boss.update(elapsedTime);
  console.log(enemy1.getSize());
  // Update bullets
  bullets.update(elapsedTime, function(bullet){
    if(!camera.onScreen(bullet)) return true;
    return false;
  });


  // Update missiles
  var markedForRemoval = [];
  missiles.forEach(function(missile, i){
    missile.update(elapsedTime);
    if(Math.abs(missile.position.x - camera.x) > camera.width * 2)
      markedForRemoval.unshift(i);
  });
  // Remove missiles that have gone off-screen
  markedForRemoval.forEach(function(index){
    missiles.splice(index, 1);
  });
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bb,0,0);
  // TODO: Render background
  renderBackgrounds(elapsedTime, ctx);
  // Transform the coordinate system using
  // the camera position BEFORE rendering
  // objects in the world - that way they
  // can be rendered in WORLD cooridnates
  // but appear in SCREEN coordinates
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  renderWorld(elapsedTime, ctx);
  ctx.restore();

  // Render the GUI without transforming the
  // coordinate system
  renderGUI(elapsedTime, ctx);
}

function renderBackgrounds(elapsedTime, ctx) {
  ctx.save();

  // The background scrolls at 2% of the foreground speed
  /*ctx.translate(-camera.x * 0.2, 0);
  ctx.drawImage(backgrounds[2], 0, 0);
  ctx.restore();*/

  // The midground scrolls at 60% of the foreground speed
  /*ctx.save();
  ctx.translate(-camera.x * 0.6, 0);
  ctx.drawImage(backgrounds[1], 0, 0);
  ctx.restore();*/

  // The foreground scrolls in sync with the camera
  if(level ==0)
{  ctx.save();
  ctx.translate(0, -camera.y);
  back_tilemap[0].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.6);
  back_tilemap[1].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[2].render(ctx);
  ctx.restore();}

  //Level 2
  // The foreground scrolls in sync with the camera
  if(level == 1)
{  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[3].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[4].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[5].render(ctx);
  ctx.restore();}
  //Level 3
  // The foreground scrolls in sync with the camera

  if(level == 2)
{  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[6].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[7].render(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(0, -camera.y * 0.2);
  back_tilemap[8].render(ctx);
  ctx.restore();}
}


/**
  * @function renderWorld
  * Renders the entities in the game world
  * IN WORLD COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function renderWorld(elapsedTime, ctx) {
    // Render the bullets
    bullets.render(elapsedTime, ctx);
    enemy1.render(elapsedTime, ctx);
    enemy2.render(elapsedTime, ctx);
    enemy3.render(elapsedTime, ctx);
    enemy4.render(elapsedTime, ctx);
    enemy5.render(elapsedTime, ctx);
    boss.render(elapsedTime, ctx);
    // Render the missiles
    missiles.forEach(function(missile) {
      missile.render(elapsedTime, ctx);
    });

    // Render the player
    player.render(elapsedTime, ctx);
    ctx.fillStyle = 'grey';
    ctx.fillText("level: "+ level, 20, 20);
}

/**
  * @function renderGUI
  * Renders the game's GUI IN SCREEN COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx
  */
function renderGUI(elapsedTime, ctx) {
  ctx.save();
  ctx.translate(reticule.x, reticule.y);
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2*Math.PI);
  ctx.moveTo(0, 15);
  ctx.lineTo(0, -15);
  ctx.moveTo(15, 0);
  ctx.lineTo(-15, 0);
  ctx.strokeStyle = '#00ff00';
  ctx.stroke();
  ctx.restore();
  // TODO: Render the GUI
}
