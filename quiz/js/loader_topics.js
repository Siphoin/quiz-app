const TOPICS_RESOURCE_URL = {
    url: 'http://quiz/php/topicsArray.php'
}

let topics = []
let template = null
let topics_container = null;
let loader = null;



window.onload = async function() {
     topics_container = document.getElementById('topics-container')
     template = document.getElementById('topic-sh')
     loader = document.getElementById('loading')
   await  getTopicsAsync();
   console.log('loaded');
     loadTopics()    
     cookies_delete()   
}

async function getTopicsAsync() {
    let response = await fetch(TOPICS_RESOURCE_URL.url);

    if (response.ok) { 
        topics = await response.json();
        topics = topics.data;
    } else {
window.location.replace('/')
    }
}

function createTopic(data) {
    if (typeof data !== "object") {
        console.error('not current data. data not is object type');
    }

    const elem = document.createElement('div');
      elem.append(template.content.cloneNode(true));
      topics_container.appendChild(elem);
      const button = elem.children[0]
      button.addEventListener('click', () => selectTopic(data.topic))
  const title =    button.children[0]
  title.innerHTML = data.title

}

function loadTopics() {
  for (const key in topics) {
      if (Object.hasOwnProperty.call(topics, key)) {
          const element = topics[key];
          createTopic(element)
          
      }
  }

  loader.remove()


}

async function selectTopic(topicIndex) {
    let targetQuestion = null
    for (const key in topics) {
        if (Object.hasOwnProperty.call(topics, key)) {
            const element = topics[key];
            if (element.topic === topicIndex) {
            targetQuestion = element
            break;
            }
            
        }
    }

    const data = {
        data: JSON.stringify(targetQuestion)
    }
 const response =   await fetch('http://quiz/php/quizStart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
         
          document.location.replace('http://quiz/main.html')
      }
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

