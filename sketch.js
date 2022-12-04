class Ball {
  constructor(pos, vel, acc, size) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.size = size;
  }

  draw() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  update() {
    // Move towards mouse
    let mouse = createVector(mouseX, mouseY);
    mouse = mouse.sub(this.pos);
    mouse = mouse.setMag(0.5)
    
    this.acc = mouse

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.vel.limit(10);
  }

  bounce() {
    if (this.pos.x > width - this.size || this.pos.x < 0 + this.size) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height - this.size || this.pos.y < 0 + this.size) {
      this.vel.y *= -1;
    }
  }
} 

let balls = [];

function setup() {
  createCanvas(500, 500);

  let pos = createVector(width/2, height/2);
  let vel = createVector(0, 6);
  let acc = createVector(0, 0.1);

  // Create 1 ball and push it into the array
  let ball = new Ball(pos, vel, acc, 25);
  balls.push(ball);

  
}

function draw() {
  background(0, 50);

  // Draw ball and apply movement
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.bounce();
  }
  
}