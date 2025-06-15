async function run(e) {
    e.value = "Submitting...";
    e.disabled = true;
    const url = "https://script.google.com/macros/s/AKfycbzWSSTg-Wd-XQOmMNFHQ9LYU5gMCUJW-cjhvRqopQjvNWb49ae5ggYS0nWGOMuEggF7/exec"; // Please set your Web Apps URL here.
    const obj = await ParseFormObjectForGAS(e.parentNode, null, null, true);
    fetch(url, { method: "POST", body: JSON.stringify(obj) })
        .then((res) => res.json())
        .then((res) => console.log(res));
   

    // On completion, reset as needed
    e.value = "Submitted!";
    e.disabled = true;
    }

async function runRSVP(e) {
     e.value = "Submitting...";
     e.disabled = true;
    const url = "https://script.google.com/macros/s/AKfycbwUnGBrJksYd1-gq0kyyXVudWWsfotU3gRhVnjJyEi3-6sTVltC3cScxsekPWS2gqtO/exec"; // Please set your Web Apps URL here.
    const obj = await ParseFormObjectForGAS(e.parentNode, null, null, true);
    fetch(url, { method: "POST", body: JSON.stringify(obj) })
       .then((res) => res.json())
       .then((res) => console.log(res));

     // On completion, reset as needed
    e.value = "Submitted!";
    e.disabled = true;
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