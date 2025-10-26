(function($){
  
  
  $(function() {
    
    // The offset slider elements
    var $three = $('.offset-slider--three'),
        $unlimited = $('.offset-slider--unlimited');
    
    // Initialize the sliders on page load
    $three.threeOffsetSlider();
    $unlimited.unlimiteOffsetSlider();
    
    // Initialize three offset slider on window resize if it's not already inilitalized
    $(window).resize(function() {
      
      if( !$three.hasClass('slick-initialized') && $(window).width() < 1024 ) {
        $three.threeOffsetSlider();
      }
      
    });
    
  });
  
  
  // The three offset calling function
  $.fn.threeOffsetSlider = function() {
    
    this.slick({
      arrows: false,
      centerMode: true,
      centerPadding: 'auto',
      dots: false,
      infinite: false,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerMode: false,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1024,
          settings: 'unslick'
        }
      ]
    });
    
  };
  
  
  // The unlimited offset calling function
  $.fn.unlimiteOffsetSlider = function() {
    
    this.slick({
      arrows: false,
      centerMode: true,
      centerPadding: 'auto',
      dots: false,
      infinite: false,
      mobileFirst: true,
      slidesToScroll: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerMode: false,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1024,
          settings: {
            centerMode: false,
            slidesToShow: 3
          }
        }
      ]
    });
  };
  
  
})(jQuery)