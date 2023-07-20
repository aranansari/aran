var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

  function getAge(dateString) {
    var now = new Date();
    var dob = new Date(dateString);
    
    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();
    var hours = now.getHours() - dob.getHours();

    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    var ageString = years + " years, " + months + " months, " + days + " days, and " + hours + " hours old.";
    return ageString;
  }

  console.log(getAge('05/04/1997'));

  


  document.addEventListener("DOMContentLoaded", function() {
    var fadeElements = document.querySelectorAll(".fade-in");
    
    fadeElements.forEach(function(element) {
      element.classList.add("show");
    });
  });


  new fullpage('#fullpage', {
    controlArrows: false,
    scrollOverflow:true,
    verticalCentered: true,
    scrollingSpeed: 600,
    autoScrolling: false, 
    scrollHorizontally: true,
    dragAndMove: true,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    anchors: ['home', 'work', 'projects', 'about', 'resume'],
    menu: '.fixed-nav-bar',
    onSlideLeave: function(section, origin, destination, direction){
        let activeLink = document.querySelector('.fixed-nav-bar .active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        let links = document.querySelectorAll('.fixed-nav-bar a');
        let activeIndex = destination.index;
        links[activeIndex].classList.add('active');
    },
    afterRender: function(){
        // getting the anchor link for the current slide
        var activeLink = document.querySelector('.fixed-nav-bar a[href="#' + window.location.hash.split('/')[1] + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
});


document.getElementById('toggle').addEventListener('change', function() {
  document.body.classList.toggle('dark-mode', this.checked);
});


/* 
const decoration = document.querySelector('.decoration');


  document.addEventListener('mousemove', function(e) {
    let x = e.clientX; // Current X coordinate of the mouse pointer
    let y = e.clientY; // Current Y coordinate of the mouse pointer
  
    document.querySelectorAll('.decoration img').forEach(function(image) {
      let rect = image.getBoundingClientRect(); // Get the position of the image relative to the viewport
      let imgX = rect.left + rect.width / 2; // X coordinate of the center of the image
      let imgY = rect.top + rect.height / 2; // Y coordinate of the center of the image
  
      let dx = imgX - x; // Distance from the mouse pointer to the center of the image (X axis)
      let dy = imgY - y; // Distance from the mouse pointer to the center of the image (Y axis)
  
      let depth = image.dataset.depth;
      image.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });

  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene);


 */
/* NEW ATTEMPT AT PARTICLE BACKGROUND */
window.addEventListener('load', function() {
    // Your 'window.onload' code here
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
});

particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
 });
 

 $(document).ready(function(){
    $('.gallery').slick({
        dots: true, // Add navigation dots
        infinite: false, // Enable infinite scrolling
        speed: 300, // Set animation speed (in milliseconds)
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1 // Scroll one slide at a time
    });
});

document.addEventListener("DOMContentLoaded", function() {

  var currentLocation = window.location.href;
  var homeLink = document.getElementById("home-link");
  var links = document.querySelectorAll(".fixed-nav-bar a");

  links.forEach(function(link) {
    if (link.href === currentLocation) {
      link.classList.add("active");
    }
  });

  // If no link is found, default to the "HOME" link
  if (!document.querySelector(".fixed-nav-bar .active")) {
    homeLink.classList.add("active");
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const bubbles = document.querySelectorAll('.bubble');

  bubbles.forEach(bubble => {
    let randomX = Math.random() * (window.innerWidth - bubble.offsetWidth);
    let randomY = Math.random() * (window.innerHeight - bubble.offsetHeight);
    let randomVX = (Math.random() - 0.5) * 2; // Random value between -1 and 1
    let randomVY = (Math.random() - 0.5) * 2; // Random value between -1 and 1

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
        randomVY += (Math.random() - 1);
      }

      bubble.style.left = `${randomX}px`;
      bubble.style.top = `${randomY}px`;

      requestAnimationFrame(animate);
    }

    animate();
  });
});

document.getElementById("age").innerHTML = getAge("05-04-1997");
