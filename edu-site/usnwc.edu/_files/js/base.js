(function($) {
  $(document).ready(function(){
  /*
    -----------------------
    ACCORDION DROPDOWN
    -----------------------
  */

    $(".accordion-drop-down__toggle").click(function(event){
      event.preventDefault();
      $(this).toggleClass("accordion-drop-down__toggle--active");
      $(this).next().slideToggle();
      $(this).find('span').text(function(i, v){
        return v === 'Click to Open' ? 'Click to Close' : 'Click to Open'
      })
    });


  /*
    -----------------------
    'OHO EQUALIZE' Match height of all child divs to tallest sibling
    -----------------------
  */

    $.fn.oho_equalize = function( children ) {
      $(this).each(function() {
        var $parents = $(this);

        if ($parents.length && children.length) {
          $parents.each(function(pid, parent) {
            var newHeight = 0;
            $parents.find(children).css('height', 'auto');
            $(parent).find(children).each(function(cid, child) {
              if ($(child).outerHeight() > newHeight) {
                newHeight = $(child).outerHeight();
              }
            })
            if (newHeight > 0) {
              $parents.find(children).css('min-height', newHeight+'px');
              console.log(newHeight);
            }
          });
        }
      });

    };


    /*
      -----------------------
      SIDEBAR NAVIGATION
      -----------------------
    */

    // Mark which menu items have submenus
    $('.menu__item').each(function() {
      if ( $(this).find('.menu').length ) {
        $(this).addClass('has-children');
      }
    });

    // Add grey border to immediate parent list
    $('.menu__item.active').parent('.menu').parent('.menu__item').addClass('active-parent');
    $('.menu__item.active').parent('.menu').addClass('active'); // In the case of .ul--level-one, there is no parent .menu__item
    // Open all parent menus
    $('.menu__item.active').parents('.menu:not(.menu--level-one)').slideToggle();
    // Turn all parent menu toggles to minus sign
    $('.menu__item.active').parents('.has-children').addClass('engaged');
    // If active page has submenu, open submenu
    $('.menu__item.has-children.active > .menu').slideToggle();
    // If active page has submenu, change menu toggle to minus sign
    $('.menu__item.has-children.active').addClass('engaged');

    $('[data-toggle="sidebar-menu"]').click(function() {
      $(this).toggleClass('active');
      $('.sidebar-menu__content').slideToggle();
    });

    $('[data-toggle="submenu"]').click(function() {
      $(this).parent('.has-children').toggleClass('engaged'),
      $(this).siblings('.menu').slideToggle();
    });


    /*
      -----------------------
      SHOW/HIDE CAPTIONS
      -----------------------
    */

    $('[data-toggle="caption"]').click(function() {
      $(this).next('figcaption').toggleClass('engaged');
      if ( $(this).text() == 'Show Caption' )
        $(this).text('Hide Caption');
      else
        $(this).text('Show Caption');
    });

    enquire
      .register("screen and (max-width: 600px)", function() {
        $('[data-toggle="caption"]').not("[data-caption-type='mobile-expandable']").next('figcaption').show();
      })
      .register("screen and (min-width: 600px)", function() {
        $('[data-toggle="caption"]').next('figcaption').hide();
        $('[data-toggle="caption"]').text('Show Caption');
      });

  });
})(jQuery);
