/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  for (let tweet of tweets) { // loops through tweets
    let $tweet = createTweetElement(tweet) // calls createTweetElement for each tweet
    $("#tweetContainer").prepend($tweet) // takes return value and appends it to the tweets container
  }
}

// prevent js string hacks
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// tweet content 
const createTweetElement = function (tweet) {
  let $date = Math.floor((Date.now() - tweet.created_at) / 86400000);
  let $tweet = ` <article class="tweet">
                <header>
                  
                    <img src=${tweet.user.avatars}>
                    <span class="tweeterName">${escape(tweet.user.name)}</span>
                    <span class="username">${escape(tweet.user.handle)}</span>
                  
                </header>

                <div class="sampleTweetText">
                  <p>${escape(tweet.content.text)}</p>
                </div>

                <footer>
                    <div>
                      <span>${escape($date)} days ago</span>
                      <span>
                        <i class="fas fa-flag dateIcons"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </span>  
                      </div>
                </footer>
              </article> `

  return $tweet;
}

// load tweets
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (res) {
      renderTweets(res);
    })
}

// compose box fade in and out after button click
const composeTweetFade = function () {
  $(".new-tweet").fadeOut();
  let newTweetExists = false;

  $("#downArrow").click(function () {
    if (newTweetExists) {
      $(".new-tweet").fadeOut();
      newTweetExists = false;
    } else {
      $(".new-tweet").fadeIn();
      newTweetExists = true;
    }
  })
};

// submission for tweets
$(document).ready(function () {
  loadTweets();
  composeTweetFade();

  const $form = $("#new-tweet-form");

  $form.on('submit', function () {
    event.preventDefault()
    let tweet = $('#tweet-box').val()
    if (tweet.length > 140) {
      $("#validAlert").css("background-color", "red").fadeIn().text("Tweet Exceeds Character Limit!");
      window.setTimeout(function () { $("#validAlert").fadeOut("fast") }, 5000);
    } else if (tweet.length === 0) {
      $("#validAlert").css("background-color", "red").fadeIn().text("Empty Tweet Submission!");
      window.setTimeout(function () { $("#validAlert").fadeOut("fast") }, 5000);
    } else
      $.ajax('/tweets', { method: 'POST', data: $form.serialize() })
        .then(function (res) {
          loadTweets();
          $('#counter').text("140");
          $("#tweet-box").val("");
          $("#validAlert").css("background-color", "#49a1eb").fadeIn().text("Tweet Submitted!");
          window.setTimeout(function () { $("#validAlert").fadeOut("fast") }, 5000);
        })
  })
});
