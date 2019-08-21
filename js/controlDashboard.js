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
}, 1000)