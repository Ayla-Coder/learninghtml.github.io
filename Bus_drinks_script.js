// retrieved elements 
const dialog = document.getElementById('drinkInfo'); // retrieves the drinkInfo element
const openBtn = document.getElementById('openDialogBtn'); //retrieves the openDialog button
const closeBtn = document.getElementById('closeDialogBtn'); //retrieves the close Dialog button

const testArrayDiv = document.getElementById("testArray");          
const testMealArray = document.getElementById("testMealArray");            
const testBusArray = document.getElementById("testBusArray");           
const testDrinkArray = document.getElementById("testBusArray");
const testQbtn = document.getElementById("testBusbtn");

let GuestInfoStorage = []; // Empty array to store all of the user answers from the GuestInfo fieldset in
let BusInfoStorage = [];
let DrinkInfoStorage = [];
let QuestionInfoStorage = [];

// Keep backup arrays for restoring
let oldGuestInfo = [];
let oldBusInfo = [];
let oldDrinkInfo = [];
let oldQuestion = [];

//Schemas

//Functions
function gatherFormData(sharedQuestion) {
    const responder = document.getElementById("Responder").value.trim();
    const coming = document.querySelector("input[name='RSVP1']:checked")?.value || "";
    const emailInput = document.getElementById("EUpdates");
    const noEmail = document.getElementById("NoElUp").checked;
    const email = noEmail ? "no thank you" : (emailInput ? emailInput.value.trim() : "");

    let guests = [];

    // Loop through all main guests and their plus-ones
    for (let i = 0; i < GuestInfoStorage.length; i++) {
        const guest = GuestInfoStorage[i];

        // --- Main guest ---
        const guestName = guest.GuestName || "";
        const mealInfo = MealInfoStorage.find(m => m.GuestName === guestName) || {};
        const busInfo = BusInfoStorage.find(b => b.GuestName === guestName) || {};
        const drinkInfo = DrinkInfoStorage.find(d => d.GuestName === guestName) || {};

        // --- Properly extract pick up and drop off from busTimes array ---
        let pickUp = "";
        let dropOff = "";
        if (Array.isArray(busInfo.busTimes)) {
            pickUp = busInfo.busTimes.find(t => t === "01:30 pm") || "";
            dropOff = busInfo.busTimes.filter(t => t !== "01:30 pm").join(", ");
        } else if (typeof busInfo.busTimes === "string") {
            if (busInfo.busTimes === "01:30 pm") {
                pickUp = "01:30 pm";
                dropOff = "";
            } else {
                pickUp = "";
                dropOff = busInfo.busTimes;
            }
        }

        guests.push({
            name: guestName,
            plusOneRequested: guest.plus1 === "yes" ? "Yes" : "No",
            plusOneName: guest.plusOneName || "",
            plusOneRelationship: guest.plusOneRel || "",
            meals: mealInfo.menuChoice || "",
            allergies: mealInfo.allergenChoice ? mealInfo.allergenChoice.join(", ") : "",
            allergySeverity: mealInfo.severityChoice ? mealInfo.severityChoice.join(", ") : "",
            otherAllergies: mealInfo.otherAllergens || "",
            bus: busInfo.busAnswer || "",
            hotel: busInfo.hotelName || "",
            pickUp: pickUp,
            dropOff: dropOff,
            drinks: drinkInfo.drinks || "",
            questions: sharedQuestion || ""
        });

        // --- Plus one ---
        if (guest.plus1 === "yes" && guest.plusOneName && guest.plusOneName.trim() !== "") {
            const plusOneName = guest.plusOneName;
        // Find the main guest's meal info object
            const mainMealInfo = MealInfoStorage.find(m => m.GuestName === guestName) || {};
            const mealInfoPlus1 = mainMealInfo.plusOneMeal || {};
            const busInfoPlus1 = BusInfoStorage.find(b => b.GuestName === plusOneName) || {};
            const drinkInfoPlus1 = DrinkInfoStorage.find(d => d.GuestName === plusOneName) || {};

            let pickUpPlus1 = "";
            let dropOffPlus1 = "";
            if (Array.isArray(busInfoPlus1.busTimes)) {
                pickUpPlus1 = busInfoPlus1.busTimes.find(t => t === "01:30 pm") || "";
                dropOffPlus1 = busInfoPlus1.busTimes.filter(t => t !== "01:30 pm").join(", ");
            } else if (typeof busInfoPlus1.busTimes === "string") {
                if (busInfoPlus1.busTimes === "01:30 pm") {
                    pickUpPlus1 = "01:30 pm";
                    dropOffPlus1 = "";
                } else {
                    pickUpPlus1 = "";
                    dropOffPlus1 = busInfoPlus1.busTimes;
                }
            }

            guests.push({
                name: plusOneName,
                plusOneRequested: "",
                plusOneName: "",
                plusOneRelationship: "",
                meals: mealInfoPlus1.menuChoice || "",
                allergies: mealInfoPlus1.allergenChoice ? mealInfoPlus1.allergenChoice.join(", ") : "",
                allergySeverity: mealInfoPlus1.severityChoice ? mealInfoPlus1.severityChoice.join(", ") : "",
                otherAllergies: mealInfoPlus1.otherAllergens || "",
                bus: busInfoPlus1.busAnswer || "",
                hotel: busInfoPlus1.hotelName || "",
                pickUp: pickUpPlus1,
                dropOff: dropOffPlus1,
                drinks: drinkInfoPlus1.drinks || "",
                questions: sharedQuestion || ""
            });
        }
    }

    return {
        responder,
        coming,
        email,
        guests
    };
}

    // Gathers the initial data from the form about the responder
    function gatherRSVPData() {
        const responder = document.getElementById("Responder").value.trim();
        const coming = document.querySelector("input[name='RSVP1']:checked")?.value;
        const email = document.getElementById("EUpdates").value.trim();
        const noEmail = document.getElementById("NoElUp").checked;

        return {
            responder,
            coming,
            email: noEmail ? "" : email,
            noEmail
        };
    }

    // this function takes a string and replaces white spaces with _
    function makeSafe(str) {
        return str.replace(/\W/g, '_');
    };


