#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import showBanner from "node-banner";
import { performance } from "perf_hooks";

class UserId {
    public firstName: string;
    public lastName: string;
    public email: any;
    public password: any

    constructor(firstName: string, lastName: string, email: any, password: any) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    fullUserName() {
        return `${this.firstName.trim()} ${this.lastName.trim()}`;
    }
}

class typingSpeedApp {
    easyRandomSentence = ["Moon peeked in window dust danced in light.", "Happy sounds went down street like nightsong.", "He felt all squished and sad like big rock on him."];
    intermediateRandomSentence = ["The sun rises in the morning and sets in the evening. It makes the sky bright and beautiful.", "Children like to play games in the park. They run, laugh, and have lots of fun.", "Reading books helps you learn new things. It can take you to different worlds in your mind."];
    advancedRandomSentence = ["The cat sat on the warm windowsill. It watched the birds outside. The cat felt very cozy and happy.", "The family went to the beach on a sunny day. They played in the sand and swam in the sea.", "A little girl planted a seed in the garden. She watered it every day. Soon, a beautiful flower began to grow."];
}

(async () => {
    await showBanner("Typing Speed Test App!", "\n\t\tWelcome To The Typing Speed Test App!\n", "blue", "yellow");
})();

const usersInfo: UserId[] = [];

