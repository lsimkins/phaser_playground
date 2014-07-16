VG.Gear = function (game, x, y, key, frame) {
  // this.sides = sides;

  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.anchor.y = this.anchor.x = 0.5;

  this.rotatedThisTurn = false;

  this.updateSides();
};

VG.Gear.prototype = Object.create(Phaser.Sprite.prototype);
VG.Gear.prototype.constructor = VG.Gear;

VG.Gear.SIDES = {
  'gear1-1' : [1, 0, 0, 0],
  'gear2-1' : [1, 1, 0, 0],
  'gear2-2' : [1, 0, 1, 0],
  'gear3-1' : [1, 1, 1, 0],
  'gear4-1' : [1, 1, 1, 1]
};

VG.Gear.prototype.updateSides = function() {
  this.sides = [
    VG.Gear.SIDES[this.frameName][0],
    VG.Gear.SIDES[this.frameName][1],
    VG.Gear.SIDES[this.frameName][2],
    VG.Gear.SIDES[this.frameName][3]
  ];
};

/**
 * Rotates the gear.
 * @param  {Number} dir Which direction to rotate (1 or -1)
 */
VG.Gear.prototype.rotate = function(dir) {
  dir = dir || 1;

  rotate = vg.add.tween(this);
  rotate.to({rotation: this.rotation + (Math.PI/2 * dir)}, 1000, Phaser.Easing.Sinusoidal.In, true);

  // Rotate sides array.
  if (dir === -1) {
    this.sides.push(this.sides.shift());
  } else {
    this.sides.unshift(this.sides.pop());
  }
};
