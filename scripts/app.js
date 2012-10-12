(function(){
  var start = Date.now(),
    shuffler;

  $.get('http://jsonp.jit.su/?url=' + encodeURIComponent('https://api.meetup.com/2/events?key=3c2a67534a193f12c46115f7b112e1e&sign=true&group_urlname=nyhacker&page=3'), function(data){
    var results = data.results;
    for (var i = 0; i < results.length; i++){
      var result = results[i];
      // find the first match
      if (result.name.match(/hacker hours/i)){
        // the document may or may not be ready
        $(function(){
          $('.meetupLink').attr('href', result.event_url);

          // ensure they've seen the animation for a minimum amount of time
          var elapsed = Date.now() - start,
            wait = 1500 - elapsed;

          if (wait < 0) wait = 0;
          setTimeout(function(){
            var dateStr = moment(parseInt(result.time, 10)).format('ddd, MMMM Do YYYY, h:mm a'),
              $meetupDate = $('#meetupDate');

            clearInterval(shuffler);
            $meetupDate.find('#dateMs').text(result.time);
            $meetupDate.find('#dateStr').text(dateStr);
          }, wait);
        });

        return;
      }
    }
  });

  $(function(){
    var NUM_DIGITS = 13,
      $date = $('#dateMs,#dateStr'),
      currentTime = [];

    for (var i = 0; i < NUM_DIGITS; i++){
      currentTime[i] = Math.floor(Math.random() * 10);
    }

    $date.text(currentTime.join(''));

    shuffler = setInterval(function(){
      var i = Math.floor(Math.random() * NUM_DIGITS);
      currentTime[i] = Math.floor(Math.random() * 10);
      $date.text(currentTime.join(''));
    }, 5);
  });
})();