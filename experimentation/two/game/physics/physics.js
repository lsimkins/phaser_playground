SpaceRPG.Physics = function() {
  this.bodies = [];
};

SpaceRPG.Physics.prototype = {
  enable: function(object, mass) {
    if (object.hasOwnProperty('body') && object.body === null) {
      object.body = new SpaceRPG.Physics.Body(object);
      this.bodies.push(object);
    }
  },

  /**
  * Find the angle in radians between a display object (like a Sprite) and a Pointer, taking their x/y and center into account.
  *
  * @method Phaser.Physics.Arcade#angleToPointer
  * @param {any} displayObject - The Display Object to test from.
  * @param {Phaser.Pointer} [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
  * @return {number} The angle in radians between displayObject.x/y to Pointer.x/y
  */
  angleToPointer: function (displayObject, pointer) {

    pointer = pointer || this.game.input.activePointer;

    this._dx = pointer.worldX - displayObject.x;
    this._dy = pointer.worldY - displayObject.y;

    return Math.atan2(this._dy, this._dx);
  }
};

SpaceRPG.Physics.prototype.constructor = SpaceRPG.Physics;

SpaceRPG.Physics.Body = function(object) {
  this.mass   = 1;
  this.force  = 0;
  this.speed  = 50;

   // Angular velocity
  this.vr     = 0;
  this.vrMax  = 5;
  this.torque = 0;
  this.rFriction = 0.99;

  this.vector = new Phaser.Point(1, 1);
  this.object = object;
};

SpaceRPG.Physics.Body.prototype = {
  preUpdate: function() {
    var delta = this.object.game.time.elapsed / 1000;

    this.vr += this.torque/this.mass;

    // Update rotation based on angular velocity.
    this.vr = Math.max(Math.min(this.vr, this.vrMax), -this.vrMax);

    this.object.rotation += this.vr * delta;

    if (this.object.rotation >= Math.PI) {
      this.object.rotation -= Math.PI * 2;
    } else if (this.object.rotation <= -Math.PI) {
      this.object.rotation += Math.PI * 2;
    }

    // Update vector.
    this.vector.rotate(0, 0, this.object.rotation);

    this.object.position.x += this.speed * this.vector.x * delta;
    this.object.position.y += this.speed * this.vector.y * delta;
  },

  postUpdate: function() {}
};

SpaceRPG.Physics.Body.prototype.constructor = SpaceRPG.Physics.Body;