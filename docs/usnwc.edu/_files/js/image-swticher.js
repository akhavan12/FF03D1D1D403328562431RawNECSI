(function($){
  $(document).ready(function(){
  

          
          
    enquire.register("screen and (max-width:799px)", {

        setup : function() {
        
          $('.checkerboard__image img').each(function(){
            var imageUrl = $(this).attr('src');
            $(this).css('display','none');
            $(this).parents('.checkerboard__image').css('background-image','url(' + imageUrl + ')');
          });
          
        },
        match : function() {
        
          $('.checkerboard__image img').each(function(){
            var imageUrl = $(this).attr('src');
            $(this).css('display','block');
            $(this).parents('.checkerboard__image').css('background-image','url(' + imageUrl + ')');
          });
          
        },
        unmatch : function() {
        
          $('.checkerboard__image img').each(function(){
            var imageUrl = $(this).attr('src');
            $(this).css('display','none');
            $(this).parents('.checkerboard__image').css('background-image','url(' + imageUrl + ')');
          });

        }      
          
    });
        
        
        
        
  });  
})(jQuery);  
