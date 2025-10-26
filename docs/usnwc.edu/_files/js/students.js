(function($){
  $(document).ready(function(){
    
  $('.student-type__contact-info button').click(function(){
    $(this).toggleClass('engaged');
    $(this).next('.student-type__contact-info__text').slideToggle();
  });  
  

  });
})(jQuery);