$( document ).ready(function() {

  $('#fullpage').fullpage({
    anchors:['home', 'about'],
    loopHorizontal: false,
    controlArrows: false,
    fixedElements: '.view-work, .back-home, scene',
    scrollOverflow: true,
    responsiveWidth: 768,
    responsiveHeight: 600,
    scrollOverflowReset: true,
    scrollOverflowResetKey: 'c3RldmVucmV5bm9sZHMuY29tX2I4OGMyTnliMnhzVDNabGNtWnNiM2RTWlhObGRBPT12eGI=',
    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){

      if(slideIndex === 0){
          $.fn.fullpage.setAllowScrolling(true, 'down');
          $.fn.fullpage.setKeyboardScrolling(true, 'down');
      }
      if(slideIndex === 1){
          $.fn.fullpage.setAllowScrolling(false, 'down');
          $.fn.fullpage.setKeyboardScrolling(false, 'down');
      }
    }
  });

  var $grid = $('.grid').imagesLoaded( function() {
  // init Masonry after all images have loaded
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.col-6',
      percentPosition: true,
      gutter: 40
    });
  });

});
