$(function () {
	AOS.init();

	$('[data-fancybox]').fancybox({
		loop: true,
	});

	$('.reviews__wrapper').slick({
		dots: true,
		slidesToShow: 1,
		slideToScroll: 1,
		variableWidth: true,
		centerMode: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
	});

	$.raty.path = 'img/raty';

	$('.modal__raiting').raty({
		half: true,
		space: false,
		number: 5,
	});

	function modal() {
		$(".reviews .order__link").click(function () {
			$.fancybox.open($(".modal"), {
				infobar: false,
				touch: false,
			})
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
				$(".modal .fancybox-close-small").click();
			}, 5000);
		}
	}

	modal()


	function carousel(selector, mark) {
		if ($(window).width() <= 660) {
			var acarousel = $(selector).acarousel();

			$(selector).swipe({
				swipeStatus: function (event, phase, direction) {
					if (phase == "end") {
						//сработает через 20 пикселей то число которое выбрали в threshold
						if (direction == 'left') {
							//сработает при движении влево
							var move = acarousel.move(-1)
							changeActive(move);
						}
						if (direction == 'right') {
							//сработает при движении вправо
							var move = acarousel.move(1);
							changeActive(move);
						}
					}
				},
				triggerOnTouchEnd: false,
				threshold: 20,
			});

			function changeActive(move) {
				var index = acarousel.getPos(move).index;
				$(mark + " .move").removeClass("active").eq(index).addClass("active");
			}
			changeActive();

			$(".move").click(function () {
				if (acarousel.isAnim()) return false;
				var index = $(".move").index(this);
				var move = acarousel.moveByIndex(index);
				changeActive(move);
				return false;
			});

			$(window).resize(function () {
				acarousel.init();
			});
		}
	}

	carousel(".galary__wrapper", ".galary .move__mark");
	carousel(".main__galary-wrapper", ".main__galary .move__mark");

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

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 800) {
			fixedOffset = 400;
		}
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});

	function getDate(plusDays) {
		var today = new Date();
		var dd = String(today.getDate() + plusDays).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
		var currentDaysInMonth = new Date().daysInMonth()
		if (+dd > currentDaysInMonth) {
			dd = String(dd - currentDaysInMonth).padStart(2, '0');
			mm++
		}
		return dd + "." + mm + "." + yyyy
	}

	$(".time span").text(getDate(2));

	function buttonsHandler() {
		function animateBoots() {
			$(".header__boots").each(function () {
				$(this).removeClass("active");
			})
			$(".header__btn").each(function () {
				$(this).removeClass("active");
			})
			$(".header__men").each(function () {
				$(this).removeClass("active");
			})
		}

		$("header .header__btn").click(function (e) {
			animateBoots()
			if ($(this).hasClass("header__btn-black")) {
				$(".header__boots-black").addClass("active");
				$(".header__btn.header__btn-black").addClass("active");
				$(".header__men.header__men-black").addClass("active");
			}
			if ($(this).hasClass("header__btn-white")) {
				$(".header__boots-white").addClass("active");
				$(".header__btn.header__btn-white").addClass("active");
				$(".header__men.header__men-white").addClass("active")
			}
		})
	}
	buttonsHandler()

	function rotateGalary() {
		function resetActive() {
			$(".rotation__btn").each(function () {
				$(this).removeClass("active");
			})
			$(".rotation__boot").each(function () {
				$(this).removeClass("active");
			})
			$(".advantages").each(function () {
				$(this).removeClass("active");
			})
		}
		$(".rotation__btn").click(function () {
			resetActive()
			$(this).addClass("active");
			var currentDataImg = $(this).attr("data-img");
			var currentDataAdvantage = $(this).attr("data-advantage");
			if ($(".rotation__boot[src='" + currentDataImg + "']")) {
				$(".rotation__boot[src='" + currentDataImg + "']").addClass("active");
				$("." + currentDataAdvantage).addClass("active");
			}

		})
	}
	rotateGalary()

	function mainGalary() {
		$(".galary__btns-group .header__btn").click(function () {
			$(".galary__btns-group .header__btn").each(function () {
				$(this).removeClass("active")
			})
			if ($(this).hasClass("header__btn-white")) {
				$(this).addClass("active");
				$(".galary__wrapper a > img").each(function () {
					$(this)
						.hide()
						.attr("src", $(this).attr("data-white"))
						.fadeIn(1000);
					$(this).parent().attr("href", $(this).attr("data-white"))
				})
			}
			if ($(this).hasClass("header__btn-black")) {
				$(this).addClass("active");
				$(".galary__wrapper a > img").each(function () {
					$(this)
						.hide()
						.attr("src", $(this).attr("data-black"))
						.fadeIn(1000);
					$(this).parent().attr("href", $(this).attr("data-black"))
				})
			}
		})
	}
	mainGalary()

	function switchBtns(selector) {
		$(selector + " .size__btn").click(function () {
			$(selector + " .size__btn").each(function () {
				$(this).removeClass("active");
				$(this).siblings("span").removeClass("active")
			})
			$(this).addClass("active");
			$(this).siblings("span").addClass("active")
		})
	}

	switchBtns(".card__1");
	switchBtns(".card__2");
	switchBtns(".card__3");

	function galary(selector) {
		var galaryFototsSelector = selector + " .card__galary-img";

		function toggleDataSrcAtribute(string) {
			$(selector + " .card__left-img")
				.hide()
				.attr("src", $(selector + " .card__left-img").attr("data-" + string))
				.fadeIn(1000);
			$(galaryFototsSelector).each(function () {
				$(this)
					.hide()
					.attr("src", $(this).attr("data-" + string))
					.fadeIn(1000)
				$(this).parent().attr("href", $(this).attr("data-" + string))
			})
		}

		$(selector + " .toggle__label input").change(function () {
			if ($(this).is(":checked")) {
				toggleDataSrcAtribute("black");
			} else {
				toggleDataSrcAtribute("white");
			}
		})
	}

	galary(".card__1")
	galary(".card__2")
	galary(".card__3")



	function avtoGalary() {
		function clickBtn() {
			if ($(".rotation__btn.active").next().hasClass("rotation__boot")) {
				$(".rotation__btn-1").click()
			} else {
				$(".rotation__btn.active").next().click()
			}
		}
		function int() {
			clickBtn()
		}
		var interval = setInterval(int, 3000);
		$(".rotation__boot, .rotation__btn").mouseover(function () {
			clearInterval(interval)
		})

		$(".rotation__boot, .rotation__btn").mouseleave(function () {
			interval = setInterval(int, 3000)
		})

	}

	avtoGalary()



})
