$(function () {
	AOS.init();

	$('[data-fancybox="slider"]').fancybox({
		loop: true,
	});

	$('[data-fancybox="gallery1"]').fancybox({
		loop: true,
	});

	$('[data-fancybox="gallery2"]').fancybox({
		loop: true,
	});

	$('[data-fancybox="gallery3"]').fancybox({
		loop: true,
	});

	$('[data-fancybox="slider__mobile"]').fancybox({
		loop: true,
	});

	$(".review__btn").click(function () {
		$.fancybox.open($(".modal"), {
			infobar: false,
		})
	})

	function carousel(selector) {
		var acarousel = $(selector).acarousel();

		$(".btn__prev").click(function () {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		});

		$(".btn__next").click(function () {
			if (acarousel.isAnim()) return false;
			acarousel.move(-1);
			// changeActive(move);
			return false;
		});

		$(window).resize(function () {
			acarousel.init();
		});
	}

	carousel(".slider")

	$('.slider__mobile').slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true,
		zIndex: 100000,
		prevArrow: $('.btn__prev'),
		nextArrow: $('.btn__next'),
	});

	$('.messages').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		variableWidth: true,
		dots: false,
		arrows: true,
		prevArrow: $('.message__btn-prev'),
		nextArrow: $('.message__btn-next'),
		responsive: [
			{
				breakpoint: 660,
				settings: {
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
				}
			},
		]
	});
})

