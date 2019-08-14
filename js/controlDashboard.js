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