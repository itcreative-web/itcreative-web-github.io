$(function () {

	$(".header__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 30,
		dots: true,
		// autoplay:true,
		// autoplayTimeout: 4000,
		// autoplayHoverPause: true,
		// responsive:{
		// 	290: {
		// 		items: 2,
		// 	},
		// 	900: {
		// 		items: 3,
		// 	},
		// 	1281: {
		// 		items: 4,
		// 	}
		// }
	});

	var owl = $(".block__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 30,
		dots: false,
		onTranslate: callback,
	});

	function callback(event) {
		var item = event.item.index; 
		$(".block__slide-wrapper").removeClass("active")
		$(".block__slide-wrapper").eq(item-2).addClass("active")
	}

	$(".block__slide-wrapper").click(function() {
		var currentSlide = $(this).attr("data-item");
		owl.trigger('to.owl.carousel', [currentSlide-1]);
	})

	$(".footer__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 30,
		dots: true,
	});

	$(".review__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 3,
		margin: 10,
		dots: true,
		stagePadding: 10,
		center: true,
		// autoplay:true,
		// autoplayTimeout: 4000,
		// autoplayHoverPause: true,
		responsive:{
			290: {
				items: 1,
				stagePadding: 10,
				margin: 30,
			},
			415: {
				items: 3,
			},
		}
	});

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = 0;
		// if ($(document).width() <= 768) {
		// 	fixedOffset = 300;
		// }

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});


// 	AOS.init({
// 		disable : 'mobile',
// 		once: true,
// 		// offset : -100,
// 	});

// 	$(window).resize(function() {
// 		AOS.refresh();
// 	})

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	function privacy() {
		$(".privacy").click(function () {
			$(".privacy-policy-popup").addClass("active")
		})

		function close() {
			$(".privacy-policy-popup").removeClass("active")
		}

		$(".privacy-policy-popup").click( function(e) {
			var target = e.target;
			if(target.classList.contains("privacy__close")) {
				close()
			}
			if(target.classList.contains("privacy-policy-popup")) {
				close()
			}
		})
	}

	privacy()


})

