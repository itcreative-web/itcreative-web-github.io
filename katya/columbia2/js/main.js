"use strict";

$(document).ready(function () {
  // ПРИБАВЛЯЮ К ТЕКУЩЕЙ ДАТЕ ТРИ ДНЯ ДЛЯ "Акция продлится до ..."
  var today = new Date();
  today.setDate(today.getDate() + 3);

  function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    $(".sale-data").text(dd + '.' + mm + '.' + yy);
  }

  formatDate(today); // Parallax

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
  } // МОДАЛЬНОЕ ОКНО 


  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // Якоря к карточке заказа товара в секции продукты

  $(".btn-scroll").click(function (event) {
    if ($(window).width() <= 1000) {
      event.preventDefault();
      console.log("1");
      var top = $("#product__order").offset().top;
      $('body, html').animate({
        scrollTop: top + $("#product__order").height() - $(window).height()
      }, 800);
    } else if ($(window).width() <= 2600) {
      event.preventDefault();
      var top = $("#product__order").offset().top;
      $('body, html').animate({
        scrollTop: top - 400
      }, 800);
      console.log("2");
    }
  }); // СЛАЙДЕР gallery

  $('.gallery-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    appendArrows: $('.gallery__left'),
    prevArrow: '<div class="nav-btn gallery-btn gallery__prev"><span>&#8249;</span></div>',
    nextArrow: '<div class="nav-btn gallery-btn gallery__next"><span>&#8250;</span></div>',
    responsive: [{
      breakpoint: 481,
      settings: {
        arrows: false
      }
    }]
  });
  $('.gallery-slider_mobile').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [{
      breakpoint: 481,
      settings: {
        arrows: true,
        appendArrows: $('.gallery__left'),
        prevArrow: '<div class="nav-btn gallery-btn gallery-btn_mobile gallery__prev"><span>&#8249;</span></div>',
        nextArrow: '<div class="nav-btn gallery-btn gallery-btn_mobile gallery__next"><span>&#8250;</span></div>'
      }
    }]
  }); // СЛАЙДЕР product

  $('.product1-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    appendArrows: $('.product1 > .product__center'),
    prevArrow: '<div class="product-btn product__prev"><span>&#8593;</span></div>',
    nextArrow: '<div class="product-btn product__next"><span>&#8595;</span></div>',
    responsive: [{
      breakpoint: 701,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 601,
      settings: {
        slidesToShow: 3,
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 3,
        arrows: false,
        vertical: false,
        verticalSwiping: false,
        centerMode: true,
        variableWidth: true
      }
    }, {
      breakpoint: 426,
      settings: {
        slidesToShow: 2,
        arrows: false,
        vertical: false,
        verticalSwiping: false,
        centerMode: true,
        variableWidth: true
      }
    }]
  });
  $('.product2-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    appendArrows: $('.product2 > .product__center'),
    prevArrow: '<div class="product-btn product__prev"><span>&#8593;</span></div>',
    nextArrow: '<div class="product-btn product__next"><span>&#8595;</span></div>',
    responsive: [{
      breakpoint: 701,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 601,
      settings: {
        slidesToShow: 3,
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 3,
        arrows: false,
        vertical: false,
        verticalSwiping: false,
        centerMode: true,
        variableWidth: true
      }
    }, {
      breakpoint: 426,
      settings: {
        slidesToShow: 2,
        arrows: false,
        vertical: false,
        verticalSwiping: false,
        centerMode: true,
        variableWidth: true
      }
    }]
  }); // СЛАЙДЕР rewiev

  $('.rewiev-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    appendArrows: $('.rewiev__left'),
    prevArrow: '<div class="product-btn rewiev__prev"><span>&#8593;</span></div>',
    nextArrow: '<div class="product-btn rewiev__next"><span>&#8595;</span></div>',
    responsive: [{
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        adaptiveHeight: true,
        vertical: false,
        verticalSwiping: false
      }
    }]
  });
});