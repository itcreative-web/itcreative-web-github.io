var ua = {

   Android: function () {
      return !!navigator.userAgent.match(/android/i);
   },

   iOS: function () {
      return !!navigator.platform.match(/ip(hone|od|ad)/i);
   },

   Mac: function () {
      return /mac/i.test(navigator.platform);
   },

   Apple: function () {
      return (ua.iOS() || ua.Mac());
   },

   Mobile: function () {
      return (ua.iOS() || ua.Android())
   },

   IE: function () {
      return /msie|trident/i.test(navigator.userAgent);
   },

   Edge: function () {
      return /Edg(e|)/i.test(navigator.userAgent);
   },

   Chrome: function () {
      return /chrom(e|ium)/i.test(navigator.userAgent);
   },

   Firefox: function () {
      return /firefox/i.test(navigator.userAgent);
   },

   Safari: function () {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   }

};

$(document).ready(function () {

   changeSale('.header, .sprey, .item, footer', '.new-price', '.old-price', '.sale');
   function changeSale(container, newPrice, oldPrice, sale, saleNumber) {
      var container = container;

      $(newPrice).each(function () {
         var price = parseInt($(this).text()),
            percent = $(this).closest(container).find(sale).text().replace(/[^0-9]/gim, ''),
            currency = $(this).text().replace(/[0-9]/g, '');

         if (sale.length == '') {
            percent = saleNumber;
         }

         price = Math.ceil((price * 100) / (100 - percent));
         $(this).closest(container).find(oldPrice).text(price + " " + currency);
      });
   }

   $('.gallery__wrap').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: true,
      arrows: false,
      dotsClass: 'dots',
      appendDots: '.dots',
      responsive: [
         {
            breakpoint: 601,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            }
         }
      ]
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      dotsClass: 'testimonials-dots',
      appendDots: '.testimonials-dots',
      responsive: [
         {
            breakpoint: 1280,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            }
         },
         {
            breakpoint: 599,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   });

   $('.arrow-left').on('click', function () {
      $('.gallery__wrap').slick('slickPrev');
   });
   $('.arrow-right').on('click', function () {
      $('.gallery__wrap').slick('slickNext');
   });
   $('.arrow-left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.arrow-right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });

   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery1"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery2"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery3"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery4"]').fancybox({
      hideScrollbar: false,
   });

   (function youtube() {

      var $videos = $('.video');
      var isMobile = ua.Mobile();

      $videos.each(function () {
         var $video = $(this);

         var $link = $video.find('.video-link'),
            $button = $video.find('.video-button'),
            $iframe = $video.find('.iframe-fluid'),
            id = parseLinkURL($link);

         $link.removeAttr('href');



         $video.on('click', function () {
            $('.video-block .video-inner').css('z-index', 10);
            $link.remove();
            $button.remove();
            var iframe = createIframe(id);

            if (isMobile) {
               $video.addClass('active mobile');
            } else {
               $video.addClass('active');
            }

            $iframe.append(iframe);

         });
      })


      function parseLinkURL(link) {

         var regexp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i,
            url = link.attr('href'),
            match = url.match(regexp);

         return match[1];

      }

      function createIframe(id) {
         var base = 'https://www.youtube.com/embed/';
         var query = isMobile ? '?rel=0&enablejsapi=1' : '?rel=0&autoplay=1';

         return $('<iframe>', {
            src: base + id + query,
            id: 'player-' + id,
            allow: 'autoplay',
            allowfullscreen: '',
            on: {
               load: function () {
                  isMobile && createPlayer(id);
               }
            }
         });
      }

      function createPlayer(id) {

         var player = new YT.Player('player-' + id, {
            host: "https://www.youtube.com",
            events: {
               'onReady': function (e) {
                  e.target.playVideo();
               }
            }
         });

      }

   })();

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });

   var scenesParallax = [];

   mQ("(max-width: 1023px)", function () {
      if (!scenesParallax.length) return
      scenesParallax.forEach(function (scene) {
         scene.disable();
         scene.element.removeAttribute('style');
      })
   }, function () {
      if (scenesParallax.length === 0) {
         $('.parallax').each(function (i) {
            scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
               frictionX: 0.01,
               frictionY: 0.01,
               invertX: Math.random() >= 0.5,
               invertY: Math.random() >= 0.5
            });
         })
      } else {
         scenesParallax.forEach(function (scene) {
            scene.enable();
         })
      }
   });

   function randomNum(min, max) {
      var numLow = min, numHigh = max,
         adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
      return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
   }

   function mQ(mqStr, match, mismatch) {
      var mq = matchMedia(mqStr);
      mq.addListener(widthChange);
      widthChange(mq);
      function widthChange(mq) {
         if (mq.matches) {
            match();
         } else {
            mismatch();
         }
      }
   }

   $('.header__image').addClass('animated bounceIn')


   $(window).scroll(function () {
      if (isVisible('.advantages', '.advantages')) {
         addAnimClass('.advantages__image', 'bounceIn');
      }
      // if (isVisible('.video-block', '.video-block')) {
      //    addAnimClass('.video-block__main-image', 'fadeIn');
      // }
      if (isVisible('.sprey', '.sprey')) {
         addAnimClass('.sprey__image', 'fadeInLeft');
      }
      if (isVisible('.how-we-work', '.how-we-work')) {
         addAnimClass('.how-we-work__item', 'fadeInUp');
      }
      if (isVisible('.footer', '.footer')) {
         addAnimClass('.footer__image', 'fadeInRight');
      }
      if (isVisible('.sprey', '.sprey')) {
         addAnimClass('.item-1', 'fadeInUp');
      }
      if (isVisible('.item-1', '.item-1')) {
         addAnimClass('.item-3', 'fadeInUp');
      }
      // if (isVisible('.item-2', '.item-2')) {
      //    addAnimClass('.item-3', 'fadeInUp');
      // }
      if (isVisible('.item-3', '.item-3')) {
         addAnimClass('.item-4', 'fadeInUp');
      }
   });

   function isVisible(selector, block) {
      let $block = $(block);
      var windowBottom = $(window).scrollTop() + $(window).height();
      var bottom = $block.offset().top + $(selector).height()/2.5;
      return windowBottom >= bottom;
   }

   function addAnimClass(selector, animationName) {
      $(selector).addClass('animated');
      $(selector).addClass(animationName);
   }

});