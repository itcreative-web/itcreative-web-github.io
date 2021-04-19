$(function () {
	AOS.init();

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 1000) {
			fixedOffset = 600;
		}
		if ($(document).width() <= 660) {
			fixedOffset = -100;
		}
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});


	if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength, padString) {
			targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
			padString = String((typeof padString !== 'undefined' ? padString : ' '));
			if (this.length > targetLength) {
				return String(this);
			}
			else {
				targetLength = targetLength - this.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
				}
				return padString.slice(0, targetLength) + String(this);
			}
		};
	}

	function timer () {
		function runMultiple(hoursSelector, minutesSelector, secondsSelector) {
			var d = new Date();
			var h = String(23 - d.getHours()).padStart(2, "0");
			var m = String(59 - d.getMinutes()).padStart(2, "0");
			var s = String(60 - d.getSeconds()).padStart(2, "0");
			$(hoursSelector).text(h)
			$(minutesSelector).text(m)
			$(secondsSelector).text(s)
		}
		setInterval(function () {
			runMultiple(".hours", ".minutes", ".seconds")
		}, 1000);
	}

	timer()

	function initSliders() {
		$(".reviews").slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			prevArrow: $('.btn__prev'),
			nextArrow: $('.btn__next'),
			responsive: [
				{
					breakpoint: 1026,
					settings: {
					  slidesToShow: 2,
					  slidesToScroll: 1,
					}
				},
				{
					breakpoint: 740,
					settings: {
					  slidesToShow: 1,
					  slidesToScroll: 1,
					}
				},
			]
		});

		if($(document).width() <= 414) {
			$(".galary__wrapper").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				appendArrows: $(".galary__wrapper"),
				prevArrow: '<button type="button" class="galary__btn galary__btn-next"><img src="./img/arrow.png" alt="стрелка" class="btn__img-next"></button>',
				nextArrow: '<button type="button" class="galary__btn galary__btn-prev"><img src="./img/arrow.png" alt="стрелка" class="btn__img-prev"></button>',
			});
		}
	}
	initSliders()
	

	function switchBtns(selector) {
		$(selector + " .size__btn").click(function () {
			$(selector + " .size__btn-block").removeClass("active");
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

	switchColor(".card__1 .card__color-btn")
	switchColor(".card__2 .card__color-btn")

	function galary(selector) {
		var galaryFototsSelector = selector + " .card__galary-img";

		function toggleDataSrcAtribute(string) {
			$(selector + " .card__boot")
				.hide()
				.attr("src", $(selector + " .card__boot").attr("data-" + string))
				.fadeIn(1000);
			$(galaryFototsSelector).each(function () {
				$(this)
					.hide()
					.attr("src", $(this).attr("data-" + string))
					.fadeIn(1000)
				$(this).parent().attr("href", $(this).attr("data-" + string));
			})
		}

		$(selector + " .card__color-btn").click(function () {
			if ($(this).hasClass("btn-white")) {
				toggleDataSrcAtribute("white");
			} 
			if ($(this).hasClass("btn-black")) {
				toggleDataSrcAtribute("black");
			}
		})
	}

	galary(".card__1")
	galary(".card__2")

})
