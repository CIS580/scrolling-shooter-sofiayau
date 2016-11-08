"use strict";

const Target = require('./target');
module.exports = exports = Weapon;

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
 function Weapon(damage, cooldown, price, shotAnimation, collisionRadius)
   {
       this.damage = damage;
       this.cooldown = cooldown;
       //this.price = price;
       this.lastShot = 0;
       this.shotAnimation = shotAnimation;
       this.velocityX = -20;
       this.velocityY = 0;
       this.collisionRadius = collisionRadius;
 }

 /**
  * @function add
  * Adds a new bullet to the end of the BulletPool.
  * If there is no room left, no bullet is created.
  * @param {Vector} position where the bullet begins
  * @param {Vector} velocity the bullet's velocity
 */

 Weapon.prototype.fire = function(position, target) {
   this.position.y += 5;
   if (window.performance.now() - this.lastShot > this.cooldown)
   {
       this.emitShot(position, target);
       this.lastShot = window.performance.now();
   }
 }
 Weapon.prototype.emitShot = function(position, target){
   var shot = new Shot(x,y,this.velocityX,this.velocityX,this.collisionRadius, this.damage, this.price, this.shotAnimation);
   if (target == true){}
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
Weapon.prototype.update = function(elapsedTime, callback) {

 }

 /**
  * @function render
  * Renders all bullets in our array.
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx
  */
 Weapon.prototype.render = function(elapsedTime, ctx) {

 }
