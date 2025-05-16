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

    var ageString = years + " years, " + months + " months, " + days + " days, and " + hours + " hours old";
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
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1
  }).on('init', function(event, slick){
      // Show all galleries explicitly when the carousel is initialized
      $('.gallery').css('display', 'block');
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

//accordion stuff

    const aran = document.getElementById("aran");
    const ansari = document.getElementById("ansari");
    const accordion = document.getElementById("accordion");
    const anBlocks = accordion.querySelectorAll(".an-block");

    const blockSpacing = 30; // pixels between each an-block
    const centerY = 0; // relative to center-stack (which is vertically centered)

    let isOpen = false;

    setInterval(() => {
      if (!isOpen) {
        // Move aran and ansari apart
        aran.style.transform = `translateY(-${blockSpacing * 2.5}px)`;
        ansari.style.transform = `translateY(${blockSpacing * 2.5}px)`;

        // Animate an-blocks outward from center
        anBlocks.forEach((block, i) => {
          const offset = (i - 2) * blockSpacing; // index 2 is center
          block.style.opacity = 1;
          block.style.transform = `translateY(${offset}px)`;
        });

      } else {
        // Collapse everything
        aran.style.transform = `translateY(0)`;
        ansari.style.transform = `translateY(0)`;
        anBlocks.forEach(block => {
          block.style.opacity = 0;
          block.style.transform = `translateY(0)`;
        });
      }

      isOpen = !isOpen;
    }, 2000);

//project slide stuff

const tabs = document.querySelectorAll('.project-tab');
const panels = document.querySelectorAll('.detail-panel');

let activePanelId = null;

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.project;
    const targetPanel = document.getElementById(targetId);

    // If clicking the same tab, collapse it
    if (activePanelId === targetId) {
      targetPanel.classList.remove('active');
      tab.querySelector('.toggle-icon').textContent = '+';
      activePanelId = null;
      return;
    }

    // Collapse all panels
    panels.forEach(panel => panel.classList.remove('active'));
    tabs.forEach(t => t.querySelector('.toggle-icon').textContent = '+');

    // Expand the new panel
    targetPanel.classList.add('active');
    tab.querySelector('.toggle-icon').textContent = '–';
    activePanelId = targetId;
  });
});


// i don't know what but seems important
const projectTabs = document.querySelectorAll(".project-tab");
const projectInfo = document.querySelectorAll(".project-info");
const body = document.body;
const toggleSwitch = document.getElementById('toggle');


// Define the colorMap for light mode colors and their corresponding dark mode colors
const colorMap = {
  "EFEEE7": {
    light: "#EFEEE7",
    dark: "#1a1a1a",
  },
  "#CFE4EA": {
    light: "#CFE4EA",
    dark: "#52777D",
  },
  "#DBDBF2": {
    light: "#DBDBF2",
    dark: "#595959",
  },
  "#E4F2FF": {
    light: "#E4F2FF",
    dark: "#42515D",
  },
  "#DEF0DE": {
    light: "#DEF0DE",
    dark: "#385E32",
  },
  "#eee": {
    light: "#eee",
    dark: "#1a1a1a",
  },
  "#FFCCB6": {
    light: "#FFCCB6",
    dark: "#210D45",
  },
  // Add more color mappings as needed
};

projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const projectToShow = tab.getAttribute("data-project");
        const bgColorData = tab.getAttribute("data-bg-color");
        const bgColor = colorMap[bgColorData];

        projectInfo.forEach((info) => {
            info.style.display = "none";
        });

        document.getElementById(projectToShow).style.display = "block";

        // Change the background color of the body based on dark mode state
        body.style.backgroundColor = toggleSwitch.checked ? bgColor.dark : bgColor.light;
    });
});

// Show the first project and set the initial background color
document.getElementById("project-2").style.display = "block";

// Handle initial background color based on dark mode state
body.style.backgroundColor = toggleSwitch.checked ? "#1a1a1a" : "transparent";

toggleSwitch.addEventListener('change', function () {
  // Update the background color when dark mode is toggled
  document.body.classList.toggle('dark-mode', this.checked);
  body.style.backgroundColor = this.checked ? "#1a1a1a" : "transparent";
});
