export class PlayerMovement {
  constructor(stage) {
    this.stage = stage;

    this.direction = 180;
    this.distance = 0;
    this.isCollision = false;
    this.maxReach = 82;
    this.speedX = 0;
    this.speedY = 0;

    this.targetX = 0;
    this.targetY = -37;
  }

  update() {
    this.applyGravityAndFriction();
    this.updatePlayerPosition();
  }

  applyGravityAndFriction() {
    this.speedX *= 0.95;
    this.speedY += -1.1;
    if (this.speedY > 37) this.speedY = 37;
    if (this.speedY < -37) this.speedY = -37;
  }

  updatePlayerPosition() {
    const dx = this.targetX - this.stage.playerX;
    const dy = this.targetY - this.stage.playerY;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    
    if (this.distance > 0) {
      const angle = Math.atan2(dy, dx);
      this.stage.setPlayerPosition(
        this.stage.playerX + Math.sin(angle) * 1,
        this.stage.playerY + Math.cos(angle) * 1
      );
    }
  }

  setTargetPosition(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
}
