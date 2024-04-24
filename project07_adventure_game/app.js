#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magentaBright("\tWelcome to the Game!!"));
class Game {
    static enimies = ["Skeleton", "Zoombie", "Warrior", "Assassian"];
    //game variables:
    static maxEnemyHealth = 75;
    static enemyAttackDamage = 25;
    //player variables:
    static playerHealth = 100;
    static playerAttackDamage = 30;
    static numHealthPotions = 3;
    static healthPotionHealAmount = 40;
}
let running = true;
async function game() {
    while (running) {
        console.log("------------------------------------------");
        let enemyHealth = Math.floor(5 + Math.random() * Game.maxEnemyHealth);
        let enemy = Math.floor(Math.random() * Game.enimies.length);
        let randomEnemyName = Game.enimies[enemy];
        console.log(chalk.greenBright.bold(`\t${randomEnemyName} has appeared!`));
        if (enemyHealth > 0) {
            console.log(chalk.yellow(`\tYour Health : ${Game.playerHealth} points`));
            console.log(chalk.yellow(`\t${randomEnemyName}'s HP : ${enemyHealth} points`));
            let { playerAns } = await inquirer.prompt([
                {
                    name: "playerAns",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Attack", "Drink Health Potion", "Run"]
                }
            ]);
            if (playerAns === "Attack") {
                let playerAttack = Math.floor(5 + Math.random() * Game.playerAttackDamage);
                let enemyAttack = Math.floor(5 + Math.random() * Game.enemyAttackDamage);
                enemyHealth -= enemyAttack;
                Game.playerHealth -= playerAttack;
                if (Game.playerHealth > 1) {
                    console.log(chalk.yellow(`\nYou strike the ${randomEnemyName} for ${chalk.greenBright(playerAttack)} points damage.`));
                    console.log(chalk.yellow(`You receive ${chalk.greenBright(enemyAttack)} points in retaliation`));
                    console.log(chalk.bold.magentaBright(`\n\t${randomEnemyName} was defeated!!`));
                    console.log(chalk.magentaBright(`\tYou have ${Game.playerHealth} HP left.\n`));
                    let { againUserAns } = await inquirer.prompt({
                        name: "againUserAns",
                        type: "list",
                        message: "What would you like to do now?",
                        choices: ["Continue Fighting", "Exit Game"]
                    });
                    if (againUserAns === "Continue Fighting") {
                        console.log(chalk.yellowBright("\tYou continue your adventure!!"));
                        continue;
                    }
                    else {
                        console.log(chalk.magentaBright("\n\tThank You for Playing!!"));
                        break;
                    }
                }
                else {
                    console.log(chalk.red("You have taken too much damage, You are too weak to go!!"));
                    break;
                }
            }
            else if (playerAns === "Drink Health Potion") {
                Game.playerHealth += Game.healthPotionHealAmount;
                Game.numHealthPotions--;
                if (Game.numHealthPotions >= 0) {
                    console.log(chalk.yellow(`\nYou drink a health potion, healing yourself for ${chalk.greenBright(Game.healthPotionHealAmount)} points.`));
                    console.log(chalk.yellow(`You now have ${chalk.greenBright(Game.playerHealth)} points.`));
                    console.log(chalk.yellow(`You have ${chalk.greenBright(Game.numHealthPotions)} health potions left.`));
                }
                else {
                    console.log(chalk.red(`You have no health potions left! Defeat enemies for a chance to get one!`));
                }
            }
            else if (playerAns === "Run") {
                console.log(chalk.yellowBright(`You run away from the ${randomEnemyName}!`));
                continue;
            }
            else {
                console.log(chalk.red("Invalid Command!"));
            }
        }
    }
}
game();
