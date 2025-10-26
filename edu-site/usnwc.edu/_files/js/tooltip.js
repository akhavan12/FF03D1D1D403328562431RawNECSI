//--------------
// Tool Tip
//--------------
(function($){
  $(document).ready(function(event){    

    $(document).mousemove(function(event) {
      var currentMousePos = { x: 0, y: 0 };
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
      if($(".xy-mouse-position").length) {
        $(".xy-mouse-position").text("Postion X:" + currentMousePos.x + " Position Y:" + currentMousePos.y);
      }
  
      $(".tooltip-box-toggle").click(function(){
        var $tooltip_box = $(this).parents(".has-tooltip-box").siblings(".tooltip-box");
        
        $(this).toggleClass("tooltip-box-toggle--active");
        $tooltip_box.toggleClass("tooltip-box--active");
  
        //Tooltip positioning
        // We get the X and Y coordinates of the mouse on click
        // and we set the values via CSS to the left and right
          $tooltip_box.css({
            "left": currentMousePos.x,
            "top": currentMousePos.y
          });
        });
      });

    $(".tooltip-box i").click(function(){
      $(this).parents(".tooltip-box").removeClass("tooltip-box--active");
      $(this).parents(".tooltip-box").siblings(".has-tooltip-box").children(".tooltip-box-toggle").removeClass("tooltip-box-toggle--active");
    });
    
  }); // End Doc Ready
})(jQuery); // End jQuery