// Menu options
const menuOptions = ["Chicken", "Beef", "Vegetarian", "Vegan", "Fish"];

let guests = [];
let plusOnes = [];

// Step 1: Guest details
const guestCountInput = document.getElementById('guestCount');
const guestDetailsDiv = document.getElementById('guestDetails'); // defines the guestDetails div element from the html doc as the constant guestDetailsDiv
const toStep2Btn = document.getElementById('toStep2');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const plusOneDetailsDiv = document.getElementById('plusOneDetails');
const toStep3Btn = document.getElementById('toStep3');
const step3 = document.getElementById('step3');
const mealDetailsDiv = document.getElementById('mealDetails');
const rsvpForm = document.getElementById('rsvpForm');

// Dynamically generate guest fields
guestCountInput.addEventListener('input', function() {
  guestDetailsDiv.innerHTML = ''; //deletes the html content of the guestDetailsDiv element.
  guests = [];
  const count = parseInt(this.value, 10);
  
// NAN = Not A Number
  if (!isNaN(count) && count > 0) { //if count is both a number (not a NAN) and above 0, the code runs

    for (let i = 0; i < count; i++) { // for i in range(0, count, 1):

      const guestBlock = document.createElement('div'); // defines a new constant called guestBlock as a newly created div element

      guestBlock.className = 'guest-block'; // Assigns a classname to the constant guestBlock 

      //creating the html content for the constant guestBlock:
      guestBlock.innerHTML = ` 
        <label>Full name of Guest ${i+1}:
          <input type="text" name="guestName${i}" required>
        </label>
        <span class="inline">Would you like to request a +1?</span>
        <label class="inline"><input type="radio" name="plusOne${i}" value="yes" required> Yes</label>
        <label class="inline"><input type="radio" name="plusOne${i}" value="no" required> No</label>
      `;

      guestDetailsDiv.appendChild(guestBlock); // adds the div element guestBlock to guestDetailsDiv
    }
  }
});

// Step 1 -> Step 2
toStep2Btn.addEventListener('click', function() {
  // Validate guest names and +1s
  const count = parseInt(guestCountInput.value, 10);
  guests = [];
  let valid = true;
  for (let i = 0; i < count; i++) {
    const name = rsvpForm[`guestName${i}`].value.trim();
    const plusOne = rsvpForm[`plusOne${i}`].value;
    if (!name || !plusOne) valid = false;
    guests.push({ name, plusOne: plusOne === 'yes' });
  }
  if (!valid) {
    alert('Please fill out all guest names and +1 selections.');
    return;
  }
  // Build plus one fields
  plusOneDetailsDiv.innerHTML = '';
  plusOnes = [];
  guests.forEach((guest, i) => {
    if (guest.plusOne) {
      const plusBlock = document.createElement('div');
      plusBlock.className = 'plusone-block';
      plusBlock.innerHTML = `
        <strong>${guest.name} +1:</strong>
        <label>Full name:
          <input type="text" name="plusOneName${i}" required>
        </label>
        <label>Relationship:
          <input type="text" name="plusOneRel${i}" required>
        </label>
      `;
      plusOneDetailsDiv.appendChild(plusBlock);
      plusOnes.push({ guestIndex: i });
    }
  });
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
});

// Step 2 -> Step 3
toStep3Btn.addEventListener('click', function() {
  // Validate plus one names/relationships
  let valid = true;
  plusOnes.forEach(({ guestIndex }, idx) => {
    const name = rsvpForm[`plusOneName${guestIndex}`].value.trim();
    const rel = rsvpForm[`plusOneRel${guestIndex}`].value.trim();
    if (!name || !rel) valid = false;
    plusOnes[idx].name = name;
    plusOnes[idx].relationship = rel;
  });
  if (!valid) {
    alert('Please fill out all +1 names and relationships.');
    return;
  }
  // Build meal selection fields
  mealDetailsDiv.innerHTML = '';
  // Guests
  guests.forEach((guest, i) => {
    const mealBlock = document.createElement('div');
    mealBlock.className = 'meal-block';
    mealBlock.innerHTML = `
      <strong>${guest.name}</strong>
      <label>Meal:
        <select name="mealGuest${i}" required>
          ${menuOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>
      </label>
      <label>Allergies:
        <input type="text" name="allergyGuest${i}" placeholder="(optional)">
      </label>
    `;
    mealDetailsDiv.appendChild(mealBlock);
  });
  // Plus Ones
  plusOnes.forEach((plus, idx) => {
    const mealBlock = document.createElement('div');
    mealBlock.className = 'meal-block';
    mealBlock.innerHTML = `
      <strong>${plus.name}</strong>
      <label>Meal:
        <select name="mealPlus${idx}" required>
          ${menuOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>
      </label>
      <label>Allergies:
        <input type="text" name="allergyPlus${idx}" placeholder="(optional)">
      </label>
    `;
    mealDetailsDiv.appendChild(mealBlock);
  });
  step2.classList.add('hidden');
  step3.classList.remove('hidden');
});

// Submit
rsvpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Collect all data here if needed
  alert('RSVP submitted! Thank you.');
  // Optionally, send data to server here
});
