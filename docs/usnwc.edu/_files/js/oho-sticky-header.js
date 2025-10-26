// --------------------------------------------------
// OHO-STICKY-HEADER.JS
// --------------------------------------------------

(function($) {
  $(document).ready(function() {

    // Create an 'overview' link for mobile purposes
    // This needs to happen first or our 'has-ul' class gets added where we don't want it
    $('#main-menu li:has(ul) > a').each(function() {
      var $overview = $(this).clone();
      $overview.find('.has-ul').removeClass('has-ul');
      var $overviewDestinationSelector = $('.menu .menu');
      var $overviewDestination = $(this).closest('li').find($overviewDestinationSelector);
      $($overview).text('Overview').prependTo($overviewDestination).wrap('<li class="menu__overview-link js-processed"></li>');
      $($overview).remove('.nav-toggle');
    });

    // Add .has-ul class to menu items with submenu children
    $('.navigation li:has(ul) > a').addClass('has-ul');

    // Separating Nav Levels using Classes
    $('.navigation .menu-block-wrapper > ul').addClass('ul--level-one');
    $('.navigation .menu-block-wrapper > ul > li').addClass('li--level-one');

    $('.navigation .menu-block-wrapper > ul > li > ul').addClass('ul--level-two');
    $('.navigation .menu-block-wrapper > ul > li > ul > li').addClass('li--level-two');

    // Adding accessible navigation supplement
    $('.navigation .menu .has-ul ').wrap('<div></div>');
    $('<button type="button" class="nav-toggle">Open submenu</button></span>').insertAfter('.navigation .menu .has-ul ');



        // Toggles between two strings
        // Used for changing mobile menu button text on click
        $.fn.toggleText = (function(t1, t2) {
          this.each(function() {
            var $this = $(this)
            if ($this.text() == t1) { $this.text(t2); }

            else { $this.text(t1); }

          })
          return this;
        });

        $('.l-header__mobile-menu').click(function() {
          $(this).children('button').toggleClass('engaged');
          $(this).parents('header').find('.all-navs').slideToggle();
          $(this).toggleClass('l-header__mobile-menu-active');
          $(this).parents('header').find('.l-header__mobile-menu a').toggleText('Close', 'Menu');
        });

        $('.l-header__mobile-menu a').click(function(event) {
          event.preventDefault();
        });

        // info for toggle
        $('.header-super .header-super__info-for__toggle').click(function(){
          $(this).siblings('.menu-block-wrapper').children('ul').slideToggle();
          $(this).children('span').toggleClass('active');
        })

        // add a toggle to into the search block
        $('header .block-search-form').prepend('<div class="fa search-toggle fa-search"><span>Search</span></div>');

        // Search toggle
        $('.search-toggle').click(function() {
          $(this).siblings('form').slideToggle();
          $(this).toggleClass('fa-search fa-caret-up');
        });

        var searchPanel = $('.l-header__search--itself');
        $('.search-toggle-link a').click(function(event){
          event.preventDefault();
          $(searchPanel).toggle();
        });
        $('.l-header__search--itself__close').click(function(event){
          event.preventDefault();
          $(searchPanel).toggle();
        });

    enquire
      .register('screen and (min-width:1024px)', function() {
        $('.navigation .menu > li:has(ul) > a').unbind('click');
        $('.navigation, .navigation *').removeAttr('style').removeClass('has-ul-active');
      })
      .register('screen and (max-width:1024px)', function() {
        $('.navigation a.has-ul').click(function(event) {
          event.preventDefault();
          $(this).toggleClass('has-ul-active');
          $(this).parents('.ul--level-one').children('ul').slideUp();
          $(this).parents('.li--level-one').children('ul').slideToggle();
        });
      })
      .register('screen and (min-width: 641px)', function() {
      })
      .register('screen and (max-width: 641px)', function() {
      });
  });
})(jQuery);
