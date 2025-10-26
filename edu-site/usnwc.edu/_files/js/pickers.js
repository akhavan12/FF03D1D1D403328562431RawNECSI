// picker navigation
// adding event.preventDefault(); breaks it

(function($){
 
  $(document).ready(function(){
        
    //
    // Tab behavior
    //
    
    $('.tabs button').click(function() {
      
      // Clicked element
      var $this = $(this);
      
      // Current picker
      var $picker = $this.parents('.tabs');
            
      // Index number, add one for zero index
      var tabNumber = $this.parent().index() + 1;
      
      // Current active tab
      var $current = $picker.find('[aria-hidden="false"]');
      
      // Tab to be activated
      var $toActivate = $picker.find('.tabs__tab:nth-of-type(' + tabNumber + ')');
      
      // Remove the active aria states
      $picker.find('[aria-selected="true"]').attr('aria-selected', 'false');
      $picker.find('[aria-hidden="false"]').attr('aria-hidden', 'true');
      
      // Add the active aria states
      $this.attr('aria-selected', 'true');
      $toActivate.attr('aria-hidden', 'false');
      
      // Create slick
      var $activateSlick = $toActivate.children('.tabs__slick');
      if( $activateSlick.length > 0 && !$activateSlick.hasClass('slick-slider') )
      {
        loadCarousel($activateSlick);
      }
      
    });
    
    
    


  });
  
})(jQuery);