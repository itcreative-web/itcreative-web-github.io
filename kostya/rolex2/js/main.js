$(function () {

	function initSlider(selector) {
		$(selector + " .slider").owlCarousel({
			loop: true,
			nav : true,
			items: 1,
			dots: false,
			onTranslate: callback,
			autoplay:true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
		});
	
		function callback(event) {
			var items     = event.item.count;     // Number of items
			var item      = event.item.index - 2;     // Position of the current item

			if(items === 3) {
				item  = event.item.index - 1; 
			}
	
			if(items === 6 && item === 0) {
				item = 6
			}

			if(items === 6 && item === 7) {
				item = 1
			}

			if(items === 3 && item === 0) {
				item = 3
			}

			if(items === 3 && item === 4) {
				item = 1
			}
	
			$(selector + " .current__slide").text(item);
			$(selector + " .all__slides").text(items);
		}
	}

	initSlider(".slider__wrapper")
	initSlider(".card__1 .card__slider-wrapper")
	initSlider(".card__2 .card__slider-wrapper")
	initSlider(".card__3 .card__slider-wrapper")
	initSlider(".card__4 .card__slider-wrapper")

	$(".review__slider").owlCarousel({
		loop: true,
		nav : true,
		items: 1,
		margin: 20,
		dots: false,
		onTranslate: callback,
		autoHeight: true,
		// autoplay:true,
		// autoplayTimeout: 2000,
		// autoplayHoverPause: true,
	});

	function callback(event) {
		var items     = event.item.count;     // Number of items
		var item      = event.item.index - 2;     // Position of the current item

		// console.log(items)
		// console.log(item)

		if(items === 4) {
			item  = event.item.index - 1; 
		}

		if(items === 6 && item === 0) {
			item = 6
		}

		if(items === 6 && item === 7) {
			item = 1
		}

		if(items === 4 && item === 0) {
			item = 4
		}

		$(".review__wrapper .current__slide").text(item);
		$(".review__wrapper .all__slides").text(items);
	}

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

	function timer () {
		function runMultiple(hoursSelector, minutesSelector, secondsSelector) {
			var d = new Date();
			var h = String(23 - d.getHours()).padStart(2, "0");
			var m = String(59 - d.getMinutes()).padStart(2, "0");
			var s = String(60 - d.getSeconds()).padStart(2, "0");
			$(hoursSelector).text(h)
			$(minutesSelector).text(m)
			$(secondsSelector).text(s)
		}
		setInterval(function () {
			runMultiple(".hours", ".minutes", ".seconds")
		}, 1000);
	}

	timer()

	function getDate(plusDays) {
		var today = new Date();
		var dd = String(today.getDate() + plusDays).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = String(today.getFullYear());
		// yyyy = yyyy.substr(yyyy.length - 2);
		var currentDaysInMonth = new Date().daysInMonth()
		if (+dd > currentDaysInMonth) {
			dd = String(dd - currentDaysInMonth).padStart(2, '0');
			mm = String(+ mm + 1).padStart(2, '0');
		}
		return dd + "." + mm + "." + yyyy
	}

	$(".date span").text(getDate(2));

	$('a[data-rel^=lightcase]').lightcase({
		swipe: true,
		showCaption: false,
		maxHeight: 1200,
		speedIn: 0,
		speedOut: 0,
		showSequenceInfo: false,
	});

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = -100;

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});


	$(".year").text(new Date().getFullYear())

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function quantity() {
		var currentNumber;

		if(localStorage.getItem("quantity")) {
			$(".card__remainder span").text(localStorage.getItem("quantity"));
		} else {
			currentNumber = 25
			localStorage.setItem("quantity", currentNumber)
			$(".card__remainder span").text(currentNumber);
		}

		setInterval(function () {
			currentNumber = localStorage.getItem("quantity");
			if (currentNumber >= 3) {
				currentNumber = currentNumber - getRandomInt(3);
				$(".card__remainder span").text(currentNumber);
				localStorage.setItem("quantity", currentNumber)
			} else {
				currentNumber = 25;
				localStorage.setItem("quantity", currentNumber)
			}
		}, 100000)
	}

	quantity()

	

	function lazyloadVideo() {
		var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

		if ("IntersectionObserver" in window) {
			var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(video) {
				if (video.isIntersecting) {
					for (var source in video.target.children) {
					var videoSource = video.target.children[source];
					if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
						videoSource.src = videoSource.dataset.src;
					}
					}
		
					video.target.load();
					video.target.classList.remove("lazy");
					lazyVideoObserver.unobserve(video.target);
				}
				});
			});
		
			lazyVideos.forEach(function(lazyVideo) {
				lazyVideoObserver.observe(lazyVideo);
			});
		}
	}

	lazyloadVideo()

	function advantage() {
		$(".advantage__btn").click(function () {
			$(".advantage__invisible").addClass("active")
			$(this).hide()
		})
	}
	
	advantage()

	function modal(selector) {
		$(selector + " .card-main__btn").click(function () {
			$(selector + " .modal").addClass("active")
			$("body").css("overflow", "hidden")
		})

		function close() {
			$(selector + " .modal").removeClass("active")
			$("body").css("overflow", "auto")
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

		$(".modal form").submit(function (e) {
			e.preventDefault()
			$(".modal .card-main__input").val("")
			close()
		})
	}

	modal(".card__1")
	modal(".card__2")
	modal(".card__3")
	modal(".card__4")

	function privacy() {
		$(".privacy").click(function () {
			$(".privacy-policy-popup").addClass("active")
			$("body").css("overflow", "hidden")
		})

		function close() {
			$(".privacy-policy-popup").removeClass("active")
			$("body").css("overflow", "auto")
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

