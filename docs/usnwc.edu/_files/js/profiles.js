(function($){
  $(document).ready(function() {
    
    $('.profile__pro-highlights').append('  <div class="profile__pro-highlights__button-strip profile__pro-highlights__load-more"><button type="button" class="btn btn--yellow">Expand Timeline</a></div>');

    
    $('.profile__pro-highlights__load-more .btn').click(function(){
      $(this).parents('.profile__pro-highlights').addClass('open');
      $(this).toggle();
    });    
    $('.profile__pro-highlights__fewer .btn').click(function(){
      $(this).parents('.profile__pro-highlights').removeClass('open');
      $(this).parents('.profile__pro-highlights').delay(500).find('.profile__pro-highlights__load-more .btn').toggle();
      $('html, body').animate({
        scrollTop: $("#profile__pro-highlights__top").offset().top
      }, 500);
    });    
    
  });
})(jQuery);