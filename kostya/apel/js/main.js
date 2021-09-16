$(function () {

	if($(window).width() <= 700) {
		$(".advantages").addClass("owl-carousel").owlCarousel({
			loop: true,
			nav : false,
			items: 1,
			margin: 50,
			dots: true,
			stagePadding: 20,
		});
	}


	$(".review__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 3,
		margin: 30,
		dots: false,
		stagePadding: 20,
		responsive:{
			0:{
				items: 1,
				autoHeight: true,
				stagePadding: 13,
			},
			799: {
				items: 2,
				autoHeight: false,
				stagePadding: 20,
			},
			1000: {
				items: 3,
				autoHeight: false,
				stagePadding: 20,
			}
		}
	});


	// AOS.init({
	// 	disable : 'mobile',
	// 	once: true,
	// 	// offset : -200,
	// });

	// $(window).resize(function() {
	// 	AOS.refresh();
	// })

	// $('[data-fancybox]').fancybox({
	// 	loop: true,
	// 	infobar: false,
	// 	animationEffect: false,
	// 	backFocus: false,
    //     hash: false,
	// });


	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = 0;
		var cardHeight = $("#card").outerHeight(false)
		var windowHeight = $(window).height()

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
		e.preventDefault();
	});

	function addVideoOnPage(selector) {
		$(selector).click(function() {
			$(this).addClass("inactive")
			if ($("video", this).length) {
				return;
			}
			var videoId = $(this).data("video");
			var videoSrc =  videoId;
			$(this).append(
				"<video src='" + videoSrc + "' style='object-fit: cover; background-size: cover; width: 100%; height: 100%;' preload='auto' playsinline='' autoplay='' controls=''></video>"
			);
		});
	}

	addVideoOnPage(".header__video");
	addVideoOnPage(".review__video-1");
	addVideoOnPage(".review__video-2");

	var scenesParallax = [];

	mQ("(max-width: 1023px)", function () {
	   if (!scenesParallax.length) return
	   scenesParallax.forEach(function (scene) {
		  scene.disable();
		  scene.element.removeAttribute('style');
	   })
	}, function () {
	   if (scenesParallax.length === 0) {
		  $('.parallax').each(function (i) {
			 scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
				frictionX: 0.0002,
				frictionY: 0.0002,
				invertX: Math.random() >= 0.5,
				invertY: Math.random() >= 0.5
			 });
		  })
	   } else {
		  scenesParallax.forEach(function (scene) {
			 scene.enable();
		  })
	   }
	});
 
	function randomNum(min, max) {
	   var numLow = min, numHigh = max,
		  adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
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

})

