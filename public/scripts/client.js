
//function to build html for tweets dynamically
const createTweetElement = function (tweetObj) {
 
  const $tweet = $("<article class='tweet'>");

  //tweet header
  const $header = $("<header class='th-header'>");

  //header children
  const $headerD1 = $("<div class='name-left'>");
  const $avatar = $("<img>").attr("src", tweetObj.user.avatars);
  const $name = $("<h3>").text(tweetObj.user.name);

  $headerD1.append($avatar, $name);

  const $headerD2 = $("<div id='userID'>");
  const $handle = $("<p>").text(tweetObj.user.handle);

  $headerD2.append($handle);
  //append the contents of header
  $header.append($headerD1, $headerD2);

  //tweet content
  const $contentContainer = $("<div class='display-tweet'>");

  const $contentText = $("<p>").text(tweetObj.content.text);
  //append tweet text to container
  $contentContainer.append($contentText);

  //tweet footer
  const $footer = $("<footer>")
  
  //tweet footer children 
  const timeDelta =  moment(tweetObj.created_at).fromNow(); 
  const $timeStamp = $("<p>").text(timeDelta);;

  const $footerD2 = $("<div class='icons'>");
  const $flag = $("<i class='far fa-flag' id='flag'>");
  const $retweet = $("<i class='fas fa-retweet' id='retweet'>");
  const $heart = $("<i class='far fa-heart' id='heart'>");
  $footerD2.append($flag, $retweet, $heart);
  //append footer children to footer
  $footer.append($timeStamp, $footerD2);

  //add all of the children to the tweet div
  $tweet.append($header, $contentContainer, $footer);

  return $tweet;
};

const renderTweets = function (tweets) {
  const $container = $('#tweets-container')
  $container.empty();
  tweets.forEach((tweet) => {
    const tweetNode = createTweetElement(tweet);
    $container.prepend(tweetNode);
  });
}

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    },
    error: (error) => {
      console.error(error);
    }
  });
};

const appendError = (message) => {
  $('#submit-tweet').prepend($("<span class='error'>").text(' ⚠️ ' + message + ' ⚠️').slideDown().delay(3500).hide(500));
    // .slideDown(100).show(5000)
}

const removeError = () => {
  $('.error').remove()
}

$(document).ready(function () {
  loadTweets();
  //form submit handler
  const $submitTweet = $('#submit-tweet');
  $submitTweet.on('submit', function (e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
  
    removeError();
    if ($('#tweet-text').val() === '' || null) {
      appendError("You're a goose! 🐙 Type something! Anything!");
    } else if ($('#tweet-text').val().length > 140) {
      appendError("Ope! You typed too much.🙈 No worries! Edit 'til your heart's content 💕, just keep it under 140!")
    } else {

      $.post('/tweets', serializedData)
        .then((response) => {
          // console.log("response is: ", response); 
          loadTweets();
          $(this).children('textarea').val('');
        })
    }

  });

});
