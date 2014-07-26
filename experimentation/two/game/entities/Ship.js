SpaceRPG.Ship = function (game, x, y, hull) {
  var hullConfig = game.cache.getJSON('hullConfig')[hull];

  Phaser.Sprite.call(this, game, x, y);
  this.anchor.x = this.anchor.y = 0.5;

  this.engines = new SpaceRPG.Engines(game, this);
  this.addChildAt(this.engines, 0);

  for (var i = hullConfig.engines.length - 1; i >= 0; i--) {
    this.addEngine(hullConfig.engines[i][0], hullConfig.engines[i][1], 'explosionBlue01');
  }

  this.hull = new Phaser.Sprite(game, 0, 0, 'ships', hullConfig.sprite);
  this.hull.anchor.x = this.hull.anchor.y = 0.5;
  this.addChildAt(this.hull, 1);
};

SpaceRPG.Ship.prototype = Object.create(Phaser.Sprite.prototype);
SpaceRPG.Ship.prototype.constructor = SpaceRPG.Ship;

SpaceRPG.Ship.prototype.addEngine = function(x, y, key) {
  this.game.add.sprite(x, y, key, 1, this.engines);
};
