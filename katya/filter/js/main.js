"use strict";

$(document).ready(function () {
  // Якоря к карточке заказа товара
  $(".btn-scroll").click(function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // console.log(top + "якорь");

    $('body, html').animate({
      scrollTop: top - 300
    }, 800);
  }); // ПРИБАВЛЯЮ К ТЕКУЩЕЙ ДАТЕ ТРИ ДНЯ ДЛЯ "Акция продлится до ..."

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

  formatDate(today); // ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (до конца дня - etType: 1)"

  $(".eTimer").eTimer({
    etType: 1,
    etDate: "09.04.2021.0.0",
    etTitleText: "",
    etTitleSize: 10,
    etShowSign: 0,
    etSep: ":",
    etFontFamily: "Trebuchet MS",
    etTextColor: "white",
    etPaddingTB: 7,
    etPaddingLR: 10,
    etBackground: "#ff3d00",
    etBorderSize: 0,
    etBorderRadius: 0,
    etBorderColor: "white",
    etShadow: " 0px 0px 0px 0px #333333",
    etLastUnit: 4,
    etNumberFontFamily: "Arial",
    etNumberSize: 18,
    etNumberColor: "white",
    etNumberPaddingTB: 0,
    etNumberPaddingLR: 0,
    etNumberBackground: "transparent",
    etNumberBorderSize: 0,
    etNumberBorderRadius: 0,
    etNumberBorderColor: "white",
    etNumberShadow: " 0px 0px 0px 0px transparent"
  }); // МОДАЛЬНОЕ ОКНО 

  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // SLIDER FILTER

  $('.filter__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: true,
    infinite: true,
    appendArrows: $('.slider__wrapper-filter'),
    prevArrow: '<div class="slider-btn product__prev"><img src="img/icons/arrow-left.svg" alt="arrow"></div>',
    nextArrow: '<div class="slider-btn product__next"><img src="img/icons/arrow-right.svg" alt="arrow"></div>',
    dots: true,
    appendDots: $('.slider__wrapper-filter'),
    customPaging: function customPaging(slider, i) {
      return '<button class="my__dots"></button>';
    }
  });
  $('.dispenser__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: true,
    infinite: true,
    appendArrows: $('.slider__wrapper-dispenser'),
    prevArrow: '<div class="slider-btn product__prev"><img src="img/icons/arrow-left.svg" alt="arrow"></div>',
    nextArrow: '<div class="slider-btn product__next"><img src="img/icons/arrow-right.svg" alt="arrow"></div>',
    dots: true,
    appendDots: $('.slider__wrapper-dispenser'),
    customPaging: function customPaging(slider, i) {
      return '<button class="my__dots"></button>';
    }
  }); // SLIDER REWIEV

  $('.rewiev__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: true,
    adaptiveHeight: true,
    infinite: true,
    appendArrows: $('.rewiev__container'),
    prevArrow: '<div class="slider-btn rewiev__prev"><img src="img/icons/arrow-left.svg" alt="arrow"></div>',
    nextArrow: '<div class="slider-btn rewiev__next"><img src="img/icons/arrow-right.svg" alt="arrow"></div>',
    dots: true,
    appendDots: $('.rewiev__container'),
    customPaging: function customPaging(slider, i) {
      return '<button class="my__dots"></button>';
    }
  });
});