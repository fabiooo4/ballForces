class Ball {
  constructor(pos, size) {
    this.pos = pos;
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.size = size;
  }

  draw() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  update() {
    // Increment velocity based on acceleration
    this.vel.add(this.acc);
    // Increment position based on velocity
    this.pos.add(this.vel);

    // Limit velocity
    // this.vel.limit(10);

    this.acc = this.acc.mult(0);
  }

  applyForce(force) {
    this.acc = force;
  }

  bounce() {
    // Check lateral borders
    if (this.pos.x > width - this.size || this.pos.x < 0 + this.size) {
      this.vel.x *= -1;
    }

    // Check vertical borders
    if (this.pos.y > height - this.size || this.pos.y < 0 + this.size) {
      this.vel.y *= -1;
    }
  }
} 

let balls = [];

function setup() {
  createCanvas(500, 500);

  let pos = createVector(width/2, height/2);

  // Create 1 ball and push it into the array
  let ball = new Ball(pos, 25);
  balls.push(ball);  
}

function draw() {
  background(0, 10);

  let gravity = createVector(0, 0.5);
  let wind = createVector(0.3, 0);

  // Draw ball and apply movement
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.bounce();

    // Apply forces
    ball.applyForce(gravity);

    if (mouseIsPressed) {
      ball.applyForce(wind);
    }
  }
  
}