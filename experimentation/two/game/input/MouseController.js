SpaceRPG.GameRound.MouseController = function(game, state, player) {
  this.game = game;
  this.state = state;
  this.player = player;
};

SpaceRPG.GameRound.MouseController.prototype = {
  checkInput: function() {
    if (this.state.input.mousePointer.isDown) {
      var angle = this.state.physics.angleToPointer(player, this.state.input.mousePointer);

      var rotate = 0;
      var diff = angle - player.rotation;

      if (Math.abs(diff) >= Math.PI) {
        diff *= -1;
      }

      player.body.force = player.thrust;
      player.body.friction = 0.5;
      player.body.torque = diff;

      if (Math.abs(player.body.vr)/10 >= Math.abs(diff)) {
        player.body.torque = 0;
        player.body.vr = diff;
      }

      player.engines[0].visible = true;

    } else if (this.state.input.mousePointer.isUp) {
      player.body.torque = 0;
      player.body.vr = 0;
      player.body.force = 0;
      player.body.friction = 0.9;
      player.engines[0].visible = false;
    }
 }
};

SpaceRPG.GameRound.MouseController.prototype.constructor = SpaceRPG.GameRound.MouseController;