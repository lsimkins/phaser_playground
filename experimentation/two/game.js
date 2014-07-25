GAME_SETTINGS = {
  gameName : 'SpaceRPG',
  width: 800,
  height: 600,
  renderer: Phaser.CANVAS,
  parent: 'space-deaths-rpg',

  states: ['Boot', 'GameRound', 'MainMenu', 'Preloader'],
  initState: 'Boot'
};

Rama.startGame(GAME_SETTINGS);
