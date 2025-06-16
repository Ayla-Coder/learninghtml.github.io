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

//takes a triggerSelector (the given answer), and compares this to a triggerValue (an answer option). 
// If triggerSelector == triggerValue, the function will set the display setting of targetSelector to "block", making it visible while keepin the other branch hidden
//function branchForm(triggerSelector, triggerValue, targetSelector) {
    //document.querySelector(triggerSelector).addEventListener('change', function(e) {
   // document.querySelector(targetSelector).style.display = 
   // e.target.value === triggerValue ? 'block' : 'none';
   // });
//}

function branchForm(triggerSelector, triggerValue, targetSelector) {
    // Select all elements that match the triggerSelector (could be radios, a select, etc.)
    var triggers = document.querySelectorAll(triggerSelector);
  
    // Add a 'change' event listener to each trigger element
    triggers.forEach(function(trigger) {
      trigger.addEventListener('change', function() {
        // For radio groups: find the checked radio in the group
        // For selects/checkboxes: this will be null, so fallback to trigger.value
        var checked = document.querySelector(triggerSelector + ':checked');
  
        // If a checked radio is found, use its value; otherwise, use the value of the changed element (for select/checkbox)
        var value = checked ? checked.value : trigger.value;
  
        // Select the target element to show/hide
        var target = document.querySelector(targetSelector);
  
        // Show the target if the value matches triggerValue; otherwise, hide it
        if (value === triggerValue) {
          target.style.display = 'block';
        } else {
          target.style.display = 'none';
        }
      });
    });
  }


  
// Function to dynamically create a table with the specified number of rows and columns
// and insert it into a container element by its ID.
function createTable(numRows, numCols, containerId) {
    
    // Get the container element where the table will be inserted
    const tableContainer = document.getElementById(containerId);
  
    // Clear any existing content in the container (removes old tables)
    tableContainer.innerHTML = '';
  
    // Create a new table element
    const table = document.createElement('table');
    // Add a CSS class for styling (use CSS for borders and appearance)
    table.className = 'styled-table';
  
    // Loop to create table rows
    for (let r = 0; r < numRows; r++) {
      // Create a new row
      const row = table.insertRow();
      // Loop to create table cells in each row
      for (let c = 0; c < numCols; c++) {
        // Create a new cell
        const cell = row.insertCell();
        // Optionally set the cell's text content
        cell.textContent = `Row ${r + 1}, Col ${c + 1}`;
      }
    }
  
    // Insert the completed table into the container
    tableContainer.appendChild(table);
  }
  