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

const commandsEnum = {
    "get_temp": 0,
    "stop": 1,
    "temp_25": 2,
    "temp_26": 3,
    "temp_27": 4,
    "temp_28": 5,
    "temp_29": 6,
    "temp_30": 7,
    "current_flow": 8
};

function startStop() {
    var initialTime = (new Date).getTime();
    var currentTime;
    var runTime;
    var seconds;
    var data;

    if (button == 1) {
        button = 0;
        clearInterval(clearTime);
        document.getElementById("time_container_start").innerHTML = "Start";
        document.getElementById("time_container").children[0].innerHTML = "0:00";
        data = {
            command: commandsEnum.temp_27
        }
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
        data = {
            command: commandsEnum.stop
        }
    }

    $.ajax({
        type: 'POST',
        url: "/ControlShower",
        data: data,
        success: function(result) {
            console.log(result);
        },
        error: function () {
            throw "An error occured please try again.";
        }
    });
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

    const data = {
        command: currentPressure
    }

    $.ajax({
        type: 'POST',
        url: "/ControlShower",
        data: data,
        success: function(result) {
            console.log(result);
        },
        error: function () {
            throw "An error occured please try again.";
        }
    });
}

let currentTemp = 27;

function setCurrentTemp(direction) {
    if (direction == "up"){
        currentTemp++;
        document.getElementById("temp_value").innerHTML = currentTemp;
    }
    else{
        currentTemp--;
        document.getElementById("temp_value").innerHTML = currentTemp; 
    }

    switch (currentTemp) {
        case 25: data = { command: commandsEnum.temp_25 };  break;
        case 26: data = { command: commandsEnum.temp_26 };  break;
        case 27: data = { command: commandsEnum.temp_27 };  break;
        case 28: data = { command: commandsEnum.temp_28 };  break;
        case 29: data = { command: commandsEnum.temp_29 };  break;
        case 30: data = { command: commandsEnum.temp_30 };  break;
        default: break;
    }

    $.ajax({
        type: 'POST',
        url: "/ControlShower",
        data: data,
        success: function(result) {
            console.log(result);
        },
        error: function () {
            throw "An error occured please try again.";
        }
    });
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
    if (hours == 0) { hours = 12; }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    output = hours + ":" + minutes + " " + am_pm;
    document.getElementById("current_time_container").children[0].innerHTML = output;
}

function getCurrentTemp() {
    data = { command: commandsEnum.get_temp };
    $.ajax({
        type: 'POST',
        url: "/ControlShower",
        data: data,
        success: function(result) {
            var output = (parseFloat(result.substr(3, 3)))/10;
            document.getElementById("current_temp_container").children[0].innerHTML = output + "\00b0 C";
        },
        error: function () {
            document.getElementById("current_temp_container").children[0].innerHTML = "---";
        }
    });
}

function getCurrentFlow() {
    data = { command: commandsEnum.current_flow };
    $.ajax({
        type: 'POST',
        url: "/ControlShower",
        data: data,
        success: function(result) {
            var output = (parseFloat(result.substr(3, 4)))/10;
            document.getElementById("current_usage_container").children[0].innerHTML = output + " L";
        },
        error: function () {
            document.getElementById("current_usage_container").children[0].innerHTML = "---";
        }
    });
}

function getOutsideTemp() {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0e083c7b535597b8802dbe9c3fbf8828/-34.4041,150.8797?exclude=hourly,daily,flags&units=si',
        success: function(response) {
            document.getElementById("current_outside_temp_container").children[0].innerHTML = response.currently.temperature.toFixed(1) + " °C";
        }
      });
}

displayCurrentTime();
getCurrentTemp();
getCurrentFlow();
getOutsideTemp();
setInterval(function () {
    displayCurrentTime();
}, 1000);
setInterval(function () {
    getCurrentTemp();
    getCurrentFlow();
}, 10000);
setInterval(function () {
    getOutsideTemp();
}, 60000);
