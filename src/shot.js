"use strict";

const Target = require('./target');
cosnt Weapon = require('./weapon');
module.exports = exports = Shot;

/**
 * @module BulletPool
 * A class for managing bullets in-game
 * We use a Float32Array to hold our bullet info,
 * as this creates a single memory buffer we can
 * iterate over, minimizing cache misses.
 * Values stored are: positionX, positionY, velocityX,
 * velocityY in that order.
 */

 /**
  * @constructor BulletPool
  * Creates a BulletPool of the specified size
  * @param {uint} size the maximum number of bullets to exits concurrently
  */
 function Shot(position, velocityX, velocityY, radius, damage,price,  shotAnimation)
  {
       this.damage = damage;
       //this.price = price;
       this.shotAnimation = shotAnimation;
       this.velocityX = velocityX;
       this.velocityY = velocityY;
 }

 /**
  * @function add
  * Adds a new bullet to the end of the BulletPool.
  * If there is no room left, no bullet is created.
  * @param {Vector} position where the bullet begins
  * @param {Vector} velocity the bullet's velocity
 */

 Shot.prototype.hit = function(object) {
   //if(entity.collides(object)){
    // this.life -= damage;

   }
 }
 /**
  * @function update
  * Updates the bullet using its stored velocity, and
  * calls the callback function passing the transformed
  * bullet.  If the callback returns true, the bullet is
  * removed from the pool.
  * Removed bullets are replaced with the last bullet's values
  * and the size of the bullet array is reduced, keeping
  * all live bullets at the front of the array.
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {function} callback called with the bullet's position,
  * if the return value is true, the bullet is removed from the pool
  */
 Shot.prototype.update = function(elapsedTime, delta) {
   this.x += this.velocityX * delta;
   this.y += this.velocityY * delta;
 }

 /**
  * @function render
  * Renders all bullets in our array.
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx
  */
 BulletPool.prototype.render = function(elapsedTime, ctx) {

 }
