$(function () {

	if($(window).width() <= 1280) {
		$(".review__slider").addClass("owl-carousel").owlCarousel({
			loop: true,
			nav : true,
			items: 2,
			margin: 30,
			dots: true,
			dotsEach: true,
			stagePadding: 15,
			responsive:{
				0: {
					items: 1,
					stagePadding: 15,
				}, 
				321: {
					items: 1,
					stagePadding: 30,
					margin: 50,
				},
				415: {
					stagePadding: 15,
					margin: 30,
					items: 1,
				},
				701: {
					items: 2,
					stagePadding: 15,
					margin: 30,
				},
			}
		});
	}

	AOS.init({
		disable : 'mobile',
		once: true,
		// offset : -200,
	});


	$(window).resize(function() {
		AOS.refresh();
	})

	function autoType(elementClass, typingSpeed){
		var thhis = $(elementClass);
		thhis.css({
		  "position": "relative",
		  "display": "inline-block"
		});
		thhis = thhis.find(".text-js");
		var text = thhis.text().trim().split('');
		var amntOfChars = text.length;
		var newString = "";
		// thhis.text("|");
		setTimeout(function(){
			thhis.css("opacity", 1);
			thhis.prev().removeAttr("style");
			thhis.text("");
			for(var i = 0; i < amntOfChars; i++){
			(function(i, char){
				setTimeout(function() {        
				newString += char;
				thhis.text(newString);
				}, i*typingSpeed);
			})(i + 1, text[i]);
			}
		}, 1000);
	}

	autoType(".site__header .header__title",100);

	function scrollAnimated(selector) {
		var isAnimatedText = false
		$(window).scroll(function() {
			$(selector).each(function(){
			var el = $(this).offset().top;
	
			var topOfWindow = $(window).scrollTop();
				if (el < topOfWindow + 400) {
					if(!isAnimatedText) {
						autoType(selector,100);
					}
					isAnimatedText = true;
				}
			});
		});
	}

	scrollAnimated(".site__footer .header__title")


	$.raty.path = 'img/raty';

	$('.modal__raiting').raty({
		half: true,
		space: false,
		number: 5,
	});

	function menu() {
		if($(window).scrollTop() >= 70) {
			$(".header__nav").addClass("active")
		} else {
			$(".header__nav").removeClass("active")
		}
	}

	menu()

	function openMenu() {
		$(".burger__btn").click(function() {
			$(".header__nav").toggleClass("open")
		})
		if($(window).width() <= 800) {
			$(".nav__link").click(function() {
				$(".header__nav").removeClass("open")
			})
		}
	}

	openMenu()

	$(window).scroll(function() {
		menu()
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

	$(".date").text(getDate($(".date").data("date")));

	// $('[data-fancybox]').fancybox({
	// 	loop: true,
	// 	infobar: false,
	// 	animationEffect: false,
	// 	backFocus: false,
    //     hash: false,
	// 	// smallBtn: false, 
	// 	// modal: true,
	// });

	$('[href*="#"]').on('click', function (e) {
		var fixedOffset = -70;

		// if($(window).width() <= 480) {
		// 	var fixedOffset = -100;
		// }

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset}, 1000);
		e.preventDefault();
	});

	function addVideoOnPage(selector, data) {
		var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test((window.navigator.userAgent||window.navigator.vendor||window.opera))||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((window.navigator.userAgent||window.navigator.vendor||window.opera).substr(0,4));if (isMobile) {    var tag = document.createElement('script');    tag.src = "https://www.youtube.com/iframe_api";    var firstScriptTag = document.getElementsByTagName('script')[0];    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);}
		
		$(selector).unbind("click");
		$(selector).bind("click", addVideo);

		function addVideo () {
			$(this).addClass("inactive")
			if ($("iframe", this).length) {
				return;
			}

			var videoId = data;
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
				var videoSrc = "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1&autoplay=1&mute=1";
				$(this).append("<iframe src=\""+videoSrc+"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
			}
		}
	}

	function cardModal(selector) {
		$(selector + " .card__details").click(function() {

			$(".video").attr("data-video", $(this).attr("data-video"))

			$(".video").empty()
			$(".video iframe").remove()
			$(".modal .info__modal-text").remove()
			$(".modal .info__modal-list").remove()

			var content = $(selector + " .modal__info-hidden").html()
			
			var $img = "<img src='//img.youtube.com/vi/" + $(this).attr("data-video") + "/mqdefault.jpg'>"
			$(".video").append($img)
			$(".info__modal-wrapper").append(content);

			addVideoOnPage(".video", $(this).attr("data-video"));
		})
	}

	cardModal(".card__1")
	cardModal(".card__2")
	cardModal(".card__3")
	cardModal(".card__4")
	cardModal(".card__5")
	cardModal(".card__6")
	cardModal(".card__7")
	cardModal(".card__8")
	cardModal(".card__9")
	cardModal(".card__10")
	cardModal(".card__11")

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

