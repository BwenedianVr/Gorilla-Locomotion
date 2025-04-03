export class GameMap {
  constructor(stage) {
    this.stage = stage;
    this.cameraX = 0;
    this.cameraY = -37;
  }

  update() {
    this.handleLevelUpdates();
  }

  handleLevelUpdates() {
    if (this.stage.playerX - this.cameraX > 0) {
      this.cameraX += (this.stage.playerX - this.cameraX) / 10;
    }
    if (this.stage.playerY - this.cameraY > 0) {
      this.cameraY += (this.stage.playerY - this.cameraY) / 10;
    }
    this.stage.setCameraPosition(this.cameraX, this.cameraY);
  }
}
