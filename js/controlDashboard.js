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
document.getElementById("current_time_container").children[0].onload = function(){


  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var output;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  output = hours +":"+ minutes
  document.getElementById("current_time_container").children[0].innerHTML = output;
  return(output);
}

console.log(document.getElementById("current_time_container").children[0].onload());
