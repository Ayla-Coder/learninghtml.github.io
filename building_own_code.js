            const guests = document.getElementById("guestNR");
            const testbtn = document.getElementById("testbtn");
            const testArrayDiv = document.getElementById("testArray");
            
            let GuestInfoStorage = []; // Empty array to store all of the user answers from the GuestInfo fieldset in
            let MealInfoStorage = [];
            let BusInfoStorage = [];
            let DrinkInfoStorage = [];
            let counting = 0; // defines a global counting variable that is redefined when the updateField function is run. Stores this info for the next part of the RSVP.
            // a schema that defines the rules for the GuestInfoStorage array. Used later for validation checks
            const guestInfoSchema = [
                { field: "GuestName", message: "Please enter the name for Guest {n}" },
                { field: "plus1", message: "Please select if Guest {n} wants a +1" },
                { field: "plusOneName", if: { field: "plus1", value: "yes" }, message: "Please enter the +1 name for Guest {n}" },
                { field: "plusOneRel", if: { field: "plus1", value: "yes" }, message: "Please enter the +1 relationship for Guest {n}" }
            ];
            const mealInfoSchema = [
                { field: "menuChoice",  message: "Please select a meal for Guest {n}" },
                { field: "severityChoice", if: { field: "allergenChoice", value: "true" }, message: "Please enter the severity of your allergies" },
            ];    

            function updateField() {
                document.getElementById("Menu").style.display = "none"; //hides the menu section if it was previously filled out
                document.getElementById("guestMeals").innerHTML= ""; //resets the menu section if it was previously filled out
                document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                document.getElementById("BussInf").innerHTML= ""; //resets the bus section if it was previously filled out
                document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                document.getElementById("DrinkNext").innerHTML = ""; //resets the drinks section if it was previously filled out
                document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out


                document.getElementById("gInfo").innerHTML = '<legend><h3>Enter your full names here:</h3></legend><br>'; //deletes the html content of the guestDetailsDiv element.
                GuestInfoStorage = [];
                counting = guests.value; // redefines counting to match the number of guests entered by the user. 
                
                if (counting > 0 && counting < 11){ // Since I want a max of 10 guests, this makes sure that the code only works when the entered number is above 0 but below 11. 
                
                    document.getElementById("gInfo").style.display = "block";
                    testArrayDiv.style.display = "block";

                    for (let i = 0; i<counting; i++){ //runs the following code up to the number specified by user. 
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
                        document.getElementById("gInfo").appendChild(myInp);

                        //saves the GuestName in GuestInfo for later
                        const GuestName = document.getElementById(`GuestID${i+1}`);
                        GuestName.addEventListener("change", function(){
                            GuestiInfo.GuestName = this.value;
                        });

                        // Saves the yes and no inputs as constants
                        const plusOneYes = document.getElementById(`yes${i+1}`);
                        const plusOneNo = document.getElementById(`no${i+1}`);

                        // adds an eventlistener to the yes radio button. This eventlistener adds the input fields for plus one. 
                        plusOneYes.addEventListener("click", function() {
                            document.getElementById("Menu").style.display = "none"; //hides the menu section if it was previously filled out
                            document.getElementById("guestMeals").innerHTML= ""; //resets the menu section if it was previously filled out
                            document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                            document.getElementById("BussInf").innerHTML= ""; //resets the bus section if it was previously filled out
                            document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                            document.getElementById("DrinkNext").innerHTML = ""; //resets the drinks section if it was previously filled out
                            document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                            //creates the div element that contains the plus one input fields and sets the class to container grid for styling 
                            const plusOneInfo = document.createElement("div"); plusOneInfo.className = "container"; plusOneInfo.id = `+1info${i+1}`;

                            // writes the info in the newly created div
                            plusOneInfo.innerHTML = `
                            <div> <label>Name of plus one for Guest ${i+1}: </label> </div>
                            <div> <label>Relationship between plus one and Guest ${i+1}: </label></div>
                            <div><input type="text" id="plusOneName${i+1}" name="fname" /> </div>
                            <div><input type="text" id="plusOneRel${i+1}" name="longAns"/></div> <br><br>`;

                            // appends this plus one info to myInp
                            myInp.appendChild(plusOneInfo);

                            // saves the answer to GuestInfo
                            GuestiInfo.plus1 = "yes";

                            // gets the plus one input answers
                            const plusOneName = document.getElementById(`plusOneName${i+1}`);
                            const plusOneRel = document.getElementById(`plusOneRel${i+1}`);

                            //adds an eventlistener to the plus one name that saves these values to GuestInfo for later
                            plusOneName.addEventListener("change", function(){
                                GuestiInfo.plusOneName = this.value;
                            });

                            //adds an eventlistener to the plus one relationship that saves these values to GuestInfo for later
                            plusOneRel.addEventListener("change", function(){
                                GuestiInfo.plusOneRel = this.value;
                            });
                        })

                        // adds an eventlistener to the no radio button that 1) removes the +1 info input fields if the user clicked yes first and 2) adds this answer to GuestInfo
                        plusOneNo.addEventListener("click", function() {
                            document.getElementById("Menu").style.display = "none"; //hides the menu section if it was previously filled out
                            document.getElementById("guestMeals").innerHTML= ""; //resets the menu section if it was previously filled out
                            document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                            document.getElementById("BussInf").innerHTML= ""; //resets the bus section if it was previously filled out
                            document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                            document.getElementById("DrinkNext").innerHTML = ""; //resets the drinks section if it was previously filled out
                            document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
                            
                            const changedFromYes = document.getElementById(`+1info${i+1}`) // retrieves the +1info from the document
                            if (changedFromYes) changedFromYes.remove(); //if this +1info exists in the document, it is removed
                            GuestiInfo.plus1 = "no"; // stores the new answer in GuestiInfo
                        })
                        // Instead of GuestInfoStorage.push(GuestiInfo);
                        GuestInfoStorage[i] = GuestiInfo; // adds all of the information gathered into the item GuestInfo into a global list by index. This keeps things ordered for later
                    };  
                }
                // If the number of guests entered is not between 1 and 10, this alert will pop up.
                else {
                    window.alert("Please enter a number between 1 and 10");
                }
            }
            // this function updates the meal fields to include all of the guests entered in the first question.
            function updateMeal() {
                document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
                            
                document.getElementById("Menu").style.display = "block"; // makes the div element called Menu visible

                //retrieves the guestMeals div from the Menu div
                const guestMealsDiv = document.getElementById("guestMeals");
               
                // for i in range (0, counting, 1):
                for (let i = 0; i<counting; i++){
                    
                    //retrieves the guest name and plus 1 name if it exists from GuestInfoStorage
                    let guestName = GuestInfoStorage[i].GuestName;
                    let plus1Name = GuestInfoStorage[i].plusOneName || ""; // If undefined, use ""
                  
                    // appends the content created in the createMealSection function for the guest to guestMeals 
                    guestMealsDiv.appendChild(createMealSection(guestName));

                    // if plus1Name (with spaces removed so no error is thrown) isn't empty
                    if (plus1Name.trim() !== "") {
                        // append the plus1Name content created by createMealSection to guestMeals
                        guestMealsDiv.appendChild(createMealSection(plus1Name));
                    }
                };
            }
            
             // this function takes a string and replaces white spaces with _
             function makeSafe(str) {
                return str.replace(/\W/g, '_');
            }

