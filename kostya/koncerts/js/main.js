$(function() {

	$("body").on('click', '[href*="#"]', function (e) {
		var fixedOffset = 0;
		// if ($(document).width() <= 768) {
		// 	fixedOffset = 300;
		// }
		// if ($(document).width() <= 414) {
		// 	fixedOffset = 900;
		// }
		// if ($(document).width() <= 375) {
		// 	fixedOffset = 820;
		// }
		// if ($(document).width() <= 360) {
		// 	fixedOffset = 960;
		// }
		// if ($(document).width() <= 360) {
		// 	fixedOffset = 1000;
		// }

		$('html, body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
		e.preventDefault();
	});


	function order() {
		function getDate() {
			var today = new Date();
			var dd = String(today.getDate())
			var mm = String(today.getMonth() + 1)
			if(+mm < 10) {
				mm = "0" + mm
			} 
			
			return mm+dd
		} 

		$(".input__wrapper input").each(function(index) {
			var dateToNumber = $(this).attr("data-date").split(".").reverse().join("")
			if(+dateToNumber < +getDate()) {
				$(this).prop("checked", false)
				$(this).prop("disabled", true)
			}
			if($(this).prop("disabled")){
				var value = $(".input__wrapper input").eq(index+1).val()
				var dataDate = $(".input__wrapper input").eq(index+1).attr("data-date")
				writeData(value, dataDate)
				$(".input__wrapper input").eq(index+1).click()
			}
		})

		$(".item__link").click(function() {

			var dataIndex = $(this).attr("data-index")
	
			$(".input__wrapper input").each(function() {
				if($(this).attr("id") === dataIndex ) {
					if($(this).prop("disabled")) {
						return false
					}
					$(this).click()
				}
			})
		})
	
		function writeData(value, date) {
	
			const monthNames = [
				"Января", 
				"Февраля", 
				"Марта", 
				"Апреля", 
				"Мая", 
				"Июня",
				"Июля", 
				"Августа", 
				"Сентября", 
				"Октября", 
				"Ноября", 
				"Декабря"
			];
	
			var dataDate = date.split(".")
			var currentDate = dataDate[0] + " " + monthNames[+dataDate[1] - 1] + " " + "2021"
			$(".form__text-city").text(value)
			$(".form__text-date").text(currentDate)
		}
	
		$(".input__wrapper input").click(function() {
			var value = $(this).val()
			var dataDate = $(this).attr("data-date")
	
			writeData(value, dataDate)
		})
	}

	order()

	function overflowBlock() {
		$(".all__item a").click(function() {
			$(".overflow__block").addClass("active")
			$(".all__item").hide(100)
		})
	}
	overflowBlock()
})





