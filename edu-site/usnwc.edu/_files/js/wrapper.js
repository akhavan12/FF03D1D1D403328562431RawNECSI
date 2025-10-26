(function($) {
  $(document).ready(function() {

    // POPULATE MOBILE HEADER NAV WITH FOOTER LINKS
    var footerLinksCloneFirst = $('.footer-main__links').clone();
    var footerLinksCloneSecond = $('.footer-main__links--external').clone();
    $(footerLinksCloneFirst).insertAfter('.footer-links-start');
    $(footerLinksCloneSecond).insertBefore('.footer-links-end');

    // CLOSE OPEN MENUS AND DROPDOWNS ON OUTSIDE CLICK
    $(window).click(function() {
      $('.info-for.engaged ul').slideToggle();
      $('.info-for.engaged').removeClass('engaged');

      closeSubmenus();
    });

    // AUDIENCE DROPDOWN
    $('.info-for button').click(function() {
      $(this).next('ul').slideToggle();
      $(this).parents('.info-for').toggleClass('engaged');
    });

    // TOUCHSCREEN MEGAMENU
    $('.nav-toggle').click(function(event) {
      event.stopPropagation();
      var $menu = $(this).parents('.li--level-one');
      if ( $menu.hasClass('engaged') ) {
        closeSubmenus();
      } else {
        openSubmenu($menu);
      }
    });

    // Prevent window.click function above from closing audience dropdown when in use
    $('.info-for').click(function(event) {
      event.stopPropagation();
    });
  });

  // Takes an .li--level-one and shows the submenu for it
  function openSubmenu($menu) {
    closeSubmenus();
    $menu.find('.ul--level-two').attr('aria-hidden', 'false');
    $menu.find('.nav-toggle').addClass('engaged').text('Close');
    $menu.addClass('engaged');
  }

  // Helper function to close all open menus to prevent overlap
  function closeSubmenus() {
    $('.li--level-one.engaged').each(function() {
      $(this).find('.ul--level-two').attr('aria-hidden', 'true');
      $(this).find('.nav-toggle').removeClass('engaged').text('Open submenu');
      $(this).removeClass('engaged');
    });
  }
})(jQuery);
