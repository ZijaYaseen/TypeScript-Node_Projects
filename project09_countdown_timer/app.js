#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
let { userInput } = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please Enter the Amount of Seconds:",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please Enter Valid Number!!";
        }
        else if (input > 60) {
            return "Seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = userInput;
console.log(chalk.greenBright.bold.italic("The Countdown Timer Has Started!!"));
function startTimer(seconds) {
    const startTime = new Date().setSeconds(new Date().getSeconds() + seconds + 2);
    let exactStartTime = new Date(startTime);
    setInterval(() => {
        const currentTime = new Date();
        let timeDiff = differenceInSeconds(exactStartTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.yellow("00:00"));
            console.log(chalk.greenBright.bold.italic("Timer has expired!!"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.yellow(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTimer(input);
