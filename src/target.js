"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
const Missile = require('./missile');
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
 * @param {BulletPool} targets bullet pool
 */
function Target() {
  this.objects = [];
  this.maxID = 0;
  this.angle = 0;
  this.init = function(target){
    target.vx = target.v * Math.cos(target.angle),
    target.vy = target.v * Math.sin(target.angle)
  }
}
Target.prototype.push = function(target){
  this.init(target);
  var i = -1;
  while(this.objects [++i] != undefined);
  this.objects[i] = target;
  if(this.maxID < i) this.maxID = i;
}

/**
 * @function update
 * Updates the player based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Target.prototype.update = function(elapsedTime) {
  for(var i =0; i<this.maxID;i++){
    if(this.objects[i] == undefined)continue;
    var obj = this.objects[i];
    obj.x = obj.vx * elapsedTime;
    obj.x = obj.vy * elapsedTime;
    /*var info = targets.getInfo(obj);
    if(info.dist<= obj.size){
      info.object.remove = true;
      obj.hitAnimClock = 0;
    }*/
    if(obj.hitAnimClock != -1){
      obj.hitAnimClock += elapsedTime;
      if(obj.hitAnimClock >= 1){
        delete this.objects[i];
        continue;
      }
    }

    if(obj.x<0 || obj.y<0||obj.x>this.width||
      obj.y>this.height||obj.remove)
    delete this.objects[i];
  }
  if(this.getSize() < 5){
    this.push({
      x: Math.random()* this.width,
      y: Math.random()* this.height,
      v:5,
      angle:Math.random()*2*Math.PI,
      size:25,
    });
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
  for(var i =0; i<this.maxID;i++){
    if(this.objects[i] == undefined)continue;
    var obj = this.objects[i];
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 2,0,6.28);
    ctx.fill();
  }
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
