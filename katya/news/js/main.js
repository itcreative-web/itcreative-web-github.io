"use strict";

$(document).ready(function () {
  // МОДАЛЬНОЕ ОКНО 
  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // START SLIDER

  var startDotsCount = 0;
  $('.main-slider_start').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    swipe: false,
    fade: false,
    asNavFor: '.toggle-slider_start',
    dots: true,
    appendDots: $('.slider-wrapper_start'),
    customPaging: function customPaging(slick, index) {
      startDotsCount++;

      if (startDotsCount === 6) {
        startDotsCount = 1;
      }

      return '<button class="slider__dot"><span class="slider__dot_abs">0' + startDotsCount + '</span></button>';
    },
    responsive: [{
      breakpoint: 1367,
      settings: {
        swipe: true
      }
    }, {
      breakpoint: 769,
      settings: {
        swipe: true,
        adaptiveHeight: true
      }
    }]
  });
  $('.toggle-slider_start').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: '.main-slider_start',
    vertical: true
  }); // RECOMMEND SLIDER

  $('.main-slider_recommend').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 250,
    swipe: false,
    fade: false,
    asNavFor: '.toggle-slider',
    dots: false,
    responsive: [{
      breakpoint: 1367,
      settings: {
        swipe: true,
        dots: true,
        appendDots: $('.slider-wrapper_recommend'),
        customPaging: function customPaging(slick, index) {
          startDotsCount++;

          if (startDotsCount === 6) {
            startDotsCount = 1;
          }

          return '<button class="slider__dot"><span class="slider__dot_abs">0' + startDotsCount + '</span></button>';
        }
      }
    }, {
      breakpoint: 769,
      settings: {
        swipe: false,
        adaptiveHeight: true
      }
    }]
  });
  $('.toggle-slider_recommend').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: '.main-slider',
    vertical: true
  }); // ДОБАВЛЕНИЕ АКТИВНОГО КЛАССА В СЛАЙДЕРАХ toggle

  $(".toggle__slide").click(function (event) {
    var parentDiv = $(this).parent();
    var arrSlide = parentDiv.children(".toggle__slide");
    arrSlide.each(function (indx, element) {
      $(element).removeClass("toggle__slide_active");
    });
    $(this).addClass("toggle__slide_active");
  }); // ДОБАВЛЕНИЕ АКТИВНОГО КЛАССА В MENU при клике
  // $(".menu__item").click(function (event) {
  //     var parentMenu = $(this).parent();
  //     var arrItemMenu = parentMenu.children(".menu__item");
  //     arrItemMenu.each(function(indx, element){
  //       $(element).removeClass("menu__item_active");
  //     });
  //     $(this).addClass("menu__item_active");
  // });
  // ПОИСК

  $(".search__btn").click(function (event) {
    event.preventDefault();
    $(this).addClass("search__btn_active");
    var inputSearch = $(".search__input").addClass("search__input_active");
    inputSearch.focus();
    inputSearch.blur(function () {
      inputSearch.removeClass("search__input_active");
      $(".search__btn").removeClass("search__btn_active");
    });
  }); // ВЫБОР ГОРОДА 

  $(".city__btn").click(function (event) {
    event.preventDefault();
    $(this).addClass("city__btn_active");
    var citySearch = $(".city__input").addClass("city__input_active");
    citySearch.focus();
    citySearch.blur(function () {
      citySearch.removeClass("city__input_active");
      $(".city__btn").removeClass("city__btn_active");
    });
  }); // ВЫБОР ЯЗЫКА

  $(".language").click(function (event) {
    console.log("***");
    $(".language__btn").focus(function () {
      $(".language").addClass("language_active");
    });
    $(".language__btn").blur(function () {
      $(".language").removeClass("language_active");
    });
  }); // МЕДИА ТОЧКИ - ДОБАВЛЕНИЕ/СКРЫТИЕ КАРТОЧЕК НОВОСТИ, РЕКЛАМЫ

  if ($(window).width() < 1367) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'none'
    });
  }

  if ($(window).width() < 1025) {
    $(".section-card__wrapper").after("<div class='ad-unit_bottom ad-unit_margin-top'><img style='width: 100%;' src='img/advertising_bottom.png' alt='ad'/></div>");
  }

  if ($(window).width() < 1001) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'block'
    });
  }

  if ($(window).width() < 769) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'none'
    });
  }

  if ($(window).width() < 601) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'block'
    });
  } // ДОБАВЛЕНИЕ "..." В ЗАГОЛОВКИ 


  function stringTruncate(str, maxlength) {
    if (str.length < maxlength) {
      return str;
    }

    var pos = str.lastIndexOf(" ", maxlength);
    return str.substring(0, pos) + "...";
  }

  $(".main__slide-link .main__slide-title").each(function (index, item) {
    if ($(window).width() < 2700) {
      $(item).text(stringTruncate($(item).text(), 140));
    }

    if ($(window).width() < 1681) {
      $(item).text(stringTruncate($(item).text(), 110));
    }

    if ($(window).width() < 1441) {
      $(item).text(stringTruncate($(item).text(), 105));
    }
  });
  $(".toggle-slider .toggle__title_start").each(function (index, item) {
    if ($(window).width() < 2700) {
      $(item).text(stringTruncate($(item).text(), 120));
    }

    if ($(window).width() < 1681) {
      $(item).text(stringTruncate($(item).text(), 110));
    }

    if ($(window).width() < 1441) {
      $(item).text(stringTruncate($(item).text(), 95));
    }
  });
  $(".card .card-title").each(function (index, item) {
    if ($(window).width() < 2700) {
      $(item).text(stringTruncate($(item).text(), 130));
    }

    if ($(window).width() < 1681) {
      $(item).text(stringTruncate($(item).text(), 115));
    }

    if ($(window).width() < 1601) {
      $(item).text(stringTruncate($(item).text(), 110));
    }
  });
  $(".toggle-slider_recommend .toggle__title").each(function (index, item) {
    if ($(window).width() < 2700) {
      $(item).text(stringTruncate($(item).text(), 120));
    }

    if ($(window).width() < 1681) {
      $(item).text(stringTruncate($(item).text(), 110));
    }

    if ($(window).width() < 391) {
      $(item).text(stringTruncate($(item).text(), 80));
    }
  }); // ОТКРЫТИЕ И ЗАКРЫТИЕ МЕНЮ при клике на/вне кнопки и области меню

  if ($(window).width() < 769) {
    $('.logo_btn').unbind('click');
    $(".btn-menu").click(function () {
      // $(".menu").slideToggle("100");
      $(".menu").toggleClass("menu_open");
      $(".btn-menu").toggleClass("btn-menu_open");
      $("html,body").toggleClass("scroll-hidden");
    });
    $("*").click(function (event) {
      var targetClassBtn = event.target.classList.contains("btn-menu");
      var targetClassMenu = event.target.classList.contains("menu__wrapper");

      if (targetClassBtn !== true && targetClassMenu !== true) {
        $(".menu").removeClass("menu_open");
        $(".btn-menu").removeClass("btn-menu_open");
        $("html,body").removeClass("scroll-hidden");
        console.log("2");
      }
    });
  } else if ($(window).width() < 1001) {
    $(".logo_btn").click(function () {
      $(".menu__wrapper").slideToggle("slow");
      $(".menu").toggleClass("menu__open_height");
      $("html,body").toggleClass("scroll-hidden");
    });
    $("*").click(function (event) {
      var targetClassLogo = event.target.classList.contains("logo_btn");

      if (targetClassLogo !== true) {
        $(".menu__wrapper").slideUp();
        $(".menu").removeClass("menu__open_height");
        $("html,body").removeClass("scroll-hidden");
        console.log("1");
      }
    });
  }

  if ($(window).height() < 870) {
    $(".menu").css("width", "270px");
    $(".menu").mCustomScrollbar({
      mouseWheel: {
        scrollAmount: 2000
      }
    });
  } // КНОПКА КОПИРОВАТЬ ССЫЛКУ


  $("#shareLink").click(function (event) {
    var copyText = document.getElementById("linkNew");
    copyText.select();
    document.execCommand("copy");
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Скопировано";
  }); // ОТКРЫТИЕ МОДАЛКИ ПОДПИСАТЬСЯ

  $("#subscribe").fancybox({}); // setTimeout(function(){
  //   $('#subscribe').trigger('click');
  // }, 3000);
});