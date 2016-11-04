"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
const Missile = require('./missile');
const Particles = require('./smoke_particles');
/* Constants */
const TARGET_SPEED = 5;
const MAX_SPEED = 12;
const TARGET_ANGLE = 0.1;

/**
 * @module Target
 * A class representing a target
 */
module.exports = exports = Target;
/*
x,y,angle,size,v,color
*/
/**
 * @constructor Target
 * Creates a Target
 * @param {Target} targets target
 */
function Target(type, position) {
  this.type = type;
  this.begin = {x:position.x, y:position.y};
  this.position = position;
  this.velocity = {x: 0, y: 0};

  this.enemy1 = new Image();
  this.enemy1.src = 'assets/tyrian.shp.0';
  this.enemy2 = new Image();
  this.enemy2.src = 'assets/tyrian.shp.0';
  this.enemy3 = new Image();
  this.enemy3.src = 'assets/tyrian.shp.0';
  this.particle = new Particles(30);

  this.boss = new Image();
  this.boss.src = 'assets/tyrian.shp.0';

  this.types = ['enemy1','enemy2','enemy3','boss'];

  this.right = true;
  this.up = true;
  this.down = true;
  this.left = true;
}
/*
  Target.prototype.push = function(target){
  this.init(target);
  var i = -1;
  while(this.objects [++i] != undefined);
  this.objects[i] = target;
  if(this.maxID < i) this.maxID = i;
}
*/

/**
 * @function update
 * Updates the player based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Target.prototype.update = function(camera, player, elapsedTime) {
  switch(this.type){
    case 'enemy1':
      if((this.begin.y - this.position.y)>40) {
        this.up = false;
        this.position.y += 5;
      }
      else this.position.y -= 5;
      break;
    case 'enemy2':
      if((this.begin.x - this.position.x) > 40){
        this.left = false;
        this.position.x += 5;
      }
      else this.position.x -= 5;
      break;
    case 'enemy3':
      if((this.begin.x - this.position.x) > 40){
        this.right = false;
        this.position.x -= 5;
      }
      else this.position.x += 5;
      break;
    case 'boss':
      this.fireBullet(
        Vector.subtract(player.position,
        camera.toScreenCoordinates(this.position)));
        break;
  }
}

/**
 * @function render
 * Renders the player helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Target.prototype.render = function(elapasedTime, ctx) {
  ctx.fillStyle ='white';
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  switch (this.type) {
    case 'enemy1':
      ctx.drawImage(this.enemy1, 200,200,20,20,100,100);
      break;
    case 'enemy2':
      ctx.drawImage(this.enemy2, 15, 10, 240, 240,100,100);
      break;
    case 'enemy3':
      ctx.drawImage(this.enemy3, 20, 40, 320, 280,100,100);
      break;
    case 'boss':
      ctx.drawImage(this.boss, 30,50, 200, 10, 150,150);
      break;
  }
  ctx.restore();
}

Target.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

Target.prototype.getSize = function(){
  var size = 0;
  for(var i =0; i<this.maxID;i++){
    if(this.objects[i]==undefined)continue;
    size++;
  }
  return size;
}

Target.prototype.getInfo = function(o){
  var dist = 9999;
  var obj;
  for(var i =0; i<=this.maxID;i++){
    if(this.objects[i]==undefined)continue;
    var d = Math.sqrt(
      (o.x - objects[i].x)*(o.x - objects[i].x)+
      (o.y - objects[i].y)*(o.y - objects[i].y)
    );
    if(d < dist){
      dist = d;
      obj = objects[i];
    }
  }
  return {dist:dist, object:obj};
}
