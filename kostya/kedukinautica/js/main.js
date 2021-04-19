$(function () {
	AOS.init();

	$('[data-fancybox]').fancybox({
		loop: true,
	});
	$(".slider").slick({
		infinite: true,
		dots: false,
	})
	$(".reviews").slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		centerMode: true,
		// adaptiveHeight: true
		responsive: [
			{
				breakpoint: 1080,
				settings: {
					centerMode: false,
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 740,
				settings: {
					centerMode: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			}
		]
	})

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 1000) {
			fixedOffset = -200;
		}
		if ($(document).width() <= 660) {
			fixedOffset = -200;
		}
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});

	Date.prototype.daysInMonth = function () {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	};

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

	function getDate(plusDays) {
		var today = new Date();
		var dd = String(today.getDate() + plusDays).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = String(today.getFullYear());
		yyyy = yyyy.substr(yyyy.length - 2);
		var currentDaysInMonth = new Date().daysInMonth()
		if (+dd > currentDaysInMonth) {
			dd = String(dd - currentDaysInMonth).padStart(2, '0');
			mm++
		}
		return dd + "." + mm + "." + yyyy
	}

	$(".time span").text(getDate(2));

	function switchBtns(selector) {
		$(selector + " .card__size-button").click(function () {
			$(selector + " .card__size-block").removeClass("active");
			$(this).parent().addClass("active");
		})
	}

	switchBtns(".card__1");
	switchBtns(".card__2");
	switchBtns(".card__3");

	function galary() {
		$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$(".foto__wrapper")
				.removeClass("active")
				.eq(nextSlide)
				.addClass("active");
		  });

		$(".foto__wrapper").click(function() {
			$(".slider").slick("slickGoTo", $(this).attr("data-img") - 1);
		})
	}

	galary()
})
