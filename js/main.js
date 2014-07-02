$ = jQuery;

// INSTANTIATE VARIABLES

var isActive;
var screenHeight = $(window).height();
var screenWidth = $(window).width();

function init () {

    // PAGE SETUP
    setSectionHeights();

    // WINDOW RESIZING HANDLER
    $(window).resize(function(){
        setSectionHeights();
    });

}

// PAGE SETUP
function setSectionHeights() {

    screenHeight = $(window).height();
    $('#intro, #intro .container').css('height', screenHeight);
}


$(window).stellar({
    horizontalScrolling: false,
  verticalScrolling: true,
});


/*************************************************************
main.js
*************************************************************/

$(document).ready(function() {

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


/*************************************************************
ISOTOPE INIT
*************************************************************/

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

/*************************************************************
GALLERY FILTER MENU
*************************************************************/

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



/*************************************************************
COUNTER
*************************************************************/

    jQuery('#coffeeodometer').appear(function() {
        $('#coffeeodometer').countTo({
            from: 0,
            to: 16,
            speed: 4000,
            refreshInterval: 50,
            onComplete: function(value) {
            //console.debug(this);
            }
            });
        });

    jQuery('#gameodometer').appear(function() {
        $('#gameodometer').countTo({
            from: 0,
            to: 10,
            speed: 4000,
            refreshInterval: 50,
            onComplete: function(value) {
            //console.debug(this);
            }
            });
        });
    jQuery('#musicodometer').appear(function() {
         $('#musicodometer').countTo({
            from: 0,
            to: 236,
            speed: 4000,
            refreshInterval: 50,
            onComplete: function(value) {
            //console.debug(this);
            }
            });
        });
    jQuery('#photoodometer').appear(function() {
         $('#photoodometer').countTo({
            from: 0,
            to: 16,
            speed: 4000,
            refreshInterval: 50,
            onComplete: function(value) {
            //console.debug(this);
            }
            });
        });
    jQuery('#bikeodometer').appear(function() {
         $('#bikeodometer').countTo({
            from: 0,
            to: 42,
            speed: 4000,
            refreshInterval: 50,
            onComplete: function(value) {
            //console.debug(this);
            }
            });
        });




/*************************************************************
scroll menu
*************************************************************/


    $('a[href*=#]').each(function() {
        if($(this).attr('href').indexOf("#") == 0) {
            $(this).click(function(e) {
              e.preventDefault();
              var targetOffset = $($(this).attr('href')).offset().top -80;
              $('body').animate({scrollTop: targetOffset}, 700);
            });
        }
    });

}
});