$(document).ready(function () {

  $('#tweet-box').on("keyup", function () {
    const MAX_CHAR = 140
    let charCount = $(this).val().length;
    $('#counter').text(MAX_CHAR - charCount);
    if (charCount > MAX_CHAR) {
      $("#counter").css("color", "red");
    } else $("#counter").css("color", "black")
  });

});
