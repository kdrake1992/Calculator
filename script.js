"use strict"

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

    else if (num.includes('*')){
        let nums = num.split('*').map(Number);
        return(multiply(nums[0],nums[1]))
    }

    else if (num.includes('/')){
        let nums = num.split('/').map(Number);
        return(divide(nums[0],nums[1]))
    }
}