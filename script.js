"use strict"

const buttons = document.querySelectorAll('.buttons');
const screen = document.querySelector('.screen');
const clear = document.getElementById('clear');
let numHolder = new Array(3);
let answer = 0;
let hasCalc = 0 ;

const clearScreen = function(screen) {
    screen.innerHTML = '0';
    hasCalc = 0;
    answer = '';
    numHolder = [];
}

const arrayToString = function(equation) {
    return equation.join('');
    
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
        return(divide(nums[0],nums[1]))
    }
}

clearScreen(screen);


buttons.forEach((button) => {

    button.addEventListener('click', event => {

        if(event.target.innerHTML === '=') {
            if(numHolder.length == 2) {
                numHolder[2] = answer;
                screen.innerHTML = (operate(numHolder));
            }
            else {
                screen.innerHTML = 'ERROR';
            }


        }
        else {
            if(screen.innerHTML.length <= 23) {
                if(screen.innerHTML === '0') {
                    answer = event.target.innerHTML;
                    screen.innerHTML = answer;
                    hasCalc = 0;

                }
                else {
                    if(event.target.innerHTML === '+' || 
                        event.target.innerHTML === '-' || 
                        event.target.innerHTML === 'x' || 
                        event.target.innerHTML === '÷') {
                        
                        if(hasCalc == 0) {
                            numHolder[0] = answer;
                            numHolder[1] = event.target.innerHTML;
                            answer = '';
                            hasCalc++;
                        }


                        else if(hasCalc == 1) {
                            numHolder[2] = answer;
                            screen.innerHTML = (operate(numHolder));
                            numHolder[0] = screen.innerHTML;
                            numHolder[1] = event.target.innerHTML;
                            answer = '';
                        }
                    }

                    else {
                        answer += event.target.innerHTML;
                        screen.innerHTML = answer;

                    }

                }
            }
            else {
                screen.innerHTML = "ERROR! NUMBER TOO LARGE!";
            }
        }
    })
});

clear.addEventListener('click', event => {
    clearScreen(screen);
})