// Helper function for updateMeal that creates the content for each guest and/or plus one entered in the first question
            function createMealSection(personName) {
                let mealInfo = {};

                //replaces whitespaces from the person name with _ for element ids
                const safeName = makeSafe(personName);

                //creates a new div element classed as container2 for styling
                let section = document.createElement("div");section.className = "container2";
                section.innerHTML = `
                <div>
                    <legend><b>Enter your meal preferences here:</b></legend><br>
                    <label>${personName}: </label>
                    <select id="menu${safeName}" class="menuItem${safeName}"> 
                        <option value="">--Please choose an option--</option>
                        <option value="Standard meal">Standard meal</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Vegetarian">Vegetarian</option>
                        </select>
                </div>
                <div>
                    <legend><b>Do you have any of the following allergies/intolerances?</b></legend>
                    <div class="smallcontainer">
                        <div>
                            <input type="checkbox" id="Gluten${safeName}" name="allergen${safeName}" value="Gluten" class="menuItem${safeName}"/>
                            <label for="Gluten${safeName}">Gluten</label>
                        </div>
                        <div>
                            <select id="Gsev${safeName}" name="severity${safeName}" class="menuItem${safeName}">
                                <option>--severity--</option>
                                <option>Mild</option>
                                <option>Moderate</option>
                                <option>Severe</option>
                            </select>
                        </div>  
                        <div>
                            <input type="checkbox" id="Dairy${safeName}" name="allergen${safeName}" value="Dairy" class="menuItem${safeName}"/>
                            <label for="Dairy${safeName}">Dairy</label>
                        </div>
                        <div>
                            <select id="Dsev${safeName}" name="severity${safeName}" class="menuItem${safeName}">
                                <option>--severity--</option>
                                <option>Mild</option>
                                <option>Moderate</option>
                                <option>Severe</option>
                            </select>
                        </div> 
                        <div>
                        <input type="checkbox" id="Peanuts${safeName}" name="allergen${safeName}" value="Peanuts" class="menuItem${safeName}"/>
                            <label for="Peanuts${safeName}">Peanuts</label>
                        </div>
                        <div>
                            <select id="Psev${safeName}" name="severity${safeName}" class="menuItem${safeName}">
                                <option>--severity--</option>
                                <option>Mild</option>
                                <option>Moderate</option>
                                <option>Severe</option>
                            </select>
                        </div> 
                     </div>
                </div>
                <div>
                    <legend><b>Any other intolerances/allergies we should know about?:</b></legend><br>
                    <input type="text" id="allergies${safeName}" name="longAns" class="menuItem${safeName}"/>
                </div>
                `;
                // if the no radio button is selected, the hotel name input and the bus times input are made invisible again if they were already visible
                const menuChoice = section.querySelector(`#menu${safeName}`);
                const allergenChoice = section.querySelectorAll(`[name="allergen${safeName}"]`);
                const severityChoice = section.querySelectorAll(`[name="severity${safeName}"]`);

                function updateAllergenChoice() {
                    let anyChecked = Array.from(allergenChoice).some(function(cb) {
                        return cb.checked});
                    mealInfo.allergenChoice = anyChecked ? "true" : "";
                }
                allergenChoice.forEach(function(cb) {
                    cb.addEventListener("change", updateAllergenChoice);
                });
                //const severityChoices = section.querySelectorAll(`[name="severity${safeName}"]`);
                    severityChoice.forEach(function(sel) {
                        sel.addEventListener("change", function() {
                            // Store the value of the currently changed select
                            mealInfo.severityChoice = this.value === "--severity--" ? "" : this.value;
                        });
                    });
                // When creating/selecting the menu dropdown
                menuChoice.addEventListener("change", function() {
                    if (this.value === "--Please choose an option--") {
                        mealInfo.menuChoice = "";
                    } else {
                        mealInfo.menuChoice = this.value;
                    }
                });
                const menuChange = section.querySelectorAll(`.menuItem${safeName}`); // retrieves all other drop-off radio buttons by the class attribute (indicated with a . instead of #)
                 // adds eventlistener to the other bus-times radio buttons, which hides the time-suggestion field when selected
                if (menuChange){ // if (times) check is a safety net to make sure times exists before trying to use it.
                    //forEach loops through each element/item in the times object
                    menuChange.forEach(function(element) {
                        element.addEventListener("change", function() {
                            document.getElementById("Bus").style.display = "none"; //hides the Bus section if it was previously filled out
                            document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                            document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out
                        });
                    });
                }
                MealInfoStorage.push(mealInfo);
            //returns the new div element section 
            return section;
            }


