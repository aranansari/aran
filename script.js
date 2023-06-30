document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.bubble');
  
    bubbles.forEach(bubble => {
      let randomX = Math.random() * (window.innerWidth - bubble.offsetWidth);
      let randomY = Math.random() * (window.innerHeight - bubble.offsetHeight);
      let randomVX = (Math.random() - 0.5) * 4; // Random value between -2 and 2
      let randomVY = (Math.random() - 0.5) * 4; // Random value between -2 and 2
  
      bubble.style.left = `${randomX}px`;
      bubble.style.top = `${randomY}px`;
  
      // Animation loop
      function animate() {
        randomX += randomVX;
        randomY += randomVY;
  
        // Check for collision with right or left boundary and reverse direction
        if (randomX <= 0 || randomX >= window.innerWidth - bubble.offsetWidth) {
          randomVX *= -1;
          // Add a small randomness to the velocity
          randomVX += (Math.random() - 0.5);
        }
  
        // Check for collision with bottom or top boundary and reverse direction
        if (randomY <= 0 || randomY >= window.innerHeight - bubble.offsetHeight) {
          randomVY *= -1;
          // Add a small randomness to the velocity
          randomVY += (Math.random() - 0.5);
        }
  
        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;
  
        requestAnimationFrame(animate);
      }
  
      animate();
    });
  });
  