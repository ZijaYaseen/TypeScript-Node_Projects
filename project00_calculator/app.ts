import inquirer from "inquirer";

const answer = await inquirer.prompt([
{ message : "Enter first Number:", 
type : "number", 
name : "FirstNumber"},

{message : "Select Operator:", 
type : "list", 
name : "operator", 
choices : ["Addition", "Substraction", "Multiplication", "Division", "Modulus", "Exponentation"],
},

{message : "Enter second number:", 
type : "number", 
name : "SecondNumber"},

]);

if(answer.operator === "Addition"){
    console.log(`Your answer is: `);
    console.log(answer.FirstNumber + answer.SecondNumber);
} 
 if(answer.operator === "Substraction"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber - answer.SecondNumber); 
}
else if(answer.operator === "Multiplication"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber * answer.SecondNumber); 
}
else if(answer.operator === "Division"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber / answer.SecondNumber); 
}
else if(answer.operator === "Modulus"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber % answer.SecondNumber); 
}
else if(answer.operator === "Exponentation"){
    console.log(`Your answer is:`);
    console.log(answer.FirstNumber ** answer.SecondNumber); 
}
else {
    console.log("Please enter valid operator!")
};