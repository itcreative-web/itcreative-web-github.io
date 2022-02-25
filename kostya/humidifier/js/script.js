var landingFunctions = {
	init: function() {
		this.initLibraris()
		this.modal()
		this.time()
	}, 

	initLibraris: function() {
		$('[href*="#"]').on('click', function (e) {

			var fixedOffset = 20;
			var cardHeight = $("#card").outerHeight(false)
			var windowHeight = $(window).height()
			
			$('html, body')
				.stop()
				.animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight)}, 1000);
				// .animate({ scrollTop: $(this.hash).offset().top + fixedOffset}, 1000);
			e.preventDefault(); 
		});
		
		$.raty.path = $("body").data("path") + '/img/raty';

		$('.modal__raiting').raty({
			half: false,
			space: false,
			number: 5,
		});

		$(".review__slider").owlCarousel({
			loop: true,
			nav : true,
			dots: false,
			dotsEach: true,
			items: 2,
			margin: 50,
			autoHeight: false,
			responsive:{
				0:{
					items: 1,
					dots: true,
					autoHeight: true,
				},
				1026:{
					items: 2,
					dots: false,
					autoHeight: false,
				},
			}
		});

		$('[data-fancybox]').fancybox({
			loop: true,
			infobar: false,
			animationEffect: false,
			backFocus: false,
			hash: false,
		});
	},

	modal: function() {
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
	},

	time: function() {
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
			if (+dd < 0) {
				mm = String(today.getMonth()).padStart(2, '0');
			}
			
			var yyyy = String(today.getFullYear());
			// yyyy = yyyy.substr(yyyy.length - 2);
			var currentDaysInMonth = new Date().daysInMonth()
			if (+dd > currentDaysInMonth) {
				dd = String(dd - currentDaysInMonth).padStart(2, '0');
				mm = String(+mm + 1).padStart(2, "0");
			}
			if (+dd < 0) {
				dd = String(currentDaysInMonth + +dd).padStart(2, '0');
			}
			return dd + "." + mm + "." + yyyy
		}

		$(".date__1").text(getDate(-5));
    	$(".date__2").text(getDate(2));

		// $(".card__discount-info span").text(getDate(2));

		// $(".year").text(new Date().getFullYear())
	},
}

$(document).ready(function() {
	landingFunctions.init();
});

