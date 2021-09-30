var landing = {
	init: function() {
		this.initLibraris()
		this.timer()
		this.parallax()
		this.cardModals()
	}, 

	initLibraris: function() {

		$('[href*="#"]').on('click', function (e) {
			var fixedOffset = -100;
			var cardHeight = 0
			var windowHeight = 0

			if($(window).width() <= 800) {
				fixedOffset = 20;
				cardHeight = $("#card").outerHeight(false)
				windowHeight = $(window).height()
			}

			$('html, body')
				.stop()
				.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
			e.preventDefault();
		});

		$(".review__slider").owlCarousel({
			loop: true,
			nav : true,
			dots: false,
			onTranslate: callback,
			responsive:{
				0:{
					items:1,
					margin: 50,
					autoHeight: true,
				},
				800:{
					items:2,
					margin: 80,
					autoHeight: false,
				}
			}
		});

		function callback(event) {
			var items     = event.item.count;
			var item      = event.item.index - 2;
	
			// console.log(items)
			// console.log(item)
	
			if(items === 3) {
				item  = event.item.index - 1; 
			}
	
			if(items === 3 && item === 0) {
				item = 3
			}
	
			if(items === 3 && item === 4) {
				item = 1
			}
	
			$(".review__wrapper .current__slide").text("0" + item);
			$(".review__wrapper .all__slides").text("0" + items);
		}

		$('[data-fancybox]').fancybox({
			loop: true,
			infobar: false,
			animationEffect: false,
			backFocus: false,
			hash: false,
		});
	},

	timer: function() {
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

		$(".year").text(new Date().getFullYear())

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
	
		$(".review__slide-1 .review__date").text(getDate(-5));
		$(".review__slide-2 .review__date").text(getDate(-8));
		$(".review__slide-3 .review__date").text(getDate(-6));

	},

	parallax: function() {
		var scenesParallax = [];

		mQ("(max-width: 1023px)", function () {
		   if (!scenesParallax.length) return
		   scenesParallax.forEach(function (scene) {
			  scene.disable();
			  scene.element.removeAttribute('style');
		   })
		}, function () {
		   if (scenesParallax.length === 0) {
			  $('.parallax').each(function (i) {
				 scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
					frictionX: 0.0008,
					frictionY: 0.0008,
					invertX: Math.random() >= 0.5,
					invertY: Math.random() >= 0.5
				 });
			  })
		   } else {
			  scenesParallax.forEach(function (scene) {
				 scene.enable();
			  })
		   }
		});
	 
		function randomNum(min, max) {
		   var numLow = min, numHigh = max,
			  adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
		   return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
		}
	 
		function mQ(mqStr, match, mismatch) {
		   var mq = matchMedia(mqStr);
		   mq.addListener(widthChange);
		   widthChange(mq);
		   function widthChange(mq) {
			  if (mq.matches) {
				 match();
			  } else {
				 mismatch();
			  }
		   }
		}
	},

	cardModals: function() {
		function cardModal(selector) {
			$(selector + " .card__details").click(function() {
	
				$(".video").attr("data-video", $(this).attr("data-video"))
	
				$(".video").empty()
				$(".video iframe").remove()
				$(".modal .info__modal-text").remove()
				$(".modal .info__modal-list").remove()
	
				var content = $(selector + " .modal__info-hidden").html()
				
				var $img = "<img src='//img.youtube.com/vi/" + $(this).attr("data-video") + "/hqdefault.jpg'>"
				$(".video").append($img)
				$(".info__modal-wrapper").append(content);
	
				addVideoOnPage(".video", $(this).attr("data-video"));
			})

			$(selector + " .card__order").click(function() {
				var el = $(this).attr("data-kode")
				$(".order__checkbox").prop("checked", false);
				$(".order__checkbox[id="+ el +"]").prop("checked", true);
				$(".footer__order-left .order__checkbox").prop("checked", false);
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
	},
	
}

$(document).ready(function() {
	landing.init();
});

