#! /usr/bin/env node
// CLI Number Guessing Game:
import inquirer from "inquirer";
const randomNumber = Math.floor(Math.random() * 10 + 1);
const answer = await inquirer.prompt([
    {
        message: "Please select number between (1-10):",
        type: "number",
        name: "userGuessedNumber",
    },
]);
if (randomNumber === answer.userGuessedNumber) {
    console.log(`The correct answer is: ${randomNumber}`);
    console.log("Congratulations! You guessed correct number");
}
else {
    console.log(`The correct answer is: ${randomNumber}`);
    console.log("Ooops! You guessed wrong number. TRY AGAIN!");
}
;
