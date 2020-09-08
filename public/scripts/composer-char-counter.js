//responsible for character counter of tweet input form

$(document).ready(function() {
 

// console.log('document.ready works in character count js doc')



// #tweet-text

// change event
// keydown event
// keyup event
// blur event
// keypress event

  // $('#tweet-text').change(() => { console.log('change event') });

  $('#tweet-text').on('keyup', function(e) {
    console.log($("#tweet-text").val().length)
    console.log(this); 
  })

  // $('#tweet-text').blur(() => { console.log('blur event') })
  
  // $('#tweet-text').keyup(() => { console.log('keyup event') })
  
  // $('#tweet-text').keydown(() => { console.log('keydown event') })

  // $('#tweet-text').keypress(() => { console.log('keypress event') })
  
});
