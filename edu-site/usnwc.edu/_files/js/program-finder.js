(function($){
  $(document).ready(function(){


  // adding the close button
  $('<button type="button" class="close"><i class="fa fa-times" aria-hidden="true"></i></button>').insertBefore('.section--programs__cards__slick');

  // positioning the close button
/*
  var headerHeight = $('.section--programs .section--left-head').height() + 200;
  $('button.close').css("top",headerHeight);
*/

  // what happpens with you hover over a card
  $('.section--programs__card').hover(function(){
	  $(this).siblings('.section--programs__card').toggleClass('nope');
  });

  // what happens when you click a card
  $('.section--programs__card').click(function(){

    // fades other cards out completely
  	$(this).siblings('.section--programs__card').toggleClass('bye');

  	// moves the cards out of sight
  	var thisSlick = $(this).parents('.section--programs__cards__slick');
    $(thisSlick).delay(500).addClass('bye');

    // Clicked element
    var $this = $(this);

    // Index number, add one for zero index
  	var tabNumber = $this.index() + 1;

    // Complete set of programs texts
    var $programTexts = $(thisSlick).siblings('.section--programs__cards__drawer');

    // Tab to be activated
    var $toActivate =  $programTexts.find('.section--programs__cards__drawer__text:nth-of-type(' + tabNumber + ')');

    // Add the active aria states
    $this.attr('aria-selected', 'true');
    setTimeout(function(){
      $($toActivate).attr('aria-hidden', 'false');
    }, 500);
 
    
    // Add a class to the outermost container
    
    $this.parents('.section--programs__cards').addClass('engaged');

    // the height of the section conforms to the height of the revealed content
    var innerHeight = $($toActivate).height();

    $(thisSlick).siblings('.section--programs__cards__drawer').addClass('hello').css("height",innerHeight);

    var adjustedHeight = innerHeight + 200;
    
    setTimeout(function(){
      $(thisSlick).parents('.section--programs__cards.engaged').css('height',adjustedHeight);
    }, 500);
    
    // doing it again if you resize the browser

    $(window).resize(function() {

      var innerHeight = $('.section--programs__cards__drawer__text').height();

     // $(thisSlick).siblings('.section--programs__cards__drawer').addClass('hello').css("height",innerHeight);

      var adjustedHeight = innerHeight + 200;
      setTimeout(function(){
        $(thisSlick).parents('.section--programs__cards.engaged').css('height',adjustedHeight);
      }, 500);

    });

    // makes the close button visible
    $(thisSlick).parents('.section--programs').find('.close').delay(2000).addClass('hello');

  });  // end of click function

  // how you close the program drawer and return to the initial state
  $('button.close').click(function() {
    $(this).removeClass('hello');
    var programCards = $(this).parents('.section--programs__cards');
    $(programCards).removeClass('engaged').css('height', '');
    $(programCards).children('.section--programs__cards__drawer').css('height', '').removeClass('hello');
    $(programCards).children('.section--programs__cards__slick').removeClass('bye');
    $(programCards).find('.section--programs__card').removeClass('bye');
    $(programCards).find('.section--programs__cards__drawer__text').attr('aria-hidden', 'true');
  });

/*
  enquire
    .register('screen and (min-width: 641px)', function() {
      $(this).removeClass('hello');
      var programCards = $(this).parents('.section--programs__cards');
      $(programCards).css('height', '');
      $(programCards).children('.section--programs__cards__drawer').css('height', '').removeClass('hello');
      $(programCards).children('.section--programs__cards__slick').removeClass('bye');
      $(programCards).find('.section--programs__card').removeClass('bye');
      $(programCards).find('.section--programs__cards__drawer__text').attr('aria-hidden', 'true');
    })
    .register('screen and (max-width: 641px)', function() {
      var programCards = $(this).parents('.section--programs__cards');
      $(programCards).find('.section--programs__cards__drawer__text').attr('aria-hidden', 'false');
    });
*/

  });



  // Program Finder - mobile accordions
  
  $('.section--programs__card__classes').each(function(){
    var thisClone = $(this).clone();
    $(thisClone).addClass('clone');
    var thisParent = $(this).parents('.section--programs__cards__drawer__text');
    $(thisParent).prepend(thisClone);
  });
  

    $('.section--programs__card__classes.clone').click(function(){
      $(this).next('.section--programs__cards__drawer__text__container').slideToggle();
      $(this).parents('.section--programs__cards__drawer__text').attr('aria-hidden', function(i, attr){ 
          return attr == 'true' ? 'false' : 'true'
        });
    });

  
  // All Programs button appears under the accordion for mobile
  
  var allProgramsClone = $('.section--programs .section--left-head .button--read-more').clone().addClass('button--clone');
  
  $('.section--programs__cards__drawer').append(allProgramsClone);
  
})(jQuery);



