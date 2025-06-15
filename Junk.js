function showNextQuestion(that) {
    // Hide all possible follow-up questions first
    document.getElementById("yes1Question").style.display = "none"; // yes, the guest is coming -> move on to Q2
    document.getElementById("no1Question").style.display = "none"; // no, the guest isnt coming -> send a thank you message
    document.getElementById("yes2Question").style.display = "none"; // yes, the guest is subscribed to newsletter -> move on to menu
    document.getElementById("no2Question").style.display = "none"; // no, the guest is not subscribed to the newsletter -> ask for email and show menu
    document.getElementById("GuestQuestion").style.display = "none"; // entered the guest names
    document.getElementById("submitDiv").style.display = "none"; // displays when the last question is answered

   
    // document.getElementById("elmail2s").style.display = "none"; // shows the enter email field
    

    // Show the next relevant question
   // var answer = that.value;

    // Get the answer value (works for radio, button, etc.)
    var answer = that.value || that.getAttribute('data-value');

    if (document.getElementById(answer + 'Question')) {
        document.getElementById(answer + 'Question').style.display = "block";
    }
}




    function displayQuestion(answer) {

        if (answer == "yes") { // hide the div that is not selected
      
          document.getElementById('noQuestion').style.display = "none";
      
        } else if (answer == "no") {
      
          document.getElementById('yesQuestion').style.display = "none";
      
        }
      
      }


