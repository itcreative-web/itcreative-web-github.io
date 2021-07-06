$(function () {

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
		animationEffect: "fade",
	});


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
		var fixedOffset = -100;
		

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});

	// $(".copiright span").text(new Date().getFullYear())

	function carousel(selector, btnSelector) {
		var acarousel = $(selector).acarousel();
		function next() {
			var position = acarousel.getPos().index
			if( position +  2 === acarousel.count() + 1 ) {
				position = -1
			}
			$(btnSelector + " .current__slide").text("0" + (position + 2));
		}

		function back() {
			var position = acarousel.getPos().index
			if( position === 0 ) {
				position = acarousel.count()
			}
			$(btnSelector + " .current__slide").text("0" + (position));
		}

		$(selector).swiperight(function() {
			if (acarousel.isAnim()) return false; 
			acarousel.move(1);

			back()

			return false;
		})

		$(selector).swipeleft(function() {
			if (acarousel.isAnim()) return false; 
			acarousel.move(-1);

			next()

			return false;
		})

		$(btnSelector + " .move__back").click(function () {
			if (acarousel.isAnim()) return false; 
			acarousel.move(1);
			
			back()

			return false;
		});
			
		$(btnSelector + " .move__next").click(function () {
			if (acarousel.isAnim()) return false; 
			acarousel.move(-1);
			
			next()
		
			return false;
		});

		$(window).resize(function () {
			acarousel.init();
		});
	}

	carousel(".information__slider", ".information__move-mark");
	carousel(".galary__slider", ".galary__move-mark");
	carousel(".card__slider", ".card__move-mark");

	function addVideoOnPage(selector) {
		var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test((window.navigator.userAgent||window.navigator.vendor||window.opera))||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((window.navigator.userAgent||window.navigator.vendor||window.opera).substr(0,4));if (isMobile) {    var tag = document.createElement('script');    tag.src = "https://www.youtube.com/iframe_api";    var firstScriptTag = document.getElementsByTagName('script')[0];    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);}
		$(selector).click(function() {
			$(this).addClass("inactive")
			if ($("iframe", this).length) {
				return;
			}
			var videoId = $(this).data("video");
			if (isMobile) {
				var videoElId = "video-" + Date.now();
				$(this).append("<div id='"+videoElId+"'></div>");
				var player = new YT.Player(videoElId, {
					videoId: videoId,
					events: {
						onReady: function() {
							player.playVideo();
						}
					}
				});
			} else {
				var videoSrc = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1";
				$(this).append("<iframe src=\""+videoSrc+"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
			}
		});
	}

	addVideoOnPage(".video");

	function sizeBtns(selector) {
		$(selector + " .card__size-btn").click(function() {
			$(selector + " .card__size-block").removeClass("active")
			$(this).parent().addClass("active")
		})
	}

	sizeBtns(".card")

	function cardImage(selector) {
		function switchBtn(color) {
			$(selector + " .card__slide .slide__img").each(function() {
				var galary = $(this).attr("data-" + color);
				$(this).attr("src", galary)
				$(this).parent().attr("href", galary)
			})
		}

		$(selector + " .card__color-btn").click(function() {
			$(selector + " .card__color-btn").removeClass("active")
			if($(this).hasClass("black")) {
				switchBtn("black")
			}
			if($(this).hasClass("white")) {
				switchBtn("white")
			}
			$(this).addClass("active")
		})
	}

	cardImage(".card") 

	function showBtn() {
		var $element = $('.card__form');

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

	showBtn()

})

