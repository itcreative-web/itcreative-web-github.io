"use strict";

$(document).ready(function () {
  // Якоря к карточке заказа товара
  $(".btn-scroll").click(function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top + $(id).height() - $(window).height()
    }, 800);
  }); // ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (до конца дня - etType: 1)"

  $(".eTimer").eTimer({
    etType: 1,
    etDate: "09.04.2021.0.0",
    etTitleText: "",
    etTitleSize: 10,
    etShowSign: 0,
    etSep: ":",
    etFontFamily: "Trebuchet MS",
    etTextColor: "#000",
    etPaddingTB: 7,
    etPaddingLR: 5,
    etBackground: "inherit",
    etBorderSize: 0,
    etBorderRadius: 0,
    etBorderColor: "white",
    etShadow: " 0px 0px 0px 0px #333333",
    etLastUnit: 4,
    etNumberFontFamily: "Arial",
    etNumberSize: 64,
    etNumberColor: "#000",
    etNumberPaddingTB: 0,
    etNumberPaddingLR: 0,
    etNumberBackground: "transparent",
    etNumberBorderSize: 0,
    etNumberBorderRadius: 0,
    etNumberBorderColor: "white",
    etNumberShadow: " 0px 0px 0px 0px transparent"
  }); // SLIDER REWIEV

  $('.rewiev__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: false,
    adaptiveHeight: true,
    infinite: true,
    dots: true,
    appendDots: $('.rewiev__container'),
    customPaging: function customPaging(slider, i) {
      return '<button class="my__dots"></button>';
    }
  }); // // МОДАЛЬНОЕ ОКНО 
  //   $('[data-fancybox]').fancybox({
  //     loop: true
  //   }); 
  //   // МОДАЛЬНОЕ ОКНО ОТЗЫВА
  //   $(".modal").fancybox({}); 
});