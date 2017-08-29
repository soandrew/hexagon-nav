$(document).ready(function() {
  // Detect touch devices
  var isTouchDevice = 'ontouchstart' in window;  // Whether or not touch is supported

  // Handle window resizes
  var n;       // Number of columns
  var width;   // Window width
  var height;  // Window height
  function handleResize() {
    // Determine number of columns
    var gridWidth = $('.hexagon-nav').css('width');
    if (gridWidth === '720px') {
      n = 5;
    } else if (gridWidth === '585px') {
      n = 4;
    } else if (gridWidth === '450px') {
      n = 3;
    } else if (gridWidth === '315px') {
      n = 2;
    } else {
      n = 1;
    }
    // Get window dimensions
    width = window.innerWidth;
    height = window.innerHeight;

    // Reset transitions
    $('.hexagon-nav .nav li').stop().removeClass('grow up right down left');
    $('.hexagon-nav').css('transform', '');
  }
  handleResize();
  $(window).resize(handleResize);

  // Handle hexagon scaling and translations
  $('.hexagon-nav .nav li').hover(
      function() {
        var i = $(this).index() + 1;  // nth child index
        var c = i % n;  // Which column this hexagon is in
        // Scale this hexagon
        $(this).stop().toggleClass('grow');
        // Move hexagons before up, and hexagons after down
        $('.hexagon-nav .nav li:nth-child(-n+' + (i - 1) + ')').stop().toggleClass('up');
        $('.hexagon-nav .nav li:nth-child(n+' + (i + 1) + ')').stop().toggleClass('down');
        if (n === 2) {
          if (c === 1) {
            // Move second column right
            $('.hexagon-nav .nav li:nth-child(2n)').stop().toggleClass('right');
          } else {
            // Move first column left
            $('.hexagon-nav .nav li:nth-child(2n+1)').stop().toggleClass('left');
          }
        } else if (n === 3) {
          if (c === 1) {
            // Move second and third column right
            $('.hexagon-nav .nav li:not(:nth-child(3n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and third column left
            $('.hexagon-nav .nav li:not(:nth-child(3n+2))').stop().toggleClass('left');
          } else {
            // Move first column left, and second column right
            $('.hexagon-nav .nav li:nth-child(3n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(3n+2)').stop().toggleClass('right');
          }
        } else if (n === 4) {
          if (c === 1) {
            // Move second, third, and fourth column right
            $('.hexagon-nav .nav li:not(:nth-child(4n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and third column left, and fourth column right
            $('.hexagon-nav .nav li:nth-child(4n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(4n+3)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(4n)').stop().toggleClass('right');
          } else if (c === 3) {
            // Move first column left, second and fourth column right
            $('.hexagon-nav .nav li:nth-child(4n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(2n)').stop().toggleClass('right');
          } else {
            // Move first, second, and third column left
            $('.hexagon-nav .nav li:not(:nth-child(4n))').stop().toggleClass('left');
          }
        } else if (n === 5) {
          if (c === 1) {
            // Move second, third, fourth, and fifth column right
            $('.hexagon-nav .nav li:not(:nth-child(5n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and fourth column left, and third and fifth column right
            $('.hexagon-nav .nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav .nav li:nth-child(5n+4)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(5n)').stop().toggleClass('right');
          } else if (c === 3) {
            // Move first, second, fourth, and fifth column left
            $('.hexagon-nav .nav li:not(:nth-child(5n+3))').stop().toggleClass('left');
          } else if (c === 4) {
            // Move first column left, and second and third and fifth column right
            $('.hexagon-nav .nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(5n+2)').stop().toggleClass('right');
            $('.hexagon-nav .nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav .nav li:nth-child(5n)').stop().toggleClass('right');
          } else {
            // Move first and second and fourth column left, and third column right
            $('.hexagon-nav .nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(5n+2)').stop().toggleClass('left');
            $('.hexagon-nav .nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav .nav li:nth-child(5n+4)').stop().toggleClass('left');
          }
        }
      }
  );

  // Handle hexagon grid tilt for non-touch devices
  if (!isTouchDevice) {
    $(document).mousemove(function(e) {
      var x = (e.pageY / height) * 30 - 15;
      var y = -((e.pageX / width) * 60 - 30);
      $('.hexagon-nav').css(
          'transform',
          'perspective(1200px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
      );
    });
  }
});
