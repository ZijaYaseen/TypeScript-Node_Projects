#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Person{
    private personality : string;

    constructor(){
        this.personality = "Mystery";
    }

    public askQuestion(ans:number){
        if(ans === 1){
            this.personality = "Extrovert";
        }
        else if(ans === 2){
            this.personality = "Introvert" 
        }
        else {
            this.personality = "Still A Mystery!!"
        }
    }

    public getPersonality(){
        return this.personality
    }
}

//Here we can write or read data to Person class;
class Student extends Person{
    private name : string = "";

    // setter name
    public setName(name:string){
        this.name = name;
    }

    // getter name
    public getName(){
        return this.name
    }
}

// function 
async function oop (){

    let ans : number;
    let name : any = "";
    
    let {userAns} = await inquirer.prompt(
        {
            name : "userAns",
            type : "number",
            message : chalk.greenBright("Type 1 if you like to talk others and type 2 if you would rather keep to Yourself: "),
            validate : (input)=>{
                if(isNaN(input)){
                    return "Please Enter An Integer Value!!"
                }
                else{
                   return true;
                }
            }
        }
    )
    ans = userAns;
    let myPerson = new Person();
    // let p1 = new Student();
    // p1.askQuestion
    // let s1 = new Person()
    
    myPerson.askQuestion(ans);
    console.log(chalk.yellow(`You are ${myPerson.getPersonality()}`));
    
    let {userName} = await inquirer.prompt(
        {
            name : "userName",
            type : "input",
            message : chalk.greenBright("What is your Name? ")
        }
    )
    name = userName;
    let myStudent = new Student()
    myStudent.setName(name) ;
    console.log(chalk.yellow(`Hi ${myStudent.getName()}, Your personality type is "${myPerson.getPersonality()}".`));
}
oop()

// in this project I learn that child class access just parent class contructor.  
