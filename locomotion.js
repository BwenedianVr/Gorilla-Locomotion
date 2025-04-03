const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set up canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const images = {
    player: new Image(),
    hand: new Image(),
    base: new Image()
};
images.player.src = "assets/player_hitbox.png"; 
images.hand.src = "assets/hand_hitbox.png"; 
images.base.src = "assets/base.png"; 

// Game variables (matching Scratch logic)
let CAMERA_X = 0;
let CAMERA_Y = 0;
let PLAYER_X = 0;
let PLAYER_Y = 0;
let HAND_X = 0;
let HAND_Y = 0;
let SPEED_X = 0;
let SPEED_Y = 0;
let TARGET_X = 0;
let TARGET_Y = 0;
let DIRECTION = 0;
let DISTANCE = 0;
let INDEX_X = 0;
let INDEX_Y = 0;
let IsCollision = 0;
let maxReach = 41 * 2;
let scrollSpeed = 1;
let gravity = -1.1;
let friction = 0.95;

// Mouse movement for hand
let mouseX = 0, mouseY = 0;
canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Collision function (to be implemented)
function checkCollision(objA, objB) {
    return false; // Placeholder, needs pixel-perfect collision like in Scratch
}

// Movement functions
function getDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
}

function moveHand(bounce) {
    let dx = INDEX_X - HAND_X;
    let dy = INDEX_Y - HAND_Y;
    DISTANCE = getDistance(dx, dy);
    for (let i = 0; i < DISTANCE; i++) {
        HAND_X += Math.sin(DIRECTION);
        HAND_Y += Math.cos(DIRECTION);
        if (checkCollision(HAND_X, HAND_Y)) {
            HAND_X -= Math.sin(DIRECTION);
            TARGET_X -= Math.sin(DIRECTION);
            SPEED_X = (0 - bounce) * Math.sin(DIRECTION);
        }
        if (checkCollision(HAND_X, HAND_Y)) {
            HAND_Y -= Math.cos(DIRECTION);
            TARGET_Y -= Math.cos(DIRECTION);
            SPEED_Y = (0 - bounce) * Math.cos(DIRECTION);
        }
    }
}

function movePlayer(friction) {
    let dx = TARGET_X - PLAYER_X;
    let dy = TARGET_Y - PLAYER_Y;
    DISTANCE = getDistance(dx, dy);
    for (let i = 0; i < DISTANCE; i++) {
        PLAYER_X += Math.sin(DIRECTION);
        if (checkCollision(PLAYER_X, PLAYER_Y)) {
            PLAYER_X -= Math.sin(DIRECTION);
            SPEED_X *= friction;
        }
        PLAYER_Y += Math.cos(DIRECTION);
        if (checkCollision(PLAYER_X, PLAYER_Y)) {
            PLAYER_Y -= Math.cos(DIRECTION);
            SPEED_X *= friction;
            SPEED_Y = 0;
        }
    }
}

// Update function
function update() {
    SPEED_X *= friction;
    SPEED_Y += gravity;
    SPEED_Y = Math.max(Math.min(SPEED_Y, 37), -37);
    
    TARGET_X += SPEED_X;
    TARGET_Y += SPEED_Y;
    
    movePlayer(0.6);
    
    TARGET_X = PLAYER_X;
    TARGET_Y = PLAYER_Y;
    
    INDEX_X = mouseX + PLAYER_X;
    INDEX_Y = mouseY + PLAYER_Y;
    
    DISTANCE = getDistance(PLAYER_X - INDEX_X, PLAYER_Y - INDEX_Y);
    
    if (maxReach < DISTANCE) {
        INDEX_X += (DISTANCE - maxReach) * Math.sin(DIRECTION);
        INDEX_Y += (DISTANCE - maxReach) * Math.cos(DIRECTION);
    }
    
    moveHand(0.4);
    movePlayer(0.6);
    
    CAMERA_X += (PLAYER_X - CAMERA_X) / scrollSpeed;
    CAMERA_Y += (PLAYER_Y - CAMERA_Y) / scrollSpeed;
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the map
    ctx.drawImage(images.base, -CAMERA_X, -100 - CAMERA_Y);
    
    // Draw the player
    ctx.drawImage(images.player, PLAYER_X - CAMERA_X, PLAYER_Y - CAMERA_Y);
    
    // Draw the hand
    ctx.drawImage(images.hand, HAND_X - CAMERA_X, HAND_Y - CAMERA_Y);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
