import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

function operation () {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'Create account',
          'Check balance',
          'Deposit',
          'Withdraw',
          'Exit'
        ]
      },
    ])
    .then((answer) => {
      const action = answer['action'];
      if( action === 'Create account') {
        createAccount();
      }
    })
    .catch((err) =>  console.error(err));
}

// Create Account: This function will be called when the user selects the option to create an account.
function createAccount () {
  console.log(chalk.bgGreen.black('Congratulations! On choosing our bank.'));
  console.log(chalk.green('Define the options for creating an account:'));

  buildAccount();
}

function buildAccount () {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Enter the account name:',
      }
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      console.info(accountName);

      if(!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }

      if(fs.existsSync(`accounts/${accountName}.json`)) {
        console.error(
          chalk.bgRed.black('Account already exists!')
        );

        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{ "balance": 0 }',
        function (err) {
          console.error(err);
        }
      );

      console.log(chalk.bgGreen.black('Account created successfully!'));
      operation();
    })
    .catch((err) =>  console.error(err));
}

operation();
