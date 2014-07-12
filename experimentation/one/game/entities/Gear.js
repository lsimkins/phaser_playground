VG.Gear = function (game, x, y, key, frame) {
  // this.sides = sides;

  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.anchor.y = this.anchor.x = 0.5;

  this.rotatedThisTurn = false;
};

VG.Gear.prototype = Object.create(Phaser.Sprite.prototype);
VG.Gear.prototype.constructor = VG.Gear;

/**
 * Rotates the gear.
 * @param  {Number} dir Which direction to rotate (1 or -1)
 */
VG.Gear.prototype.rotate = function(dir) {
  dir = dir || 1;

  rotate = vg.add.tween(this);
  rotate.to({rotation: this.rotation + (Math.PI/2 * dir)}, 1000, Phaser.Easing.Sinusoidal.In, true);
};