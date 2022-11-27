/*
File: js/script.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table, Part 1: Validation Plugin
Halleluia Zeyohannes, UMass Lowell Computer Science, 
halleluia_zeyohannes@student.uml.edu
Copyright (c) 2022 by Halleluia Zeyohannes. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
updated by HZ on 26 Nov 2022 at 11PM

Purpose: This script contains the functions that builds the dynamic multiplication
table from user input and validates the user input.
*/
$(document).ready(function() {
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
                // Wipe the previous table / error messages
                // This way nothing will show up if a user tries to submit with an error.
                $("#error_invalid_input").empty();
                $("#multiplication_table").empty();
              },

            // if there is an error, this will place the error messages after the element with invalid input, without using multiple div's to do so
            // Referenced https://stackoverflow.com/questions/3691743/jquery-validate-how-to-keep-error-messages-from-altering-the-form-disposition
            errorElement: "div",
            errorPlacement: function(error, element) {
                element.after(error);
            }
        });
    }
});