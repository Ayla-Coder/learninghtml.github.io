// Example menu options
const menuOptions = [
    "Chicken",
    "Beef",
    "Vegetarian",
    "Vegan",
    "Fish"
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
  