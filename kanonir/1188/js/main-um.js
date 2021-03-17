$(document).ready(function() {
	$(".order-form").submit(function(event) {
		var color = $(this).closest('.catalog__content').find('#mobile-order .active').data('color');

		console.log(color);

		$(this).find('input[name=comment]').val("Color: " + color);
	});
});