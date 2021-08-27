$(function () {

	if($(window).width() <= 700) {
		$(".galary__block").addClass("owl-carousel").owlCarousel({
			loop: true,
			nav : true,
			items: 1,
			margin: 50,
			dots: false,
		});
	}


	$.raty.path = 'img/raty';

	$('.modal__raiting').raty({
		half: true,
		space: false,
		number: 5,
	});

	$(".review__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 3,
		margin: 15,
		dots: false,
		responsive:{
			0:{
				items: 1,
				autoHeight: true,
			},
			800: {
				items: 3,
				autoHeight: false,
			}
		}
	});

	function cardSlider (selector) {
		$(selector + " .card__slider").owlCarousel({
			items: 1,
			margin: 100,
			dots: true,
			nav: true,
			loop: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
		});
	}

	cardSlider(".card__1")
	cardSlider(".card__2")

	function addDots(selector) {
		var i = 1; 
		$(selector + ' .owl-dot').each(function(){    
			$(this).find('span').html("0" + i);   
			i++; 
		});
	}

	addDots(".card__1")
	addDots(".card__2")

	AOS.init({
		disable : 'mobile',
		once: true,
		// offset : -200,
	});

	$(window).resize(function() {
		AOS.refresh();
	})

	$('[data-fancybox]').fancybox({
		loop: true,
		infobar: false,
		animationEffect: false,
		backFocus: false,
        hash: false,
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
		// yyyy = yyyy.substr(yyyy.length - 2);
		var currentDaysInMonth = new Date().daysInMonth()
		if (+dd > currentDaysInMonth) {
			dd = String(dd - currentDaysInMonth).padStart(2, '0');
			mm++
		}
		return dd + "." + mm + "." + yyyy
	}

	$(".header__order-time span").text(getDate(2));


	function switchBtns(selector) {
		$(selector + " .card__btn").click(function () {
			$(selector + " .card__btn").removeClass("active")
			$(this).addClass("active");
		})
	}

	switchBtns(".card__1");
	switchBtns(".card__2");
	switchBtns(".card__3");

	function modal() {
		$(".add__review").click(function () {
			$(".modal__review").addClass("active")
		})

		function close() {
			$(".modal__review").removeClass("active")
		}

		$(".modal__review").click( function(e) {
			var target = e.target;
			if(target.classList.contains("modal__close")) {
				close()
			}
			if(target.classList.contains("modal__review")) {
				close()
			}
		})

		$(".modal__review form").submit(function (e) {
			e.preventDefault()
			$(this).removeClass("active");
			$(".send__window").addClass("active");
			$(".modal__review .name__input").val("")
			$(".modal__review .modal__area").val("")
			delayClose()
		})
		function delayClose() {
			setTimeout(function () {
				$(".modal__review form").addClass("active");
				$(".send__window").removeClass("active");
				close();
			}, 5000);
		}
	}

	modal()

})

