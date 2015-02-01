bt.filter('prettyDate', function() {
  return function(input) {
    function getOrdinal(n) {
       var s=["th","st","nd","rd"],
           v=n%100;
       return n+(s[(v-20)%10]||s[v]||s[0]);
    }

    var months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(input);

    var month = months_list[date.getMonth()];
    var day = getOrdinal(date.getDate());
    var year = date.getFullYear();

    var hour = date.getHours();
    var meridiem;

    if (hour === 0) {
      hour = 12;
      meridiem = 'AM';
    } else if (hour > 12) {
      hour -= 12;
      meridiem = 'PM';
    } else if (hour === 12) {
      meridiem = 'PM';
    } else {
      meridiem = 'AM';
    }

    var minute = date.getMinutes();

    return month + ' ' + day + ', ' + year + ' at ' + hour + ':' + minute + meridiem + '';
  };
});
