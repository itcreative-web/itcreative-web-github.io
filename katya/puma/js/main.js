"use strict";

var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(window.navigator.userAgent || window.navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((window.navigator.userAgent || window.navigator.vendor || window.opera).substr(0, 4));

if (isMobile) {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

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

  formatDate(today); // Якоря к карточке заказа товара в секции продукты

  $(".btn-scroll").click(function (event) {
    if ($(window).width() <= 1590) {
      event.preventDefault();
      console.log("before 1000");
      var top = $("#order-buy").offset().top;
      $('body, html').animate({
        scrollTop: top + $("#order-buy").height() - $(window).height()
      }, 800);
    } else if ($(window).width() <= 970) {
      event.preventDefault();
      console.log("before 1000");
      var top = $("#order-buy").offset().top;
      $('body, html').animate({
        scrollTop: top - 400
      }, 800);
    } // } else if ($(window).width() <= 1900) {
    //   event.preventDefault();
    //   console.log("after 1000");
    //   var top = $("#order-buy").offset().top;
    //   $('body, html').animate({
    //     scrollTop: top - 450
    //   }, 800);
    // } else if ($(window).width() <= 2560) {
    //   event.preventDefault();
    //   var top = $("#order-buy").offset().top;
    //   $('body, html').animate({
    //     scrollTop: top - 500
    //   }, 800);
    // }

  }); // Якоря к секции комментарии

  $(".btn-comments").click(function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top
    }, 800);
  }); // МОДАЛЬНОЕ ОКНО 

  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // ВЫСТАВЛЕНИЕ РЕЙТИНГА В МОДАЛЬНОМ ОКНЕ ОТЗЫВА

  function move(e, obj) {
    var summ = 0;
    var id = obj.next().attr('id').substr(1);
    var progress = e.pageX - obj.offset().left;
    var rating = progress * 5 / $('.stars').width();
    $('#param' + id).text(rating.toFixed(1));
    obj.next().width(progress);
    $('.rating').each(function () {
      summ += parseFloat($(this).text());
    });
    summ = summ / $('.rating').length;
    $('#sum_progress').width(Math.round($('.stars').width() * summ / 5));
    $('#summ').text(summ.toFixed(2));
  }

  $('#rating .stars').click(function (e) {
    $(this).toggleClass('fixed');
    move(e, $(this));
  });
  $('#rating .stars').on('mousemove', function (e) {
    if ($(this).hasClass('fixed') == false) move(e, $(this));
  });
  $('#rating [type=submit]').click(function () {
    summ = parseFloat($('#summ').text());
    jQuery.post('change_rating.php', {
      obj_id: $(this).attr('id').substr(3),
      rating: summ
    }, notice);
  });

  function notice(text) {
    $('#message').fadeOut(500, function () {
      $(this).text(text);
    }).fadeIn(2000);
  } // ЗАКРЫТИЕ МОДАЛКИ ОТЗЫВА И ОТКРЫТИЕ СООБЩЕНИЯ ОБ УСПЕШНОЙ ОТПРАВКЕ


  $(".modal-message").click(function (event) {
    var valName = $(".modal__name").val();
    var valText = $(".modal__text").val();

    if (valName === "") {
      $(".error_empty").css("display", "block");
    } else if (valText === "") {
      $(".error_empty").css("display", "block");
    } else {
      event.preventDefault();
      $.fancybox.close();
      $.fancybox.destroy();
      $.fancybox.open($('#modal-2'), {
        touch: false
      });
      $(".modal__name").val("");
      $(".modal__text").val("");
      $(".error_empty").css("display", "none");
    }
  }); // ЗАГРУЗКА ВИДЕО ПРИ КЛИКЕ ПОЛЬЗОВАТЕЛЯ

  $('.modalVideo').fancybox({
    arrows: false,
    padding: 0,
    afterClose: function afterClose() {
      $(".video__modal").html("<span></span>");
    }
  });
  $(".play-icon").click(function () {
    var videoId = $(this).data("idvideo");
    var parentDiv = $(".video__modal");

    if (isMobile) {
      var videoElId = "video-" + Date.now();
      $(parentDiv).append("<div id='" + videoElId + "'></div>");
      var player = new YT.Player(videoElId, {
        videoId: videoId,
        events: {
          onReady: function onReady() {
            player.playVideo();
          }
        }
      });
      var strvideoElId = "#" + videoElId;
      $(strvideoElId).addClass("iframeAdaptive");
    } else {
      var videoSrc = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1";
      $(parentDiv).append("<iframe class='iframeAdaptive' src=\"" + videoSrc + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
    }
  });
  $('.gallery__slider-large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    asNavFor: '.gallery__slider-mini',
    appendArrows: $('.gallery__left'),
    prevArrow: '<div class="nav-btn gallery__prev"><img src="img/icons/left-arrow.svg" alt="arrow"/></div>',
    nextArrow: '<div class="nav-btn gallery__next"><img src="img/icons/right-arrow.svg" alt="arrow"/></div>',
    responsive: [{
      breakpoint: 769,
      settings: {
        dots: true,
        customPaging: function customPaging(slick, index) {
          return '<button class="my-slick-button"></button>';
        }
      }
    }]
  });
  $('.gallery__slider-mini').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery__slider-large',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1450,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // СЕКЦИЯ ПРОДУКТЫ - ПЕРЕКЛЮЧЕНИЕ ЦВЕТА И ФОТО

  $("#shoe-white").click(function (event) {
    var arrMiniGallery = $(".product__gallery-mini1");
    arrMiniGallery = Array.prototype.slice.call(arrMiniGallery);
    $(arrMiniGallery).each(function (indx, element) {
      $(element).removeClass("product__gallery-mini_active");
    });
    $(".product__gallery-mini_white").addClass("product__gallery-mini_active");
    $("#shoe-white").addClass("active-color");
    $("#shoe-black").removeClass("active-color");
    $(".color-name").text("Белый");
    var arrBigPhoto = $(".product-abs-product1");
    arrBigPhoto = Array.prototype.slice.call(arrBigPhoto);
    $(arrBigPhoto).each(function (indx, element) {
      $(element).removeClass("product-abs-product_active");
    });
    $(".product-abs-white").addClass("product-abs-product_active");
  });
  $("#shoe-black").click(function (event) {
    var arrMiniGallery = $(".product__gallery-mini1");
    arrMiniGallery = Array.prototype.slice.call(arrMiniGallery);
    $(arrMiniGallery).each(function (indx, element) {
      $(element).removeClass("product__gallery-mini_active");
    });
    $(".product__gallery-mini_black").addClass("product__gallery-mini_active");
    $("#shoe-black").addClass("active-color");
    $("#shoe-white").removeClass("active-color");
    $(".color-name").text("Черный");
    var arrBigPhoto = $(".product-abs-product1");
    arrBigPhoto = Array.prototype.slice.call(arrBigPhoto);
    $(arrBigPhoto).each(function (indx, element) {
      $(element).removeClass("product-abs-product_active");
    });
    $(".product-abs-black1").addClass("product-abs-product_active");
  });
  $("#shoe-brown").click(function (event) {
    var arrMiniGallery = $(".product__gallery-mini3");
    arrMiniGallery = Array.prototype.slice.call(arrMiniGallery);
    $(arrMiniGallery).each(function (indx, element) {
      $(element).removeClass("product__gallery-mini_active");
    });
    $(".product__gallery-mini_brown").addClass("product__gallery-mini_active");
    $("#shoe-brown").addClass("active-color");
    $("#shoe-black2").removeClass("active-color");
    $(".color-name1").text("Желтый");
    var arrBigPhoto = $(".product-abs-product3");
    arrBigPhoto = Array.prototype.slice.call(arrBigPhoto);
    $(arrBigPhoto).each(function (indx, element) {
      $(element).removeClass("product-abs-product_active");
    });
    $(".product-abs-brown").addClass("product-abs-product_active");
  });
  $("#shoe-black2").click(function (event) {
    var arrMiniGallery = $(".product__gallery-mini3");
    arrMiniGallery = Array.prototype.slice.call(arrMiniGallery);
    $(arrMiniGallery).each(function (indx, element) {
      $(element).removeClass("product__gallery-mini_active");
    });
    $(".product__gallery-mini_black2").addClass("product__gallery-mini_active");
    $("#shoe-black2").addClass("active-color");
    $("#shoe-brown").removeClass("active-color");
    $(".color-name1").text("Черный");
    var arrBigPhoto = $(".product-abs-product3");
    arrBigPhoto = Array.prototype.slice.call(arrBigPhoto);
    $(arrBigPhoto).each(function (indx, element) {
      $(element).removeClass("product-abs-product_active");
    });
    $(".product-abs-black2").addClass("product-abs-product_active");
  }); // ИЗМЕНЕНИЕ РАЗМЕРА И ВЫВОД ЕГО НА СТРАНИЦУ

  var arrSizeSelect = $(".product__size_select");
  arrSizeSelect = Array.prototype.slice.call(arrSizeSelect);
  $(arrSizeSelect).each(function (indx, element) {
    $(element).change(function () {
      var checkSize = $(element).children().filter(":selected");
      $(this).prev().html('<p>Размер: <span class="size-name">' + checkSize.val() + '</span></p>');
    });
  }); // СЛАЙДЕР ОТЗЫВЫ

  $('.rewiev-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    appendArrows: $('.rewiev__container'),
    prevArrow: '<div class="nav-btn rewiev__prev"><img src="img/icons/left-arrow.svg" alt="arrow"/></div>',
    nextArrow: '<div class="nav-btn rewiev__next"><img src="img/icons/right-arrow.svg" alt="arrow"/></div>',
    responsive: [{
      breakpoint: 851,
      settings: {
        slidesToShow: 1,
        adaptiveHeight: true
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        adaptiveHeight: true,
        dots: true,
        customPaging: function customPaging(slick, index) {
          return '<button class="my-slick-button"></button>';
        }
      }
    }]
  }); // Parallax

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
  }
});