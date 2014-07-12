/**
 * Extend phaser game with VG (Vault Game).
 */
VG = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) {
  Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
};

VG.prototype = Object.create(Phaser.Game.prototype);
VG.prototype.constructor = VG;

VG.GAME_METHODS = {
  preload : function() {
    vg.load.atlasJSONHash('gears', 'assets/gears.png', 'assets/gears.json');
  },

  create : function() {
    gearGroup = new VG.GearGroup(vg);
    gearGroup.x = 200;
    gearGroup.y = 200;

    testLayout = [
      [1,2,4],
      [2,1,4],
      [3,3,2]
    ];

    gearGroup.generateLayout(testLayout);

    // gear = vg.add.sprite(200, 200, 'gears', 'gear4.png', gearGroup);

    // rotate = vg.add.tween(gear);

    // rotate.to({rotation: Math.PI}, 2000, Phaser.Easing.Sinusoidal.In);
  },

  update : function() {

  },

  render : function() {
    //vg.debug.body(bot);
  }
};

/**
 * Starts the vault game.
 */
VG.startGame = function() {
  vg = new VG(800, 600, Phaser.CANVAS, 'vault-game', VG.GAME_METHODS);
};