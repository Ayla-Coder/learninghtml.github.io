const guests = document.getElementById("guestNR");
            const testbtn = document.getElementById("testbtn");
            const testArrayDiv = document.getElementById("testArray");
            
            let GuestInfoStorage = []; // Empty array to store all of the user answers from the GuestInfo fieldset in
            let counting = 0 // defines a global counting variable that is redefined when the updateField function is run. Stores this info for the next part of the RSVP.


            guests.addEventListener("change", updateField);

            testbtn.addEventListener("click", function() {
                console.log(GuestInfoStorage);
                alert(JSON.stringify(GuestInfoStorage, null, 2));
             });


            function updateField() {

                document.getElementById("gInfo").innerHTML = ''; //deletes the html content of the guestDetailsDiv element.
                counting = guests.value; // redefines counting to match the number of guests entered by the user. 
                
                if (counting > 0 && counting < 11){ // Since I want a max of 10 guests, this makes sure that the code only works when the entered number is above 0 but below 11. 
                
                    document.getElementById("gInfo").style.display = "block";
                    testArrayDiv.style.display = "block";

                    for (let i = 0; i<counting; i++){ //runs the following code up to the number specified by user. 
                        let GuestiInfo = []; // Empty object to store all of the answers in, Guest Name, +1 answer, +1 name, +1 relationship
                
                        const myInp = document.createElement("div"); myInp.className="container";
                        myInp.innerHTML = `
                        <div>
                        <label>Guest ${i+1} full name: </label>
                        <input type="text" id="GuestID${i+1}" name="fname"/> <br><br>
                        </div>`;

                        const GuestPlusOne = document.createElement("div"); GuestPlusOne.innerHTML = `<legend>Would you like to request a +1?</legend>`;
                        const plusOneYes = document.createElement("input"); plusOneYes.type = "radio"; plusOneYes.id = `yes1${i+1}`; plusOneYes.name = `+1${i+1}`;
                        const plusOneYesLabel = document.createElement("label"); plusOneYesLabel.htmlFor = `yes1${i+1}`; plusOneYesLabel.innerHTML = "Yes";
                        const plusOneNo = document.createElement("input"); plusOneNo.type = "radio"; plusOneNo.id = `no1${i+1}`; plusOneNo.name = `+1${i+1}`;
                        const plusOneNoLabel = document.createElement("label"); plusOneNoLabel.htmlFor = `no1${i+1}`; plusOneNoLabel.innerHTML = "No <br><br>";
                        
                        
                        GuestPlusOne.appendChild(plusOneYes); GuestPlusOne.appendChild(plusOneYesLabel); 
                        GuestPlusOne.appendChild(plusOneNo);GuestPlusOne.appendChild(plusOneNoLabel);
                        myInp.appendChild(GuestPlusOne);

                        document.getElementById("gInfo").appendChild(myInp);
                        
                        
                        plusOneNo.addEventListener("click", function() {
                            let plusOneAnswer = "no";
                            GuestiInfo.push(plusOneAnswer.value);
                        })


                        plusOneYes.addEventListener("click", function() {
                            const plusOneName = document.createElement("div"); plusOneName.className = "container";
                            plusOneName.innerHTML = `
                            <div> <label>Name of plus one for Guest ${i+1}: </label> </div>
                            <div> <label>Relationship between plus one and Guest ${i+1}: </label></div>
                            <div><input type="text" id="PlusOneName${i+1}" name="fname" /> </div>
                            <div><input type="text" id="PlusOneRel${i+1}" name="longAns"/></div> <br><br>`;
                            myInp.appendChild(plusOneName);
                            let plusOneAnswer = "yes";
                            
                            const plusOneNameAnswer = document.getElementById("PlusOneName");
                            const plusOneRelAnswer = document.getElementById("PlusOneRel");
                            GuestiInfo.push("plusOneNameAnswer");
                            GuestiInfo.push("plusOneRelAnswer");

                        })

        
                        document.getElementById("gInfo").appendChild(myInp);

                        const GuestName = document.getElementById(`GuestID${i+1}`);
                        GuestiInfo.push(GuestName.value);


                        GuestInfoStorage.push(GuestiInfo);
                    }; 
                    
                }
                else {
                    window.alert("Please enter a number between 1 and 10");
                }
                
            }
        
            
            const Guestmeal = document.createElement("div"); Guestmeal.className = "container2"; 

            function updateMeal() {


            }


            

          
// What's missing:
// 1) A way to reset the amount of div elements added in case the user wants to remove a guest. done

// 2) A question that asks if each guest wants to request a +1

// 3) Adding another div element to the guest's info if they select yes on requesting a +1. This div element should 
// contain an input field for the +1's full name and another field for their relationship to the user

// 4) a way to collect all the answers in the google sheets document. 

// 5) then we can move onto the next questions about meals, bus tickets and drinks and repeat this process. 
