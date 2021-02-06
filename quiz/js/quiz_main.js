const URL_RESPONSE = 'http://quiz/php/active_quiz.php'

let question = null

let variants = null

let title = null

let variant_tm = null

let variant_container = null

let main_container = null

let form = null

let questionsList = null

let correntVariantIndex = 0

let time_text = null

let data_text = null

let count_all_questions = 0

let questionsFinished = 0


let indexQuestion = 0;
window.onload = async function () {
main_container = document.getElementById('container')
variant_tm = document.getElementById('variant-tm')
variant_container = document.getElementById('variants-container')
form = document.getElementById('variant_next_form')
title = document.getElementById('title')
data_text = document.getElementById('data-text')
time_text = document.getElementById('time-text')
main_container.classList.add('hidden')
    let response = await fetch(URL_RESPONSE);
     let obj = null
    if (response.ok) { 
            obj = await response.json();

        
        
       const questionsContainer = JSON.parse(obj.data)
        questionsList = JSON.parse(questionsContainer.questions)
       main_container.classList.remove('hidden')
        
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    form.addEventListener('submit', async function(e) {
         e.preventDefault()
         NextQuestion()
    })
  

    count_all_questions = questionsList.length
    showNextQuestion()
setInterval( async function () {
const response =   await fetch('http://quiz/php/quiz_timer.php')

if (response.ok) {
    const time = await response.text();
    try {
        const date = new Date(Date.parse(time))
       time_text.innerHTML = date.toLocaleTimeString()
    } catch (error) {
        console.error(error);
    }
}

}, 1000);

}

function showNextQuestion() {
    indexQuestion = Math.floor(Math.random() * questionsList.length)
    question = questionsList[indexQuestion]
    
    for (let i = 0; i < question.variants.length; i++) {
        const element = question.variants[i]
        createVariant(element, i)

    }
    
    title.innerHTML = question.questionLabel
    correntVariantIndex = question.currentIndex
    questionsFinished++
    data_text.innerHTML = `Вопрос ${questionsFinished} из ${count_all_questions}`
}

function createVariant(data, index) {


    const elem = document.createElement('div');
   const incrementIndex = index + 1
      elem.append(variant_tm.content.cloneNode(true));
      variant_container.appendChild(elem);
      elem.setAttribute('value', incrementIndex)
      const label = elem.children[0].children[1]
     label.setAttribute('for', 'variant' + (incrementIndex))
     label.setAttribute('id', 'text-variant' + (incrementIndex))
     label.innerHTML = data;
     const radioButton = elem.children[0].children[0]
     radioButton.setAttribute('value', incrementIndex)
     radioButton.setAttribute('id', 'variant' + (incrementIndex))
     if (index === 0) {
         radioButton.setAttribute('checked', 'checked')
     }


}

async function NextQuestion() {
    let correntVariant = false
for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (Number.parseInt(element.value) === correntVariantIndex && element.checked ) {
        correntVariant = true
        break;
    }
    
}
    questionsList.splice(indexQuestion, 1)
    const data = {
        index: indexQuestion,
        corrent: correntVariant
    }
 const response =   await fetch('http://quiz/php/quiz_while.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
      }
    
    if (questionsList.length > 0) {
    variant_container.innerHTML = ''
    showNextQuestion()
    }
    
    else {
        window.location.replace('/end.html')
    }

}
