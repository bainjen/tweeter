//+++++dummy data for testing renderTweets function

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088

  }
]

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

  const $headerD2 = $("<div class='userID'>");
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
  const $footer = $("<footer>").text(tweetObj.created_at);

  //tweet footer children 
  const $timeStamp = $("<p class='th-header'>");

  const $footerD2 = $("<div class='icons'>");
  const $flag = $("<i class='far fa-flag'>");
  const $retweet = $("<i class='fas fa-retweet'>");
  const $heart = $("<i class='far fa-heart'>");
  $footerD2.append($flag, $retweet, $heart);
  //append footer children to footer
  $footer.append($timeStamp, $footerD2);

  //add all of the children to the tweet div
  $tweet.append($header, $contentContainer, $footer);

  return $tweet;
};

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    const tweetNode = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetNode);
  });
}

const getTweets = () => {

  // console.log('hello')
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

$(document).ready(function () {
  // renderTweets(data);
  getTweets();

  const $submitTweet = $('#submit-tweet');
  $submitTweet.on('submit', function (e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData);

    $.post('/tweets', serializedData)
      .then((response) => {
        getTweets();
        $(this).children('textarea').val('');
      })
  });






});
