$(function () {
	AOS.init({
		disable : "phone",
		// offset : -100,
	});

	$.raty.path = 'img/raty';

	$('.modal__raiting').raty({
		half: true,
		space: false,
		number: 5,
	});

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	// $('a[data-rel^=lightcase]').lightcase({
	// 	swipe: true,
	// 	showCaption: false,
	// });

	// lightbox.option({
	// 	'alwaysShowNavOnTouchDevices': true,
	// 	'wrapAround': true,
	// 	'disableScrolling': true,
	// })

	if($(window).width() <= 540) {
		$(".galary").slick({
			dots: true,
			appendDots: $(".galary__controls"),
			prevArrow: $(".galary__prev"),
			nextArrow: $(".galary__next"),

		});
		$("[data-fancybox]").fancybox({
			loop: true,
			afterClose: function(instance, current) {
				$(".galary").slick("slickGoTo", current.index-1, true);
			},
		})
	}

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 600) {
			fixedOffset = -200;
		}
		$('html, body')
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

	function modal() {
		$(".add__review").click(function () {
			$(".modal").addClass("active")
		})

		function close() {
			$(".modal").removeClass("active")
		}

		$(".modal").click( function(e) {
			var target = e.target;
			if(target.classList.contains("modal__close")) {
				close()
			}
			if(target.classList.contains("modal")) {
				close()
			}
		})

		function readURL(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					$('.file img').attr('src', e.target.result).css("display", "block");
				};
				reader.readAsDataURL(input.files[0]);
			}
		}

		$(".modal .input__file").on("change", function () {
			readURL(this);
		});

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
				close();
			}, 5000);
		}
	}

	modal()

	function privacy() {
		$(".confidantion").click(function () {
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


	function carousel(selector, btnSelector) {
		var acarousel = $(selector).acarousel({
			moveBefore:function () {
				$(".review__title").css({
					opacity: 0,
					visibility: "hidden"
				})
			},
			moveAfter:function (elem, index, pos_index, t) {
				$(".review__title").css({
					opacity: 1,
					visibility: "visible"
				})
			},

		});

		function changeActive(move) {
			var index = acarousel.getPos(move).index;
			$(btnSelector + " .move").removeClass("active").eq(index).addClass("active");
		}
		changeActive();

		$(btnSelector + " .move").click(function () {
			if (acarousel.isAnim()) return false;
			var index = $(".move").index(this);
			var move = acarousel.moveByIndex(index);
			changeActive(move);
			return false;
		});

		$(btnSelector + " .move__back").click(function () {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		});

		$(btnSelector + " .move__next").click(function () {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(-1);
			changeActive(move);
			return false;
		});

		$(selector).swipeleft(function(e) {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(-1);
			changeActive(move);
			return false;
		})

		$(selector).swiperight(function(e) {
			console.log("swipe")
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		})

		// setInterval(function () {
		// 	if (acarousel.isAnim()) return false;
		// 	var move = acarousel.move(-1);
		// 	changeActive(move);
		// 	return false;
		// }, 5000)


		$(window).resize(function () {
			acarousel.init();
		});
	}

	carousel(".review__wrapper", ".reviews");

})



