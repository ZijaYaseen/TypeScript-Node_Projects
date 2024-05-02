#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// customer : fname,lname,gender,age,mbl nmb;
// bank account : customer can debit , credit money and check balance.

console.log(chalk.bold.italic.magentaBright.underline("\n\tWELCOME TO THE BANK APP\n"));


class Customer{
    public firstName : string
    public lastName :  string
    public gender : string
    public age : number
    public mblNmb : number
    public balance : number
    accNumber : string

    constructor(fn:string,ln:string,gender:string,age:number,mblNmb:number,balance:number){
        this.firstName = fn
        this.lastName = ln
        this.gender = gender
        this.age = age
        this.mblNmb = mblNmb
        this.balance = balance
        this.accNumber = accNmb()
    }

    customerInfo(){
        return chalk.greenBright(`\nName: ${chalk.yellow(this.firstName.trim())} ${chalk.yellow(this.lastName.trim())}\nGender: ${chalk.yellow(this.gender)}\nAge: ${chalk.yellow(this.age)}\nMobille Number: ${chalk.yellow(this.mblNmb)}\nAccount Balance: ${chalk.yellow("$"+this.balance)}\nAccount Number: ${chalk.yellow(this.accNumber)}`)
    }
}

interface IBankAccount {
    withdraw(amount: number): number;
    deposit(amount: number): number;
    checkBalance(): number;
  }
  

class Bank extends Customer implements IBankAccount{

    CustomerAccounts : Customer[] = []

    withdraw(amount:number):number{
        return this.balance -= amount;
    }

    deposit(amount:number){
        return this.balance += amount;
    }

    checkBalance(){
        return this.balance;
    }
}


function accNmb():string{
    return"IBAN00" + Math.floor(Math.random()*1000).toString()
}

async function myBank(){

    let bankAccNmb : {[accNumber:string]:Bank} = {}

    let loop = true;
    while(loop){

    let {accInitialize} = await inquirer.prompt(
        {
            name:"accInitialize",
            type:"list",
            message:"What you want to do?",
            choices:["Create Account","Check Balance", "Deposit Money", "Withdraw Money","View Account", "Exit"]
        }
    )
    if(accInitialize === "Exit"){
        break;
    }

    else if(accInitialize === "Create Account"){
    let {firstName,lastName,gender,age,mblNmb,deposit} = await inquirer.prompt([
        {
            name : "firstName",
            type : "input",
            message : "Enter Your First Name: ",
            validate:(input)=>{
                if(!isNaN(input)){
                    return `Please Enter Name`
                }
                else{
                    return true;
                }
            }
        },
        {
            name : "lastName",
            type : "input",
            message : "Enter Your Last Name: ",
            validate:(input)=>{
                if(!isNaN(input)){
                    return `Please Enter Name`
                }
                else{
                    return true;
                }
            }    
        },
    
        {
            name : "gender",
            type : "list",
            message : "Enter Your Gender: ",
            choices:["Male","Female","Other"]
        },
        {
            name : "age",
            type : "number",
            message : "Enter Your Age: ",
            validate:(value)=>{
                if(isNaN(value)){
                    return `Please Enter Valid Number`
                }
                else if(value < 18){
                    return `You must be 18 years or older to create an account`
                }
                else{
                    return true;
                }
            }
        },
        {
            name : "mblNmb",
            type : "input",
            message : "Enter Your Mobile Number: "
        },
        {
            name : "deposit",
            type : "number",
            message : "Enter Your Initial Deposit(Optional):",
            default : 0
        }

    ])
    let customerAccount = new Bank(firstName,lastName,gender,age,mblNmb,deposit);
    bankAccNmb[customerAccount.accNumber] = customerAccount; //necessary to understand
    let customerInfo = customerAccount.customerInfo();
    console.log(customerInfo);
    console.log(chalk.bold.italic.magentaBright(`\nAccount Created Successfully!!\n`));
  }

  else{
    let {accNumber} = await inquirer.prompt(
        {
            name:"accNumber",
            type:"input",
            message:"Enter Bank Account Number: "
        }
    )

    let customerAccount = bankAccNmb[accNumber];
    if(!customerAccount){
        console.log(chalk.red(`Incorrect Account Number!!\n`));
    }
        else{

            if(accInitialize === "Check Balance"){
                console.log(chalk.yellowBright(`Your Current Balance is: ${chalk.greenBright("$"+customerAccount.balance)}\n`));
                
                }
                else if(accInitialize === "Deposit Money"){
                    let {depositAmount} = await inquirer.prompt(
                        {
                            name:"depositAmount",
                            type:"number",
                            message:"Enter Amount to Deposit: ",
                            validate:(value)=>{
                                if(isNaN(value)){
                                    return `Please Enter Valid Number`
                                }
                                else if(value<=0){
                                    return`Please Enter a Positive Amount`
                                }
                                else{
                                    return true;
                                }
                            }
                        }
                    )
                    console.log(chalk.yellowBright(`Amount:${chalk.greenBright(depositAmount)} Deposit Successful! Current Balance: ${chalk.greenBright("$"+customerAccount.deposit(depositAmount))}\n`));
                }

                else if(accInitialize === "Withdraw Money"){
                    let {withdrawAmount} = await inquirer.prompt(
                        {
                            name:"withdrawAmount",
                            type:"number",
                            message:"Enter Amount to Withdraw: ",
                            validate:(value)=>{
                                if(isNaN(value)){
                                    return `Please Enter Valid Number`
                                }
                                else if(value<=0){
                                    return`Please Enter a Positive Amount`
                                }
                                else{
                                    return true;
                                }
                            }
                        }
                    )
                    if(customerAccount.balance<withdrawAmount){
                        console.log(chalk.red("Insufficient Funds!!\n"));
                    }
                    else{
                        console.log(chalk.yellowBright(`Amount:${chalk.greenBright(withdrawAmount)} Withdrawn Successful! Current Balance: ${chalk.greenBright("$"+customerAccount.withdraw(withdrawAmount))}\n`));
                    }
                }

                else if(accInitialize === "View Account"){
                    console.log(chalk.bold.italic.magentaBright(`\tAccount Details!!`));
                    
                    console.log(customerAccount.customerInfo());
                }
            } 
        } 
    }

}
myBank()


