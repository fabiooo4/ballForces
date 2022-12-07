let balls = [];

function setup() {
  createCanvas(500, 500);

  // Create i balls and push them into the array
  for (let i = 0; i < 3; i++) {
    let ball = new Ball(random(0, width), random(0, height/2), random(1,3));
    balls.push(ball); 
  }
}

function draw() {
  background(0);

  // Draw ball and apply movement
  for (const ball of balls) {
    // Define forces
    let gravity = createVector(0, 0.6 * ball.mass);
    let wind = createVector(0.3, 0);

    // Apply forces
    ball.applyForce(gravity);

    if (mouseIsPressed) {
      ball.applyForce(wind);
    }

    ball.draw();
    ball.update();
    ball.bounce();
  }
  
}


class Ball {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = mass;
  }

  draw() {
    fill(255, 40);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.mass*20);
  }

  update() {
    // Increment velocity based on acceleration
    this.vel.add(this.acc);
    // Increment position based on velocity
    this.pos.add(this.vel);

    // Reset acceleration for the next frame
    this.acc = this.acc.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acc.add(f);
  }

  bounce() {
    // Check lateral borders
    if (this.pos.x > width - this.mass*10) {
      this.vel.x *= -0.9;
      this.pos.x = width - this.mass*10;
    } else if (this.pos.x < 0 + this.mass*10) {
      this.vel.x *= -0.9;
      this.pos.x = 0 + this.mass*10;
    }

    // Check vertical borders
    if (this.pos.y > height - this.mass*10) {
      this.vel.y *= -0.9;
      this.pos.y = height - this.mass*10;
    } else if (this.pos.y < 0 + this.mass*10) {
      this.vel.y *= -0.9;
      this.pos.y = 0 + this.mass*10;
    }
  }
} 