//For the first guest info section --------------------------------------------------------------
function updateField() {
    document.getElementById("Menu").style.display = "none"; 
    document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
    document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
    document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

    // Step 1: Save a copy of old data
    oldGuestInfo = [...GuestInfoStorage];
    
    //Step 2: wipe the current Storage list to avoid duplicates
    GuestInfoStorage = []; 

    const guests = document.getElementById("guestNR");
    counting = Number(guests.value); // redefines counting to match the number of guests entered by the user. 
    countingGandPlus1 = counting
    
    //Step 3: wipe all previously generated form elements (gInfo in this case)
    const gInfoDiv = document.getElementById("gInfo");
    gInfoDiv.innerHTML = '<legend><h3>Enter your full names here:</h3></legend><br>'; //deletes the html content of the guestDetailsDiv element.
    
    if (counting > 0 && counting < 11){ // Since I want a max of 10 guests, this makes sure that the code only works when the entered number is above 0 but below 11. 
    
        gInfoDiv.style.display = "block";
        testArrayDiv.style.display = "block";

        //Step 4: create for loop to generate the amount of dynamic fields necessary.
        for (let i = 0; i<counting; i++){ //runs the following code up to the number specified by user.
            
            //Step 5: create empty local storage object  
            let GuestiInfo = {}; // Empty object to store all of the answers in, Guest Name, +1 answer, +1 name, +1 relationship
    
            // myInp is a new div element of the class container that will be added to gInfo later
            const myInp = document.createElement("div"); myInp.className="container";

            // defines the code contained in myInp
            myInp.innerHTML = `
            <div>
            <label>Guest ${i+1} full name: </label>
            <input type="text" id="GuestID${i+1}" name="fname" required/> <br><br>
            </div>
            <div id="yesno+1${i+1}">
                <legend>Would you like to request a +1?</legend>
                <input type="radio" id="yes${i+1}" name="+1${i+1}" value="yes"required/>
                <label for="yes${i+1}">Yes</label>
                <input type="radio" id="no${i+1}" name="+1${i+1}" value="no" required/>
                <label for="no${i+1}">No</label><br><br>
            </div>
            `;

            // appends myInp to ginfo in the document.
            gInfoDiv.appendChild(myInp);

            const GuestName = myInp.querySelector(`#GuestID${i+1}`); //retrieves the current GuestName to save in GuestInfo later
            const plusOneYes = myInp.querySelector(`#yes${i+1}`); // retrieves the yes input
            const plusOneNo = myInp.querySelector(`#no${i+1}`); // retrieves the no input
            
            //Event listener for the main guest name                        
            GuestName.addEventListener("change", function(){
                GuestiInfo.GuestName = this.value; // saves the entered guest name into GuestInfo for later
            });

            // Event listener for the yes radio button. Adds the input fields for plus one to the guest's info
            plusOneYes.addEventListener("click", function() {
                document.getElementById("Menu").style.display = "none"; 
                document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
                
                countingGandPlus1 += 1
                let plusOneInfo = document.getElementById(`+1info${i+1}`); // retrieves the plusone info field if it already exists. 
            

                //if no plus one for this guest existed before, then one is created
                if (!plusOneInfo){ 
                        plusOneInfo = document.createElement("div"); 
                        plusOneInfo.className = "container"; 
                        plusOneInfo.id = `+1info${i+1}`;
                    
                        // writes the info in the newly created div
                    plusOneInfo.innerHTML = `  
                        <div> <label>Name of plus one for Guest ${i+1}: </label> </div>
                        <div> <label>Relationship between plus one and Guest ${i+1}: </label></div>
                        <div><input type="text" id="plusOneName${i+1}" name="fname" /> </div>
                        <div><input type="text" id="plusOneRel${i+1}" name="longAns"/></div> <br><br>`;
                        // appends this plus one info to myInp
                    myInp.appendChild(plusOneInfo);

                    // adding eventlisteners to the newly generated plusOne text input fields
                    plusOneInfo.querySelector(`#plusOneName${i+1}`).addEventListener("change", function(){
                        GuestiInfo.plusOneName = this.value;
                    });
                    plusOneInfo.querySelector(`#plusOneRel${i+1}`).addEventListener("change", function(){
                        GuestiInfo.plusOneRel = this.value;
                    });

                    // Restores old plus one info if it exists
                    if (oldGuestInfo[i] && oldGuestInfo[i].plusOneName) { //if both oldGuestInfo[i] and oldGuestInfo[i].plusOneName exists, run the following code:
                        plusOneInfo.querySelector(`#plusOneName${i+1}`).value = oldGuestInfo[i].plusOneName; //retrieves the old plus1 info
                        GuestiInfo.plusOneName = oldGuestInfo[i].plusOneName // restores the old plus 1 info
                    }
                    if (oldGuestInfo[i] && oldGuestInfo[i].plusOneRel) {//if both oldGuestInfo[i] and oldGuestInfo[i].plusOneName exists, run the following code:
                        plusOneInfo.querySelector(`#plusOneRel${i+1}`).value = oldGuestInfo[i].plusOneRel;//retrieves the old plus1 info
                        GuestiInfo.plusOneRel = oldGuestInfo[i].plusOneRel // restores the old plus 1 info
                    }
                }; // the end of the if statement for restoring old data 

                GuestiInfo.numberTotal = countingGandPlus1;
                // if no plusOneInfo existed yet, then the value of the yes radio button is set to yes here. 
                GuestiInfo.plus1 = "yes";
                }); //the end of the plusOneYes event listener

            // adds an eventlistener to the no radio button that 1) removes the +1 info input fields if the user clicked yes first and 2) adds this answer to GuestInfo
            plusOneNo.addEventListener("click", function() {
                document.getElementById("Menu").style.display = "none"; 
                document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                const changedFromYes = document.getElementById(`+1info${i+1}`) // retrieves the +1info from the document
                if (changedFromYes) changedFromYes.remove(); //if this +1info exists in the document, it is removed
                GuestiInfo.plus1 = "no"; // stores the new answer in GuestiInfo
                GuestiInfo.plusOneName = "";
                GuestiInfo.plusOneRel = "";
            })

            //Step 10: Restore old guest data if it exists
            if (oldGuestInfo[i]) { //if there is anything stored in oldGuestInfo[i], proceed with following code
                const old = oldGuestInfo[i];
                // Restore guest name
                GuestName.value = old.GuestName || ""; // sets the current value to the old value or clears it with ""
                GuestiInfo.GuestName = old.GuestName || ""; 
                
                // Restore +1 radio
                if (old.plus1 === "yes") {
                    plusOneYes.checked = true; 
                    // Programmatically trigger the click to create the +1 fields
                    plusOneYes.click();

                }else if (old.plus1 === "no"){
                    plusOneNo.checked = true;
                    GuestiInfo.plus1 = "no";// sete the current no value to no for validation purposes. 
                }
            } // end of checking if oldguest info was saved
            

            // Saves the info gathered into GuestInfo into a global list by index. This keeps things ordered for later
            GuestInfoStorage[i] = GuestiInfo; 
        };  // end of for loop
        
    }// end of if statement

    // If the number of guests entered is not between 1 and 10, this alert will pop up.
    else {
        window.alert("Please enter a number between 1 and 10");
    }
}

