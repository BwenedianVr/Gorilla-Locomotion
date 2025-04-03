export class GameStage {
  constructor() {
    this.cameraX = 0;
    this.cameraY = -37;
    this.playerX = 0;
    this.playerY = -37;
    this.speedX = 0;
    this.speedY = 0;
    this.targetX = 0;
    this.targetY = -37;

    this.canvas = document.getElementById("gameCanvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.loadAssets();
  }

  loadAssets() {
    this.playerImage = new Image();
    this.playerImage.src = './assets/Player Hitbox.png';

    this.handImage = new Image();
    this.handImage.src = './assets/Hand Hitbox.png';

    this.baseImage = new Image();
    this.baseImage.src = './assets/base.png';
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render();
  }

  render() {
    this.context.drawImage(this.baseImage, this.cameraX, this.cameraY);
    this.context.drawImage(this.playerImage, this.playerX, this.playerY);
    this.context.drawImage(this.handImage, this.cameraX - 75, this.cameraY - 6);
  }

  setCameraPosition(x, y) {
    this.cameraX = x;
    this.cameraY = y;
  }

  setPlayerPosition(x, y) {
    this.playerX = x;
    this.playerY = y;
  }

  setTargetPosition(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
}
