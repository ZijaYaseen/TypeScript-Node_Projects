#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
const linkAPI = "https://v6.exchangerate-api.com/v6/fc9c8360ebb04af732073c28/latest/PKR";
let fetch_data = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let data = await fetch_data(linkAPI);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    name: "name",
    type: "list",
    message: "Converting from",
    choices: countries
});
let userMoney = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: `Please enter amount in ${chalk.bold.greenBright(firstCountry.name)}:`
});
if (userMoney.amount) {
    let secondCountry = await inquirer.prompt({
        name: "name",
        type: "list",
        choices: countries,
        message: "Converting to"
    });
    let conversionRrates = `https://v6.exchangerate-api.com/v6/fc9c8360ebb04af732073c28/pair/${firstCountry.name}/${secondCountry.name}`;
    //fetching data for conversion:
    let fetch_conversion_data = async (data) => {
        let fetchConversionData = await fetch(data);
        let response = await fetchConversionData.json();
        return response.conversion_rate;
    };
    let conversionData = await fetch_conversion_data(conversionRrates);
    let totalAmountAns = userMoney.amount * conversionData;
    console.log(`\nYour ${chalk.bold.green(firstCountry.name)}:${chalk.bold.green(userMoney.amount)} in ${chalk.bold.green(secondCountry.name)} is ${chalk.bold.green(totalAmountAns)}`);
}
else {
    console.log(chalk.bold.red("Please Enter Amount!!"));
}