// document.addEventListener('DOMContentLoaded', function() {
//     const searchButton = document.getElementById('search_button');
//     const ddlOutcome = document.getElementById('ddlOutcome');
//     const ddlRank = document.getElementById('ddlRank');
//     const ddlDomInt = document.getElementById('ddlDomInt');
//     const defaultMessage = document.getElementById('default_message');
//     const programRows = document.querySelectorAll('.program-listing');
//     const toggles = document.querySelectorAll('.program-listing .footable-toggle');

//     let isFiltered = false; // Track if currently filtered

//     // Helper function to clear all filters and reset state
//     function clearFilters() {
//         programRows.forEach(row => {
//             row.style.display = '';
//             row.classList.remove('skip');
//         });
//         ddlOutcome.value = '0';
//         ddlRank.value = '0';
//         ddlDomInt.value = '0';
//         searchButton.textContent = 'Search';
//         searchButton.classList.remove('btn--gray');
//         searchButton.classList.add('btn--yellow');
//         defaultMessage.style.display = 'none';
//         isFiltered = false;
//     }

//     // Helper function to apply a single filter based on a chosen attribute
//     function applyFilter(attr, value) {
//         let anyVisible = false;
//         programRows.forEach(row => {
//             const dataVal = row.getAttribute(`data-${attr}`);
//             const matches = dataVal && dataVal.toLowerCase().includes(value.toLowerCase());
//             row.style.display = matches ? '' : 'none';
//             row.classList.toggle('skip', !matches);
//             if (matches) anyVisible = true;
//         });
//         defaultMessage.style.display = anyVisible ? 'none' : '';
//         return anyVisible;
//     }

//     // Search button event for filtering
//     searchButton.addEventListener('click', function() {
//         // If currently filtered, clicking again clears the filter
//         if (isFiltered) {
//             clearFilters();
//             return;
//         }

//         // Determine chosen filter
//         const outcomeVal = ddlOutcome.value;
//         const rankVal = ddlRank.value;
//         const domIntVal = ddlDomInt.value;

//         let chosenFilter = null;
//         let chosenValue = null;

//         if (outcomeVal !== '0') {
//             chosenFilter = 'outcomes';
//             chosenValue = outcomeVal;
//         } else if (rankVal !== '0') {
//             chosenFilter = 'eligibilitiy'; // Note spelling in attribute
//             chosenValue = rankVal;
//         } else if (domIntVal !== '0') {
//             chosenFilter = 'student-type';
//             chosenValue = domIntVal;
//         }

//         // If no filter chosen, do nothing special
//         if (!chosenFilter) {
//             clearFilters();
//             return;
//         }

//         // Apply the chosen filter
//         applyFilter(chosenFilter, chosenValue);

//         // Update button state to CLEAR
//         searchButton.textContent = 'CLEAR';
//         searchButton.classList.remove('btn--yellow');
//         searchButton.classList.add('btn--gray');
//         isFiltered = true;
//     });

//     // Helper function to build a detail row section
//     function buildDetailRow(title, cell) {
//         if (!cell || !cell.innerHTML.trim()) return '';
//         return `
//             <tr class="program-listing">
//                 <th>${title}</th>
//                 <td class="${cell.className}" style="display: table-cell;">
//                     ${cell.innerHTML}
//                 </td>
//             </tr>
//         `;
//     }

//     // Toggle detail row functionality
//     toggles.forEach(toggleBtn => {
//         toggleBtn.addEventListener('click', function() {
//             const row = this.closest('.program-listing');
//             const isExpanded = row.getAttribute('data-expanded') === 'true';

//             if (isExpanded) {
//                 // Collapse: remove detail row
//                 row.removeAttribute('data-expanded');
//                 const detailRow = row.nextElementSibling;
//                 if (detailRow && detailRow.classList.contains('footable-detail-row')) {
//                     detailRow.remove();
//                 }
//                 // Change icon to plus
//                 toggleBtn.classList.remove('fooicon-minus');
//                 toggleBtn.classList.add('fooicon-plus');
//             } else {
//                 // Expand: create detail row
//                 row.setAttribute('data-expanded', 'true');

//                 const descriptionCell = row.querySelector('.program--table__description');
//                 const locationCell = row.querySelector('.program--table__location');
//                 const durationCell = row.querySelector('.program--table__druation');
//                 const formatCell = row.querySelector('.program--table__format');

//                 const detailRow = document.createElement('tr');
//                 detailRow.className = 'footable-detail-row';
//                 detailRow.innerHTML = `
//                     <td colspan="6">
//                         <table class="footable-details program--table">
//                             <tbody>
//                                 ${buildDetailRow('Program Description', descriptionCell)}
//                                 ${buildDetailRow('Location', locationCell)}
//                                 ${buildDetailRow('Duration', durationCell)}
//                                 ${buildDetailRow('Learning Format', formatCell)}
//                             </tbody>
//                         </table>
//                     </td>
//                 `;

//                 // Insert after the main program row
//                 row.insertAdjacentElement('afterend', detailRow);

//                 // Change icon to minus
//                 toggleBtn.classList.remove('fooicon-plus');
//                 toggleBtn.classList.add('fooicon-minus');
//             }
//         });
//     });
// });
