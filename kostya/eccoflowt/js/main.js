$(function () {
	AOS.init();

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	$('.card__1 .slider').slick({
		slidesToShow: 1,
  		slidesToScroll: 1,
		dots: true,
		appendDots: $(".card__1 .card__right"),
		prevArrow: $('.card__1 .btn__prev'),
		nextArrow: $('.card__1 .btn__next'),
	});
	$('.card__2 .slider').slick({
		slidesToShow: 1,
  		slidesToScroll: 1,
		dots: true,
		appendDots: $(".card__2 .card__right"),
		prevArrow: $('.card__2 .btn__prev'),
		nextArrow: $('.card__2 .btn__next'),
	});
	$('.card__3 .slider').slick({
		slidesToShow: 1,
  		slidesToScroll: 1,
		dots: true,
		appendDots: $(".card__3 .card__right"),
		prevArrow: $('.card__3 .btn__prev'),
		nextArrow: $('.card__3 .btn__next'),
	});
	$('.review__slider .slider').slick({
		slidesToShow: 1,
  		slidesToScroll: 1,
		dots: true,
		appendDots: $(".review__slider"),
		prevArrow: $('.review__slider .btn__prev'),
		nextArrow: $('.review__slider .btn__next'),
	});

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 600) {
			fixedOffset = 200;
		}
		if ($(document).width() <= 440) {
			fixedOffset = 300;
		}
		if ($(document).width() <= 320) {
			fixedOffset = 400;
		}
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});


	function modal() {
		$(".add__review").click(function () {
			$.fancybox.open($(".modal"), {
				infobar: false,
				touch: false,
			})
		})

		$(".modal form").submit(function (e) {
			e.preventDefault()
			$(this).removeClass("active");
			$(".send__window").addClass("active");
			$(".modal .name__input").val("")
			$(".modal .modal__area").val("")
			$(".modal .file img").attr("src", "").css("display", "none")
			delayClose()
		})
		function delayClose() {
			setTimeout(function () {
				$(".modal form").addClass("active");
				$(".send__window").removeClass("active");
				$(".modal .fancybox-close-small").click();
			}, 5000);
		}
	}

	modal()

	function switchBtns(selector) {
		$(selector + " .card__size-btn").click(function () {
			$(selector + " .btn__block").removeClass("active");
			$(this).parent().addClass("active");
		})
	}

	switchBtns(".card__1");
	switchBtns(".card__2");
	switchBtns(".card__3");



	function switchColor(selector) {
		$(selector).click(function () {
			$(selector).removeClass("active");
			$(this).addClass("active");
		})
	}

	switchColor(".card__color")


	function galary(selector) {
		var galaryFototsSelector = selector + " .slide__img";

		function toggleDataSrcAtribute(string) {
			$(galaryFototsSelector).each(function () {
				$(this)
					.hide()
					.attr("style", "background-image: url(" + $(this).attr("data-" + string) +")")
					.fadeIn(1000)
				$(this).parent().attr("href", $(this).attr("data-" + string));
			})
		}

		$(selector + " .card__color").click(function () {
			if ($(this).hasClass("white")) {
				toggleDataSrcAtribute("white");
			} else {
				toggleDataSrcAtribute("black");
			}
		})
	}

	galary(".card__2")

	function sliderIndicator(selector, slides) {
		$(selector + " .slick-dots li").each(function(index) {
			if( index === slides - 1) {
				$(this)
					.attr("data-current", "0" + (index + 1))
					.attr("data-next", "0" + 1);
				return
			} else {
				$(this)
					.attr("data-current", "0" + (index + 1))
					.attr("data-next", "0" + (index + 2));
			}
		})
	}

	sliderIndicator(".card__1", 5);
	sliderIndicator(".card__2", 5);
	sliderIndicator(".card__3", 5);
	sliderIndicator(".reviews", 5);

	function initGalary() {
		if($(window).width() <= 600) {
			$('.galary').slick({	
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true,
				arrows: false,
			});
			sliderIndicator(".galary", 4);
		}
	}
	initGalary()
	

	$.fn.marquee = function() {
		this.css({"overflow": "hidden", "white-space": "nowrap"});
		this.wrapInner("<span>");
		this.find("span").css({ "width": "50%", "display": "inline-block", "text-align":"center" });
		this.append(this.find("span").clone());
		this.wrapInner("<div>");
		this.find("div").css("width", "200%");
		var reset = function() {
		  $(this).css("margin-left", "0%");
		  $(this).animate({"margin-left": "-100%" }, 12000, 'linear', reset);
		};
		reset.call(this.find("div"));
	};

	$('.sale__line').marquee();

	function cardSwitcher(selector, mark) {
		$(selector + " .card__info-block .header__order-btn").click(function() {
			$(selector + " .card__info-block").hide().removeClass("active__info");
			$(selector + " .card__info-order").fadeIn(500).addClass("active__info");
			if(mark) {
				$(selector + " " + mark).addClass("active");
			}
		})
		$(selector + " .card__info-order .card__back").click(function() {
			$(selector + " .card__info-order").hide().removeClass("active__info");
			$(selector + " .card__info-block").fadeIn(500).addClass("active__info");
			if(mark) {
				$(selector + " " + mark).removeClass("active");
			}
		})
	}

	cardSwitcher(".card__1")
	cardSwitcher(".card__2")
	cardSwitcher(".card__3")
	cardSwitcher(".sprey__card", ".sprey__advantages")

	var show = true;
    var countbox = ".info__block";
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 700 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.info__number').css('opacity', '1');
            $('.info__number').spincrement({
                thousandSeparator: "",
                duration: 4000,
				leeway: 1,
            });
	
             
            show = false;
        }
    });

	function banner() {
		$(document).mouseleave(function() {
			var time = Date.now();
			if(!localStorage.getItem('time')) {
				localStorage.setItem('time', time + "");
				$(".banner").addClass("active");
			}
			var currentLocalTime = +localStorage.getItem('time')
			
			if( currentLocalTime < ( time - 300000)) {
				localStorage.setItem('time', String(time));
				$(".banner").addClass("active");
			}
		})
	
		$(".banner__close").click(function() {
			$(".banner").removeClass("active");
		})
		$(".banner").click(function(e) {
			if(e.target.classList.contains("banner")) {
				$(".banner").removeClass("active");
			}
		})
	}
	banner()
})
