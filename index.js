const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const teams = [];

const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What memeber do you want to add to the team?",
        choices: ["Manager", "Engineer", "Intern", "Please No More"],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "Manager":
          createManager();
          break;
        case "Intern":
          createIntern();
          break;
        case "Engineer":
          createEngineer();
          break;
        default:
          end();
          break;
      }
    });
};

const createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is manager name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is manager id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is manager email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is manager officeNumber?",
      },
    ])
    .then((answers) => {
      // create a new manager object using the class constructor
      var newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      //add the new manager to the teams list
      teams.push(newManager);
      //ask the questions again
      start();
    });
};

const createIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is Intern name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is Intern id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is Intern email?",
      },
      {
        type: "input",
        name: "school",
        message: "What is Intern school?",
      },
    ])
    .then((answers) => {
      // create a new Intern object using the class constructor
      var newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      //add the new Intern to the teams list
      teams.push(newIntern);
      //ask the questions again
      start();
    });
};

const createEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is Engineer name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is Engineer id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is Engineer email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is Engineer github?",
      },
    ])
    .then((answers) => {
      // create a new Engineer object using the class constructor
      var newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      //add the new Engineer to the teams list
      teams.push(newEngineer);
      //ask the questions again
      start();
    });
};

const end = () => {
    const cards = teams.map((employee) => {
        switch (employee.getRole()) {
            case "Manager":
                return `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${employee.getName()}</h5>
                        <p class="card-text">Role: ${employee.getRole()}</p>
                        <p class="card-text">Id: ${employee.getId()}</p>
                        <p class="card-text">OfficeNumber ${employee.getOfficeNumber()}</p>
                        </div>
                    </div>
                `;
                case "Intern":
                    return `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">${employee.getName()}</h5>
                            <p class="card-text">Role: ${employee.getRole()}</p>
                            <p class="card-text">Id: ${employee.getId()}</p>
                            <p class="card-text">School ${employee.getSchool()}</p>
                            </div>
                        </div>
                    `;
                    case "Engineer":
                        return `
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${employee.getName()}</h5>
                                <p class="card-text">Role: ${employee.getRole()}</p>
                                <p class="card-text">Id: ${employee.getId()}</p>
                                <p class="card-text">Github ${employee.getGithub()}</p>
                                </div>
                            </div>
                        `;
            default:
                break;
        }
    })

    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            </head>
            <body>
                ${cards}
            </body>
        </html>
    `;

    fs.writeFileSync(path.join(__dirname, '/output/teams.html'), template, "utf8");
}

start();
