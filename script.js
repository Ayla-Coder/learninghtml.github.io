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

  // Function declaration for createTable
function createTable()
{
    // Prompting the user to input the number of rows
    rn = window.prompt("Input number of rows", 1);
    // Prompting the user to input the number of columns
    cn = window.prompt("Input number of columns",1);
  
    // Looping through rows
    for(var r=0;r<parseInt(rn,10);r++)
    {
        // Inserting a new row at index r in the table
        var x=document.getElementById('myTable').insertRow(r);
        // Looping through columns
        for(var c=0;c<parseInt(cn,10);c++)  
        {
            // Inserting a new cell at index c in the current row
            var y=  x.insertCell(c);
            // Setting the inner HTML content of the cell
            y.innerHTML="Row-"+r+" Column-"+c; 
        }
    }
}