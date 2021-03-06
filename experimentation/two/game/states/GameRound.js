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
    this.add.tileSprite(0, 0, 2000, 2000, 'background001');
    this.physics = new SpaceRPG.Physics();
    this.world.setBounds(0, 0, 1400, 1400);

    player = this.add.ship(0, 0, 'basic');
    this.physics.enable(player);
    this.controller = new SpaceRPG.GameRound.MouseController(this.game, this, player);

    this.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    this.camera.deadzone = Phaser.Rectangle(-150, -150, 150, 150);
  },

  update: function () {
    this.controller.checkInput();
  },

  render: function() {
    // Rama.game.debug.cameraInfo(this.camera, 32, 32);
    Rama.game.debug.spriteCoords(player, 32, 32);
    Rama.game.debug.text("Speed: " + player.body.speed.toFixed(2), 32, 100);
    Rama.game.debug.text("Torque: " + player.body.torque.toFixed(2), 32, 120);
    Rama.game.debug.text("Angle: " + Phaser.Point.angle(this.input.mousePointer, player.position).toFixed(2), 32, 140);
    Rama.game.debug.text("VR: " + player.body.vr.toFixed(2), 32, 160);

    // Rama.game.debug.spriteBounds(player);
    // Rama.game.debug.spriteBounds(player.hull);
    // Rama.game.debug.spriteBounds(player.engines);
  },

  createShip: function(hull) {

  },

  quitGame: function (pointer) {

  }
};