const URL_CHECK = 'http://quiz/php/session_check.php'

document.addEventListener('DOMContentLoaded', async function(){
    let response = await fetch(URL_CHECK);

    if (response.ok) { 
        obj = await response.json();

        if (!obj.status) {
            document.location.replace('/');
        }
    
} else {
    alert("Ошибка HTTP: " + response.status);
}
})
