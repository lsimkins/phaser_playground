/**
 * Extend phaser game with SG (Space Game).
 */
Rama = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) {
  Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
};

Rama.prototype = Object.create(Phaser.Game.prototype);
Rama.prototype.constructor = Rama;

Rama.GAME_METHODS = {
  preload : function() {
    var atlasJSONHash = Rama.preloadFiles.atlasJSONHash || [];

    for (var i = atlasJSONHash.length - 1; i >= 0; i--) {
      game.load.atlasJSONHash(atlasJSONHash[i].id, atlasJSONHash[i].url, atlasJSONHash[i].json);
    }
  },

  create : function() {

  },

  update : function() {

  },

  render : function() {
    
  }
};

/**
 * Starts the vault game.
 */
Rama.startGame = function() {
  game = new Rama(800, 600, Phaser.CANVAS, 'vault-game', Rama.GAME_METHODS);
};