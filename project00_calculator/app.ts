#! /usr/bin/env node
/* Simple CLI calculator:*/

import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner";

(async () => {
    await showBanner("Calculator", "This calculator can perform Addition, Substraction, Multiplication, Division, Modulus and Power.", "red", "yellow" )
})()

async function calculator() {

let condition = true;

while(condition){

const answer = await inquirer.prompt([
{ message : "Enter first Number:", 
type : "number", 
name : "FirstNumber",
validate: (input:number) => {
    if(isNaN(input)){
        return "Please Enter Valid Number";
    } 
    else{
        return true;
    }
}},

{message : "Select Operator:", 
type : "list", 
name : "operator", 
choices : ["Addition", "Substraction", "Multiplication", "Division", "Modulus", "Power"],
},

{message : "Enter second number:", 
type : "number", 
name : "SecondNumber",
validate: (input:number) => {
    if(isNaN(input)){
        return "Please Enter Valid Number";
    } 
    else{
        return true;
    }}},

]);

if(answer.operator === "Addition"){
    let add = answer.FirstNumber + answer.SecondNumber
    console.log(`Your answer is: ${chalk.bold.cyan(add)}`);
} 
else if(answer.operator === "Substraction"){
    let sub = answer.FirstNumber - answer.SecondNumber
    console.log(`Your answer is: ${chalk.bold.cyan(sub)}`);
}
else if(answer.operator === "Multiplication"){
    let multiply = answer.FirstNumber * answer.SecondNumber
    console.log(`Your answer is: ${chalk.bold.cyan(multiply)}`);
}
else if(answer.operator === "Division"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber / answer.SecondNumber); 
}
else if(answer.operator === "Modulus"){
    let modulus = answer.FirstNumber % answer.SecondNumber
    console.log(`Your answer is: ${chalk.bold.cyan(modulus)}`); 
}
else if(answer.operator === "Power"){
    let power = answer.FirstNumber ** answer.SecondNumber
    console.log(`Your answer is: ${chalk.bold.cyan(power)}`); 
}
else {
    console.log("Please enter valid operator!");
};


let confirmAns = await inquirer.prompt({
    name : "confirm",
    type : "confirm",
    message : "Do you want to calculate again?",
    default : false,
})

condition = confirmAns.confirm

}}

setTimeout(() => {
    calculator();  
}, 1000);

