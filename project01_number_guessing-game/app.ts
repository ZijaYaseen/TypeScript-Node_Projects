#! /usr/bin/env node
// CLI Number Guessing Game:

import inquirer from "inquirer";
import chalk from "chalk";

const randomNumber : number = Math.floor(Math.random() * 6 + 1);

const answer = await inquirer.prompt([
    {
        message : "Please select number between (1-7):",
        type : "number",
        name : "userGuessedNumber",
    },
]);

if(randomNumber === answer.userGuessedNumber){
    console.log(`The correct answer is: ${randomNumber}`);
    console.log(chalk.bold.cyan("Congratulations! You guessed correct number."));
    
} else{
    console.log(`The correct answer is: ${randomNumber}`);
    console.log(chalk.red("Ooops! You guessed wrong number. TRY AGAIN!"));
    
};