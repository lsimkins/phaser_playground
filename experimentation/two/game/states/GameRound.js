SpaceRPG.GameRound = function (game) {

  //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    // this.game;    //  a reference to the currently running game
    // this.add;   //  used to add sprites, text, groups, etc
    // this.camera;  //  a reference to the game camera
    // this.cache;   //  the game cache
    // this.input;   //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    // this.load;    //  for preloading assets
    // this.math;    //  lots of useful common math operations
    // this.sound;   //  the sound manager - add a sound, play one, set-up markers, etc
    // this.stage;   //  the game stage
    // this.time;    //  the clock
    // this.tweens;    //  the tween manager
    // this.state;     //  the state manager
    // this.world;   //  the game world
    // this.particles; //  the particle manager
    // this.physics; //  the physics manager
    // this.rnd;   //  the repeatable random number generator

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

SpaceRPG.GameRound.prototype = {

  preload: function() {

  },

  create: function() {
    this.add.tileSprite(0, 0, 2000, 2000, 'F5S2.png');
    this.physics = new SpaceRPG.Physics();
    this.world.setBounds(0, 0, 1400, 1400);

    player = this.createShip('basic');

    this.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    this.camera.deadzone = Phaser.Rectangle(-150, -150, 150, 150);
  },

  update: function () {
    if (this.input.mousePointer.isDown) {
      console.log('setting');
      var angle = this.physics.angleToPointer(player, this.input.mousePointer);

      var rotate = 0;
      var diff = angle - player.rotation;

      if (Math.abs(diff) >= Math.PI) {
        diff *= -1;
      }

      player.body.torque = diff;
    } else {
      player.body.torque = 0;
    }
  },

  render: function() {
    // Rama.game.debug.cameraInfo(this.camera, 32, 32);
    Rama.game.debug.spriteCoords(player, 32, 32);
    Rama.game.debug.text("Torque: " + player.body.torque, 32, 100);
    Rama.game.debug.text("Angle: " + Phaser.Point.angle(this.input.mousePointer, player.position), 32, 120);
    Rama.game.debug.text("VR: " + player.body.vr, 32, 140);
  },

  createShip: function(hull) {
    var hullConfig = this.cache.getJSON('hullConfig');
    var ship = this.add.sprite(260, 260, 'ships', hullConfig[hull].sprite);

    ship.anchor.x = ship.anchor.y = 0.5;

    this.physics.enable(ship);

    return ship;
  },

  quitGame: function (pointer) {

  }
};