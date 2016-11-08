"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
const Missile = require('./missile');
const Target = require('./target');
const Weapon = require('./weapon');
const Particle = require('./smoke_particles');
/* Constants */
const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;
const MAX_SPEED = 12;
const PLAYER_ANGLE = 0.1;
const PLAYER_HP = 2000;

/**
 * @module Player
 * A class representing a player's helicopter
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a player
 * @param {BulletPool} bullets the bullet pool
 */
function Player(bullets, missiles) {
  this.missiles = missiles;
  this.missileCount = 4;
  this.bullets = bullets;
  this.angle = 0;
  this.position = {x: 200, y: 200};
  this.velocity = {x: 0, y: 0};
  this.img = new Image()
  this.img.src = './assets/player.png';
  this.init();
}
Player.prototype.init = function(){
  this.position = {x: 200, y: 200};
  this.hp = PLAYER_HP;
  this.score = 0;
  //this.weapon = Weapon.Types.Level1;

  this.death = new Particle(200);
}
Player.prototype.level = function(){
  this.position = {x: 200, y: 200};
}

/**
 * @function update
 * Updates the player based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Player.prototype.update = function(elapsedTime, input) {

  // set the velocity
  this.velocity.x = 0;
  if(input.left) {
    // Round turn
    this.angle -= PLAYER_ANGLE
    this.velocity.x -= PLAYER_SPEED;
    //if(this.angle < 0) this.angle += 2*Math.PI;
  }
  if(input.right){
  this.angle += PLAYER_ANGLE
  this.velocity.x += PLAYER_SPEED;
  //if(this.angle > 2* Math.PI) this.angle -= 2*Math.PI;
}
  this.velocity.y = 0;
  if(input.up) {
    this.velocity.y -= PLAYER_SPEED ;
    //if(this.velocity.y < MAX_SPEED ){this.velocity.y = -MAX_SPEED/2};
  }
  if(input.down) {
    this.velocity.y += PLAYER_SPEED ;
        //if(this.velocity.y > MAX_SPEED ){this.velocity.y = MAX_SPEED};
  }

  // determine player angle
  this.angle = 0;
  if(this.velocity.x < 0) this.angle = -Math.PI/8;
  if(this.velocity.x > 0) this.angle = Math.PI/8;

  // move the player
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  // don't let the player move off-screen
  if(this.position.x < 0) this.position.x = 0;
  if(this.position.x > 704) this.position.x = 704;
  console.log(this.position.x, this.position.y);
  if(this.position.y > 7000) this.position.y = 7000;
  if(this.position.y < -1000) this.position.y = -1000;
  //if death
  this.death.emit({x: -10, y:0});
  this.death.emit({x: -10, y:-10});
  this.death.emit({x: 10, y:10});

  this.death.update(elapsedTime);
}

/**
 * @function render
 * Renders the player helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Player.prototype.render = function(elapasedTime, ctx) {
  if(this.hp <= 0){
    this.death.render(elapsedTime, ctx);
  }
  else {
    var offset = this.angle * 24;
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.drawImage(this.img, 0,0, 24, 28, -12.5, -12, 24, 28);
    ctx.restore();

    ctx.strokeStyle = 'lightblue';
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    var pointerLength = 40;
    ctx.lineTo(this.position.x + pointerLength * Math.cos(this.angle),
              this.position.y + pointerLength * Math.sin(this.angle));
    ctx.stroke();

    //death
  }
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} direction
 */
Player.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the player still has missiles
 * to fire.
 */
Player.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    var missile = new Missile(position);
    this.missiles.push(missile);
    this.missileCount--;
  }
}

Player.prototype.damage = function(amount){
  this.hp -= amount;
}
Player.prototype.crash = function(object){
  if(entity instanceof Bullet){
    if(entity.isEnemy){
      this.damage(10);
    }
  }
  if(entity instanceof Target && entity.hp > 0){
    this.damage(20);
    entity.hp = 0;
    this.score += 10;
  }
  //if()
}
