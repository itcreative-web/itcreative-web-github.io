$(function () {
	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top - fixedOffset }, 1000);
		e.preventDefault();
	});

	function switchBtns(selector) {
		$(selector + " .size__btn").click(function () {
			$(selector + " .size__btn").each(function () {
				$(this).parent().removeClass("active");
			})
			$(this).parent().addClass("active");
		})
	}

	switchBtns(".card__1");
	switchBtns(".card__2");
	switchBtns(".card__3");

	function cards(selector) {
		$(selector + " .color__btn").click(function () {
			$(selector + " .color__btn").each(function () {
				$(this).removeClass("active")
			})
			var currentImg = $(selector + " .center__img");
			if ($(this).hasClass("btn__black")) {
				$(currentImg).hide().attr("src", $(currentImg).attr("data-black")).fadeIn(1000);
				$(this).addClass("active");
			}
			if ($(this).hasClass("btn__white")) {
				$(currentImg).hide().attr("src", $(currentImg).attr("data-white")).fadeIn(1000);
				$(this).addClass("active");
			}
		})
	}
	cards(".card__2")

	function currentColor() {
		$(".sprey .color__btn").click(function () {
			$(".sprey .color__btn").each(function () {
				$(this).removeClass("active");
			})
			$(this).addClass("active");
		})
	}
	currentColor()

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function quantity() {
		var startOpacity = $(".header").height() + $(".first-section").height();
		var endOpacity = startOpacity + $(".second-section").height();

		$(window).scroll(function () {
			var currentScroll = window.pageYOffset;
			if (currentScroll >= startOpacity - 700 && currentScroll <= endOpacity - 300) {
				$(".quantity").removeClass("active");
			} else {
				$(".quantity").addClass("active");
			}
		})

		var currentNumber = 25;
		setInterval(function () {
			if (currentNumber >= 2) {
				currentNumber = currentNumber - getRandomInt(3);
				$(".quantity__number").text(currentNumber);
			} else {
				currentNumber = 25;
			}
		}, 60000)
	}

	quantity()
})