async function typingSpeed() {
    let loopMain = true;
    while (loopMain) {

        let { entry } = await inquirer.prompt({
            name: "entry",
            type: "list",
            message: "What do you want to do? ",
            choices: ["Sign Up Account", "Login Account", "Quit App"]
        });

        if (entry === "Quit App") {
            process.exit() // Use process.exit(0) to immediately exit the application

        } else if (entry === "Sign Up Account") {
            let signUpAcc = await inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter Your First Name: ",
                    validate: (input) => {
                        if (!isNaN(input)) {
                            return "Please Enter Your First Name!";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter Your Last Name: ",
                    validate: (input) => {
                        if (!isNaN(input)) {
                            return "Please Enter Your Last Name!";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: "email",
                    type: "input",
                    message: "Enter Your E-mail Address: ",
                    validate: (input) => {
                        if (!isNaN(input)) {
                            return "Please Enter Your Email Address!";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: "password",
                    type: "password",
                    mask: "*",
                    message: "Enter 6-8 digits Password: ",
                    validate: (input) => {
                        if (input.length < 6 || input.length > 8) {
                            return `Please Enter 6-8 digits Password! `;
                        } else {
                            return true;
                        }
                    }
                },
            ]);

            let userAccInfo = new UserId(
                signUpAcc.firstName,
                signUpAcc.lastName,
                signUpAcc.email,
                signUpAcc.password
            );

            const isUserNameTaken = usersInfo.some(user => user.fullUserName().toLowerCase() === userAccInfo.fullUserName().toLowerCase());

            if (isUserNameTaken) {
                console.log(chalk.red.bold.italic(`\nUser Name ${userAccInfo.fullUserName()} is already taken. Please enter a new user name!\n`));
            } else {
                usersInfo.push(userAccInfo);
                console.log(chalk.bold.italic.greenBright(`\nYour Account Created Successfully!\n`));
            }
        } else {
            let loginUserAcc = await inquirer.prompt([
                {
                    name: "userName",
                    type: "input",
                    message: "Enter Your User Name: ",
                    validate: (input) => {
                        if (!isNaN(input)) {
                            return "Please Enter Your User Name!";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: "userPassword",
                    type: "password",
                    mask: "*",
                    message: "Enter Your Password: ",
                    validate: (input) => {
                        if (input.length == 0 || input.length < 6) {
                            return `Please Enter Your Correct Password! `;
                        } else {
                            return true;
                        }
                    }
                }
            ]);

            const userAccInfo = usersInfo.find((u) => u.fullUserName() === loginUserAcc.userName && u.password === loginUserAcc.userPassword);

            if (!userAccInfo) {
                console.log(chalk.red.italic.bold(`\nIncorrect User Name Or Password!\n`));
            } else {
                console.log(chalk.bold.italic.greenBright(`\nWelcome to Your Account ${userAccInfo.fullUserName()}!\n`));

                let testLoop = true;
                while (testLoop) {
                    let { options } = await inquirer.prompt({
                        name: "options",
                        type: "list",
                        message: "Select!",
                        choices: ["Start Typing Speed Test", "Exit"]
                    });

                    if (options === "Exit") {
                        testLoop = false;
                    } else {
                        let { levels } = await inquirer.prompt({
                            name: "levels",
                            type: "list",
                            message: "Choose Levels: ",
                            choices: ["Easy Level", "Intermediate Level", "Advanced Level"]
                        });

                        let classTyping = new typingSpeedApp();
                        let randomSentence;
                        let testMessage;

                        if (levels === "Easy Level") {
                            randomSentence = classTyping.easyRandomSentence[Math.floor(Math.random() * classTyping.easyRandomSentence.length)];
                            testMessage = `\nGet ready to test your typing skills! This is the easy level with a 1-minute time limit.\nTime to show off those fingers! You'll have 1 minute to type the following sentence as fast and accurately as possible.\n\nIntroduction:\nType the following sentence exactly as you see it:\nFocus on both speed and accuracy. We'll measure your WPM (words per minute) at the end.\n`;
                        } else if (levels === "Intermediate Level") {
                            randomSentence = classTyping.intermediateRandomSentence[Math.floor(Math.random() * classTyping.intermediateRandomSentence.length)];
                            testMessage = `\nGet ready to test your typing skills! This is the intermediate level with a 1-minute time limit.\nTime to show off those fingers! You'll have 1 minute to type the following sentence as fast and accurately as possible.\n\nIntroduction:\nType the following sentence exactly as you see it:\nFocus on both speed and accuracy. We'll measure your WPM (words per minute) at the end.\n`;
                        } else {
                            randomSentence = classTyping.advancedRandomSentence[Math.floor(Math.random() * classTyping.advancedRandomSentence.length)];
                            testMessage = `\nGet ready to test your typing skills! This is the advanced level with a 1-minute time limit.\nTime to show off those fingers! You'll have 1 minute to type the following sentence as fast and accurately as possible.\n\nIntroduction:\nType the following sentence exactly as you see it:\nFocus on both speed and accuracy. We'll measure your WPM (words per minute) at the end.\n`;
                        }

                        console.log(testMessage);
                        console.log(`--------------Text-------------\n`);
                        console.log(chalk.yellow(randomSentence,"\n"));

                        let { start } = await inquirer.prompt({
                            name: "start",
                            type: "confirm",
                            message: "Click Enter To Start:"
                        });

                        if (start) {
                            console.log(`\nYour Time Starts Now:\n`);

                            let startTime = performance.now();
                            let userInput = '';

                            const timeoutPromise = new Promise<void>((resolve) => {
                                setTimeout(() => {
                                    console.log(chalk.red("\n\nTime's up!\n"));
                                    resolve();
                                }, 59999);
                            });

                            async function getUserInput() {
                                let response = await inquirer.prompt({
                                    name: "userInput",
                                    type: "input",
                                    message: "Start Typing...",
                                    validate:(input)=>{
                                        if(!isNaN(input)){
                                            return `Please Enter Text!!`
                                        }
                                        else{
                                            return true;
                                        }
                                    }
                                });
                                userInput = response.userInput;
                            }

                            await Promise.race([timeoutPromise, getUserInput()]);

                            let endTime = performance.now();
                            if (userInput.length > 0) endTime = performance.now();

                            const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
                            const typedWords = userInput.split(' ').length;
                            const correctWords = randomSentence.split(' ').filter((word, idx) => word === userInput.split(' ')[idx]).length;
                            const accuracy = (correctWords / randomSentence.split(' ').length) * 100;
                            const mistakes = randomSentence.split(' ').length - correctWords;
                            
                            
                            console.log(`Time taken: ${timeTaken.toFixed(2)} seconds`);
                            console.log(`Words per minute: ${(typedWords / timeTaken * 60).toFixed(2)} WPM`);
                            console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
                            console.log(`You wrote ${correctWords} correct words.`);
                            console.log(`You made ${mistakes} mistakes.`);

                            // Optional: Detailed comparison
                            console.log(`Your input: ${userInput}`);
                        }

                        let { confirm } = await inquirer.prompt({
                            name: "confirm",
                            type: "confirm",
                            message: "Do You Want To Continue?",
                            default: true
                        });
                        
                        if (!confirm) {
                            testLoop = false; // Set testLoop to false to exit the inner loop
                            // loopMain = false; // Set loopMain to false to exit the main loop
                        }
                    }
                }
            }
        }
    }
}

setTimeout(() => {
    typingSpeed();
}, 1000);
