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
        swipe: true //         dots: true,
        //     appendDots: $('.slider-wrapper_recommend'),
        //     customPaging: function(slick,index) {
        //     startDotsCount++;
        //     if(startDotsCount === 6){
        //       startDotsCount = 1;
        //     }
        //     return '<button class="slider__dot"><span class="slider__dot_abs">0' + startDotsCount + '</span></button>';
        // },

      }
    }, {
      breakpoint: 769,
      settings: {
        swipe: true,
        adaptiveHeight: true //         dots: true,
        //     appendDots: $('.slider-wrapper_recommend'),
        //     customPaging: function(slick,index) {
        //     startDotsCount++;
        //     if(startDotsCount === 6){
        //       startDotsCount = 1;
        //     }
        //     return '<button class="slider__dot"><span class="slider__dot_abs">0' + startDotsCount + '</span></button>';
        // },

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

  $(".menu__item").click(function (event) {
    var parentMenu = $(this).parent();
    var arrItemMenu = parentMenu.children(".menu__item");
    arrItemMenu.each(function (indx, element) {
      $(element).removeClass("menu__item_active");
    });
    $(this).addClass("menu__item_active");
  }); // ПОИСК

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
  }); // Работа с виджетом recaptcha
  // 1. Получить ответ гугл капчи
  // var captcha = grecaptcha.getResponse();
  // // 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
  // // Такую форму не будем отправлять на сервер.
  // if (!captcha.length) {
  //   // Выводим сообщение об ошибке
  //   $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
  // } else {
  //   // получаем элемент, содержащий капчу
  //   $('#recaptchaError').text('');
  // }
  // // 3. Если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
  // if ((formValid) && (captcha.length)) {
  //   // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
  //   formData.append('g-recaptcha-response', captcha);
  // }
  // // 4. Если сервер вернул ответ error, то делаем следующее...
  // // Сбрасываем виджет reCaptcha
  // grecaptcha.reset();
  // // Если существует свойство msg у объекта $data, то...
  // if ($data.msg) {
  //   // вывести её в элемент у которого id=recaptchaError
  //   $('#recaptchaError').text($data.msg);
  // }
  // $('.queue .man:last-child')
  //   .css({'border':'1px solid red'});

  if ($(window).width() < 1367) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'none'
    });
  }

  if ($(window).width() < 1025) {
    $(".section-card__wrapper").after("<div class='ad-unit_bottom ad-unit_margin-top'><img style='width: 100%;' src='img/advertising_bottom.png' alt='ad'/></div>");
  }

  if ($(window).width() < 1001) {
    $(".logo").click(function () {
      $(".menu__wrapper").slideToggle("slow");
    });
    $('.section-card__wrapper .card:last-child').css({
      'display': 'block'
    });
  }

  if ($(window).width() < 769) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'none'
    });
    $('.logo').unbind('click');
    $(".btn-menu").click(function () {
      // $(".menu").slideToggle("100");
      $(".menu").toggleClass("menu_open");
      $(".btn-menu").toggleClass("btn-menu_open");
      $("html,body").toggleClass("scroll-hidden");
    });
  }

  if ($(window).width() < 601) {
    $('.section-card__wrapper .card:last-child').css({
      'display': 'block'
    });
  }
});