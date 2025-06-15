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




      function showNextQuestion(that) {
        // Only hide mutually exclusive sections
        document.getElementById("no1Question").style.display = "none";
        document.getElementById("submitDiv").style.display = "none";
      
        // Get the answer value (works for radio, button, etc.)
        var answer = that.value || that.getAttribute('data-value');
      
        // Show the next relevant question if it exists
        if (document.getElementById(answer + 'Question')) {
          document.getElementById(answer + 'Question').style.display = "block";
        }
      
        // Show submit button at the end of each branch
        if (answer === "no1" || answer === "no2" || answer === "Guest") {
          document.getElementById("submitDiv").style.display = "block";
        }
      }



// Example menu options
const menuOptions = [
    "Chicken",
    "Beef",
    "Vegetarian",
    "Vegan",
    "Other"
  ];

  const guestCountInput = document.getElementById('guestCount');
  const mealSelectionsDiv = document.getElementById('mealSelections');

  guestCountInput.addEventListener('input', function() {
    // Clear previous meal selections
    mealSelectionsDiv.innerHTML = '';
    const count = parseInt(this.value, 10);

    if (!isNaN(count) && count > 0) {
      for (let i = 1; i <= count; i++) {
        // Create label and select for each guest
        const label = document.createElement('label');
        label.textContent = `Meal choice for Guest ${i}:`;
        label.className = 'meal-select';

        const select = document.createElement('select');
        select.name = `meal${i}`;
        select.required = true;

        // Add menu options
        menuOptions.forEach(option => {
          const opt = document.createElement('option');
          opt.value = option;
          opt.textContent = option;
          select.appendChild(opt);
        });

        label.appendChild(select);
        mealSelectionsDiv.appendChild(label);
      }
    }
  });

  // Optional: handle form submission
  document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('RSVP submitted! Thank you.');
    // Here you can add code to send the form data to your server
  });