// creates the bus input fields for each guest based on the first question
function updateBus() {
    document.getElementById("Drinks").style.display = "none";
    document.getElementById("DrinkNext").innerHTML = "";
    document.getElementById("End").style.display = "none";
    document.getElementById("Bus").style.display = "block";
    testBusArray.style.display = "block";

    let oldBusInfo = [...BusInfoStorage];
    BusInfoStorage = [];
    const guestBusDiv = document.getElementById("BussInf");
    guestBusDiv.innerHTML = "";

    // Build a map of old bus info by name
    let oldBusInfoMap = {};
    (oldBusInfo || []).forEach(item => {
        if (item.GuestName && item.plus1 === "no") oldBusInfoMap[item.GuestName] = item;
        if ((item.PlusOneName || item.GuestName) && item.plus1 === "yes") {
            let name = item.PlusOneName || item.GuestName;
            oldBusInfoMap[name] = item;
        }
    });

    // Always create and push a new storage object for every guest and plus-one
    for (let i = 0; i < GuestInfoStorage.length; i++) {
        let guestName = GuestInfoStorage[i].GuestName;
        let plusOneName = GuestInfoStorage[i].plusOneName || "";

        // --- Main guest ---
        let [dynamicSection, temporaryBusStorage] = createBusSection(guestName);
        temporaryBusStorage.plus1 = "no";
        guestBusDiv.appendChild(dynamicSection);

        // Restore main guest bus info by name if it exists
        if (oldBusInfoMap[guestName]) {
            restoreBusSection(dynamicSection, oldBusInfoMap[guestName], makeSafe(guestName));
            Object.assign(temporaryBusStorage, oldBusInfoMap[guestName]);
        }
        // Always push a new object for the main guest
        BusInfoStorage.push(temporaryBusStorage);

        // --- Plus-one (if present) ---
        if (plusOneName.trim() !== "") {
            let [dynamicSectionPlus1, temporaryPlus1BusStorage] = createBusSection(plusOneName);
            temporaryPlus1BusStorage.plus1 = "yes";
            temporaryPlus1BusStorage.PlusOneName = plusOneName;
            temporaryPlus1BusStorage.mainGuestName = guestName;
            guestBusDiv.appendChild(dynamicSectionPlus1);

            // Restore plus-one bus info by name if it exists
            if (oldBusInfoMap[plusOneName]) {
                restoreBusSection(dynamicSectionPlus1, oldBusInfoMap[plusOneName], makeSafe(plusOneName));
                Object.assign(temporaryPlus1BusStorage, oldBusInfoMap[plusOneName]);
            }
            // Always push a new object for the plus-one
            BusInfoStorage.push(temporaryPlus1BusStorage);
        }
    }

    // Debug: Check that every guest/plus-one is represented
    console.log("BusInfoStorage after update:", BusInfoStorage.map(x => x.GuestName || x.PlusOneName));
}





