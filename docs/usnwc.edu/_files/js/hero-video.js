// --------------------------------------------------
// hero-video.js
// --------------------------------------------------
(function($){

  $(document).ready(function(){            
          
  //set the css3 blur to an element
/*
  function scaleElement(element, size) {
     var filterVal = 'scale(' + size + ')';
     $(element)
         .css('transform', filterVal)
         .css('webkitTransform', filterVal)
         .css('mozTransform', filterVal)
         .css('oTransform', filterVal)
         .css('msTransform', filterVal)
         .css('transition', 'all .7s ease-out')
         .css('-webkit-transition', 'all .7s ease-out')
         .css('-moz-transition', 'all .7s ease-out')
         .css('-o-transition', 'all .7s ease-out');
  
  }          
*/

    // Let's not run any extraneious code if there isn't a video present.    
    if ($(".video-container").length) {





/*
    console.log("Downloading video...hellip;Please wait...")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.quirksmode.org/html5/videos/big_buck_bunny.webm', true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        console.log("got it");
        var myBlob = this.response;
        var vid = (window.webkitURL ? webkitURL : URL).createObjectURL(myBlob);
        // myBlob is now the blob that the object URL pointed to.
        var video = document.getElementById("video");
        console.log("Loading video into element");
        video.src = vid;
        // not needed if autoplay is set for the video element
        // video.play()
       }
      }
    
    xhr.send();
*/


    $content_block_1_height = $("#scroll-to-play-content-block--1").outerHeight();
    $video_timeline_1_height = $("#scroll-to-play-timeline--1").attr("data-height") + "px";    
    $setHeight = parseInt($content_block_1_height) + parseInt($video_timeline_1_height);


    
    function updateVideo() {
        var $video = $('video').get(0);
        var $videoLength = $video.duration;
        var $scrollPosition = $(document).scrollTop();
        $video.currentTime = ($scrollPosition / ($(document).height() - $(window).height())) * $videoLength;
    }
    
    $(window).scroll(function () {
        updateVideo();
      // Featured Fly In Content Blocks
      var $total_window_distance_scrolled = $(this).scrollTop();
//         console.log($total_window_distance_scrolled);

        // First Info Box
        if($total_window_distance_scrolled >= 5500 && $total_window_distance_scrolled <= 12000) {
          $(".scroll-to-play__info-box-1").addClass("active");
//             scaleElement(".scroll-to-play__info-box-1", 1.1);
        } else {
          $(".scroll-to-play__info-box-1").removeClass("active");
//             scaleElement(".scroll-to-play__info-box-1", 1);
        }

        // Second Info Box
        if($total_window_distance_scrolled >= 15300 && $total_window_distance_scrolled <= 28300) {
          $(".scroll-to-play__info-box-2").addClass("active");
        } else {
          $(".scroll-to-play__info-box-2").removeClass("active");
        }

        // Third Info Box
        if($total_window_distance_scrolled >= 30300 && $total_window_distance_scrolled <= 50300) {
          $(".scroll-to-play__info-box-3").addClass("active");
        } else {
          $(".scroll-to-play__info-box-3").removeClass("active");
        }

        // Fourth Info Box
        if($total_window_distance_scrolled >= 58000 && $total_window_distance_scrolled <= 70000) {
          $(".scroll-to-play__info-box-4").addClass("active");
        } else {
          $(".scroll-to-play__info-box-4").removeClass("active");
        }

        
    });
    
      /*
      -------------------------------------------
      -------------------------------------------
      -------------------------------------------
      BASIC HERO VIDEO COMMENTED OUT FOR NOW
      -------------------------------------------
      -------------------------------------------
      -------------------------------------------
      */
      // Establish parallax for both the video
      // and messaging components to create some depth.
/*
       var parallaxScrollVideo = function(){
            var scrolled = $(window).scrollTop(),
            	divOffset = $('.video-feature').scrollTop();
                            
              $('.video-feature video, .video-feature--mobile-img').css('top',(-1-(scrolled*.035))+'px');
        }
    
        //Video has a position fixed attribute. Lets hide it when its not in the viewport
        
        //On Load
        if (!$(".video-container").is(":in-viewport")) {
          $("#hero-video").hide();
        } else {
          $("#hero-video").show();
        }
        
        
        //On Scroll
        $(window).scroll(function(){
          if (!$(".video-container").is(":in-viewport")) {
            $("#hero-video").hide();
          } else {
            $("#hero-video").show();
          }          
        });
*/

            
      /*
        -----------------------
        Responsive Attributes
        -----------------------
      */
      
      enquire
        // Desktop
        // Mobile & Tablet
        .register("screen and (min-width: 641px)", function() {
          
          //NON BACKGROUND IMAGE BASED PARALLAX ENABLED
          if($(".video-feature").length) {
            $("video").attr("autoplay");        
//             $(window).bind("scroll", parallaxScrollVideo);
          }      
        })
    
        .register("screen and (max-width: 641px)", function() {
          
          //NON BACKGROUND IMAGE BASED PARALLAX DISABLED
          if($(".video-feature").length) {
            $("video").removeAttr("autoplay"); // avoid loading on mobile for bandwidth purposes.
//             $(window).bind("scroll", parallaxScrollVideo);        
          }      
        })
    }
    
  }); // END DOC READY
})(jQuery);