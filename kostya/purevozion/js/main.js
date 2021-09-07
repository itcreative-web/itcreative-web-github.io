$(function () {

	function scroll() {
		$('[href*="#"]').on('click', function (e) {
			var fixedOffset = -160;
			
			if($(window).width() <= 480) {
				fixedOffset = -130;
			}

			if($(window).width() <= 320) {
				fixedOffset = -110;
			}
	
			$('html, body')
				.stop()
				.animate({ scrollTop: $(this.hash).offset().top + fixedOffset}, 1000);
			e.preventDefault();
		});
	}

	scroll()

	var height = $(".sidebar__card").offset().top - 55;

	$(window).scroll(function() {
		if($(window).scrollTop() >= height) {
			if($(".sidebar__card").hasClass("fixed")) {
				return false
			} else {
				$(".sidebar__card").addClass("fixed")
			}
		} else {
			$(".sidebar__card").removeClass("fixed")
		}
	});

	$(".data-date").each(function (index, item) {
		var $countDays = $(item).data("date");
		var currentDate = new Date().getTime() - (86400000 * $countDays);
		var newDate = new Date(currentDate);
		var dateStr = pad(newDate.getDate()) + "."
			+ pad((newDate.getMonth() + 1)) + "."
			+ newDate.getFullYear();
		$(item).html(dateStr);
	})

	$(".js-actual-date").each(function (index, item) {
		$(item).html(endDifDate($(item).data("dateEnd")));
	});

	$(".review").eq(0).hide();
	handleReviewScroll();
	window.addEventListener('scroll', handleReviewScroll);

	var $path = $('body').data("path");

	$(".form-reviews button").click(function (event) {
		var commentName = $(this).closest(".form-reviews").find('input').val();
		var commentText = $(this).closest(".form-reviews").find('textarea').val();
		var commentNamePlaseholder = $(this).closest(".form-reviews").find('.form-comment--name input').attr("placeholder");

		if ($(this).closest(".form-reviews").find('textarea').val().length > 0) {
			if (commentName === "") {
				commentName = commentNamePlaseholder;
			}


			var el = "<div class=\"review\">\n" +
				"       <div class=\"review-photo\">\n" +
				"          <img src=\"" + $path + "/img/default-avatar.jpg\" alt=\"img\">\n" +
				"       </div>\n" +
				"       <div class=\"review-body\">\n" +
				"          <div class=\"user-name\"> " + commentName + " </div>\n" +
				"          <div class=\"review-inner\">" + commentText + "</div>\n" +
				"          <div class=\"rating\">\n" +
				"             <p class=\"add-like\">Suka</p>\n" +
				"             <span class=\"separator-point\">‧</span>\n" +
				"             <a class=\"review-link js-scroll\" href=\"#card\">Balas</a>\n" +
				"             <span class=\"separator-point\">‧</span>\n" +
				"             <div class=\"rating-like\">\n" +
				"                <img src=\"" + $path + "/img/like-btn.png\" alt=\"\"><div class=\"count\">0</div>\n" +
				"                <span class=\"separator-point\">‧</span>\n" +
				"             </div>\n" +
				"             <div class=\"time\">Saat ini</div>\n" +
				"          </div>\n" +
				"       </div>\n" +
				" </div>"

			$(".reviews").prepend(el);
			scroll()
			$(this).closest(".form-reviews").find('input').val('');
			$(this).closest(".form-reviews").find('textarea').val('');
		}
	});

	$("body").click(function (e) {
		if ($(e.target).is("p.add-like")) {
			var $currentTarget = $(e.target).is("p.add-like");

			var countReviewLike = parseInt($(e.target).closest(".review").find(".rating-like .count").html());
			var reviewRatingCount = $(e.target).closest(".review").find(".rating-like .count");
			if ($(e.target).hasClass("active")) {
				$(e.target).removeClass("active");
				$(e.target).closest(".review").find(".rating-like");
				reviewRatingCount.eq(0).html(countReviewLike - 1);
			} else {
				$(e.target).addClass("active");
				reviewRatingCount.eq(0).html(countReviewLike + 1);
			}
		}
	});


	function endDifDate(countDays) {
		if (countDays || countDays === 0) {

			countDays = parseInt(countDays);

			const date = new Date(Date.now() - (86400000 * countDays));
			return pad(date.getDate()) + "." + pad(date.getMonth() + 1) + "." + date.getFullYear();
		}
	}

	function pad(num) {
		return ("0" + num).substr(-2);
	}


	function getDocumentScrollTop() {
		return $(document.scrollingElement || document.documentElement).scrollTop();
	}


	function handleReviewScroll() {
		const offset = $(window).height() / 3;
		const $holder = $(".reviews");

		$(".review").eq(0).hide()

		if (getDocumentScrollTop() + $(window).height() >= $holder.offset().top) {
			setTimeout(function () {
				$(".review").eq(0).fadeIn(320);
			}, 640)

			window.removeEventListener('scroll', handleReviewScroll);
		}
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function quantity() {
		var currentNumber;

		if(localStorage.getItem("quantity")) {
			$(".card__block-quantity span").text(localStorage.getItem("quantity"));
		} else {
			currentNumber = 25
			localStorage.setItem("quantity", currentNumber)
			$(".card__block-quantity span").text(currentNumber);
		}

		setInterval(function () {
			currentNumber = localStorage.getItem("quantity");
			if (currentNumber >= 2) {
				currentNumber = currentNumber - getRandomInt(2);
				$(".card__block-quantity span").text(currentNumber);
				localStorage.setItem("quantity", currentNumber)
			} else {
				currentNumber = 25;
				localStorage.setItem("quantity", currentNumber)
			}
		}, 100000)
	}

	quantity()

	// $(".year").text(new Date().getFullYear())

	var time = 900;
	var intr;

	function start_timer() {
		intr = setInterval(tick, 1000);
	}

	function tick() {
		if (localStorage.vietnam43) {
			if (localStorage.vietnam43 <= 0) {
				time = 60;
			} else {
				time = localStorage.vietnam43;
			}

		} else {
			time = 900;
		}
		time = time - 1;
		localStorage.vietnam43 = time;

		var mins = Math.floor(time / 60);
		var secs = time - mins * 60;
		if (mins == 0 && secs == 0) {
			clearInterval(intr);
		}

		$(".timer .minute").html(pad(mins));
		$(".timer .second").html(pad(secs));

		localStorage.vietnam43 = time;
	}

	start_timer();

	function showBtn() {
		var $element = $('.card__block');

		$(window).scroll(function() {
			var scroll = $(window).scrollTop() + $(window).height();
			var offset = $element.offset().top + $element.height();
			var bodyOffset = $("body").offset().top + $("body").height();
			if ((scroll > offset + 400 || scroll < offset - $element.height() - 200)) {
				if($(window).width() < 480 &&  scroll > bodyOffset - 100) {
					$(".site__order-btn").hide(100)
				} else {
					$(".site__order-btn").show(100);
				}
			} else {
				$(".site__order-btn").hide(100)
			}
		});
	}

	if($(window).width() <= 1000) {
		showBtn()
	}

})

