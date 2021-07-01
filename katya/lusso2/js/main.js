"use strict";

$(document).ready(function () {
  // Якоря к карточке заказа товара в секции продукты
  $(".btn-scroll").click(function (event) {
    if ($(window).width() <= 1000) {
      event.preventDefault();
      var top = $("#order-buy").offset().top;
      $('body, html').animate({
        scrollTop: top + $("#order-buy").height() - $(window).height()
      }, 800);
    } else if ($(window).width() <= 2600) {
      event.preventDefault();
      var top = $("#order-buy").offset().top;
      $('body, html').animate({
        scrollTop: top - 400
      }, 800);
    }
  }); // МОДАЛЬНОЕ ОКНО 

  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // Parallax

  var scenesParallax = [];
  mQ("(max-width: 1024px)", function () {
    if (!scenesParallax.length) return;
    scenesParallax.forEach(function (scene) {
      scene.disable();
      scene.element.removeAttribute('style');
    });
  }, function () {
    if (scenesParallax.length === 0) {
      $('.parallax').each(function (i) {
        scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(15, 15)).end().get(0), {
          frictionX: 0.03,
          frictionY: 0.03,
          invertX: Math.random() >= 0.5,
          invertY: Math.random() >= 0.5
        });
      });
    } else {
      scenesParallax.forEach(function (scene) {
        scene.enable();
      });
    }
  });

  function randomNum(min, max) {
    var numLow = min,
        numHigh = max,
        adjustedHigh = parseFloat(numHigh) - parseFloat(numLow) + 1;
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
  } // ПЕРЕКЛЮЧЕНИЕ РАЗМЕРА В КАРТОЧКЕ ТОВАРА


  $('.size-checkbox').on('click', function () {
    var parentDiv = $(this).parent(); // console.log($(this));
    // var parentDiv = $(this).closest(".form__size-wrapper");
    // console.log(parentDiv);

    var allLabel = parentDiv.children(".size-label");
    allLabel.each(function (indx, element) {
      $(element).removeClass("label_active");
    });
    $(this).next(".size-label").addClass("label_active");
  }); // Ленивая загрузка bg
  //   var lazyloadImages;    
  //   if (typeof NodeList.prototype.forEach !== 'function')  {
  //     NodeList.prototype.forEach = Array.prototype.forEach;
  // }
  //   if ("IntersectionObserver" in window) {
  //     lazyloadImages = document.querySelectorAll(".lazy");
  //     var imageObserver = new IntersectionObserver(function(entries, observer) {
  //       entries.forEach(function(entry) {
  //         if (entry.isIntersecting) {
  //           var image = entry.target;
  //           image.classList.remove("lazy");
  //           imageObserver.unobserve(image);
  //         }
  //       });
  //     });
  //     lazyloadImages.forEach(function(image) {
  //       imageObserver.observe(image);
  //     });
  //   } else {  
  //     var lazyloadThrottleTimeout;
  //     lazyloadImages = document.querySelectorAll(".lazy");
  //     function lazyload () {
  //       if(lazyloadThrottleTimeout) {
  //         clearTimeout(lazyloadThrottleTimeout);
  //       }    
  //       lazyloadThrottleTimeout = setTimeout(function() {
  //         var scrollTop = window.pageYOffset;
  //         lazyloadImages.forEach(function(img) {
  //             if(img.offsetTop < (window.innerHeight + scrollTop)) {
  //               img.src = img.dataset.src;
  //               img.classList.remove('lazy');
  //             }
  //         });
  //         if(lazyloadImages.length == 0) { 
  //           document.removeEventListener("scroll", lazyload);
  //           window.removeEventListener("resize", lazyload);
  //           window.removeEventListener("orientationChange", lazyload);
  //         }
  //       }, 20);
  //     }
  //     document.addEventListener("scroll", lazyload);
  //     window.addEventListener("resize", lazyload);
  //     window.addEventListener("orientationChange", lazyload);
  //   }
  // PRODUCT SLIDER

  $('.product__slider1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    appendArrows: $('.product__slider-wrapper1'),
    prevArrow: '<div class="btn-slider product__prev"><img src="img/4_arrow-left_black.png" alt="arrow"></div>',
    nextArrow: '<div class="btn-slider product__next"><img src="img/4_arrow-right_black.png" alt="arrow"></div>',
    responsive: [{
      breakpoint: 481,
      settings: {
        adaptiveHeight: true
      }
    }]
  });
  $('.product__slider2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    appendArrows: $('.product__slider-wrapper2'),
    prevArrow: '<div class="btn-slider product__prev"><img src="img/4_arrow-left_black.png" alt="arrow"></div>',
    nextArrow: '<div class="btn-slider product__next"><img src="img/4_arrow-right_black.png" alt="arrow"></div>',
    responsive: [{
      breakpoint: 481,
      settings: {
        adaptiveHeight: true
      }
    }]
  });
  $('.product__slider3').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    appendArrows: $('.product__slider-wrapper3'),
    prevArrow: '<div class="btn-slider product__prev"><img src="img/4_arrow-left_black.png" alt="arrow"></div>',
    nextArrow: '<div class="btn-slider product__next"><img src="img/4_arrow-right_black.png" alt="arrow"></div>',
    responsive: [{
      breakpoint: 481,
      settings: {
        adaptiveHeight: true
      }
    }]
  }); // SLIDER REWIEV

  $('.rewiev-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    appendArrows: $('.rewiev__container'),
    prevArrow: '<div class="btn-slider rewiev__prev"><img src="img/4_arrow-left_black.png" alt="arrow"></div>',
    nextArrow: '<div class="btn-slider rewiev__next"><img src="img/4_arrow-right_black.png" alt="arrow"></div>',
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 651,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // ПРИБАВЛЯЮ К ТЕКУЩЕЙ ДАТЕ ТРИ ДНЯ ДЛЯ "Акция продлится до ..."

  var today = new Date();

  function formatDate(date, days, place) {
    today.setDate(today.getDate() - days);
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    $(place).text(dd + '.' + mm + '.20' + yy);
  }

  formatDate(today, 1, ".rewiev__data1");
  formatDate(today, 3, ".rewiev__data2");
  formatDate(today, 6, ".rewiev__data3");
  formatDate(today, 7, ".rewiev__data4");
  formatDate(today, 9, ".rewiev__data5"); // SLIDER REWIEV

  $('.gallery-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    dots: false,
    responsive: [{
      breakpoint: 551,
      settings: {
        dots: true,
        appendDots: $('.gallery__container'),
        customPaging: function customPaging(slick, index) {
          return '<button class="slider__dot"></button>';
        }
      }
    }]
  });
});