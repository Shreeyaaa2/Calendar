var monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var date = new Date();
var swipe = 'none';
var empty = 0;
var month = date.getMonth();
var year = date.getFullYear();
var today = date.getDate();

update_Calendar(month, year, today);

for (var i = 0; i < 7; i++) {
  var s = document.createElement('button');
  s.setAttribute('class', 'day');
  s.innerHTML = days[i];
  $('.week').append(s);
}

$('.dates').on('touchstart', function() {
//  $('.header').attr('class', 'header_small')
})

$(document).on('touchstart', function(e) {
  var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
  initial_x = touch.pageX;
  initial_y = touch.pageY;
}).on('touchend', function(e) {
  var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
  final_x = touch.pageX;
  final_y = touch.pageY;
  var angle = Math.atan((initial_y - final_y) / (initial_x - final_x)) * 180 / Math.PI;
  if (initial_x - final_x > 0 && angle < 45 && angle > -45) {
    swipe = 'left';
  } else if (initial_x - final_x < 0 && angle < 45 && angle > -45) {
    swipe = 'right';
  } else {
    swipe = 'none';
  }
  if (swipe == 'left') {
    month++;
    if (month == 12) {
      month = 0;
      year++;
    }
    $('.date_holder').attr('class', 'date_holder animate__animated animate__slideInRight')
  } else if (swipe == 'right') {
    month--;
    if (month == -1) {
      month = 11;
      year--;
    }
    $('.date_holder').attr('class', 'date_holder animate__animated animate__slideInLeft')
  }
  setTimeout(function() {
    $('.date_holder').attr('class', 'date_holder');
  }, 500);
  update_Calendar(month, year, today);
})

function update_Calendar(m, y, d) {
  $('.date_holder').html("");
  first_day = new Date(y, m, 1).getDay();
  total_days = 32 - new Date(y, m, 32).getDate();
  $('#month').html(monthes[m]);
  $('#year').html(y);
  for (i = 1; i <= 42; i++) {
    dates = document.createElement('button');
    dates.setAttribute('class', 'dates');
    if (i > first_day) {
      if (i < total_days + first_day + 1) {
        dates.innerHTML = i - first_day;
      } else {
        dates.innerHTML = "x";
        dates.setAttribute('style', 'color: #BBBBBB;')
      }
    } else {
      dates.innerHTML = "x";
      empty += 1;
      dates.setAttribute('style', 'color: #BBBBBB;')
    }
    if ((i - first_day) == d && m == date.getMonth() && y == date.getFullYear()) {
      dates.setAttribute('style', 'background-color: #71C6C1;');
      //dates.setAttribute('style', 'text-decoration: underline;');
    }
    $('.date_holder').append(dates);
  }
}
