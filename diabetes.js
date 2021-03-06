/* Joseph Ketterer
JKETTE01
Javascript
Tobi Brodie */

// call init function on window load
window.onload = init;

/*init loads event listeners and other functions needed to start programme  */
function init() {
    document.getElementById('Submit').addEventListener('click', clearForm);
    document.getElementById('Submit').addEventListener('click', calculateForm);
    /* call decorative functions in extra.js (they need to be called in init because the dom
    elements need to be loaded before they are called, otherwise errors are thrown).*/
    openListItems();
    drawCircles();
}

/* clears the results form. It's called on every click of the 'calculate button' */
function clearForm(e) {
    var divElement = document.querySelector('.results');
    divElement.innerHTML = '';
    event.preventDefault();
}

/*  the submitForm function takes the values from the radio button form add adds them to two arrays - 'values' and 'warnings' */
function calculateForm(e) {
    var values = []; // instantiate value array
    var warnings = []; // instantiate warning array
    var radio = document.querySelectorAll('.radio'); //returns a node list of all items with the class name 'radio'. A node list enables the use of foreach loop
    radio.forEach(function(element) { // loop through each element in the node list

        if (element.checked == true) { // if the element is checked
            values.push(parseInt(element.value)); // push the value assigned to the radio button
            if (element.value >= 10) { // if greater or equal to 10 push the element NAME into the warning array.
                warnings.push(element.name);
            }
        }
    });

    /* This function is used by the javascript higher order reduce function to get the sum of the values in the array  */
    function getSum(total, num) {
        return total + num; // accumulator + value
    }

    var finalNumber = values.reduce(getSum);    // the sum of the array is assigned to a variable finalNumber
    calculateResults(finalNumber, warnings); // call function to calculateResults with the finalNumber and warning array as arguments
    event.preventDefault(); // prevent defualt behaviour (ie don't submit the form)
}

/* This function uses the values from the prior function to append a message to the index page. It creates a 'warning' string if the number value is over 25 from
the warning array if the number is over 25. The message is assigned based on the number value from the previous function */
function calculateResults(number, warnings) {
    /* delcare warningText variable */
    var warningText = '';
    /* a switch case statement that assigns a string to warningText based on the length of the 'warning' array
     which was passed as an argument. This is only performed if the value of the number is OVER 25 */
    if (number > 25) {
        switch (true) {
            case (warnings.length == 1):
                warningText = ' Your main risk factor is your ' + warnings[0] + '. ';
                break;
            case (warnings.length == 2):
                warningText = ' Your main risk factors are your ' + warnings[0] + ' and your ' + warnings[1] + '. ';
                break;
            case (warnings.length == 3):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ' and your ' + warnings[2] + '. ';
                break;
            case (warnings.length == 4):
                warningText = ' Your main risk factors are your ' + warnings[0] + ', your ' + warnings[1] + ', your ' + warnings[2] + ' and your ' + warnings[3] + '. ';
                break;
        }
    }

    var divElement = document.querySelector('.results'); // assign results div to variable
    var results = document.createElement("p"); // create a p element
    results.className = "results-message"; // give the paragraph a class name

    /* A switch case statement that adds html to the parapgraph based on the number value. I'm using innerHTML here as opposed to creating
    a series of textnodes. Because there are links in two of the reponses this would involve creating text nodes for the text, then the link,
     then the subsequent text. Using innerHTML in this instance creates shorter and more legible code. */
    switch (true) {
        case number <= 15:
            results.innerHTML = 'Your results show that you currently have a low risk of developing diabetes. It is important that you maintain a healthy lifestyle in terms of diet and exercise.';
            break;
        case (number >= 16 && number <= 25):
            results.innerHTML = 'Your results show that you currently have a medium risk of developing diabetes. For more information on your risk factors, and what to do about them, please visit our diabetes advice website at <a href="https://www.diabetes.org.uk/">http://www.zha.org.zd</a>.';
            break;
        case number > 25:
            results.innerHTML = 'Your results show that you currently have a high risk of developing diabetes.' + warningText +
             'We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our <a href="contact.html">contact</a> form and a member of the Health Authority Diabetes Team will be in contact with you.';
    }
    divElement.appendChild(results);  // append the paragraph to the div
}
