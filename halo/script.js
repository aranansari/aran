var images = [
    '../images/halo_bgs/guardian.jpeg',
    '../images/halo_bgs/high ground.jpeg',
    '../images/halo_bgs/longshore.jpeg',
    '../images/halo_bgs/standoff.jpeg',
    '../images/halo_bgs/the last resort.jpeg',
    '../images/halo_bgs/the pit.jpeg'
];

document.addEventListener('DOMContentLoaded', function() {
    var body = document.getElementById('background');
    var randomImage = images[Math.floor(Math.random() * images.length)];

    var img = new Image();
    img.onload = function() {
        body.style.backgroundImage = 'url(' + img.src + ')';
    };
    img.src = randomImage;
});
