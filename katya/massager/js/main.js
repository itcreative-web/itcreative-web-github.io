"use strict";

$(document).ready(function () {
  // Якоря к карточке заказа товара
  $(".btn-scroll").click(function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // console.log(top + "якорь");

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
    etTextColor: "#ff5a5a",
    etPaddingTB: 7,
    etPaddingLR: 5,
    etBackground: "white",
    etBorderSize: 0,
    etBorderRadius: 0,
    etBorderColor: "white",
    etShadow: " 0px 0px 0px 0px #333333",
    etLastUnit: 4,
    etNumberFontFamily: "Arial",
    etNumberSize: 20,
    etNumberColor: "#ff5a5a",
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
  }); // ПЕРЕКЛЮЧЕНИЕ ТОВАРА В СЕКЦИИ PRODUCT

  $(".product__color").click(function (event) {
    var id = $(this).attr('id'); // меняю активную кнопку

    $(".product__color").each(function (indx, element) {
      $(element).removeClass("color_active");
    });
    $('[id =' + id + ']').addClass("color_active"); // меняю описание товара

    $(".product__description").each(function (indx, element) {
      $(element).removeClass("description_active");
    });
    $('[data-description =' + id + ']').addClass("description_active"); // меняю цену товара

    $(".product__price").each(function (indx, element) {
      $(element).removeClass("price_active");
    });
    $('[data-price =' + id + ']').addClass("price_active"); // меняю фото товара

    $(".product__img").each(function (indx, element) {
      $(element).removeClass("product__img_active");
    });
    $('[data-img =' + id + ']').addClass("product__img_active");
  });
});