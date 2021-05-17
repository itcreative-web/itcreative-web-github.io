$(function () {
	function carousel(selector, btnSelector) {
		var acarousel = $(selector).acarousel();

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


		$(selector).swipeleft(function(e) {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(-1);
			changeActive(move);
			return false;
		})

		$(selector).swiperight(function(e) {
			if (acarousel.isAnim()) return false;
			var move = acarousel.move(1);
			changeActive(move);
			return false;
		})

		var interval = setInterval(function () {
			if($(window).width() > 700) {
				if (acarousel.isAnim()) return false;
				var move = acarousel.move(-1);
				changeActive(move);
				return false;
			}
		}, 5000)

		$(selector).mouseenter(function() {
			clearInterval(interval)
		})

		$(selector).mouseleave(function() {
			interval = setInterval(function () {
				if($(window).width() > 700) {
					if (acarousel.isAnim()) return false;
					var move = acarousel.move(-1);
					changeActive(move);
					return false;
				}
			}, 5000)
		})

		$(window).resize(function () {
			acarousel.init();
		});
	}

	carousel(".slider", ".move__mark");

	$(".open__description").click(function () {
		$(this).parents().eq(1).toggleClass("active")
	})
})



