// --------------------------------------------------
// APP.JS
// --------------------------------------------------
(function($) {
	$(document).ready(function() {
    
		// wrapping columns into a .row when DNN doesn't
		$('.DNNModuleContent .columns').parent('div').not('.row').addClass('row');

		//popup slider scross site
		$('#click-tab').click(function(){
			$('.pop-up').toggleClass('pop-up-toggle-icon');	
			$('.pop-up-slider').toggleClass('open');
		});        

		//Adding new target on links
		var getLinksOnPage = document.querySelectorAll('.set-link-target a'); 

		for(var i = 0; i < getLinksOnPage.length; i++){
			var linksHostName = getLinksOnPage[i].hostname;
			
			if(linksHostName !== document.location.hostname){
				getLinksOnPage[i].setAttribute('target', '_blank');
			}
		}   

	});	
})(jQuery);
