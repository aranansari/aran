class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
        this.speed = 1;
        this.angle = Math.random() * 2 * Math.PI;
        this.colors = ['#333333', '#444444', '#555555', '#666666', '#777777'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillRect(this.x, this.y, 1, 1);
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        }
    }
}

class HoverParticle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)'; // Color the circle with a semi-transparent color
        this.ctx.fill();
        this.ctx.strokeStyle = '#333333'; // Dark grey border
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

window.onload = function() {
    let particleCanvas = document.getElementById('particleCanvas');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    let hoverCanvas = document.getElementById('hoverCanvas');
    hoverCanvas.width = window.innerWidth;
    hoverCanvas.height = window.innerHeight;

    let particles = [];
    let hoverParticle = null;

    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(particleCanvas));
    }

    hoverCanvas.onmousemove = function(event) {
        if (hoverParticle === null) {
            hoverParticle = new HoverParticle(hoverCanvas, event.clientX, event.clientY);
        } else {
            hoverParticle.x = event.clientX;
            hoverParticle.y = event.clientY;
        }
    };

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        let particleCtx = particleCanvas.getContext('2d');
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        if (hoverParticle !== null) {
            let hoverCtx = hoverCanvas.getContext('2d');
            hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
            hoverParticle.draw();
        }
    }

    animateParticles();
}

window.addEventListener('resize', function(){
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    hoverCanvas.width = window.innerWidth;
    hoverCanvas.height = window.innerHeight;
});
