const canvas = document.getElementById("sparkle");
const ctx = canvas.getContext("2d");

let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
  }
  draw() {
    ctx.fillStyle = `rgba(200,180,120,${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousemove", e => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
