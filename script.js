"use strict"

const buttons = document.querySelectorAll('.buttons');
const screen = document.querySelector('.screen');
const clear = document.getElementById('clear');
const backspace = document.getElementById('del');
const posNeg = document.getElementById('posNeg');

let numHolder = new Array(3);
let answer = 0;
let hasCalc = 0 ;
let hasDecimal = false;
let justAns = false;
let cannotBack = false;

// Clears screen and resets attributes.
const clearScreen = function(screen) {
    screen.innerHTML = '0';
    hasCalc = 0;
    answer = '';
    numHolder = [];
    hasDecimal = false;
    cannotBack = false;
}

// Clears attributes not screen.
const clearAttributes = function() {
    hasCalc = 0;
    answer = '';
    numHolder = [];
    hasDecimal = false;
}

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
            cannotBack = true;
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

    button.addEventListener('mousedown', event => {

        // Checks to see if user presses =
        if(event.target.innerHTML === '=') {
            if(numHolder.length == 2 || numHolder.length == 3) {
                numHolder[2] = answer;

                if(numHolder[2] === '') {
                    screen.innerHTML = 'ERROR';
                    cannotBack = true;
                    clearAttributes();
                }
                else {
                    screen.innerHTML = (operate(numHolder));
                    numHolder[0] = screen.innerHTML;
                    answer = screen.innerHTML;
                    hasCalc--;
                    justAns = true;

                }

            }
            else {
                screen.innerHTML = 'ERROR';
                cannotBack = true;
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
                    hasDecimal = false;

                }
                else {
                    // if the user uses an operator it gets ready to
                    // calculate
                    if(event.target.innerHTML === '+' || 
                        event.target.innerHTML === '-' || 
                        event.target.innerHTML === 'x' || 
                        event.target.innerHTML === '÷') {
                        
                        if(screen.innerHTML.length === 0) {
                            // Do nothing
                        }    

                        else if(hasCalc == 0) {
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
                            if(justAns === true) {
                                answer = event.target.innerHTML;
                                screen.innerHTML = answer;
                                justAns = false;
                            }
                            else {
                                answer += event.target.innerHTML;
                                screen.innerHTML = answer;

                            }

                        }
                    }

                }
            }
            else {
                screen.innerHTML = "ERROR! NUMBER TOO LARGE!";
                cannotBack = true;
                clearAttributes();
            }
        }
    })
});

// clears screen once the clear button is pressed
clear.addEventListener('mousedown', event => {
    clearScreen(screen);
})

// goes back a space
backspace.addEventListener('mousedown', event => {

    if(cannotBack === false) {
        let fixedScreen = screen.innerHTML.slice(0, screen.innerHTML.length -1);

        if(fixedScreen === '') {
            screen.innerHTML = '0';
            answer = screen.innerHTML;
        }
        else {
            screen.innerHTML = fixedScreen;
            answer = screen.innerHTML;
        }
    }
})

posNeg.addEventListener('mousedown', event => {

    if(screen.innerHTML.includes('-')) {
        let pos = screen.innerHTML.replace('-', '');
        screen.innerHTML = pos;
        answer = pos;
    }
    else {
        if(screen.innerHTML === '0') {
            //Do nothing
        }
        
        else {
            let neg = '-'
            screen.innerHTML = neg.concat(screen.innerHTML);
            answer = screen.innerHTML;
        }

    }
})