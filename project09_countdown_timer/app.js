#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
let { userAns } = await inquirer.prompt({
    name: "userAns",
    type: "list",
    message: "Choose Your Countdown Unit Timer:",
    choices: ["Seconds", "Minutes", "Hours"]
});
if (userAns === "Seconds") {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Enter the duration of the Countdown in Seconds:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter Valid Number!!";
            }
            else if (input > 60) {
                return "Seconds must be less than or equal to 60";
            }
            else {
                return true;
            }
        }
    });
    let seconds = userInput;
    console.log(chalk.greenBright.bold.italic("The Countdown Timer Has Started!!"));
    console.log(chalk.cyanBright.italic("     Press Ctrl+C to Exit."));
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
            const min = Math.floor(timeDiff / 60);
            const sec = Math.floor(timeDiff % 60);
            console.log(chalk.yellow(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }, 1000);
    }
    startTimer(seconds);
}
else if (userAns === "Minutes") {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Enter the duration of the Countdown in Minutes:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter Valid Number!!";
            }
            else if (input > 60) {
                return "Minutes must be less than or equal to 60";
            }
            else {
                return true;
            }
        }
    });
    let input = userInput * 60; // Convert minutes to seconds
    console.log(chalk.greenBright.bold.italic("The Countdown Timer Has Started!!"));
    console.log(chalk.cyanBright.italic("     Press Ctrl+C to Exit."));
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
            const min = Math.floor(timeDiff / 60); // Calculate minutes
            const sec = Math.floor(timeDiff % 60); // Calculate remaining seconds
            console.log(chalk.yellow(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }, 1000);
    }
    startTimer(input);
}
else if (userAns === "Hours") {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Enter the duration of the Countdown in Hours:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter Valid Number!!";
            }
            else if (input > 24) {
                return "Hours must be less than or equal to 24";
            }
            else {
                return true;
            }
        }
    });
    let input = userInput * 60 * 60; // Convert hours to seconds
    console.log(chalk.greenBright.bold.italic("The Countdown Timer Has Started!!"));
    console.log(chalk.cyanBright.italic("     Press Ctrl+C to Exit."));
    function startTimer(seconds) {
        const startTime = new Date().setSeconds(new Date().getSeconds() + seconds);
        let exactStartTime = new Date(startTime);
        setInterval(() => {
            const currentTime = new Date();
            let timeDiff = differenceInSeconds(exactStartTime, currentTime);
            if (timeDiff <= 0) {
                console.log(chalk.yellow("00:00:00"));
                console.log(chalk.greenBright.bold.italic("Timer has expired!!"));
                process.exit();
            }
            const hours = Math.floor(timeDiff / (60 * 60)); // Calculate hours
            timeDiff -= hours * 60 * 60; // Update remaining time difference
            const minutes = Math.floor(timeDiff / 60); // Calculate minutes
            const seconds = timeDiff % 60; // Calculate remaining seconds
            console.log(chalk.yellow(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`));
        }, 1000);
    }
    startTimer(input);
}
;
