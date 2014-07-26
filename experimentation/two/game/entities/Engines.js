SpaceRPG.Engines = function(game, parent) {
  Phaser.Group.call(this, game, parent, 'engines');

  this.maxThrust = 5;
  this.thrust    = 0;
  this.isFiring  = false;
  this.visible   = false;
};

SpaceRPG.Engines.STATE = {
  OFF: 0,
  ON: 1,
  STOPPING: 2,
  STARTING: 3
};

SpaceRPG.Engines.prototype = Object.create(Phaser.Group.prototype);
SpaceRPG.Engines.prototype.constructor = SpaceRPG.Engines;

SpaceRPG.Engines.prototype.turnOn = function() {
  this.isFiring = true;
  this.thrust = this.maxThrust;
  this.visible = true;

  this.state = SpaceRPG.Engines.STATE.STARTING;
  for (var i = this.children.length - 1; i >= 0; i--) {
    this.children[i].play('start');
  }
};

SpaceRPG.Engines.prototype.turnOff = function() {
  this.thrust = 0;
  this.isFiring = false;

  this.parent.body.torque = 0;
  this.parent.body.vr = 0;
  this.parent.body.force = 0;
  this.parent.body.friction = 0.9;

  this.state = SpaceRPG.Engines.STATE.STOPPING;
  for (var i = this.children.length - 1; i >= 0; i--) {
    this.children[i].animations.play('stop');
  }
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

SpaceRPG.Engines.prototype.create = function(x, y, key, frame) {
  var engine = Phaser.Group.prototype.create.call(this, x, y, key, frame, true);

  engine.animations.add('start', [1,2,3,4,5], 20);
  engine.animations.add('fire', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);
  engine.animations.add('stop', [24, 25, 26, 27, 28], 20);
  engine.anchor.x = engine.anchor.y = 0.5;
  engine.rotation = -Math.PI / 2;
  this.addChildAt(engine, 0);
};

SpaceRPG.Engines.prototype.postUpdate = function() {
  var i;
  if (this.state === SpaceRPG.Engines.STATE.STARTING) {
    for (i = this.children.length - 1; i >= 0; i--) {
      if (this.children[i].animations.currentAnim.isFinished) {
        this.children[i].animations.play('fire');
        this.state = SpaceRPG.Engines.STATE.ON;
      }
    }

  } else if (this.state === SpaceRPG.Engines.STATE.STOPPING) {
    for (i = this.children.length - 1; i >= 0; i--) {
      if (this.children[i].animations.currentAnim.isFinished) {
        this.state = SpaceRPG.Engines.STATE.OFF;
        this.visible = false;
      }
    }
  }
};