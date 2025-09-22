// retrieved elements -----------------------------------------------------
//  fieldsets:


//storage arrays
let oldGuestInfoStorage = [];
let GuestInfoStorage = []; //Nr, Names, Bus yes/no or Bus times, Drink Number, questions, email.
let BusInfoStorage = [];
let DrinkInfoStorage = [];
let EndInfoStorage = [];


//Schemas -----------------------------------------------------

//Functions -----------------------------------------------------

// Logging guest number and names: 

function GuestNumber(){
    // Step 1: Save a copy of old data
    //oldGuestInfo = [...GuestInfoStorage];
    
    //Step 2: wipe the current Storage list to avoid duplicates
    GuestInfoStorage = []; 
    counting = Number(GuestNR.value); // redefines counting to match the number of guests entered by the user. 
      
    //Step 3: wipe all previously generated form elements (gInfo in this case)
    const gInfoDiv = document.getElementById("GuestNames");
    gInfoDiv.innerHTML = '<legend><h3>Enter your full names here:</h3></legend><br>'; //deletes the html content of the guestDetailsDiv element.
    
    if (counting > 0 && counting < 11){ // Since I want a max of 10 guests, this makes sure that the code only works when the entered number is above 0 but below 11. 
    
        gInfoDiv.style.display = "block";
        testArrayDiv.style.display = "block";

            //Step 4: create for loop to generate the amount of dynamic fields necessary.
        for (let i = 0; i < counting; i++){

            //Step 5: create empty local storage object  
                let GuestInfo = {}; // Empty object to store all of the answers in, Guest Name, +1 answer, +1 name, +1 relationship
        
                // myInp is a new div element of the class container that will be added to gInfo later
                const myInp = document.createElement("div"); myInp.className="container";

                // defines the code contained in myInp
                myInp.innerHTML = `
                    <div>
                    <label>Guest ${i+1} full name: </label>
                    <input type="text" id="GuestID${i+1}" name="fname" required/> <br><br>
                    </div>
                    <div id="yesno+1${i+1}">
                        <legend>Would you like to take the private bus?</legend>
                        <input type="radio" id="yes${i+1}" name="Bus${i+1}" value="yes"required/>
                        <label for="yes${i+1}">Yes</label>
                        <input type="radio" id="no${i+1}" name="Bus${i+1}" value="no" required/>
                        <label for="no${i+1}">No</label><br><br>
                    </div>
                    </div>
                    <div id="BusTimes" style="display:none">
                        <legend>What times?</legend>
                        <select id="BusPickup${safeName}" class="BusPickup${safeName}"> 
                            <option value="NoPickup">No</option>
                            <option value="YesPickup">Pickup between 1 pm and 1:30 pm</option>
                        </select>
                    </div>
                `;
                // appends myInp to ginfo in the document.
                gInfoDiv.appendChild(myInp);
        };

    };
};


//Buttons & eventlisteners -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const GuestNR = document.getElementById('guestNR')
  
    // Guest number change triggers guest info fields
    GuestNR.addEventListener("change", GuestNumber);


})