// helper for restoring businfo section data: UserAnswers = [busAnswer, hotelInp, pickUp, busTimes]
function restoreBusSection(section, oldData, safeName){
    if (!oldData) return;

    const yesRadio = section.querySelector(`#yesBus${safeName}`);
    const noRadio = section.querySelector(`#noBus${safeName}`);
    const ifYesDiv = section.querySelector(`#ifYesBus${safeName}`);
    const busTimesDiv = section.querySelector(`#timesBus${safeName}`);
    const hotelInp = section.querySelector(`#hName${safeName}`);
    const pickUp = section.querySelector(`#times1${safeName}`);
    const times = section.querySelectorAll(`.noSuggest${safeName}`);
    const times4Radio = section.querySelector(`#times4${safeName}`);
    const suggestedTime = section.querySelector(`#Suggested${safeName}`);
    const laterDropOffDiv = section.querySelector(`#laterDropOff${safeName}`);

    // Log the entire oldData for debugging
    console.log("Restoring bus section for:", safeName, "oldData:", oldData);

    // Restore bus answer and update UI
    if (oldData.busAnswer === "Yes" && yesRadio) {
        yesRadio.checked = true;
        ifYesDiv.style.display = "block";
        busTimesDiv.style.display = "block";
    } else if (oldData.busAnswer === "No" && noRadio) {
        noRadio.checked = true;
        ifYesDiv.style.display = "none";
        busTimesDiv.style.display = "none";
    }

    // Restore hotel input
    if (hotelInp) hotelInp.value = oldData.hotelName || "";

    // --- THIS IS WHERE YOU LOG PICKUP RESTORATION ---
    if (pickUp) {
        console.log("Checking pickUp:", pickUp.value, "in", oldData.busTimes);
        pickUp.checked = oldData.busTimes && (
            (Array.isArray(oldData.busTimes) && oldData.busTimes.includes(pickUp.value)) ||
            oldData.busTimes === pickUp.value
        );
    }

    // --- LOG EACH DROP-OFF RADIO RESTORATION ---
    times.forEach(function(radio){
        console.log("Checking drop-off:", radio.value, "in", oldData.busTimes);
        radio.checked = oldData.busTimes && (
            (Array.isArray(oldData.busTimes) && oldData.busTimes.includes(radio.value)) ||
            oldData.busTimes === radio.value
        );
    });

    // --- LOG SUGGESTED TIME RESTORATION ---
    if (times4Radio && suggestedTime){
        console.log("Checking suggested time:", suggestedTime.value, "in", oldData.busTimes);
        times4Radio.checked = oldData.busTimes && (
            (Array.isArray(oldData.busTimes) && oldData.busTimes.includes(suggestedTime.value)) ||
            oldData.busTimes === suggestedTime.value
        );
        suggestedTime.value = oldData.suggestedTime || "";
    }

    // Show/hide suggested time input
    if (times4Radio && times4Radio.checked) {
        laterDropOffDiv.style.display = "block";
    } else {
        laterDropOffDiv.style.display = "none";
    }
}

