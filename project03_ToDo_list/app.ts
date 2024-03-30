#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList : string[] = []
let loop : boolean = true;

console.log(chalk.bold.yellow("Welcome To The ToDo List!"));


let newAddTaskAns = await inquirer.prompt([
    {
        name : "addTask",
        type : "input",
        message : "Add Task in your ToDo List:",
    }
])

if(newAddTaskAns.addTask){
    todoList.push(newAddTaskAns.addTask);

    while(loop){

    let operatorAns = await inquirer.prompt(
        {
                name : "operator",
                type : "list",
                message : "What Do You Want To Do?",
                choices : ["ADD MORE TASK", "UPDATE TASK", "VIEW TASK", "DELETE TASK", "CLOSE"],
                default : false
        }
    )

    if(operatorAns.operator === "ADD MORE TASK"){

        let addTaskAns = await inquirer.prompt(
            {
                name : "addMore",
                message : "Add Task:",
                type : "input",
            }
        )

        todoList.push(addTaskAns.addMore);
    } // if

    else if(operatorAns.operator === "UPDATE TASK"){

        if(todoList.length === 0){
            console.log(chalk.bold.red("Empty List!"))
        } 
          else{

        let updateAns = await inquirer.prompt(
            {
                name : "update",
                type : "list",
                message : "Select Task To update",
                choices : todoList
            }
        );
            let updateAddAns = await inquirer.prompt(
                {
                    name : "updateAdd",
                    type : "input",
                    message : "Update Task:"
                }
            )

            let newTodoList = todoList.filter(val => val !== updateAns.update);
            todoList = [...newTodoList, updateAddAns.updateAdd];
        }

    } // else if

    else if(operatorAns.operator === "VIEW TASK"){

        if(todoList.length === 0){
            console.log(chalk.bold.red("Empty List!"))
        } else{
        todoList.forEach(list => console.log(chalk.yellow(list)));
        } // else
    } //else if

    else if(operatorAns.operator === "DELETE TASK"){

        if(todoList.length === 0){
            console.log(chalk.bold.red("Empty List!"))
        }
         else{

        let deleteAns = await inquirer.prompt(
            {
                name : "delete",
                type : "list",
                message : "Select Task to Delete:",
                choices : todoList
            }
        )
            let newDeleteTodo = todoList.filter(val => val !== deleteAns.delete);
            todoList = [...newDeleteTodo];
        }
        
    } // else if

    else{
        loop = false;
    }

    } // loop 

} // first if

else{
    console.log(chalk.bold.red("Please Enter Task First!!"));
}

