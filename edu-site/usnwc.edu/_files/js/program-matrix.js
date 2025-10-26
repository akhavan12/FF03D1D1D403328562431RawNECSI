(function($){
  $(document).ready(function(){
    
    
    $(function(){
      $('.program--table').footable();
    });
    
    $('#dnn_ProgramMatrixSearch select').on('change', function() {
    	$(this).parents('#dnn_ProgramMatrixSearch').siblings('table.program--table').find('.footable-detail-row').remove();
      $(this).parents('#dnn_ProgramMatrixSearch').siblings('table.program--table').find('.fooicon').removeClass('fooicon-minus').addClass('fooicon-plus');
    });
    
    $('.program--table__filters').append('<span class="program--table__filters__view-more">View More Filters <i class="fa fa-plus-circle" aria-hidden="true"></i></span>');
    
    $('.program--table__filters__view-more').click(function(){
      $(this).parents('.program--table__filters').addClass('open');
      $(this).hide();
    });
  
 }); // for jQuery 
})(jQuery);  