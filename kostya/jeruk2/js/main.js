$(function () {

	$(".slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 50,
		dots: true,
	});

	$('[data-fancybox]').fancybox({
		loop: true,
		infobar: false,
		animationEffect: false,
		backFocus: false,
        hash: false,
	});

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = 50;
		var cardHeight = $("#card").outerHeight(false)
		var windowHeight = $(window).height()

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
		e.preventDefault();
	});

	function showBtn() {
		var $element = $('.card__section');

		$(window).scroll(function() {
			var scroll = $(window).scrollTop() + $(window).height();
			var offset = $element.offset().top + $element.height();
			var bodyOffset = $("body").offset().top + $("body").height();
			if ((scroll > offset + 400 || scroll < offset - $element.height() - 200)) {
				$(".site__order-btn").show(100);
			} else {
				$(".site__order-btn").hide(100)
			}
		});
	}

	showBtn()

})

