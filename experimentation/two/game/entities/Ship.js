SpaceRPG.Ship = function (game, x, y, hull) {
  var hullConfig = game.cache.getJSON('hullConfig');

  Phaser.Sprite.call(this, game, x, y);
  this.anchor.x = this.anchor.y = 0.5;

  this.engines = new Phaser.Sprite(game, -120, 0, 'explosionBlue01');
  this.engines.animations.add('fire', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  this.engines.animations.play('fire', 20, true);
  this.engines.anchor.x = this.engines.anchor.y = 0.5;
  this.engines.rotation = -Math.PI / 2;
  this.addChildAt(this.engines, 0);

  this.hull = new Phaser.Sprite(game, 0, 0, 'ships', hullConfig[hull].sprite);
  this.hull.anchor.x = this.hull.anchor.y = 0.5;
  this.addChildAt(this.hull, 1);
};

SpaceRPG.Ship.prototype = Object.create(Phaser.Sprite.prototype);
SpaceRPG.Ship.prototype.constructor = SpaceRPG.Ship;
