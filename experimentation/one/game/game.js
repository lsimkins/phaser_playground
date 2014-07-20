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
    vg.load.atlasJSONHash('gears', 'assets/gears2.png', 'assets/gears2.json');
    vg.load.atlasJSONHash('vault', 'assets/vault.png', 'assets/vault.json');
  },

  create : function() {
    vg.add.sprite(70, -10, 'vault', 'safe1');
    fade = vg.add.sprite(200, 150, 'vault', 'fade');

    gearGroup = new VG.GearGroup(vg);
    gearGroup.x = 280;
    gearGroup.y = 240;

    testLayout = [
      [4,2,4],
      [3,3,3],
      [3,3,3]
    ];

    gearGroup.generateLayout(testLayout);
    gearGroup.scale.x = gearGroup.scale.y = 0.68;

    //gear = vg.add.sprite(200, 200, 'gears', 'gear4.png', gearGroup);


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
