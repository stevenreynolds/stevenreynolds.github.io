/*************************************************************
SUPERSLIDES NAV
*************************************************************/

jQuery(document).ready(function($) {
        
        if ($('nav.slides-navigation').size() > 0) {

            var $slidesNavigation = $('nav.slides-navigation');
            $slidesNavigation.hide();

            //on masthead hover
            $('.slides-container').hover(function () {
                $slidesNavigation.fadeIn();
            }, function() {
                $slidesNavigation.hide();
            });

            //on masthead hover
            $slidesNavigation.hover(function () {
                $slidesNavigation.show();
            });

        }


    });

/*************************************************************
SUPERSLIDES
*************************************************************/     
        
jQuery(document).ready(function($) {

        $('#slides').superslides({
            play: 1200,
            slide_easing: 'easeInOutQuad',
            hashchange: true,
            scrollable: true,
            delay: 10000,
            slide_speed: 800,
            pagination: true
        });

        $('#slides').on('dragstart', function (event) {
            event.preventDefault();
            
            switch(event.direction){
                case "left":
                    $('#slides').superslides.api.next();
                    break;
                case "right":
                    $('#slides').superslides.api.prev();
                    break;
            };

});
        });

/*************************************************************
main.js
*************************************************************/

$(document).ready(function() {

// Responsive Menu.js
    $('#nav-wrap').prepend('<div id="menu-icon"><span><img src="img/hamburger@2x.png"/></span>Menu</div>');
        $("#menu-icon").on("click", function(){
            $("#nav").slideToggle('medium', function() {
                if ($('#nav').is(':visible'))
                    $('#nav').css('display','block');
                if ($('#nav').is(':hidden'))
                        $('#nav').css('display','');    
            });
                
        $(this).toggleClass("active");
    });
  
  // Fancybox.js
	 $('.fancybox').fancybox();

  // Fancybox title link
     $('a.fancybox').fancybox({
    'titlePosition' : 'inside',
    'padding' : 0
    });
	  
  // Mosaic.js       
    $('.fade').mosaic();
  
  // BackStretch.js	 
	 $("#masthead").backstretch("img/masthead@2x.jpg");
	 
});




/*************************************************************
FLEXSLIDER INIT
*************************************************************/
jQuery(window).load(function($){
$ = jQuery;

$('.flexslider-quote').flexslider({
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        animation: "fade",
        smoothHeight: true,
        touch: true,
        directionNav: false
    });
  });

/*************************************************************
ODOMETER
*************************************************************/

jQuery(window).load(function($){

setTimeout(function(){
    coffeeodometer.innerHTML = 16;
}, 500);

setTimeout(function(){
    gameodometer.innerHTML = 10;
}, 1000);

setTimeout(function(){
    musicodometer.innerHTML = 236;
}, 1500);

setTimeout(function(){
    photoodometer.innerHTML = 16;
}, 2000);

setTimeout(function(){
    bikeodometer.innerHTML = 42;
}, 2500);

 });

/*************************************************************
ISOTOPE INIT
*************************************************************/

jQuery(window).load(function($) {
    $=jQuery;
    if ($('.images_container').size() > 0) {
        $('.images_container').isotope({
            itemSelector: '.gallery_item',
            layoutMode: 'fitRows'
        });
    }

    $('.images_container').isotope('reLayout');
});

/*************************************************************
GALLERY FILTER MENU
*************************************************************/

    jQuery(document).ready(function($) {
        if ($('.filters li').size() > 0) {
            
            //apply active class to first menu item (show all)
            $('.filters li:eq(0)').addClass('active');

            $('.filters li').on('click', function (event) {
                event.preventDefault();
                $this = $(this);

                //update active filter item
                $('.filters li').removeClass('active');
                $this.addClass('active');


                var filterVar = $this.attr('class');
                console.log(filterVar);
                if ((typeof filterVar == 'undefined') || (filterVar === 'active')) {
                    filterVar = "*";
                } else {
                    filterVar = filterVar.split(' ');
                    filterVar = "." + filterVar[1];
                }
                $('.images_container').isotope({ filter: filterVar});

                //recalculate last item
                $filteredItems = $('.gallery_item:not(.isotope-hidden)');
                if ($filteredItems.size() > 0) {
                    var numColumns = 3;

                    $filteredItems.each(function(index, e) {
                        $this = $(this);
                        $this.removeClass('last');
                        if (((index+1) % numColumns) === 0) $this.addClass('last');
                    });

                $('.images_container').isotope('reLayout');
                        
                }
            });

        }
    });