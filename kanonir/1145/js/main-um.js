$(document).ready(function () {

   $('.order-form').submit(function (e) {
      var size = $(this).find('select option:selected').text();
      $(this).find('input[name=comment]').val(size);
   });
})