// Helper function for updatebus
function createBusSection(personName) {
    //Step 5: create empty local storage object:
    let busInfo = {};
    busInfo.GuestName = personName

    const safeName = makeSafe(personName); // removes whitespaces from the name, replacing them with _

    //step 6: create the dynamic form-object
    //creates a new div element called section, making it class=container3 for styling
    let section = document.createElement("div");section.className = "container3";
    section.innerHTML = `
        <div>
        <label>${personName}: </label><br>
        <input type="radio" id="yesBus${safeName}" name="Bus${safeName}" value="Yes"/>
        <label for="yesBus${safeName}">Yes</label>

        <input type="radio" id="noBus${safeName}" name="Bus${safeName}" value="No"/>
        <label for="noBus${safeName}">No</label>
        </div>

        <div id="ifYesBus${safeName}" style="display:none">
        <legend>
        <b>Which hotel do you think you will be staying at?</b><br>
        <i>*Please write TBD if you're not sure yet.</i>
        </legend>
        <label>(Where should the bus pick you up/ drop you off?)</label>
        <input type="text" id="hName${safeName}" name="longAns"/>
        </div>
        <div>
        </div>

        <div id="timesBus${safeName}" style="display:none">
        <legend><b>What times would you want to take the bus?</b></legend>
        <p>Info: we are early-birds, but if enough people would like to stay later than 01:00 am, we will consider pushing 
            the second drop-off time back</p>

        <div class="smallcontainer2"> 
            <div class="small">
                <div>
                <input type="checkbox" id="times1${safeName}" value = "01:30 pm"/>
                </div>
                <div>
                <label for="times1${safeName}">Pick-up at 01:30 pm (13:30)</label>
                </div>
            </div>
            <div>
                <legend>Drop-off times</legend>
                <input type="radio" id="noTime${safeName}" name="dropOff${safeName}" class="noSuggest${safeName}"/>
                <label for="times2${safeName}">No drop-off</label> <br>

                <input type="radio" id="times2${safeName}" value="10:30 pm" name="dropOff${safeName}" class="noSuggest${safeName}"/>
                <label for="times2${safeName}">10:30 pm (22:30)</label> <br>
                
                <input type="radio" id="times3${safeName}" value="01:00 am" name="dropOff${safeName}" class="noSuggest${safeName}"/>
                <label for="times3${safeName}">01:00 am (01:00)</label><br>
            
                <input type="radio" id="times4${safeName}" name="dropOff${safeName}"/>
                <label for="times4${safeName}">Request a later time</label><br>
            </div>
                <div id="laterDropOff${safeName}" style="display:none"> 

                <label>Please suggest a time before 03:00 am here:</label><br>
                <input type="time" id="Suggested${safeName}"/>
            </div>
        </div>
        
    </div>`;

    // Step 8: retrieve any input elements from the newly generated section:
    // querySelector, not getElementById, is used because of the way the code was before (unsanitized by safeName). can only be after innerHTML is set
    const yesRadio = section.querySelector(`#yesBus${safeName}`); // retrieves the yes radio button
    const noRadio = section.querySelector(`#noBus${safeName}`); // retrieves the no radio button
    const ifYesDiv = section.querySelector(`#ifYesBus${safeName}`);  
    const hotelInp = section.querySelector(`#hName${safeName}`); // retrieves the hotel name input
    const busTimes = section.querySelector(`#timesBus${safeName}`); // retrieves the bus times div element
    const suggestedTime = section.querySelector(`#Suggested${safeName}`); // retrieves the later drop-off radio button
    const times = section.querySelectorAll(`.noSuggest${safeName}`); // retrieves all other drop-off radio buttons by the class attribute (indicated with a . instead of #)
    const times4Radio = section.querySelector(`#times4${safeName}`); // retrieves the later drop-off time suggestion 
    const pickUp = section.querySelector(`#times1${safeName}`);
    
    //Step 9: add eventlisteners to these input elements to save the current answers to the temp storage object (busInfo)
    //if the yes radio button is selected, the hotel name input and the bus times input are made visible     
    yesRadio.addEventListener("change", function() {
        document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
        busInfo.busAnswer = "Yes";
        ifYesDiv.style.display = "block";
        busTimes.style.display = "block";
        busAnswer = "Yes"                    
            });

    hotelInp.addEventListener("change", function(){
        busInfo.hotelName = this.value
    });

    // if the no radio button is selected, the hotel name input and the bus times input are made invisible again if they were already visible
    noRadio.addEventListener("change", function(){
        document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
        busInfo.busAnswer = "No";
        busInfo.busTimes = "";
        busInfo.suggestedTime = "";

        ifYesDiv.style.display = "none";
        busTimes.style.display = "none";
        busAnswer = "No"
    });

    times4Radio.addEventListener("change", updateBusTimes) ;
        // --- Pick-up checkbox ---
    pickUp.addEventListener("change", updateBusTimes);

    // --- Suggest time input ---
    suggestedTime.addEventListener("change", updateBusTimes);

    // --- Main function to update busTimes ---
    // --- Pick-up, drop-off, and suggested time logic ---
    function updateBusTimes() {
        document.getElementById("Drinks").style.display = "none";
        document.getElementById("End").style.display = "none";

        let pickUpSelected = pickUp.checked;
        let dropOffValue = null;
        times.forEach(function(radio) {
            if (radio.checked) {
                dropOffValue = radio.value;
            }
        });

        let suggestChecked = times4Radio.checked;
        let suggestedValue = suggestedTime.value;

        // Show/hide suggested time input
        section.querySelector(`#laterDropOff${safeName}`).style.display = suggestChecked ? "block" : "none";

        // Build busTimes array
        let timesArr = [];
        if (pickUpSelected) timesArr.push(pickUp.value);
        if (dropOffValue) timesArr.push(dropOffValue);
        if (suggestChecked && suggestedValue) timesArr.push(suggestedValue);

        // Set busTimes and timeSelected
        if (timesArr.length > 0) {
        busInfo.timeSelected = "true";
        busInfo.busTimes = timesArr;
        } else {
        busInfo.timeSelected = "false";
        busInfo.busTimes = "";
        }
    }

    // --- Attach event listeners ---
    pickUp.addEventListener("change", updateBusTimes);
    times.forEach(radio => radio.addEventListener("change", updateBusTimes));
    times4Radio.addEventListener("change", updateBusTimes);
    suggestedTime.addEventListener("change", updateBusTimes);

    return [section, busInfo];
}

