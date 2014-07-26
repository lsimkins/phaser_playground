SpaceRPG.GameRound.MouseController = function(game, state, player) {
  this.game = game;
  this.state = state;
  this.player = player;
};

SpaceRPG.GameRound.MouseController.prototype = {
  checkInput: function() {
    if (this.state.input.mousePointer.isDown) {
      var angle = this.state.physics.angleToPointer(player, this.state.input.mousePointer);
      player.engines.rotateTowards(angle);
      player.engines.turnOn();

      player.engines.visible = true;

    } else if (this.state.input.mousePointer.isUp) {
      if (player.engines.isFiring) {
        player.engines.turnOff();
      }
    }
 }
};

SpaceRPG.GameRound.MouseController.prototype.constructor = SpaceRPG.GameRound.MouseController;