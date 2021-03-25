"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(window.navigator.userAgent || window.navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((window.navigator.userAgent || window.navigator.vendor || window.opera).substr(0, 4));

if (isMobile) {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

$(document).ready(function () {
  var _$$slick;

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
    if ($(window).width() <= 1000) {
      event.preventDefault();
      console.log("1");
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
      console.log("2");
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

  }); // Якоря к карточке заказа товара в секции продукты

  $(".video-scroll").click(function (event) {
    if ($(window).width() <= 1000) {
      event.preventDefault();
      console.log("1");
      var top = $("#video").offset().top;
      $('body, html').animate({
        scrollTop: top - 200
      }, 800);
    } else if ($(window).width() <= 2600) {
      event.preventDefault();
      var top = $("#video").offset().top;
      $('body, html').animate({
        scrollTop: top - 400
      }, 800);
      console.log("2");
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

  $(".play-icon").click(function () {
    var videoId = $(this).data("idvideo");
    var parentDiv = $(this).parent();

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
      $(".play-icon").css("display", "none");
    } else {
      var videoSrc = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1";
      $(parentDiv).append("<iframe src=\"" + videoSrc + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
      $(".play-icon").css("display", "none");
    }
  }); // SLIDER product

  $('.product1__slider-large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    vertical: true,
    verticalSwiping: true,
    asNavFor: '.product1__slider-mini',
    appendArrows: $('.product1__right'),
    prevArrow: '<div class="nav-btn nav-btn-prev product__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next product__next">&#8250;</div>',
    responsive: [{
      breakpoint: 1501,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
        arrows: false,
        appendDots: '.product1__slider-large',
        dots: true,
        customPaging: function customPaging(slick, index) {
          return '<button class="my__button"></button>';
        }
      }
    }]
  });
  $('.product1__slider-mini').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product1__slider-large',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [{
      breakpoint: 1051,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 856,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }]
  });
  $('.product2__slider-large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    vertical: true,
    verticalSwiping: true,
    asNavFor: '.product2__slider-mini',
    appendArrows: $('.product2__right'),
    prevArrow: '<div class="nav-btn nav-btn-prev product__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next product__next">&#8250;</div>',
    responsive: [{
      breakpoint: 1501,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
        arrows: false,
        appendDots: '.product2__slider-large',
        dots: true,
        customPaging: function customPaging(slick, index) {
          return '<button class="my__button"></button>';
        }
      }
    }]
  });
  $('.product2__slider-mini').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product2__slider-large',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [{
      breakpoint: 1051,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 856,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }]
  });
  $('.product3__slider-large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    vertical: true,
    verticalSwiping: true,
    asNavFor: '.product3__slider-mini',
    appendArrows: $('.product3__right'),
    prevArrow: '<div class="nav-btn nav-btn-prev product__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next product__next">&#8250;</div>',
    responsive: [{
      breakpoint: 1501,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
        arrows: false,
        appendDots: '.product3__slider-large',
        dots: true,
        customPaging: function customPaging(slick, index) {
          return '<button class="my__button"></button>';
        }
      }
    }]
  });
  $('.product3__slider-mini').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product3__slider-large',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [{
      breakpoint: 956,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 856,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false
      }
    }]
  }); // СЛАЙДЕР advantages

  var advantagesDotsCount = 0;
  $('.advantages__slider').slick((_$$slick = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    appendArrows: $('.advantages__wrapper-slider'),
    prevArrow: '<div class="nav-btn nav-btn-prev  advantages__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next advantages__next">&#8250;</div>',
    appendDots: '.advantages__wrapper-img'
  }, _defineProperty(_$$slick, "dots", true), _defineProperty(_$$slick, "customPaging", function customPaging(slick, index) {
    advantagesDotsCount++;
    return '<button class="advantages__button advantages__button' + advantagesDotsCount + '"> <div></div></button>';
  }), _defineProperty(_$$slick, "responsive", [{
    breakpoint: 481,
    settings: {
      slidesToShow: 1,
      adaptiveHeight: true,
      appendDots: '.advantages__wrapper-slider',
      dots: true,
      customPaging: function customPaging(slick, index) {
        return '<button class="my__button"></button>';
      }
    }
  }]), _$$slick)); // СЛАЙДЕР ОТЗЫВЫ

  $('.rewiev-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    // centerPadding: '80px',
    // adaptiveHeight: true,
    arrows: true,
    appendArrows: $('.rewiev__container'),
    prevArrow: '<div class="nav-btn nav-btn-prev rewiev__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next rewiev__next">&#8250;</div>',
    dots: true,
    customPaging: function customPaging(slick, index) {
      return '<button class="my__button"></button>';
    },
    responsive: [{
      breakpoint: 1251,
      settings: {
        slidesToShow: 2,
        centerMode: false
      }
    }, {
      breakpoint: 701,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        adaptiveHeight: true
      }
    }, {
      breakpoint: 481,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true
      }
    }]
  }); // СЛАЙДЕР gallery
  // $('.gallery__slider1').slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   // infinite: true,
  //   arrows: true,
  //   // initialSlide: 3,
  //   centerMode: true,
  // //   centerPadding: '60px',
  //   variableWidth: true,
  //   speed: 300,
  //   appendArrows: $('.gallery1'),
  //   prevArrow: '<div class="nav-btn nav-btn-prev gallery1__prev">&#8249;</div>',
  //   nextArrow: '<div class="nav-btn nav-btn-next gallery1__next">&#8250;</div>',
  //   appendDots: '.gallery1',
  //   dots: true,
  //         customPaging: function(slick,index) {
  //           return '<button class="my__button"> <div></div></button>';
  //         },
  // });

  $('.gallery__slider-large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    speed: 200,
    draggable: false,
    swipe: false,
    touchMove: false,
    infinite: true,
    asNavFor: '.gallery__slider',
    appendArrows: $('.gallery__container'),
    prevArrow: '<div class="nav-btn nav-btn-prev gallery__prev">&#8249;</div>',
    nextArrow: '<div class="nav-btn nav-btn-next gallery__next">&#8250;</div>',
    appendDots: '.gallery__container',
    dots: true,
    customPaging: function customPaging(slick, index) {
      return '<button class="my__button"></button>';
    },
    responsive: [{
      breakpoint: 1051,
      settings: {
        slidesToShow: 2,
        draggable: true,
        swipe: true,
        touchMove: true,
        speed: 300
      }
    }, {
      breakpoint: 651,
      settings: {
        slidesToShow: 1,
        draggable: true,
        swipe: true,
        touchMove: true,
        speed: 300
      }
    }, {
      breakpoint: 651,
      settings: {
        slidesToShow: 1,
        draggable: true,
        swipe: true,
        touchMove: true,
        speed: 300,
        arrows: false
      }
    }]
  });
  $('.gallery__slider-med').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery__slider',
    speed: 200,
    draggable: false,
    swipe: false,
    touchMove: false,
    dots: false,
    arrows: false,
    infinite: true // focusOnSelect: true,
    // responsive: [
    //   {
    //     breakpoint: 956,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 1,
    //       vertical: false,
    //       verticalSwiping: false,
    //     }
    //   },
    //   {
    //     breakpoint: 856,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       vertical: false,
    //       verticalSwiping: false,
    //     }
    //   }
    // ]

  });
  $('.gallery__slider-mini').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 200,
    draggable: false,
    swipe: false,
    touchMove: false,
    asNavFor: '.gallery__slider',
    dots: false,
    arrows: false,
    infinite: true // focusOnSelect: true,
    // responsive: [
    //   {
    //     breakpoint: 956,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 1,
    //       vertical: false,
    //       verticalSwiping: false,
    //     }
    //   },
    //   {
    //     breakpoint: 856,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       vertical: false,
    //       verticalSwiping: false,
    //     }
    //   }
    // ]

  }); // var swiper = new Swiper( '.swiper-container.two', {
  // 		pagination: '.swiper-pagination',
  // 		paginationClickable: true,
  // 		effect: 'coverflow',
  // 		loop: true,
  // 		centeredSlides: true,
  // 		slidesPerView: 'auto',
  // 		coverflow: {
  // 			rotate: 0,
  // 			stretch: 500,
  // 			depth: 150,
  // 			modifier: 1.5,
  // 			slideShadows : false,
  // 		}
  // } );
  // const swiper = new Swiper('.swiper-container', {
  //   speed: 400,
  //   slidesPerView: 3,
  //   spaceBetween: 50,
  //   loop: false,
  //   pagination: false,
  //   centerSlides: true,
  //   centerSlidesBounds: true,
  //   // initialSlide: 4,
  //   spaceBetween: 150,
  //   coverflowEffect: {
  //     rotate: 0,
  //     stretch: 100,
  // 			depth: 150,
  // 			modifier: 1.5,
  //     slideShadows: false,
  //   },
  // });
  // var owl = $(".owl-carousel");
  // owl.owlCarousel({
  // items: 5,
  // margin: 50,
  // autoWidth: true,
  // loop: true,
  // nav: true,
  // center: true,
  // navText : ["",""],
  // dots: true,
  // // responsive : {
  // //   0 : {
  // //     items: 1,
  // //     margin: 50,
  // //     center: false,
  // // },
  // //   850 : {
  // //     items: 2,
  // //     margin: 40,
  // //     center: false,
  // //     dots: true,
  // // },
  // // // breakpoint from 480 up
  // // 1201 : {
  // //   items: 3,
  // //   margin: 50,
  // // },
  // // },
  // });
  // $(".rewiev__prev").click(function() {
  //     owl.trigger('prev.owl.carousel');
  // })
  // $(".rewiev__next").click(function() {
  //     owl.trigger('next.owl.carousel');
  // })
  // var swiper = new Swiper( '.swiper-container.two', {
  // 		pagination: '.swiper-pagination',
  // 		paginationClickable: true,
  // 		effect: 'coverflow',
  // 		loop: true,
  // 	spaceBetween: 10,
  // 		centeredSlides: true,
  // 		slidesPerView: 'auto',
  // 		coverflow: {
  // 			rotate: 0,
  // 			stretch: 720,
  // 			depth: 150,
  // 			modifier: 1,
  // 			slideShadows : false,
  // 		}
  // } );
  // Parallax

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