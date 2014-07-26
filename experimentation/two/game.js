GAME_SETTINGS = {
  gameName : 'SpaceRPG',
  width: 1200,
  height: 800,
  renderer: Phaser.CANVAS,
  parent: 'space-deaths-rpg',

  states: ['Boot', 'GameRound', 'MainMenu', 'Preloader'],
  initState: 'Boot'
};

// Extend phaser with game-related methods.
Phaser.GameObjectFactory.prototype.ship = function(x, y, hull) {
  // Temporary
  x = 260; y = 260;
  // Temporary

  var ship = new SpaceRPG.Ship(this.game, 260, 260, hull);
  this.world.addChildAt(ship, 1);

  ship.position.x = x;
  ship.position.y = y;

  return ship;
};


Rama.startGame(GAME_SETTINGS);