//drinks function
function updateDrinks (){
    document.getElementById("DrinkNext").innerHTML = ''; //deletes the html content of the DrinkNext element.
    document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
    document.getElementById("Drinks").style.display = "block"; // makes the Drinks element visible
    
    const guestDrink = document.getElementById("DrinkNext"); //retrieves the DrinkNext element from the document
    
    let storageIndex = 0;
    for (let i = 0; i<counting; i++){

        let guestName = GuestInfoStorage[i].GuestName; // retrieves the guest name from GuestInfoStorage

        // retrieves the +1 name from GuestInfoStorage if it exists, and sets plusOneName to "" if it doesnt exits (is undefined)
        let plusOneName = GuestInfoStorage[i].plusOneName || ""; 

        // appends the drink inputs for each guest to the DrinkNext element in the document using the createDrinkSection function
        guestDrink.appendChild(createDrinksSection(guestName, storageIndex));
        storageIndex++;
        if (plusOneName.trim() !== "") {
            

        if (plusOneName.trim() !== "") { // if the plus 1 name exists and isn't just "" when all the whitespace is removed, the following happens: 
            guestDrink.appendChild(createDrinksSection(plusOneName, storageIndex));
            storageIndex++; // the +1 name is appended to the DrinkNext element in the document
        }
    };
}};

