// window.onload = function(){

// };
var  time,on=0;

function secondsToMinutes(seconds) {
    if (seconds<60) {
        if (seconds < 10) {
            return "0:0"+seconds;
        } else {
            return "0:"+seconds;
        }
    }else if (seconds%60<10) {
        return (seconds-seconds%60)/60 + ":0" + seconds%60; 
    } else {
        return (seconds-seconds%60)/60 + ":" + seconds%60; 
    }
}

function countDown(){
    console.log(time);
    if (time==0) {
        clearInterval(timer);
        new Audio("alert2.mp3").play();
    }
    
    document.getElementById("timerBody").value=secondsToMinutes(time);
    time--;
}

function startCountDown(){
    if (!on) {
        on++;
        time = document.getElementById("timerBody").value.split(":")[0] * 60 + document.getElementById("timerBody").value.split(":")[1]*1;
        timer = setInterval(countDown,1000);
    } 
}

function resetTimer(){
    clearInterval(timer);
    on = 0;
    document.getElementById("timerBody").value="25:00"
}


