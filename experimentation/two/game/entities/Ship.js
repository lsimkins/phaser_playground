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

SpaceRPG.Engines = function(game, parent) {
  Phaser.Group.call(this, game, parent, 'engines');

  this.maxThrust = 5;
  this.thrust    = 0;
  this.isFiring  = false;
  this.visible   = false;
};

SpaceRPG.Engines.prototype = Object.create(Phaser.Group.prototype);
SpaceRPG.Engines.prototype.constructor = SpaceRPG.Engines;

SpaceRPG.Engines.prototype.turnOn = function() {
  this.isFiring = true;
  this.thrust = this.maxThrust;
  this.visible = true;
};

SpaceRPG.Engines.prototype.rotateTowards = function(angle) {
  var diff = angle - this.parent.rotation;

  if (Math.abs(diff) >= Math.PI) {
    diff *= -1;
  }

  this.parent.body.force = this.parent.engines.thrust;
  this.parent.body.friction = 0.5;
  this.parent.body.torque = diff;

  if (Math.abs(this.parent.body.vr)/10 >= Math.abs(diff)) {
    this.parent.body.torque = 0;
    this.parent.body.vr = diff;
  }
};

SpaceRPG.Engines.prototype.turnOff = function() {
  this.thrust = 0;
  this.visible = false;

  this.parent.body.torque = 0;
  this.parent.body.vr = 0;
  this.parent.body.force = 0;
  this.parent.body.friction = 0.9;
};

SpaceRPG.Engines.prototype.create = function(x, y, key, frame) {
  var engine = Phaser.Group.prototype.create.call(this, x, y, key, frame, true);

  engine.animations.add('fire', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  engine.animations.play('fire', 20, true);
  engine.anchor.x = engine.anchor.y = 0.5;
  engine.rotation = -Math.PI / 2;
  this.addChildAt(engine, 0);
};