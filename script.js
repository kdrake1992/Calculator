"use strict"

const buttons = document.querySelectorAll('.buttons');
const screen = document.querySelector('.screen');
const clear = document.getElementById('clear');

let numHolder = new Array(3);
let answer = 0;
let hasCalc = 0 ;
let hasDecimal = false;

// Clears screen and resets attributes.
const clearScreen = function(screen) {
    screen.innerHTML = '0';
    hasCalc = 0;
    answer = '';
    numHolder = [];
    hasDecimal = false;
}

// Clears attributes not screen.
const clearAttributes = function() {
    hasCalc = 0;
    answer = '';
    numHolder = [];
    hasDecimal = false;
}

// Rounds number if too big
const rounder = function(answer) {
    return Number(Math.round(answer + "e" + 23) + "e-" + 23); 
}

// Basic arithmetic functions, takes in 2 numbers.
const add = function(num1, num2) {
    return num1 + num2;
}

const subtract = function(num1, num2) {
    return num1 - num2;
}

const multiply = function(num1, num2) {
    return num1 * num2;
}

const divide = function(num1, num2) {
    return num1 / num2;
}

// Operator, takes in an array, joins the arary into a string 
// and then sends a string to arithmetic functions which it returns
const operate = function(equation) {
    let num = equation.join('');
    console.log(num);

    if(num.includes('+')) {
        let nums = num.split('+').map(Number);
        return(add(nums[0],nums[1]))
    }

    else if (num.includes('-')){
        let nums = num.split('-').map(Number);
        return(subtract(nums[0],nums[1]))
    }

    else if (num.includes('x')){
        let nums = num.split('x').map(Number);
        return(multiply(nums[0],nums[1]))
    }

    else if (num.includes('÷')){
        let nums = num.split('÷').map(Number);
        if(nums[0] === 0 || nums[1] === 0) {
            return 'ERROR! CANNOT DIVIDE 0!'
        }
        else {
            return(divide(nums[0],nums[1]))
        }
    }
}

// Intial clears screen
clearScreen(screen);


// Button listeners
buttons.forEach((button) => {

    button.addEventListener('click', event => {

        // Checks to see if user presses =
        if(event.target.innerHTML === '=') {
            if(numHolder.length == 2) {
                numHolder[2] = answer;

                if(numHolder[2] === '') {
                    console.log('hello');
                    screen.innerHTML = 'ERROR';
                    clearAttributes();
                }
                else {
                    screen.innerHTML = (operate(numHolder));

                }

            }
            else {
                screen.innerHTML = 'ERROR';
                clearAttributes();
            }


        }

        else {

            // If there are over 23 characters, itll say error
            // will fix later to rounding
            if(screen.innerHTML.length <= 23) {
                if(screen.innerHTML === '0') {
                    answer = event.target.innerHTML;
                    screen.innerHTML = answer;
                    hasCalc = 0;

                }
                else {
                    // if the user uses an operator it gets ready to
                    // calculate
                    if(event.target.innerHTML === '+' || 
                        event.target.innerHTML === '-' || 
                        event.target.innerHTML === 'x' || 
                        event.target.innerHTML === '÷') {
                        
                        if(hasCalc == 0) {
                            numHolder[0] = answer;
                            numHolder[1] = event.target.innerHTML;
                            answer = '';
                            hasDecimal = false;
                            hasCalc++;

                        }

                        // operates the previous two numbers
                        // allows for multiple operations
                        else if(hasCalc == 1) {
                            numHolder[2] = answer;
                            screen.innerHTML = (operate(numHolder));
                            numHolder[0] = screen.innerHTML;
                            numHolder[1] = event.target.innerHTML;
                            answer = '';
                            hasDecimal = false;
                        }
                    }
                    
                    // attaches number to the string and checks demicals
                    else {
                        if(event.target.innerHTML === '.' && hasDecimal == false ) {
                            answer += event.target.innerHTML;
                            screen.innerHTML = answer;
                            hasDecimal = true;
                        }
                        else if(event.target.innerHTML === '.' && hasDecimal == true) {
                            //DO nothing if already one decimal
                        }
                        else {
                            answer += event.target.innerHTML;
                            screen.innerHTML = answer;
                        }
                    }

                }
            }
            else {
                screen.innerHTML = "ERROR! NUMBER TOO LARGE!";
            }
        }
    })
});

// clears screen once the clear button is pressed
clear.addEventListener('click', event => {
    clearScreen(screen);
})