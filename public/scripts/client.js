/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const renderTweets = function (tweets) {
  for (let tweet of tweets) { // loops through tweets
    let $tweet = createTweetElement(tweet) // calls createTweetElement for each tweet
    $("#tweetContainer").prepend($tweet) // takes return value and appends it to the tweets container
  }
}

const createTweetElement = function (tweet) {
  let $tweet = ` <article class="tweet">
                <header>
                  
                    <img src=${tweet.user.avatars}>
                    <span class="tweeterName">${tweet.user.name}</span>
                    <span class="username">${tweet.user.handle}</span>
                  
                </header>

                <div class="sampleTweetText">
                  <p>${tweet.content.text}</p>
                </div>

                <footer>
                    <div>
                      <span>${tweet.created_at}</span>
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

const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (res) {
    renderTweets(res);  
  })
}

$(document).ready( function() {
  loadTweets();

  const $form = $("#new-tweet-form");
  $form.on('submit', function () {
    event.preventDefault()
    let formData = $form.serialize()
    $.ajax('/tweets', { method: 'POST' , data: formData})
    .then(function (res) { 
      loadTweets();
    })
  })
});
