/**
 * Extend phaser game with SG (Space Game).
 */
Rama = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) {
  Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
};

Rama.prototype = Object.create(Phaser.Game.prototype);
Rama.prototype.constructor = Rama;

// Default game settings.
Rama.SETTINGS = {
  start: {
    gameName : 'game',
    width: 800,
    height: 600,
    renderer: Phaser.CANVAS,
    parent: 'game-wrapper'
  }
};

/**
 * Starts the vault game.
 */
Rama.startGame = function(config) {
  config = config || Rama.SETTINGS;

  var game = new Rama(
    config.width,
    config.height,
    config.renderer,
    config.parent
  );

  for (var i = 0; i < config.states.length; i++) {
    game.state.add(config.states[i], window[config.gameName][config.states[i]]);
  }

  game.state.start(config.initState);

  Rama.game = game;
};
