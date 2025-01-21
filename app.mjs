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
      if( action === 'Check balance') {
        getAccountBalance();
      }
      if( action === 'Deposit') {
        deposit();
      }
      if( action === 'Withdraw') {
        withdraw();
      }
      if( action === 'Exit') {
        console.log(chalk.bgBlue.black('Thank you for using Accounts!'));
        process.exit();
      }
    })
    .catch((err) =>  console.error(err));
};

function createAccount () {
  console.log(chalk.bgGreen.black('Congratulations! On choosing our bank.'));
  console.log(chalk.green('Define the options for creating an account:'));

  buildAccount();
};

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
};

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Enter the account name:',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if(!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Enter the amount to deposit:',
          }
        ])
        .then((answer) => {
          const amount = parseFloat(answer['amount']);

          addAmount(accountName, amount);
          operation();
        })
        .catch((err) =>  console.error(err));
    })
    .catch((err) =>  console.error(err));
};

function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.error(
      chalk.bgRed.black('Account does not exist!')
    );
    return false;
  }
  return true;
};

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if(!amount) {
    console.error(chalk.bgRed.black('An error occurred, try again'));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err) {
      console.error(err);
    }
  );

  console.log(chalk.bgGreen.black(`Deposit of ${amount}$ completed successfully!`));

};

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    enconding: 'utf8',
    flag: 'r',
  });

  return JSON.parse(accountJSON);
};

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Enter the account name:',
      }
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if(!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(chalk.bgBlue.black(
        `The balance in your account is: $${accountData.balance}`
      ));

      operation();

    })
    .catch((err) => console.error(err));
};

function withdraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Enter the account name:',
      }
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if(!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'How much do you want to withdraw:',
          }
        ])
        .then((answer) => {
          const amountAccount = answer['amount'];
          removeAmount(accountName, amountAccount);

        })
        .catch((err) =>  console.error(err));
    })
    .catch((err) => console.error(err));
};

function removeAmount(accountName, amountAccount) {
  const accountData = getAccount(accountName);

  if(!amountAccount) {
    console.log(
      chalk.bgRed.black('An error occurred, try again later.')
    );
    return withdraw();
  }

  if(accountData.balance < amountAccount) {
    console.log(
      chalk.bgRed.black('Unavailable value!')
    );
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amountAccount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err) {
      console.error(err);
    }
  );

  console.log(
    chalk.bgGreen.black(
      `The withdrawal in the amount of ${amountAccount} was made successfully.`
    )
  );

  operation();

};

operation();
