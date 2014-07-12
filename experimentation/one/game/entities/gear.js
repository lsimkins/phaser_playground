VG.Gear = function(sides) {
  this.sides = sides;
};

VG.Gear.prototype = Object.create(Phaser.Sprite.prototype);
VG.Gear.prototype.constructor = VG.Gear;