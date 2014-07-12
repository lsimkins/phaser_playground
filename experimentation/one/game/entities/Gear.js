VG.Gear = function (game, x, y, key, frame) {
  // this.sides = sides;

  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.anchor.y = this.anchor.x = 0.5;
};

VG.Gear.prototype = Object.create(Phaser.Sprite.prototype);
VG.Gear.prototype.constructor = VG.Gear;