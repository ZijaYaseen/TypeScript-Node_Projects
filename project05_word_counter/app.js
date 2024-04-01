#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let userAns = await inquirer.prompt({
    name: "sentence",
    type: "input",
    message: "Enter your sentence to count the words: \n"
});
if (userAns.sentence) {
    let splittingWords = userAns.sentence.trim().split(" ");
    let countingWords = splittingWords.length;
    console.log(`Your words in this sentence are: ${chalk.bold.cyan(countingWords)}`);
}
else {
    console.log(chalk.bold.red(`Please Enter a Sentence!!`));
}
