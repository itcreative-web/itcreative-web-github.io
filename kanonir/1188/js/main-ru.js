"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));
/*
    canvas
 */

var canvas = document.querySelectorAll('canvas'); // canvas.width = myWidth;

function draw() {
  for (var i = 0; i < canvas.length; i++) {
    var ctx = canvas[i].getContext('2d');
    ctx.fillStyle = '#e3eaf3';
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(0, 0);
    ctx.lineTo(myWidth, -800);
    ctx.fill();
  }
}

draw();
window.addEventListener('resize', function () {
  myWidth = window.innerWidth;
  canvas.width = myWidth;
  draw();
}, false);
window.addEventListener('orientationchange', function () {
  myWidth = window.innerWidth;
  canvas.width = myWidth;
  draw();
}, false);

window.onload = function () {
  /*
      slow scroll
   */


  var $root = $('html, body'),
      href;
  $('figure.order a, .header a').on('click', function () {
    href = $(this).attr('href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 800, function () {
      window.location.hash = href;
    });
    return false;
  });
  /*
      increase today date
      for one day
   */

  var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 1,
      period = document.querySelectorAll('span.period output');
  tomorrow.setDate(today.getDate() + i);
  day = tomorrow.getDate();
  day = day < 10 ? "0".concat(day) : day;
  month = tomorrow.getMonth() + 1;
  month = month < 10 ? "0".concat(month) : month;
  year = tomorrow.getFullYear().toString().slice(2);

  for (var j = 0; j < period.length; j++) {
    period[j].innerHTML = "\u0434\u043E ".concat(day, ".").concat(month, ".").concat(year);
  }

  document.querySelector('p strong').innerHTML = tomorrow.getFullYear();
  /*
      change header phone
   */

  $('.header__content-img .color label').on('click', function () {
    var activeLabel = $(this).attr('class');
    $('.header__content-img img').removeClass('active');
    $('.header__content-img img.' + activeLabel).addClass('active');
  });
  /*
      loop fancybox
   */

  $.fancybox.defaults.loop = true;
  /*
      change catalog photo
   */

  $('.catalog__content-img .small figure').on('click', function () {
    var activeFigure = $(this).attr('class');

    if ($(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $('.catalog__content-img .small figure').removeClass('active');
      $(this).addClass('active');
      $('.catalog__content-img .big img').removeClass('active');
      $('.catalog__content-img .big img.' + activeFigure).addClass('active');
    }
  });
  /*
      change color for
      catalog photo
   */

  var bgColor = $('.catalog__content-img'),
      catalogTitle = $('p.color output'),
      smallImg = document.querySelectorAll('.catalog__content-img .small figure img'),
      bigImg = document.querySelectorAll('.catalog__content-img .big img');
  $('.catalog__content .color figure').on('click', function () {
    var activeColor = $(this).attr('class');

    if ($(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $('.catalog__content .color figure').removeClass('active');
      $(this).addClass('active');

      var path = $("body").data('path');

      for (var _j = 0; _j < smallImg.length; _j++) {
        smallImg[_j].src = path + "/img/catalog/".concat(activeColor, "/").concat(_j + 1, ".png");
        bigImg[_j].src = path + "/img/catalog/".concat(activeColor, "/").concat(_j + 1, ".png");
      }
    }

    if (activeColor === 'blue') {
      bgColor.removeClass('gray red').addClass('blue');
      catalogTitle[0].innerText = 'Голубой';
    } else if (activeColor === 'gray') {
      bgColor.removeClass('blue red').addClass('gray');
      catalogTitle[0].innerText = 'Серый';
    } else if (activeColor === 'red') {
      bgColor.removeClass('blue gray').addClass('red');
      catalogTitle[0].innerText = 'Красный';
    }
  });
  /*
      the same height
   */

  $(function () {
    $('.review__block-text__slider .item figure p').matchHeight({
      byRow: false,
      property: 'height',
      target: null,
      remove: false
    });
  });
  /*
      review slider
   */

  var reviewSlider = $('.review__block-text__slider'),
      slickCenter;
  reviewSlider.on('init', function (slick, event) {
    slickCenter = $('.slick-center');

    slickCenter.next().find('figure').css({
      marginLeft: 'auto'
    });
  });
  reviewSlider.slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 0,
    speed: 300,
    centerMode: true,
    centerPadding: 0,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dots: true,
    responsive: [{
      breakpoint: 980,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        vertical: false,
        verticalSwiping: false
      }
    }]
  });
  reviewSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (currentSlide > nextSlide && (nextSlide !== 0 || currentSlide === 1) || currentSlide === 0 && nextSlide === slick.slideCount - 1) {
      slickCenter = $('.slick-center').prev();
    } else if (currentSlide === nextSlide) {
      slickCenter = $('.slick-center');
    } else {
      slickCenter = $('.slick-center').next();
    }

    slickCenter.find('figure').css({
      marginLeft: '0'
    });
    slickCenter.next().find('figure').css({
      marginLeft: 'auto'
    });
  });
  /*
      political
   */

  var bodyFilter = document.querySelector('.body__filter'),
      politicalOpen = document.querySelector('p.politic'),
      political = document.querySelector('.political'),
      politicalClose = document.querySelector('img.close'),
      closePolitical = function closePolitical() {
    document.querySelector('html').style.overflowY = 'scroll';
    bodyFilter.style.zIndex = '-5';
    political.style.cssText = "transform: translate(-50%, -50%) rotateX(-90deg);\n        z-index: -5;";
  };

  politicalOpen.addEventListener('click', function () {
    document.querySelector('html').style.overflowY = 'hidden';
    bodyFilter.style.zIndex = '999';
    political.style.cssText = "transform: translate(-50%, -50%) rotateX(0deg);\n        z-index: 9999;";
  });
  politicalClose.addEventListener('click', closePolitical);
  bodyFilter.addEventListener('click', closePolitical);
  /*
      change href on mobile
   */

  if (/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
    var order = document.querySelectorAll('figure.order a');

    for (var _j2 = 0; _j2 < order.length; _j2++) {
      order[_j2].href = '#mobile-order';
    }

    var adv = document.querySelectorAll('.advantages__content figure');
    $(adv).css({
      background: 'linear-gradient(to bottom, #e84a4b, #710d7c)',
      width: '33%'
    });

    for (var _j3 = 0; _j3 < adv.length; _j3++) {
      adv[_j3].children[3].style.opacity = '1';
    }
  }
};