/*!
 * fullpage.js Reset Scroll Overflow
 * https://github.com/alvarotrigo/fullPage.js
 *
 * This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distrubute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 *
 * To be used in the following way:
 *
 *   afterLoad: function(anchorLink, index) {
 *         resetScroll.reset();
 *   },
 *   onLeave: function(index, nextIndex, direction) {
 *       resetScroll.setPrevious($(this));
 *   }
 */
!function(i){window.fp_scrollOverflowResetExtension=function(){var e,n="."+"fp-scrollable",o=this,t,r=i.fn.fullpage.getFullpageData().internals;o.reset=function(){if(o.prevDestiny){var e=o.prevDestiny.find(n);void 0!==e&&i.each(e,function(){var e=i(this).data("iscrollInstance");e&&void 0!==e&&e.scrollTo(0,0)})}},o.setPrevious=function(e){o.prevDestiny=e},o.c=r.c;var l=o["common".charAt(0)];return"complete"===document.readyState&&l("scrollOverflowReset"),i(window).on("load",function(){l("scrollOverflowReset")}),o}}(jQuery);