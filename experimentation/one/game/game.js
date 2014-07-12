
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

  update : function() {

  },

  create : function() {
    bot = vg.add.sprite(200, 200, 'gears', 'gear4.png');
  },

  render : function() {
    vg.debug.body(bot);
  }
};

/**
 * Starts the vault game.
 */
VG.startGame = function() {
  vg = new VG(800, 600, Phaser.CANVAS, 'vault-game', VG.GAME_METHODS);
};

VG.startGame();
