$(function () {

	$(".galary__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 20,
		dots: true,
		// autoplay:true,
		// autoplayTimeout: 4000,
		// autoplayHoverPause: true,
	});

	$(".review__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 3,
		margin: 50,
		dots: true,
		dotsEach: true,
		// autoplay:true,
		// autoplayTimeout: 4000,
		// autoplayHoverPause: true,
		responsive:{
			0: {
				items: 1,
				margin: 50,
			},
			1070: {
				items: 2,
			},
			1679: {
				items: 3,
			}
		}
	});

	function addVideoOnPage(selector) {
		$(selector).click(function() {
			$(this).addClass("inactive")
			if ($("video", this).length) {
				return;
			}
			console.log(this)
			var videoId = $(this).data("video");
			var videoSrc =  videoId;
			$(this).append(
				"<video src='" + videoSrc + "' style='object-fit: cover; background-size: cover; width: 100%; height: 100%' preload='auto' playsinline='' autoplay='' loop='' controls=''></video>"
			);
		});
	}

	addVideoOnPage(".galary__video-wrapper1");
	addVideoOnPage(".galary__video-wrapper2");

	// AOS.init({
	// 	disable : 'mobile',
	// 	once: true,
	// 	// offset : -200,
	// });


	// $(window).resize(function() {
	// 	AOS.refresh();
	// })

	$('[data-fancybox]').fancybox({
		loop: true,
		infobar: false,
		animationEffect: false,
	});

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = 0;
		var cardHeight = $("#card").outerHeight(false)
		var windowHeight = $(window).height()

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
		e.preventDefault();
	});
	
	function cardImage(selector) {
		function switchBtn(color) {
			$(selector + " .galary__photo").each(function() {
				var galary = $(this).attr("data-" + color);
				$(this).hide().attr("src", galary).fadeIn(300)
				$(this).parent().attr("href", galary)
			})
		}

		$(selector + " .color__btn").click(function() {
			if($(this).hasClass("active")) {
				return false;
			}

			$(selector + " .color__btn").removeClass("active")
			if($(this).hasClass("blue")) {
				switchBtn("blue")
			}
			if($(this).hasClass("red")) {
				switchBtn("red")
			}
			if($(this).hasClass("black")) {
				switchBtn("black")
			}
			$(this).addClass("active")
		})
	}

	cardImage(".card__1")
	cardImage(".card__2")
	cardImage(".card__3")

	function showBtn() {
		var $element = $('.card__section');

		$(window).scroll(function() {
			var scroll = $(window).scrollTop() + $(window).height();
			var offset = $element.offset().top + $element.height();
			var bodyOffset = $("body").offset().top + $("body").height();
			if ((scroll > offset + 200 || scroll < offset - $element.height() - 0)) {
				if($(window).width() < 480 &&  scroll > bodyOffset - 100) {
					$(".header__order-scroll").hide(100)
				} else {
					$(".header__order-scroll").show(100);
				}
			} else {
				$(".header__order-scroll").hide(100)
			}
		});
	}

	showBtn()

})

