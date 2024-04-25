#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow.bold.italic("\t\t# STARTING THE QUIZ #"));
console.log("-----------------------------------------------------------------------------------------------");
console.log(chalk.magentaBright("# You will be given 12 Questions and in order to win you have to answer 8 questions correctly #\n"));

let apiLink = "https://opentdb.com/api.php?amount=13&category=18&difficulty=easy&type=multiple";

let fetchData = async (data:any) => {
    let fetch_data = await fetch(data);
    let res = await fetch_data.json()
    return res.results;
}

let data = await fetchData(apiLink);

async function startQuiz () {

    let score:number=0;

    //for user name;
    let {name} = await inquirer.prompt(
        {
            name:"name",
            type:"input",
            message:"What is your Name?"
        }
    )
    
    for(let i=1; i < 13; i++){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer]

        let {quiz} = await inquirer.prompt(
            {
                name:"quiz",
                type:"list",
                message:data[i].question,
                choices:answers.map((val:any)=>val)
            }
        )
        if(quiz === data[i].correct_answer){
            score++;
            console.log(chalk.greenBright("Correct Answer!\n"));
        }
        else{
            console.log(chalk.yellow(`The Correct Answer is: ${chalk.red(data[i].correct_answer)}\n`)); 
            }
        }

        console.log(chalk.greenBright(`Dear ${name}, Your score is ${score} out of 12.`));
        console.log("-----------------------------------------------------------------");
        

        if(score>=8){
            console.log(chalk.magentaBright(`\tCongratulations! You won the Quiz.`));
        }
        else{
            console.log(chalk.red("\tSorry! You lost the Quiz"));
        }

        console.log("-----------------------------------------------------------------");
        console.log(chalk.yellow.bold.italic("\t# END OF THE QUIZ #"));
}
startQuiz()


