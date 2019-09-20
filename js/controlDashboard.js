function goToDashboard() {
    window.location.href = "./dataAnalysis.html";
}

function openLogIn() {
    document.getElementById("login_popup_container").style.display = "block";
}

function cancelLogIn() {
    document.getElementById("login_popup_container").style.display = "none";
}

function setMenuSignInState() {
    document.getElementById("signInFormContainer").style.display = "block";
    document.getElementById("signUpFormContainer").style.display = "none";

    document.getElementsByClassName("signInFormMenu")[0].id = "selectedState";
    document.getElementsByClassName("signUpFormMenu")[0].id = "unselectedSignUp";
}

function setMenuSignUpState() {
    document.getElementById("signInFormContainer").style.display = "none";
    document.getElementById("signUpFormContainer").style.display = "block";

    document.getElementsByClassName("signInFormMenu")[0].id = "unselectedSignIn";
    document.getElementsByClassName("signUpFormMenu")[0].id = "selectedState";
}

var button = 0;
var clearTime;

function startStop() {
    var initialTime = (new Date).getTime();
    var currentTime;
    var runTime;
    var seconds;

    if (button == 1) {
        button = 0;
        clearInterval(clearTime);
        document.getElementById("time_container_start").innerHTML = "Start";
        document.getElementById("time_container").children[0].innerHTML = "0:00";
    } else {
        button = 1;
        document.getElementById("time_container_start").innerHTML = "Stop";

        clearTime = setInterval(function(){
            currentTime = (new Date).getTime();
            runTime = new Date(currentTime-initialTime);
            seconds = runTime.getSeconds();

            if (seconds < 10){
                seconds = "0" + seconds;
            }
            document.getElementById("time_container").children[0].innerHTML = runTime.getMinutes() + ':' + seconds;
        }, 1000);
    }
}

let currentPressure = 30;

function setCurrentPressure(direction) {
    if (direction == "up") {
        currentPressure++;
        document.getElementById("pressure_value").innerHTML = currentPressure;
    }
    else{
        currentPressure--;
        document.getElementById("pressure_value").innerHTML = currentPressure;
    }

}

let currentTemp = 25;

function setCurrentTemp(direction) {
    if (direction == "up"){
        currentTemp++;
        document.getElementById("temp_value").innerHTML = currentTemp;
    }
    else{
        currentTemp--;
        document.getElementById("temp_value").innerHTML = currentTemp; 
    }

}

function displayCurrentTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var am_pm;
    var output;

    if (hours < 12) {
        am_pm = "AM";
    } else {
        am_pm = "PM";
    }

    hours = hours % 12;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    output = hours + ":" + minutes + " " + am_pm;
    document.getElementById("current_time_container").children[0].innerHTML = output;
}

displayCurrentTime();
setInterval(function () {
    displayCurrentTime();
}, 1000);
