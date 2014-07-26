SpaceRPG.Ship = function (game, x, y, hull) {
  var hullConfig = game.cache.getJSON('hullConfig')[hull];

  Phaser.Sprite.call(this, game, x, y);
  this.anchor.x = this.anchor.y = 0.5;

  this.thrust = 5;
  this.engines = [];

  for (var i = hullConfig.engines.length - 1; i >= 0; i--) {
    this.addEngine(hullConfig.engines[i][0], hullConfig.engines[i][0], 'explosionBlue01');
  }

  this.hull = new Phaser.Sprite(game, 0, 0, 'ships', hullConfig.sprite);
  this.hull.anchor.x = this.hull.anchor.y = 0.5;
  this.addChildAt(this.hull, 1);
};

SpaceRPG.Ship.prototype = Object.create(Phaser.Sprite.prototype);
SpaceRPG.Ship.prototype.constructor = SpaceRPG.Ship;

SpaceRPG.Ship.prototype.addEngine = function(x, y, key) {
  var engine = new Phaser.Sprite(this.game, -120, 0, 'explosionBlue01');

  engine.animations.add('fire', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  engine.animations.play('fire', 20, true);
  engine.anchor.x = engine.anchor.y = 0.5;
  engine.rotation = -Math.PI / 2;
  this.addChildAt(engine, 0);

  this.engines.push(engine);
};