// Helper function for updateDrinks
function createDrinksSection(personName, storageIndex) {
    const safeName = makeSafe(personName) // replaces all whitespaces in the name with _
    let drinkInfo = DrinkInfoStorage[storageIndex] || {};
    drinkInfo.GuestName = personName;
    DrinkInfoStorage[storageIndex] = drinkInfo;


    // creates a new div element using class="container3" for styling
    let section = document.createElement("div");section.className = "container3";
    section.innerHTML = `
        <div>
        <legend>Are you interested in getting some vouchers?</legend>

        <label>${personName}: </label><br>
        <input type="radio" id="yesDrinks${safeName}" name="drinkName${safeName}" value="yes"/>
        <label for="yesBus${safeName}">Yes</label>

        <input type="radio" id="noDrinks${safeName}" name="drinkName${safeName}" value="no"/>
        <label for="noBus${safeName}">No</label>
        </div>`;

    const yesDrinks = section.querySelector(`#yesDrinks${safeName}`); //retrieves the yes radio button
    const noDrinks = section.querySelector(`#noDrinks${safeName}`); //retrieves the no radio button

    // adds eventlistener to the yes and no radio buttons, which displays the next button when selected
    if (yesDrinks) { // if (yesDrinks) check is a safety net to make sure times exists before trying to use it.
            yesDrinks.addEventListener("change", function() {
                    drinkInfo.drinks = "Yes";
                document.getElementById("Next5").style.display = "block";
            });
        };
            // adds eventlistener to the no radio button, which displays the next button when selected
        if (noDrinks) {
            noDrinks.addEventListener("change", function() {
                drinkInfo.drinks = "No";
                document.getElementById("Next5").style.display = "block";
            });
        };
    DrinkInfoStorage[storageIndex] = drinkInfo;
    return section;
}
// universal validation function

function validateInfo(infoList, schema) {
    for (let i = 0; i < infoList.length; i++) {
        const answer = infoList[i];
        // Validate main object (guest or plus-one)
        for (const rule of schema) {
            if (rule.if) {
                if (answer[rule.if.field] === rule.if.value) {
                    if (!answer[rule.field] || answer[rule.field].toString().trim() === "") {
                        alert(rule.message ? rule.message.replace('{n}', i+1).replace(`{m}`, i) : `Please fill in ${rule.field} for item ${i+1}`);
                        return false;
                    }
                }
            } else {
                if (!answer[rule.field] || answer[rule.field].toString().trim() === "") {
                    alert(rule.message ? rule.message.replace('{n}', i+1) : `Please fill in ${rule.field} for item ${i+1}`);
                    return false;
                }
            }
        }
        // If this object has a nested plus-one (for meals), validate that too
        if (answer.plusOneMeal) {
            for (const rule of schema) {
                if (rule.if) {
                    if (answer.plusOneMeal[rule.if.field] === rule.if.value) {
                        if (!answer.plusOneMeal[rule.field] || answer.plusOneMeal[rule.field].toString().trim() === "") {
                            alert(rule.message ? `Plus-one of guest ${i+1}: ${rule.message}` : `Please fill in ${rule.field} for plus-one of guest ${i+1}`);
                            return false;
                        }
                    }
                } else {
                    if (!answer.plusOneMeal[rule.field] || answer.plusOneMeal[rule.field].toString().trim() === "") {
                        alert(rule.message ? `Plus-one of guest ${i+1}: ${rule.message}` : `Please fill in ${rule.field} for plus-one of guest ${i+1}`);
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

//Buttons & eventlisteners