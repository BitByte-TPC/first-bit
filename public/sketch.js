const speed = 64;
const size = 2;
const n = 100;
const dots = [];

console.log("loaded");

function setup() {
  colorMode(HSB);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch');
  canvas.style('z-index', -1);
  canvas.position(0,0);
  canvas.style('position','fixed');
  for (let i = 0; i < n; i++) {
    const dot = new Dot(size, speed);
    dots.push(dot);
  }
}

function draw() {
  background(229, 76, 23);
  for (i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.update();
    dot.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Dot {
  constructor(_size, _speed) {
    this.position = createVector(random(width), random(height));
    this.size = _size || 2;
    this.color = color(random(210, 240), random(70, 80), random(30,35));
    this.target = createVector();
    this.speed = _speed || 92;
    this.currentRatio = 0;
    this.isMoving = false;
    this.relayPointRatio = 0;
    this.relayPoint = this.position.copy();
    this.startPointRatio = 0;
    this.startPoint = this.position.copy();
    this.endPointRatio = 0;
    this.endPoint = this.position.copy();
  }

  setTarget(x, y) {
    if (this.isMoving) {
      this.position.set(this.endPoint.x, this.endPoint.y);
    }

    this.target.set(x, y);
    this.currentRatio = 0;
    this.isMoving = true;
    let dx = x - this.endPoint.x;
    let dy = y - this.endPoint.y;

    if (random() < 0.5) {
      this.relayPointRatio = abs(dx) / (abs(dx) + abs(dy));
      this.relayPoint.set(this.position.x + dx, this.position.y);
    } else {
      this.relayPointRatio = abs(dy) / (abs(dx) + abs(dy));
      this.relayPoint.set(this.position.x, this.position.y + dy);
    }
  }

  findTarget(){

    if(random() > 0.1){
      return;
    }

    let a, dist, x, y;
    dist = random()* 0.25 * width;
    a = random()*TWO_PI;

    x = mouseX + dist * cos(a);
    y = mouseY + dist * sin(a);

    this.setTarget(x,y);
  }

  update() {
    if (!this.isMoving) {
      this.findTarget();
      return;
    }

    this.currentRatio++;
    this.updateStartPointRatio();
    this.updateEndPointRatio();

    this.updateStartPoint();
    this.updateEndPoint();

    if (this.currentRatio >= this.speed) {
      this.position.set(this.target.x, this.target.y);
      this.isMoving = false;
    }
  }

  display() {
    if (!this.isMoving) {
      noStroke();
      fill(this.color);
      circle(this.position.x, this.position.y, this.size);
      return;
    }

    strokeWeight(this.size);
    stroke(this.color);
    noFill();

    beginShape();
    vertex(this.startPoint.x, this.startPoint.y);
    if (this.startPointRatio < this.relayPointRatio && this.relayPointRatio < this.endPointRatio) {
      vertex(this.relayPoint.x, this.relayPoint.y);
    }
    vertex(this.endPoint.x, this.endPoint.y);
    endShape();
  }

  updateStartPoint() {
    let ratio, startX, startY;

    if (this.startPointRatio < this.relayPointRatio) {
      ratio = this.startPointRatio / this.relayPointRatio;
      startX = this.position.x + ratio * (this.relayPoint.x - this.position.x);
      startY = this.position.y + ratio * (this.relayPoint.y - this.position.y);
    } else {
      ratio = (this.startPointRatio - this.relayPointRatio) / (1 - this.relayPointRatio);
      startX = this.relayPoint.x + ratio * (this.target.x - this.relayPoint.x);
      startY = this.relayPoint.y + ratio * (this.target.y - this.relayPoint.y);
    }

    this.startPoint.set(startX, startY);
  }

  updateEndPoint() {

    let endX, endY, ratio;
    if (this.endPointRatio < this.relayPointRatio) {
      ratio = this.endPointRatio / this.relayPointRatio;
      endX = this.position.x + ratio * (this.relayPoint.x - this.position.x);
      endY = this.position.y + ratio * (this.relayPoint.y - this.position.y);

    } else {
      ratio = (this.endPointRatio - this.relayPointRatio) / (1 - this.relayPointRatio);
      endX = this.relayPoint.x + ratio * (this.target.x - this.relayPoint.x);
      endY = this.relayPoint.y + ratio * (this.target.y - this.relayPoint.y);
    }

    this.endPoint.set(endX, endY);
  }

  getMoveProgressRatio() {
    return min(1, this.currentRatio / this.speed);
  }

  updateStartPointRatio() {
    this.startPointRatio = -(Math.pow(this.getMoveProgressRatio() - 1, 2)) + 1;
  }

  updateEndPointRatio() {
    this.endPointRatio = -(Math.pow(this.getMoveProgressRatio() - 1, 4)) + 1;
  }

  getDistance(x, y) {
    return dist(x, y, this.position.x, this.position.y);
  }
}
