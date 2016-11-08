"use strict";

module.exports = exports = EntityManager;

function EntityManager){
  this.entities = [];
}
EntityManager.prototype.addEntity = function(entity){
  this.entities.push(entity);
}

EntityManager.prototype.deleteEntity = function(entity){
  var id = this.entities.indexOf(entity);
  this.entities.splice(id, 1);
}

EntityManager.prototype.deleteEntity = function(elapsedTime){
  var potentiallyDelete = [];
  var self = this;
  this.entities.forEach(function(entity){
    //entity.update(elapsedTime);
    potentiallyDelete.push(entity);
  });
  potentiallyDelete.forEach(function(entity){
    self.deleteEntity(entity);
  });
  // now that all our entitys have moved.
  this.entities.sort(function(a,b){return a.position.x - b.position.x});

  // The active list will hold all entitys
  // we are currently considering for collisions
  var active = [];

  // The potentially colliding list will hold
  // all pairs of entitys that overlap in the x-axis,
  // and therefore potentially collide
  var potentiallyColliding = [];

  // For each entity in the axis list, we consider it
  // in order
  axisList.forEach(function(entity, aindex){
    // remove entitys from the active list that are
    // too far away from our current entity to collide
    // The Array.prototype.filter() method will return
    // an array containing only elements for which the
    // provided function's return value was true -
    // in this case, all entitys that are closer than 30
    // units to our current entity on the x-axis
    active = active.filter(function(oentity){
      return entity.position.x - oentity.position.x  < 30;//oentity.position.radius + entity.position.radius;
    });
    // Since only entitys within colliding distance of
    // our current entity are left in the active list,
    // we pair them with the current entity and add
    // them to the potentiallyColliding array.
    active.forEach(function(oentity, bindex){
      potentiallyColliding.push({a: oentity, b: entity});
    });
    // Finally, we add our current entity to the active
    // array to consider it in the next pass down the
    // axisList
    active.push(entity);
  });

  // At this point we have a potentaillyColliding array
  // containing all pairs overlapping in the x-axis.  Now
  // we want to check for REAL collisions between these pairs.
  // We'll store those in our collisions array.
  var collisions = [];
  potentiallyColliding.forEach(function(pair){
    // Calculate the distance between entitys; we'll keep
    // this as the squared distance, as we just need to
    // compare it to a distance equal to the radius of
    // both entitys summed.  Squaring this second value
    // is less computationally expensive than taking
    // the square root to get the actual distance.
    // In fact, we can cheat a bit more and use a constant
    // for the sum of radii, as we know the radius of our
    // entitys won't change.
    var distSquared =
      Math.pow(pair.a.position.x - pair.b.position.x, 2) +
      Math.pow(pair.a.position.y - pair.b.position.y, 2);
    // (15 + 15)^2 = 900 -> sum of two entitys' raidius squared
    if(distSquared < 900) {
      // Color the collision pair for visual debugging
      pair.a.color = 'red';
      pair.b.color = 'green';
      // Push the colliding pair into our collisions array
      collisions.push(pair);
    }
  });

  // Process entity collisions
  collisions.forEach(function(pair) {
    // Find the normal of collision
    pair.a.collide(pair.b);
    pair.b.collide(pair.a);
  });
}
EntityManager.prototype.render = function(elapsedTime, ctx){
  this.entities.forEach(function(entity){
    entity.render(elapsedTime,ctx);
  });
}
