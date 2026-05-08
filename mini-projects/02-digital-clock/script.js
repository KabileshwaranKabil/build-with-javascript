const clockElement = document.getElementById('clock');
setInterval(timer,1000);

function timer(){
    clockElement.innerHTML = new Date().toLocaleTimeString();
}
