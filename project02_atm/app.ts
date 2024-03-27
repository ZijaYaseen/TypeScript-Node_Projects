#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";

let myBalance: number = 40000;
let myPin: number = 9452;

let pinAns = await inquirer.prompt(
        {
            name : "pinCode",
            message : "Enter your PIN:",
            type : "number",
        }
)

if(pinAns.pinCode === myPin){
    console.log(`${chalk.bold.greenBright("Welcome to your account!")}`);

    let operationAns = await inquirer.prompt(
            {
                name : "operation",
                message : "Please select an option:",
                type : "rawlist",
                choices : ['Check Balance', 'Withdraw', 'Fast Cash' ]
            }
    )
    if(operationAns.operation === "Check Balance"){
        console.log(`Your current balance is: ${chalk.bold.cyan(myBalance)}`);
    } 
    else if(operationAns.operation === "Withdraw"){
        let withdrawAns = await inquirer.prompt(
                {
                    name : "amount",
                    type: "number",
                    message : "How much would you like to withdraw?",
                }
        )

        if(myBalance > withdrawAns.amount){
            console.log(chalk.bold.greenBright('Transaction successful!'));
            myBalance -= withdrawAns.amount;
            console.log("Your remainning balance is: " + chalk.bold.cyan(`${myBalance}`));
        }
        else if(myBalance < withdrawAns.amount){
            console.log(chalk.red(`Insufficient balance!`));
            console.log(chalk.red(`Your current balance is : ${myBalance}`));
        };
    }

    else if(operationAns.operation === "Fast Cash"){
        let fastCashAns = await inquirer.prompt(
            [
            {
                name : "cash",
                type: "rawlist",
                message : "Choose amount:",
                choices : [500,1000,2000,5000,10000]
            }
        ]
        )
        console.log(chalk.bold.greenBright(`Transaction successful!`));
        myBalance -= fastCashAns.cash;
        console.log(`Your remaining balance is: ` + chalk.bold.cyan(`${myBalance}`));
        
    }
}
else {
    console.log(`${chalk.redBright('Incorrect Pin Code!')}`);
    
}
