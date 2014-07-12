VG.GearGroup = function(game, parent, name, addToStage, enableBody, physicsBodyType) {
  Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);

  this.classType = VG.Gear;

  this.tileSize = 128;
  this.gridSize = {x: 3, y: 3};
  // this.anchor.x = this.anchor.y = 0.5;

  this.resetGrid();
};

VG.GearGroup.prototype = Object.create(Phaser.Group.prototype);
VG.GearGroup.prototype.constructor = VG.GearGroup;

/**
 * Resets the gear grid using current settings.
 * @return {Vg.GearGroup}
 */
VG.GearGroup.prototype.resetGrid = function() {
  var i, j;

  this.grid = [];

  for (i = 0; i < this.gridSize.x; i++) {
    this.grid[i] = [];
    for (j = 0; j < this.gridSize.y; j++) {
      this.grid[i][j] = null;
    }
  }
};

VG.GearGroup.prototype.createGearAt = function(x, y, type, variant) {
  if (!this.grid[x] || typeof this.grid[x][y] !== 'object') {
    console.log('Cannot add gear at location, out of bounds.', x, y);
    return;
  }

  type = type || 1;
  variant = variant || 1;

  var sprite = 'gear' + type + '-' + variant;

  var gear = vg.add.sprite(x * this.tileSize, y * this.tileSize, 'gears', sprite, this);
};

VG.GearGroup.prototype.generateLayout = function(layout) {
  for (i = 0; i < layout.length; i++) {
    for (j = 0; j < layout[i].length; j++) {
      if (layout[i][j]) {
        this.createGearAt(i, j, layout[i][j], 1);
      }
    }
  }
};