"use strict"

const buttons = document.querySelectorAll('.buttons');
const screen = document.querySelector('.screen');
const clear = document.getElementById('clear');

const clearScreen = function(screen) {
    screen.innerHTML = '';
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

const operate = function(num) {
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
            screen.innerHTML = (operate(screen.innerHTML));
        }
        else {
            if(screen.innerHTML.length <= 23) {
                screen.innerHTML += event.target.innerHTML;
                console.log(screen.innerHTML.length)
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