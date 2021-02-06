const URL_RESULT = 'http://quiz/php/result_quiz.php'

const URL_END_SESSION = 'http://quiz/php/end_quiz.php'

const COLOR_GREEN = '#82cf9c'
const COLOR_YELLOW = '#c4cf82'
const COLOR_RED = '#cf8282'

let progress = null;


let title = null;

let time = null;

let procentCurrent = 0;


window.onload = async function () {
    progress = document.getElementById('radial')
      title = document.getElementById('title')
      time = document.getElementById('time')

    
    let response = await fetch(URL_RESULT);

    if (response.ok) { 
        const obj = await response.json();
          procentCorrent = obj.correntCount / obj.countQuestions * 100
         title.innerHTML = `${obj.title} | Вы ответили на ${obj.correntCount} вопросов из ${obj.countQuestions}.`
         const date = new Date(Date.parse(obj.timer))
         time.innerHTML = `Время: ${date.toLocaleTimeString()}`
         radial.setAttribute('data-percent', procentCorrent)
         fillRadial()
}

 await fetch(URL_END_SESSION);


cookies_delete()
}

function fillRadial() {
    const $ppc = $('.progress-pie-chart'),
    percent = parseInt($ppc.data('percent')),
    deg = 360*percent/100;
  if (percent > 50) {
    $ppc.addClass('gt-50');
  }
  $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
  $('.ppc-percents span').html(percent+'%');


  let targetColor = null
  if (procentCorrent >= 75) {
      targetColor = COLOR_GREEN
  }

  else if (procentCorrent <= 74 && procentCorrent > 49) {
             targetColor = COLOR_YELLOW;
  }

  else if (procentCorrent < 50) {
      targetColor = COLOR_RED;
  }
  $('.ppc-progress .ppc-progress-fill').css('background', targetColor);
  $('.ppc-percents span').css('color', targetColor);
}

function cookies_delete() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}