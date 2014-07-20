VG.GearGroup = function(game, parent, name, addToStage, enableBody, physicsBodyType) {
  Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);

  this.classType = VG.Gear;

  this.tileSize = 114;
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
  var self = this;
  if (!self.grid[x] || typeof self.grid[x][y] !== 'object') {
    console.log('Cannot add gear at location, out of bounds.', x, y);
    return;
  }

  type = type || 1;
  variant = variant || 1;

  var sprite = 'gear' + type + '-' + variant;
  var gear = 

  self.grid[x][y] = vg.add.sprite(x * self.tileSize, y * self.tileSize, 'gears', sprite, self);
  self.grid[x][y].inputEnabled = true;
  self.grid[x][y].events.onInputDown.add(function() {
    self.performTurn(x, y, 1);
  });
};

VG.GearGroup.prototype.generateLayout = function(layout) {
  var i,j;
  for (j = 0; j < layout.length; j++) {
    for (i = 0; i < layout[j].length; i++) {
      if (layout[j][i]) {
        this.createGearAt(i, j, layout[j][i], 1);
      }
    }
  }
};

VG.GearGroup.prototype.performTurn = function(x, y, dir) {
  this.rotateGearAt(x, y, dir);
  this.finishTurn();
};

VG.GearGroup.prototype.rotateGearAt = function(x, y, dir, rotateNeighbors, force) {
  rotateNeighbors = (typeof rotateNeighbors === undefined) ? rotateNeighbors : true;
  force           = (typeof force === undefined) ? force : false;

  var neighbors;
  var gear = this.grid[x] ? this.grid[x][y] : undefined;
  if (!gear || (gear.rotatedThisTurn && !force)) {
    return;
  }

  if (rotateNeighbors) {
    neighbors = this.getConnectedNeighbors(x, y);
  }

  gear.rotate(dir);
  gear.rotatedThisTurn = true;

  if (rotateNeighbors) {
    for (var i = neighbors.length - 1; i >= 0; i--) {
      this.rotateGearAt(neighbors[i][0], neighbors[i][1], dir * -1);
    }
  }
};

VG.GearGroup.prototype.getNeighbors = function(x, y) {
  var i, j, neighbors = [];

  // for (i = x - 1; i <= x + 1; i++) {
  //   for (j = y - 1; j <= y + 1; j++) {
  //     if (i === x && j === y) {
  //       continue;
  //     } else if (this.grid[i] && this.grid[i][j]) {
  //       neighbors.push([i, j]);
  //     }
  //   }
  // }

  if (this.grid[x+1] && this.grid[x+1][y]) {
    neighbors.push([x+1, y]);
  }

  if (this.grid[x-1] && this.grid[x-1][y]) {
    neighbors.push([x-1, y]);
  }

  if (this.grid[y+1] && this.grid[y+1][y]) {
    neighbors.push([x, y+1]);
  }

  if (this.grid[y-1] && this.grid[y-1][y]) {
    neighbors.push([x, y-1]);
  }

  return neighbors;
};

VG.GearGroup.prototype.getConnectedNeighbors = function(x, y) {
  var neighbors = [];
    var gear = this.grid[x][y];

  if (gear.sides[1] && this.grid[x+1] && this.grid[x+1][y]) {
    if (this.grid[x+1][y].sides[3]) {
      neighbors.push([x+1, y]);
    }
  }

  if (gear.sides[3] && this.grid[x-1] && this.grid[x-1][y]) {
    if (this.grid[x-1][y].sides[1]) {
      neighbors.push([x-1, y]);
    }
  }

  if (gear.sides[2] && this.grid[x][y+1] && this.grid[x][y+1]) {
    if (this.grid[x][y+1].sides[0]) {
      neighbors.push([x, y+1]);
    }
  }

  if (gear.sides[0] && this.grid[x][y-1] && this.grid[x][y-1]) {
    if (this.grid[x][y-1].sides[2]) {
      neighbors.push([x, y-1]);
    }
  }

  return neighbors;
};

VG.GearGroup.prototype.finishTurn = function() {
  for (var i = this.children.length - 1; i >= 0; i--) {
    this.children[i].rotatedThisTurn = false;
  }
};