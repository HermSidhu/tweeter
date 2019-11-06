$(document).ready(function () {

  $('#tweet-box').on("keyup", function () {
    let charCount = $(this).val().length;
    $('#counter').text(140 - charCount);
    if (charCount > 140) {
      $("#counter").css("color", "red");
    } else $("#counter").css("color", "black")
  });

});
