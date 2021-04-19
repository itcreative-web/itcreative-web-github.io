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

  formatDate(today); // МОДАЛЬНОЕ ОКНО 

  $('[data-fancybox]').fancybox({
    loop: true
  });
  $(".modal").fancybox({}); // Якоря к карточке заказа товара в секции продукты

  $(".btn-scroll").click(function (event) {
    if ($(window).width() <= 1000) {
      event.preventDefault();
      var top = $("#order-form").offset().top;
      $('body, html').animate({
        scrollTop: top + $("#order-form").height() - $(window).height()
      }, 800);
    } else if ($(window).width() <= 2600) {
      event.preventDefault();
      var top = $("#order-form").offset().top;
      $('body, html').animate({
        scrollTop: top - 350
      }, 800);
    }
  }); // SLIDER REWIEV

  $('.rewiev__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    arrows: false,
    adaptiveHeight: true,
    infinite: true,
    dots: false,
    responsive: [{
      breakpoint: 481,
      settings: {
        dots: true,
        appendDots: $('.rewiev__container'),
        customPaging: function customPaging(slider, i) {
          return '<button class="my__dots"></button>';
        }
      }
    }]
  });
});