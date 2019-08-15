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
