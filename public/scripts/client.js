// create a JavaScript function that will generate the DOM structure for a tweet, given a tweet object.

//example tweetObj
// This object is taken directly from the initial-tweets.json file in the data-files directory

//++++++++++++++++++++++++++

const createTweetElement = function (tweetObj) {
  //return a tweet <article> tag containing html structure

  const $tweet = $("<article>").addClass("tweet"); 

  //tweet header
  const $header = $("<header>").addClass("th-header");


  //header children

  const $headerD1 = $("<div>").addClass("name-left");
  const $avatar = $("<img>").attr("src", tweetObj.user.avatars);
  const $name = $("<h3>").text(tweetObj.user.name);

  $headerD1.append($avatar, $name);

  const $headerD2 = $("<div>").addClass("userID");
  const $handle = $("<p>").text(tweetObj.user.handle);

  $headerD2 = $headerD2.append($handle); 

  $header = $header.append($headerD1, $headerD2);


  //tweet content

  //tweet footer
  //moment().startOf('hour').fromNow();

}

// This function shouldn't insert the created DOM structure to the page. It should instead just return the $tweet to the caller

//++++++++++++++++++++++++++

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.