$(document).ready(function() {
  // Add hexagons
  $('.hexagon-nav li').append(
      '<svg xmlns="http://www.w3.org/2000/svg" verion="1.1" viewBox="0 0 60 52">' +
        '<polygon points="15,0 45,0 60,26 45,52 15,52 0,26"/>' +
      '</svg>'
  );

  // Handle window resizes
  var n;       // Number of columns
  var width;   // Window width
  var height;  // Window height
  var isTouchDevice;  // Whether or not touch is supported
  function handleResize() {
    // Determine number of columns
    var containerWidth = $('.container').css('width');
    if (containerWidth === '720px') {
      n = 5;
    } else if (containerWidth === '585px') {
      n = 4;
    } else if (containerWidth === '450px') {
      n = 3;
    } else if (containerWidth === '315px') {
      n = 2;
    } else {
      n = 1;
    }
    // Get window properties
    width = window.innerWidth;
    height = window.innerHeight;
    isTouchDevice = 'ontouchstart' in window;
    // Reset transitions
    $('.hexagon-nav li').stop().removeClass('grow up right down left');
    $('.hexagon-nav').css('transform', '');
  }
  handleResize();
  $(window).resize(handleResize);

  // Handle hexagon hovers
  $('.hexagon-nav li').hover(
      function() {
        var i = $(this).index() + 1;  // nth child index
        var c = i % n;  // Which column this hexagon is in
        // Scale this hexagon
        $(this).stop().toggleClass('grow');
        // Move hexagons before up, and hexagons after down
        $('.hexagon-nav li:nth-child(-n+' + (i - 1) + ')').stop().toggleClass('up');
        $('.hexagon-nav li:nth-child(n+' + (i + 1) + ')').stop().toggleClass('down');
        if (n === 2) {
          if (c === 1) {
            // Move second column right
            $('.hexagon-nav li:nth-child(2n)').stop().toggleClass('right');
          } else {
            // Move first column left
            $('.hexagon-nav li:nth-child(2n+1)').stop().toggleClass('left');
          }
        } else if (n === 3) {
          if (c === 1) {
            // Move second and third column right
            $('.hexagon-nav li:not(:nth-child(3n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and third column left
            $('.hexagon-nav li:not(:nth-child(3n+2))').stop().toggleClass('left');
          } else {
            // Move first column left, and second column right
            $('.hexagon-nav li:nth-child(3n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(3n+2)').stop().toggleClass('right');
          }
        } else if (n === 4) {
          if (c === 1) {
            // Move second, third, and fourth column right
            $('.hexagon-nav li:not(:nth-child(4n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and third column left, and fourth column right
            $('.hexagon-nav li:nth-child(4n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(4n+3)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(4n)').stop().toggleClass('right');
          } else if (c === 3) {
            // Move first column left, second and fourth column right
            $('.hexagon-nav li:nth-child(4n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(2n)').stop().toggleClass('right');
          } else {
            // Move first, second, and third column left
            $('.hexagon-nav li:not(:nth-child(4n))').stop().toggleClass('left');
          }
        } else if (n === 5) {
          if (c === 1) {
            // Move second, third, fourth, and fifth column right
            $('.hexagon-nav li:not(:nth-child(5n+1))').stop().toggleClass('right');
          } else if (c === 2) {
            // Move first and fourth column left, and third and fifth column right
            $('.hexagon-nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav li:nth-child(5n+4)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(5n)').stop().toggleClass('right');
          } else if (c === 3) {
            // Move first, second, fourth, and fifth column left
            $('.hexagon-nav li:not(:nth-child(5n+3))').stop().toggleClass('left');
          } else if (c === 4) {
            // Move first column left, and second and third and fifth column right
            $('.hexagon-nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(5n+2)').stop().toggleClass('right');
            $('.hexagon-nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav li:nth-child(5n)').stop().toggleClass('right');
          } else {
            // Move first and second and fourth column left, and third column right
            $('.hexagon-nav li:nth-child(5n+1)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(5n+2)').stop().toggleClass('left');
            $('.hexagon-nav li:nth-child(5n+3)').stop().toggleClass('right');
            $('.hexagon-nav li:nth-child(5n+4)').stop().toggleClass('left');
          }
        }
      }
  );

  // Handle hexagon grid tilt
  $(document).mousemove(function(e) {
    if (!isTouchDevice) {  // Only enable for non-touch devices
      var x = (e.pageY / height) * 30 - 15;
      var y = -((e.pageX / width) * 60 - 30);
      $('.hexagon-nav').css(
          'transform',
          'perspective(1200px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
      );
    }
  });
});
