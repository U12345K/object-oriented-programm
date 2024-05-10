#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log(chalk.white.bgBlack.bold("=====WELCOME TO STUDENT OBJECT ORIENTED PROGRAMM====="));
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellowBright.bold("<<<SELECT ANY ONE OPTION TO PERFORM TASK>>>"),
            choices: ["Student", "Exit"]
        });
        if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.white.italic("^^Enter the student's Name you wants to connect with^^:"),
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please Enter a Name";
                }
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.cyan.italic(`!Hello i am ${name.name}.Nice to meet you!`));
                console.log(chalk.magenta.italic("<<<New Student ADDED>>>"));
                console.log(chalk.white.italic("Current Students List"));
                console.log(persons.students);
            }
            else {
                console.log(chalk.yellow.italic(`!Hello i am ${student.name} See you Again!`));
                console.log(chalk.red.italic("<<<<EXISTING STUDENT LIST>>>>"));
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log(chalk.greenBright.bold("<<<<!!YOU CURRENTLY EXIT THE PROGRAMM!!>>>>"));
            process.exit();
        }
    } while (true);
};
programStart(persons);
