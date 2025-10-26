(function($) {
  $(document).ready(function() {

    $('.student-type--display--slick').slick({
      infinite: false,
      slidesToShow: 3,
      variableWidth: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1140,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
      ]
    });

/*
    $('.section--programs__cards__slick').slick({
      infinite: false,
      slidesToShow: 4,
      variableWidth: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false,
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false,
          }
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
      ]
    });
*/

    $('.featured-alum__slider__slide').parent('div').slick({
      arrows: true,
      autoplay: false,
      infinite: true,
      slidesToShow: 1,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            variableWidth: true,
          }
        }
      ]
    });
    

    $('.publication__slider__slide').parent('div').slick({
      arrows: true,
      autoplay: false,
      infinite: true,
      slidesToShow: 1,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
      ]
    });
    

    
    
    if($(".section--faculty-slider__large").length) {

      enquire.register("screen and (max-width:641px)", {
    
          setup : function() {
            $(".section--faculty-slider").attr("aria-hidden", "false");
            $(".section--faculty-slider__large__slide").parent('div').slick({
              arrows: true,
              autoplay: false,
              infinite: true,
              slidesToShow: 1,
              variableWidth: false,
              dots: false
            });            
          },
          match : function() {
            $(".section--faculty-slider__large__slide").parent('div').slick('unslick');
            $(".section--faculty-slider").attr("aria-hidden", "true");
          },
          unmatch : function() {
            $(".section--faculty-slider").attr("aria-hidden", "false");
            $(".section--faculty-slider__large__slide").parent('div').slick({
              arrows: true,
              autoplay: false,
              infinite: true,
              slidesToShow: 1,
              variableWidth: false,
              dots: false
            });
          }
        });
      }
      
      if($(".section--colleges-academics-slider__slider").length) {
        $(".section--colleges-academics-slider__slider").slick({
          arrows: true,
          autoplay: false,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: false,
          dots: false,
          responsive: [
            {
              breakpoint: 850,
              settings: {
                slidesToShow: 2,
                variableWidth: true,
                arrows: false,
              }
            },
            {
              breakpoint: 641,
              settings: {
                slidesToShow: 1,
                variableWidth: true,
                arrows: false,
              }
            }
          ]
    
        });
      }

    $('.section--additional-student-items__slider').on('init', function(event, slick){
      $('.section--additional-student-items__slider').oho_equalize('.slick-slide');
      $('.section--additional-student-items__slider').oho_equalize('.section--additional-student-items__slider__slide');
    });

      
      if($('.section--additional-student-items__slider').length) {
        $('.section--additional-student-items__slider').slick({
          arrows: true,
          autoplay: false,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: false,
          dots: false,
          responsive: [
            {
              breakpoint: 850,
              settings: {
                slidesToShow: 2,
                variableWidth: true,
                arrows: false,
              }
            },
            {
              breakpoint: 641,
              settings: {
                slidesToShow: 1,
                variableWidth: true,
                arrows: false,
              }
            }
          ]          
        });
      }
         
  

  

  });
})(jQuery);
