/*
  -----------------------
  Responsive Tables
  -----------------------
*/

(function($){
  $(document).ready(function(){

    // Reset the table width to 
    // To be more responsive friendly
    if($("table").not('.program--table').length) {
      $("table").each(function(){
        var $tableWidth = $(this).css("width");
        
        if(!$(this).hasClass("tablesaw")) {
          $(this).addClass('tablesaw tablesaw-stack js-processed').attr('data-tablesaw-mode', 'stack');
        }
        
        $(this).css({
          'width' : '100%',
          'max-width' : $tableWidth
        });
      }); 
    }
  });
})(jQuery);