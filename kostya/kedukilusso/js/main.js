$(function () {

	$(".review__wrapper").owlCarousel({
		loop: true,
		nav : true,
		items: 2,
		margin: 70,
		dots: false,
		stagePadding: 35,
		autoplay:true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive:{
			290: {
				items: 1,
				stagePadding: 0,
				margin: 40,
				center: true,
				dots: true,
			},
			600: {
				items: 1,
				stagePadding: 35,
				margin: 40,
				center: true,
				dots: true,
			},
			800: {
				margin: 15,
				stagePadding: 10,
			},
			1081: {
				margin: 40,
				stagePadding: 35,
			},
			1440: {
				margin: 70,
			}
		}
	});

	$.raty.path = 'img/raty';

	$('.modal__raiting').raty({
		half: true,
		space: false,
		number: 5,
	});

	AOS.init({
		disable : 'mobile',
		once: true,
		// offset : -100,
	});

	$(window).resize(function() {
		AOS.refresh();
	})

	$('[data-fancybox]').fancybox({
		loop: true,
	});

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

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = 0;
		if ($(document).width() <= 414) {
			fixedOffset = 400;
		}
		if ($(document).width() <= 375) {
			fixedOffset = 300;
		}
		if ($(document).width() <= 360) {
			fixedOffset = 400;
		}
		if ($(document).width() <= 320) {
			fixedOffset = 450;
		}

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});

	function carousel(selector, btnSelector) {
		var acarousel = $(selector).acarousel();

		function changeActive(move) {
			var index = acarousel.getPos(move).index;
			$(".move").removeClass("active").eq(index).addClass("active");
			}

			changeActive();
			
			$(".move").click(function () {
			if (acarousel.isAnim()) return false; 
			var index = $(".move").index(this);
			var move = acarousel.moveByIndex(index);
			changeActive(move);
			return false;
			});

		$(selector).swiperight(function() {
			if (acarousel.isAnim()) return false; 
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		})

		$(selector).swipeleft(function() {
			if (acarousel.isAnim()) return false; 
			var move = acarousel.move(-1)
			changeActive(move);;
			return false;
		})

		$(btnSelector + " .move__back").click(function () {
			if (acarousel.isAnim()) return false; 
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		});
			
		$(btnSelector + " .move__next").click(function () {
			if (acarousel.isAnim()) return false; 
			var move = acarousel.move(-1)
			changeActive(move);;
			return false;
		});

		$(window).resize(function () {
			acarousel.init();
		});
	}

	carousel(".slider__wrapper", ".move__mark", "active");


	$(".copiright span").text(new Date().getFullYear())
	
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

	$(".time").text(getDate(2));

	function switchFotoCard(selector) {
		$(selector + " .card__foto-wrapper").click( function () {
			var getSrc = $(this).children().attr("src");
			var getBigFotoSrc = $(selector + " .main__foto .card__img").attr("src");
			if( getSrc !== getBigFotoSrc) {
				$(selector + " .main__foto .card__img").hide().attr("src", getSrc).fadeIn(1000);
				console.log($(selector + " .main__foto .card__img"))
				$(selector + " .main__foto .card__img").parent().attr("href", getSrc);
			}
			return false
		})
	}

	switchFotoCard(".card__1")
	switchFotoCard(".card__2")
	switchFotoCard(".card__3")

	function animateElement (selector, animation) {
		$(window).scroll(function() {
			$(selector).each(function(){
			var imagePos = $(this).offset().top;
	
			var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+600) {
					$(this).addClass(animation);
				}
			});
		});
	}

	function parallax(selectorWrapper, selectorElement) {
		var banner = $(selectorWrapper);
		var imgs = $(selectorElement);
		function showAllObjects (object) {
			object.fadeIn(900);
		}

		function moving (object, speed) {
			banner.on('mousemove', function(event) {
				var X = Math.floor((event.pageX)/speed-20) + "px";
				var Y = Math.floor((event.pageY)/speed) + "px";
				object.css('transform', 'translate('+X+' , '+Y+')');
			});
		}

		function moveAll (object) {
			moving($(object[0]),100);
			moving($(object[1]),90);
			moving($(object[2]),110);
			moving($(object[3]),100);
			moving($(object[4]),90);
			moving($(object[5]),110);
		}

		showAllObjects(imgs);
		moveAll(imgs);
	}

	if($(window).width() >= 1080) {
		animateElement(".card__1 .card__galary", "fade__in")
		animateElement(".card__2 .card__galary", "fade__in")
		animateElement(".card__3 .card__galary", "fade__in")
		parallax(".site__header", ".parallax")
		parallax(".footer__wrapper", ".parallax__2")
	}
})

