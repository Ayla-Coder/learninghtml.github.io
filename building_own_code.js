function myFunction(){
    const myInp = document.createElement("div");
    myInp.innerHTML = `
    <label>Guest:</label>
    <input type="name"/>`;
    document.getElementById("addGuest").appendChild(myInp);
    document.getElementById("guestInfo").style.display = "block";

}