// creates the bus input fields for each guest based on the first question
            function updateBus (){
                document.getElementById("Bus").style.display = "block"; // unhides the Bus div element

                // retrieves the BussInf element which the new inputs will be added to:
                const guestBusDiv = document.getElementById("BussInf");
                
                // for i in range(0, counting, 1):
                for (let i = 0; i<counting; i++){
                    //retrives the namees of the guest an +1 if it exists
                    let guestName = GuestInfoStorage[i].GuestName;
                    let plus1Name = GuestInfoStorage[i].plusOneName || ""; // If undefined, use ""

                    //appends the input fields for the guest created by the createBusSection function
                    guestBusDiv.appendChild(createBusSection(guestName));

                    //if there is a plus one name (with spaces removed by trim()) that isn't empty, append the input fields for them created by createBusSection function
                    if (plus1Name.trim() !== "") {
                        guestBusDiv.appendChild(createBusSection(plus1Name));
                    }
                };
        
            }

// Helper function for updatebus
            function createBusSection(personName) {
                let busInfo = {};

                const safeName = makeSafe(personName); // removes whitespaces from the name, replacing them with _

                //creates a new div element called section, making it class=container3 for styling
                let section = document.createElement("div");section.className = "container3";
                section.innerHTML = `
                 <div>
                    <label>${personName}: </label><br>
                    <input type="radio" id="yesBus${safeName}" name="Bus${safeName}" value="yes"/>
                    <label for="yesBus${safeName}">Yes</label>

                    <input type="radio" id="noBus${safeName}" name="Bus${safeName}" value="no"/>
                    <label for="noBus${safeName}">No</label>
                 </div>

                 <div id="ifYesBus${safeName}" style="display:none">
                    <legend><b>Which hotel will you be staying at?</b></legend><br>
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
                            <input type="checkbox" id="times1${safeName}"/>
                            </div>
                            <div>
                            <label for="times1${safeName}">Pick-up at 01:30 pm (13:30)</label>
                            </div>
                        </div>
                        <div>
                            <legend>Drop-off times</legend>
                            <input type="radio" id="times2${safeName}" name="dropOff${safeName}" class="noSuggest${safeName}"/>
                            <label for="times2${safeName}">10:30 pm (22:30)</label> <br>
                            
                            <input type="radio" id="times3${safeName}" name="dropOff${safeName}" class="noSuggest${safeName}"/>
                            <label for="times3${safeName}">01:00 am (01:00)</label><br>
                       
                            <input type="radio" id="times4${safeName}" name="dropOff${safeName}"/>
                            <label for="times4${safeName}">Request a later time</label><br>
                        </div>
                         <div id="laterDropOff${safeName}" style="display:none"> 

                            <label>Please suggest a time before 03:00 am here:</label><br>
                            <input type="time"/>
                        </div>
                    </div>
                    
                </div>`;

                // querySelector, not getElementById, is used because of the way the code was before (unsanitized by safeName). can only be after innerHTML is set
                const yesRadio = section.querySelector(`#yesBus${safeName}`); // retrieves the yes radio button
                const noRadio = section.querySelector(`#noBus${safeName}`); // retrieves the no radio button
                const ifYesDiv = section.querySelector(`#ifYesBus${safeName}`); // retrieves the hotel name input 
                const busTimes = section.querySelector(`#timesBus${safeName}`); // retrieves the bus times div element
                const suggestTime = section.querySelector(`#laterDropOff${safeName}`); // retrieves the later drop-off radio button
                const times = section.querySelectorAll(`.noSuggest${safeName}`); // retrieves all other drop-off radio buttons by the class attribute (indicated with a . instead of #)
                const times4Radio = section.querySelector(`#times4${safeName}`); // retrieves the later drop-off time suggestion 

                //if the yes radio button is selected, the hotel name input and the bus times input are made visible
                if (yesRadio) {
                    yesRadio.addEventListener("change", function() {
                        document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                        ifYesDiv.style.display = "block";
                        busTimes.style.display = "block";
                });
                };

                // if the no radio button is selected, the hotel name input and the bus times input are made invisible again if they were already visible
                if (noRadio){
                    noRadio.addEventListener("change", function(){
                        document.getElementById("Drinks").style.display = "none"; //hides the drinks section if it was previously filled out
                        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                        ifYesDiv.style.display = "none";
                        busTimes.style.display = "none";
                    });
                };

                // adds eventlistener to the times4 radio button, which makes the time-suggestion field visible
                if (times4Radio){
                    times4Radio.addEventListener("change", function () {
                        document.getElementById("DrinkNext").innerHTML = ""; //resets the drinks section if it was previously filled out
                        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                        suggestTime.style.display = "block";
                        });
                }
                 // adds eventlistener to the other bus-times radio buttons, which hides the time-suggestion field when selected
                if (times){ // if (times) check is a safety net to make sure times exists before trying to use it.
                    //forEach loops through each element/item in the times object
                    times.forEach(function(element) {
                        document.getElementById("DrinkNext").innerHTML = ""; //resets the drinks section if it was previously filled out
                        document.getElementById("End").style.display = "none"; //hides the End question section if it was previously filled out

                        element.addEventListener("change", function() {
                            suggestTime.style.display = "none";
                        });
                    });
                }
                return section;
            }

            //drinks function
            function updateDrinks (){
                document.getElementById("DrinkNext").innerHTML = ''; //deletes the html content of the DrinkNext element.
                document.getElementById("Drinks").style.display = "block"; // makes the Drinks element visible
               
                const guestDrink = document.getElementById("DrinkNext"); //retrieves the DrinkNext element from the document
               
                for (let i = 0; i<counting; i++){

                    let guestName = GuestInfoStorage[i].GuestName; // retrieves the guest name from GuestInfoStorage

                    // retrieves the +1 name from GuestInfoStorage if it exists, and sets plus1Name to "" if it doesnt exits (is undefined)
                    let plus1Name = GuestInfoStorage[i].plusOneName || ""; 

                    // appends the drink inputs for each guest to the DrinkNext element in the document using the createDrinkSection function
                    guestDrink.appendChild(createDrinksSection(guestName)); 

                    if (plus1Name.trim() !== "") { // if the plus 1 name exists and isn't just "" when all the whitespace is removed, the following happens: 
                        guestDrink.appendChild(createDrinksSection(plus1Name)); // the +1 name is appended to the DrinkNext element in the document
                    }
                };
            }

            // Helper function for updateDrinks
            function createDrinksSection(personName) {
                const safeName = makeSafe(personName) // replaces all whitespaces in the name with _

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
                            document.getElementById("Next5").style.display = "block";
                        });
                    };
                     // adds eventlistener to the no radio button, which displays the next button when selected
                    if (noDrinks) {
                        noDrinks.addEventListener("change", function() {
                            document.getElementById("Next5").style.display = "block";
                        });
                    };
                return section;
            }

            // more info button
            const dialog = document.getElementById('drinkInfo'); // retrieves the drinkInfo element
            const openBtn = document.getElementById('openDialogBtn'); //retrieves the openDialog button
            const closeBtn = document.getElementById('closeDialogBtn'); //retrieves the close Dialog button

            // adds an eventlistener to the open dialog button that shows the drinkInfo element usig showModal
            openBtn.addEventListener('click', function() {
                dialog.showModal(); // showModal shows a text box that overlays the rest of the webpage, making that webpage inactive until the modal is closed again.
            });

            // adds an eventlistener to the close dialog button that shows the drinkInfo element usig showModal
            closeBtn.addEventListener('click', function() {
                dialog.close(); // .close closes a modal (text box that overlays the rest of the webpage, making that webpage inactive) 
            });

            // Optional: Allow closing the dialog by clicking outside of it via an event listener
            dialog.addEventListener('click', function(event) {
                const rect = dialog.getBoundingClientRect();
                if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                ) {
                    dialog.close();
                }
            });
 
            //universal validation function
            function validateInfo(infoList, schema) {
                // for i in range(0, len(infoList), 1):
                for (let i = 0; i < infoList.length; i++) {
                    // answer = all answers from guest i
                    const answer = infoList[i];
                    // for rule in schema
                    for (const rule of schema) {

                        // If there's an if condition (like if yes is selected), check it
                        if (rule.if) {
                            // if the answer's if condition entered by the user is the same as the value in the schema, then add the next if check
                            if (answer[rule.if.field] === rule.if.value) {
                                // if the user's input is unanswered or just whitespace send an alert, and stop the event (by returning false) that is being validated 
                                if (!answer[rule.field] || answer[rule.field].toString().trim() === "") {
                                    alert(rule.message ? rule.message.replace('{n}', i+1) : `Please fill in ${rule.field} for item ${i+1}`);
                                    return false;
                                }
                            }
                        // if there isn't an if condition tied to another input field, run this code instead:
                        } else {
                            // if the answer field is empty, return an alert and stop the associated even from firing using return false
                            if (!answer[rule.field] || answer[rule.field].toString().trim() === "") {
                                alert(rule.message ? rule.message.replace('{n}', i+1) : `Please fill in ${rule.field} for item ${i+1}`);
                                return false;
                            }
                        }
                    }
                }
                // if all the above checks aren't true, then allow the connected event to fire by returning true
                return true;
            }
//--------------------------------------------------
            guests.addEventListener("change", updateField);

            testbtn.addEventListener("click", function() {
                console.log(GuestInfoStorage);
                alert(JSON.stringify(GuestInfoStorage, null, 2));
             });

            document.getElementById("Next2").addEventListener("click", function() {
                if (validateInfo(GuestInfoStorage, guestInfoSchema)) {
                    updateMeal();
                }
            });

            document.getElementById("Next3").addEventListener("click", function() {
                if (validateInfo(MealInfoStorage, mealInfoSchema)) {
                    updateBus();
                }
            })
            //adds an eventlistener to the last next button
            Next5.addEventListener("click", function(){
                document.getElementById("End").style.display = "block"
            });
            Next4.addEventListener("click", updateDrinks);