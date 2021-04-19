"use strict";

$(document).ready(function () {
  // Якоря к карточке заказа товара
  $(".btn-scroll").click(function (event) {
    if ($(window).width() <= 1000) {
      event.preventDefault();
      var id = $(this).attr('href');
      var top = $(id).offset().top;
      $('body, html').animate({
        scrollTop: top - 300
      }, 800);
    } else if ($(window).width() <= 2600) {
      event.preventDefault();
      var id = $(this).attr('href');
      var top = $(id).offset().top;
      $('body, html').animate({
        scrollTop: top - 550
      }, 800);
      console.log("2");
    }
  }); // МОДАЛЬНОЕ ОКНО 

  $('[data-fancybox]').fancybox({
    loop: true
  }); // МОДАЛЬНОЕ ОКНО ОТЗЫВА

  $(".modal").fancybox({}); // ПЕРЕКЛЮЧЕНИЕ ТОВАРА В СЕКЦИИ PRODUCT

  $(".product__size").click(function (event) {
    var id = $(this).attr('id'); // меняю активную кнопку

    $(".product__size").each(function (indx, element) {
      $(element).removeClass("active_size");
    });
    $('[id =' + id + ']').addClass("active_size"); // меняю описание товара

    $(".product__about-item").each(function (indx, element) {
      $(element).removeClass("acive_description");
    });
    $('[data-size =' + id + ']').addClass("acive_description"); // меняю цену товара

    $(".product__price").each(function (indx, element) {
      $(element).removeClass("active_price");
    });
    $('[data-price =' + id + ']').addClass("active_price"); // меняю фото товара

    $(".product__img").each(function (indx, element) {
      $(element).removeClass("active_img");
    });
    $('[data-img =' + id + ']').addClass("active_img");
  }); // SLIDER REWIEV

  $('.rewiev__slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 300,
    arrows: false,
    adaptiveHeight: true,
    infinite: true,
    dots: true,
    appendDots: $('.rewiev__wrapper-dots'),
    customPaging: function customPaging(slider, i) {
      return '<button class="my__dots"></button>';
    },
    responsive: [{
      breakpoint: 851,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // ВЫСТАВЛЕНИЕ РЕЙТИНГА В МОДАЛЬНОМ ОКНЕ ОТЗЫВА

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
  }); // ПОЯВЛЕНИЕ И СКРЫТИЕ ФИКСИРОВАННОЙ КНОПКИ КОРЗИНЫ 

  $(window).on('scroll', function () {
    var scrollForm = $("#product").offset().top - $(window).height();
    var scrollFormTop = $("#product").offset().top + $("#product").height();
    var scrollFormBottom = $("#order-form2").offset().top - $(window).height();

    if ($(this).scrollTop() < scrollForm) {
      $('#scroll-fix').css({
        opacity: 1
      }).fadeIn('slow'); // показываю кнопку корзины до первой формы заказа
    } else if ($(this).scrollTop() < scrollFormTop) {
      $('#scroll-fix').css({
        opacity: 0
      }).fadeIn('slow'); // скрываю кнопку корзины от появления первой формы заказа внизу экрана
    } else if ($(this).scrollTop() < scrollFormBottom) {
      $('#scroll-fix').css({
        opacity: 1
      }).fadeIn('slow'); // показываю кнопку корзины от исчезновения первой формы заказа вверху экрана
    } else {
      $('#scroll-fix').css({
        opacity: 0
      }).fadeIn('slow'); // скрываю кнопку корзины от появления второй формы заказа внизу сайта
    }
  }); // Ленивая загрузка bg

  var lazyloadImages;

  if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });
    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyload = function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });

        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    };

    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});