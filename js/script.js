/*
File: js/script.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table, Part 1: Validation Plugin
Halleluia Zeyohannes, UMass Lowell Computer Science, 
halleluia_zeyohannes@student.uml.edu
Copyright (c) 2022 by Halleluia Zeyohannes. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
updated by HZ on 27 Nov 2022 at 6PM

Purpose: This script contains the functions that builds the dynamic multiplication
table from user input and validates the user input.
*/

/*
validate() is used to check the inputs of the form in real time and ensure that the user
is inputing valid data. If not, the user is directed to the error and a message that explains
what is wrong and how to fix it is displayed.
Referenced: https://jqueryvalidation.org/validate/
*/
function validate() {
    $("#form").validate({
        // rules used to validate user input
        rules: {
            multiplier_min: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            multiplier_max: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            multiplicand_min: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            multiplicand_max: {
                number: true,
                min: -50,
                max: 50,
                required: true
            }
        },

        // these messages appear if input is invalid
        messages: {
            multiplier_min: {
                number: "ERROR: you did not enter a valid number.<br>Please enter a number between -50 and 50 for the multiplier minimum.",
                min: "ERROR: you entered a number that is too small.<br>Please enter a number between greater than or equal to -50 for the multiplier minimum.",
                max: "ERROR: you entered a number that is too big.<br>Please enter a number between less than or equal to 50 for the multiplier minimum.",
                required: "ERROR: no number was entered.<br>Please enter a number between -50 and 50 for the multiplier minimum."
            },
            multiplier_max: {
                number: "ERROR: you did not enter a valid number.<br>Please enter a number between -50 and 50 for the multiplier maximum.",
                min: "ERROR: you entered a number that is too small.<br>Please enter a number between greater than or equal to -50 for the multiplier maximum.",
                max: "ERROR: you entered a number that is too big.<br>Please enter a number between less than or equal to 50 for the multiplier maximum.",
                required: "ERROR: no number was entered.<br>Please enter a number between -50 and 50 for the multiplier maximum."
            },
            multiplicand_min: {
                number: "ERROR: you did not enter a valid number.<br>Please enter a number between -50 and 50 for the multiplicand minimum.",
                min: "ERROR: you entered a number that is too small.<br>Please enter a number between greater than or equal to -50 for the multiplicand minimum.",
                max: "ERROR: you entered a number that is too big.<br>Please enter a number between less than or equal to 50 for the multiplicand minimum.",
                required: "ERROR: no number was entered.<br>Please enter a number between -50 and 50 for the multiplicand minimum."
            },
            multiplicand_max: {
                number: "ERROR: you did not enter a valid number.<br>Please enter a number between -50 and 50 for the multiplicand maximum.",
                min: "ERROR: you entered a number that is too small.<br>Please enter a number between greater than or equal to -50 for the multiplicand maximum.",
                max: "ERROR: you entered a number that is too big.<br>Please enter a number between less than or equal to 50 for the multiplicand maximum.",
                required: "ERROR: no number was entered.<br>Please enter a number between -50 and 50 for the multiplicand maximum."
            }
        },

        // when the form is submitted, this will be called as long as input is valid
        submitHandler: function() {
            buildTable();
            return false;
        },

        // if any input is invalid, remove old error messages for new ones and remove multiplication table
        invalidHandler: function() {
            $("#error_invalid_input").empty();
            $("#minmax-multiplier").empty();
            $("#minmax-multiplicand").empty();
            $("#multiplication-table").empty();
            return false;
        },

        // if there is an error, this will place the error messages after the element with invalid input, without using multiple div's to do so
        // Referenced https://stackoverflow.com/questions/3691743/jquery-validate-how-to-keep-error-messages-from-altering-the-form-disposition
        // and https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        }
    });
   // event.preventDefault();
}

function buildTable()
{
    // get user input from HTML form, and use parseInt(..) to get a number or NaN
    var minX = parseInt(document.getElementById('multiplier_min').value, 10);
    var maxX = parseInt(document.getElementById('multiplier_max').value, 10);
    var minY = parseInt(document.getElementById('multiplicand_min').value, 10);
    var maxY = parseInt(document.getElementById('multiplicand_max').value, 10);

    // Remove any old error messages for new ones
    $("#minmax-multiplier").empty();
    $("#minmax-multiplicand").empty();

    // if the min > max for the multiplier or multiplicand, alert the user and switch them to build the table
    // Referenced: https://dmitripavlutin.com/swap-variables-javascript/ about destructuring assignment
    if(minX > maxX)
    {
        $("#minmax-multiplier").append("<p>The minimum is greater than the maximum for the multiplier. Their values have been swapped to build the table.</p>");
        [minX, maxX] = [maxX, minX];
    }
    if(minY > maxY)
    {
        $("#minmax-multiplicand").append("<p>The minimum is greater than the maximum for the multiplicand. Their values have been swapped to build the table.</p>");
        [minY, maxY] = [maxY, minY];
    }
    // input already validated, so its safe to build the multiplication table with it
    var table = "";  // will contain a string of the HTML structure of the table
    table += "<table>";  // insert starting tag for the table
    var headerX = true;  // use to track when in the first row of table
    var headerY = true;  // use to track when in ther first column

    for(var row = minY - 1; row<= maxY; row++)  // # rows = # of cells in a column
    {
        table += "<tr>"; // insert starting tag for a row
        for(var column = minX - 1; column <= maxX; column++)  // # colums = # cells in a row
        {
            if(headerX == true)  // in the horizontal header
            {
                table += "<th class='xHeader'>";  // insert starting tag for header with class to identify first row
                if(headerY == false)
                {
                    table += column + "</th>"; // insert value of cell and closing tag
                }
            }
            else
            {
                if(headerY == true)  // in vertical header
                {
                    table += "<th class='yHeader'>" + row + "</th>";  // insert element for header with class to identify first column
                    
                }
                else
                {
                    table += "<td class='table-body'>" + (row*column) + "</td>"; // insert element for data with class to identify non-header cells
                }
            }
            headerY = false;
        }
        table += "</tr>"; // insert closing tag for the row
        headerX = false;
        headerY = true;
    }
    table += "</table>"; // insert closing tag for the table
    document.getElementById('multiplication-table').innerHTML = table; // insert table into the HTML structure to display it

    event.preventDefault();  // ensures that page won't reload onclick
}