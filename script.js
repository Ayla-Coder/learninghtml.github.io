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