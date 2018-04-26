var STRICT = false,started = false;
var ans = [];


async function wasClicked(number) {
    var duration = 200;
    switch (number) {
        case 0:
            document.getElementsByClassName("tr")[0].style.backgroundColor = "rgb(221, 0, 0)";
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play()
            await sleep(duration);
            document.getElementsByClassName("tr")[0].style.backgroundColor = "rgb(150, 0, 0)";
            ans.push(0);
            break;
        case 1:
            document.getElementsByClassName("tl")[0].style.backgroundColor = "rgb(0, 220, 0)";
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play()
            await sleep(duration);
            document.getElementsByClassName("tl")[0].style.backgroundColor = "rgb(0, 103, 0)";
            ans.push(1);
            break;
        case 2:
            document.getElementsByClassName("bl")[0].style.backgroundColor = "rgb(250, 250, 0)";
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play()
            await sleep(duration);
            document.getElementsByClassName("bl")[0].style.backgroundColor = "rgb(177, 177, 0)";
            ans.push(2);
            break;
        case 3:
            document.getElementsByClassName("br")[0].style.backgroundColor = "rgb(0, 0, 220)";
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play()
            await sleep(duration);
            document.getElementsByClassName("br")[0].style.backgroundColor = "rgb(0, 0, 159)";
            ans.push(3);
            break;
    }
    console.log(ans);
}

async function startGame() {
    if (started) {
        return;
    } else {
        started=true;
    }

    
    var numbs = [];
    var total = 1,
        padded = "",
        duration = 900;
    numbs = generateSelection(numbs);
    while (true) {
        if (total < 10) {
            padded = "0" + total.toString();
        } else {
            padded = total;
        }
        document.getElementsByClassName("counter")[0].innerHTML=padded;
        
        for (i in numbs) {
            await sleep(duration/2);
            console.log("cool=", numbs[i]);
            switch (numbs[i]) {
                case 0:
                    document.getElementsByClassName("tr")[0].style.backgroundColor = "rgb(221, 0, 0)";
                    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play()
                    await sleep(duration);
                    document.getElementsByClassName("tr")[0].style.backgroundColor = "rgb(150, 0, 0)";
                    break;
                case 1:
                    document.getElementsByClassName("tl")[0].style.backgroundColor = "rgb(0, 220, 0)";
                    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play()
                    await sleep(duration);
                    document.getElementsByClassName("tl")[0].style.backgroundColor = "rgb(0, 103, 0)";
                    break;
                case 2:
                    document.getElementsByClassName("bl")[0].style.backgroundColor = "rgb(250, 250, 0)";
                    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play()
                    await sleep(duration);
                    document.getElementsByClassName("bl")[0].style.backgroundColor = "rgb(177, 177, 0)";
                    break;
                case 3:
                    document.getElementsByClassName("br")[0].style.backgroundColor = "rgb(0, 0, 220)";
                    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play()
                    await sleep(duration);
                    document.getElementsByClassName("br")[0].style.backgroundColor = "rgb(0, 0, 159)";
                    break;
            }
        }
        var correct=true;
        ans=[];
        activateButtons();
        while (ans.length<numbs.length) {
            if (!correct) {
                break;
            }
            for (i in ans){
                if (ans[i]!=numbs[i]) {
                    correct = false;
                    break;
                }
            }
            await sleep(100);
        }
        deactivateButtons();
        if (!correct) {
            alert("PERDISTE");
            break;
        }else{
            numbs = generateSelection(numbs);
            total++;
        }
        if (total > 20) {
            alert("you WON!");
            break;
        } else if (total >= 15) {
            duration = 100;
        } else if (total >= 13) {
            duration = 500;
        } else if (total >= 9) {
            duration = 700;
        }

    }
}

function strictClick() {
    var element = document.getElementsByClassName("light")[0].style;
    if (STRICT) {
        STRICT = false;
        element.backgroundColor = "rgb(70, 0, 0)";
    } else {
        STRICT = true;
        element.backgroundColor = "rgb(250, 0, 0)";
    }
}

function generateSelection(numbs) {
 
    console.log("NUMBS=", numbs);
    numbs.push(Math.round(Math.random() * 3));
    return numbs;
}

function activateButtons() {
    document.getElementsByClassName("tr")[0].style.cursor = "pointer";
    document.getElementsByClassName("tl")[0].style.cursor = "pointer";
    document.getElementsByClassName("br")[0].style.cursor = "pointer";
    document.getElementsByClassName("bl")[0].style.cursor = "pointer";
}

function deactivateButtons() {
    document.getElementsByClassName("tr")[0].style.cursor = "default";
    document.getElementsByClassName("tl")[0].style.cursor = "default";
    document.getElementsByClassName("br")[0].style.cursor = "default";
    document.getElementsByClassName("br")[0].style.cursor = "default";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}