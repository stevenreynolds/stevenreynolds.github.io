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
main.js
*************************************************************/

$(document).ready(function() {

    // Superslides.js
    $('#slides').superslides({
        play: true,
        slide_easing: 'easeInOutCubic',
        slide_speed: 800,
        delay: 6500,
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

    new WOW().init();

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

    // hide overlay when load is finish
    Pace.on('hide', function () {
    $('.overlay').css("display", "none");
    });


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
ISOTOPE INIT
*************************************************************/

jQuery(window).load(function($) {
    $=jQuery;
    if ($('.images_container').size() > 0) {
        $('.images_container').isotope({
            itemSelector: '.gallery_item',
            layoutMode: 'fitRows',
            isOriginLeft: false,
            animationOptions: {
             duration: 750,
             easing: 'linear',
             queue: false
            }
        });
    }

    $('.images_container').isotope('reLayout');

    var $container = $('.images_container')
    // initialize Isotope
    $container.isotope({
        // options...
        resizable: false, // disable normal resizing
        // set columnWidth to a percentage of container width
        masonry: { columnWidth: $container.width() / 5 }
    });

    // update columnWidth on window resize
    $(window).smartresize(function(){
    $container.isotope({
        // update columnWidth to a percentage of container width
        masonry: { columnWidth: $container.width() / 5 }
    });
    });

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
scroll menu
*************************************************************/

$(document).ready(function() {

    $('a[href*=#]').each(function() {
        if($(this).attr('href').indexOf("#") == 0) {
            $(this).click(function(e) {
              e.preventDefault();
              var targetOffset = $($(this).attr('href')).offset().top -80;
              $('body').animate({scrollTop: targetOffset}, 700);
            });
        }
    });

});