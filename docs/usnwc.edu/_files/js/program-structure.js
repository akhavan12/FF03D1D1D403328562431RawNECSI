(function($){
  $(document).ready(function() {
    $('.program__structure').append('  <div class="program__structure__button-strip program__structure__load-more"><button type="button" class="btn btn--yellow">Load more</a></div>');

    $('.program__structure__load-more .btn').click(function(){
      $(this).parents('.program__structure').addClass('open');
      $(this).toggle();
    });

    $('.program__structure__fewer .btn').click(function(){
      $(this).parents('.program__structure').removeClass('open');
      $(this).parents('.program__structure').delay(500).find('.program__structure__load-more .btn').toggle();
      $('html, body').animate({
        scrollTop: $("#program__structure__top").offset().top
      }, 500);
    });
  });
})(jQuery);
